import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import Ajv from 'ajv';
import { db } from '../db/client';
import { testCases, agents } from '../db/schema';
import { engineClient } from '../lib/engine-client';

const ajv = new Ajv();

function newId(): string {
  return crypto.randomUUID();
}

export const listTestCases: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId } = req.params;
    const rows = await db
      .select()
      .from(testCases)
      .where(and(eq(testCases.agentId, agentId), eq(testCases.tenantId, tenantId)));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createTestCase: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId } = req.params;
    const { name, inputJson, assertionsJson } = req.body as {
      name: string;
      inputJson: string;
      assertionsJson: string;
    };

    if (!name || !inputJson || !assertionsJson) {
      throw Object.assign(new Error('name, inputJson, and assertionsJson are required'), { status: 400 });
    }

    try { JSON.parse(assertionsJson); }
    catch { throw Object.assign(new Error('assertionsJson must be valid JSON'), { status: 400 }); }

    const agentRows = await db
      .select({ id: agents.id })
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));

    if (!agentRows[0]) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }

    const now = new Date();
    const id = newId();
    await db.insert(testCases).values({
      id,
      agentId,
      tenantId,
      name,
      inputJson,
      assertionsJson,
      createdAt: now,
      updatedAt: now,
    });

    const rows = await db.select().from(testCases).where(eq(testCases.id, id));
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateTestCase: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId, cid } = req.params;
    const { name, inputJson, assertionsJson } = req.body as {
      name?: string;
      inputJson?: string;
      assertionsJson?: string;
    };

    const existing = await db
      .select()
      .from(testCases)
      .where(and(eq(testCases.id, cid), eq(testCases.agentId, agentId), eq(testCases.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Test case not found'), { status: 404 });
    }

    await db.update(testCases).set({
      ...(name && { name }),
      ...(inputJson && { inputJson }),
      ...(assertionsJson && { assertionsJson }),
      updatedAt: new Date(),
    }).where(eq(testCases.id, cid));

    const rows = await db.select().from(testCases).where(eq(testCases.id, cid));
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteTestCase: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId, cid } = req.params;

    const existing = await db
      .select({ id: testCases.id })
      .from(testCases)
      .where(and(eq(testCases.id, cid), eq(testCases.agentId, agentId), eq(testCases.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Test case not found'), { status: 404 });
    }

    await db.delete(testCases).where(eq(testCases.id, cid));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

interface Assertion {
  type: 'exact_match' | 'schema' | 'evaluate_score';
  key?: string;
  expected?: unknown;
  schema?: object;
  threshold?: number;
}

export const runTestSuite: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId } = req.params;

    const agentRows = await db
      .select()
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));

    if (!agentRows[0]) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }

    const cases = await db
      .select()
      .from(testCases)
      .where(and(eq(testCases.agentId, agentId), eq(testCases.tenantId, tenantId)));

    if (cases.length === 0) {
      res.json({ total: 0, passed: 0, failed: 0, results: [] });
      return;
    }

    const results: Array<{
      id: string;
      name: string;
      passed: boolean;
      assertions: Array<{ type: string; passed: boolean; message?: string }>;
      error?: string;
    }> = [];

    let totalPassed = 0;

    for (const tc of cases) {
      let caseOutput: Record<string, unknown> = {};
      let runError: string | undefined;

      try {
        // Dispatch run and wait for completion via engine poll
        const dispatchRes = await engineClient.post('/internal/runs', {
          agentId,
          tenantId,
          triggerType: 'test',
          input: JSON.parse(tc.inputJson) as Record<string, unknown>,
        });
        const { runId } = dispatchRes.data as { runId: string };

        // Poll for completion (max 60s)
        const start = Date.now();
        while (Date.now() - start < 60000) {
          await new Promise((r) => setTimeout(r, 1500));
          const statusRes = await engineClient.get(`/internal/runs/${runId}`);
          const run = statusRes.data as { status: string; output?: Record<string, unknown>; error?: unknown };
          if (run.status === 'completed') {
            caseOutput = run.output ?? {};
            break;
          }
          if (run.status === 'failed' || run.status === 'cancelled') {
            runError = `Run ended with status: ${run.status}`;
            break;
          }
        }
      } catch (err) {
        runError = err instanceof Error ? err.message : String(err);
      }

      const assertions: Array<{ type: string; passed: boolean; message?: string }> = [];
      let casePassed = !runError;

      if (!runError) {
        let assertionDefs: Assertion[] = [];
        try { assertionDefs = JSON.parse(tc.assertionsJson) as Assertion[]; }
        catch {
          results.push({ id: tc.id, name: tc.name, passed: false, assertions: [], error: 'Invalid assertionsJson' });
          continue;
        }

        for (const assertion of assertionDefs) {
          let passed = false;
          let message: string | undefined;

          if (assertion.type === 'exact_match') {
            const actual = assertion.key ? caseOutput[assertion.key] : caseOutput;
            passed = JSON.stringify(actual) === JSON.stringify(assertion.expected);
            if (!passed) message = `Expected ${JSON.stringify(assertion.expected)}, got ${JSON.stringify(actual)}`;
          } else if (assertion.type === 'schema') {
            const schema = assertion.schema as Record<string, unknown> | undefined;
            if (schema) {
              passed = ajv.validate(schema, caseOutput) as boolean;
              message = passed ? undefined : ajv.errorsText();
            } else {
              passed = typeof caseOutput === 'object' && caseOutput !== null;
              message = passed ? undefined : 'Output is not an object';
            }
          } else if (assertion.type === 'evaluate_score') {
            passed = false;
            message = 'evaluate_score not yet implemented — assertion counts as failed';
          }

          assertions.push({ type: assertion.type, passed, message });
          if (!passed) casePassed = false;
        }
      }

      if (casePassed) totalPassed++;

      const caseResult = { id: tc.id, name: tc.name, passed: casePassed, assertions, error: runError };
      results.push(caseResult);

      // Write back last result
      await db
        .update(testCases)
        .set({ lastResult: JSON.stringify(caseResult), updatedAt: new Date() })
        .where(eq(testCases.id, tc.id));
    }

    res.json({ total: cases.length, passed: totalPassed, failed: cases.length - totalPassed, results });
  } catch (err) {
    next(err);
  }
};
