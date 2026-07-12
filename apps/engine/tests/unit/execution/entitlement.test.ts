import type { AgentGraphDefinition } from '@magicaal/core';
import type { NodeModule } from '@magicaal/sdk-node';

jest.mock('@/execution/lifecycle');
jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

// Entitlements come from the primary DB; drive them directly here so the test
// exercises the gate rather than SQLite.
const mockLoadEntitledPackages = jest.fn<Set<string>, [string]>();
jest.mock('@/registry/entitlements', () => ({
  ...jest.requireActual('@/registry/entitlements'),
  loadEntitledPackages: (tenantId: string) => mockLoadEntitledPackages(tenantId),
}));

import { executeGraph } from '@/execution/worker';
import { registry } from '@/registry/node-registry';
import { lifecycle } from '@/execution/lifecycle';
import { ExecutionContextImpl } from '@/execution/context';

const mockLifecycle = lifecycle as jest.Mocked<typeof lifecycle>;

function testNode(type: string): NodeModule {
  return {
    type,
    meta: { name: type, description: 'test node', category: 'data', version: '1.0.0' },
    schema: { config: {}, input: {}, output: {} },
    async execute(ctx) {
      ctx.set('ran', type);
      return { status: 'complete' as const, outputs: { ran: type } };
    },
  };
}

function graphWith(nodeType: string): AgentGraphDefinition {
  return {
    version: '1',
    name: 'entitlement-test',
    entry: 'n1',
    nodes: { n1: { id: 'n1', type: nodeType, config: {} } },
    edges: [],
    toolEdges: [],
    workspaceEdges: [],
    config: {} as AgentGraphDefinition['config'],
  };
}

function ctxFor(tenantId: string): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: `run-${tenantId}`,
    agentId: 'agent-1',
    tenantId,
    triggerType: 'api',
    input: {},
  });
}

beforeAll(() => {
  // A built-in node and a node provided by acme/premium
  registry.register(testNode('core:builtin-test'));
  registry.hotLoad([testNode('acme:premium:node')], 'acme/premium');
});

beforeEach(() => {
  jest.clearAllMocks();
  mockLifecycle.writeStepStart.mockResolvedValue('step-1');
  mockLifecycle.writeStepEnd.mockResolvedValue(undefined);
  mockLifecycle.writeStepFailed.mockResolvedValue(undefined);
});

describe('package entitlement at execution (ISS-055)', () => {
  it('lets an entitled tenant execute a package node', async () => {
    mockLoadEntitledPackages.mockReturnValue(new Set(['acme/premium']));

    const ctx = ctxFor('tenant-owner');
    await executeGraph('run-1', graphWith('acme:premium:node'), ctx);

    expect(ctx.get('ran')).toBe('acme:premium:node');
    expect(mockLifecycle.writeStepFailed).not.toHaveBeenCalled();
  });

  it('refuses a tenant that did not install the package', async () => {
    mockLoadEntitledPackages.mockReturnValue(new Set());

    const ctx = ctxFor('tenant-freeloader');
    await expect(executeGraph('run-2', graphWith('acme:premium:node'), ctx)).rejects.toThrow(
      /not installed for this tenant/,
    );

    expect(ctx.get('ran')).toBeUndefined();
  });

  it('refuses a tenant whose license lapsed (package no longer entitled)', async () => {
    // loadEntitledPackages only returns packages with an active/grace license,
    // so an expired license presents here as an absent entitlement.
    mockLoadEntitledPackages.mockReturnValue(new Set(['acme/other']));

    const ctx = ctxFor('tenant-expired');
    await expect(executeGraph('run-3', graphWith('acme:premium:node'), ctx)).rejects.toThrow(
      /not installed for this tenant/,
    );
  });

  it('leaves built-in nodes available to every tenant', async () => {
    mockLoadEntitledPackages.mockReturnValue(new Set());

    const ctx = ctxFor('tenant-any');
    await executeGraph('run-4', graphWith('core:builtin-test'), ctx);

    expect(ctx.get('ran')).toBe('core:builtin-test');
  });

  it('resolves entitlements once per run, not once per node', async () => {
    mockLoadEntitledPackages.mockReturnValue(new Set(['acme/premium']));

    const graph: AgentGraphDefinition = {
      ...graphWith('acme:premium:node'),
      nodes: {
        n1: { id: 'n1', type: 'acme:premium:node', config: {} },
        n2: { id: 'n2', type: 'core:builtin-test', config: {} },
      },
      edges: [{ id: 'e1', from: 'n1', to: 'n2', type: 'unconditional' }],
    };

    await executeGraph('run-5', graph, ctxFor('tenant-owner'));

    expect(mockLoadEntitledPackages).toHaveBeenCalledTimes(1);
  });
});
