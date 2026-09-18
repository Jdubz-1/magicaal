jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

let runRows: Array<Record<string, unknown>> = [];
jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: {
    select: jest.fn(() => ({ from: () => ({ where: async () => runRows }) })),
    update: jest.fn(() => ({ set: () => ({ where: async () => undefined }) })),
  },
}));

jest.mock('@/queue/client', () => ({
  redis: {},
  runTriggerQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runScheduledQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runRetryQueue: { add: jest.fn().mockResolvedValue(undefined) },
}));

import { resumeRun } from '@/execution/resume';
import { runTriggerQueue } from '@/queue/client';

const addJob = runTriggerQueue.add as jest.Mock;

const ROUTER = {
  strategy: 'priority',
  targets: [{ id: 'primary', connectionId: 'conn-1', provider: 'anthropic', model: 'claude-sonnet-5' }],
  triggers: [],
};

function suspendedRun(checkpoint: Record<string, unknown>): void {
  runRows = [
    {
      id: 'run-1',
      agentId: 'agent-1',
      tenantId: '_platform',
      triggerType: 'caal',
      status: 'suspended',
      reviewId: 'rev_1',
      suspendedNodeId: 'review-node',
      sessionId: 'session-1',
      checkpointJson: JSON.stringify(checkpoint),
    },
  ];
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('resumeRun — dispatch fields survive suspension', () => {
  it('restores the router override and credential tenant onto the resumed job', async () => {
    // markRunSuspended parks them in the checkpoint; without this the resumed
    // run has no router and no credential tenant, and fails on its first LLM
    // call instead of continuing.
    suspendedRun({
      userPrompt: 'hello',
      _dispatch_router_override: ROUTER,
      _dispatch_credential_tenant: 'tenant-a',
    });

    await resumeRun('run-1', { action: 'approve' });

    expect(addJob).toHaveBeenCalledTimes(1);
    const [, job] = addJob.mock.calls[0] as [string, Record<string, unknown>];
    expect(job.routerOverride).toEqual(ROUTER);
    expect(job.credentialTenantId).toBe('tenant-a');
  });

  it('keeps the reserved keys out of the restored context', async () => {
    suspendedRun({
      userPrompt: 'hello',
      _dispatch_router_override: ROUTER,
      _dispatch_credential_tenant: 'tenant-a',
    });

    await resumeRun('run-1', { action: 'approve' });

    const [, job] = addJob.mock.calls[0] as [string, { input: Record<string, unknown> }];
    expect(job.input).toMatchObject({ userPrompt: 'hello', _review_approved: true });
    expect(job.input._dispatch_router_override).toBeUndefined();
    expect(job.input._dispatch_credential_tenant).toBeUndefined();
  });

  it('omits both fields for a run dispatched without them', async () => {
    suspendedRun({ userPrompt: 'hello' });

    await resumeRun('run-1', { action: 'approve' });

    const [, job] = addJob.mock.calls[0] as [string, Record<string, unknown>];
    expect(job.routerOverride).toBeUndefined();
    expect(job.credentialTenantId).toBeUndefined();
    expect(job.sessionId).toBe('session-1');
  });

  it('ignores reserved dispatch keys supplied as reviewer modifications', async () => {
    // An approver must not be able to point a platform-tenant run's credential
    // resolution at a tenant of their choosing by naming the reserved keys.
    suspendedRun({ userPrompt: 'hello', _dispatch_credential_tenant: 'tenant-a' });

    await resumeRun('run-1', {
      action: 'approve',
      modifications: {
        _dispatch_credential_tenant: 'tenant-victim',
        _dispatch_router_override: { strategy: 'priority', targets: [], triggers: [] },
      },
    });

    const [, job] = addJob.mock.calls[0] as [string, { input: Record<string, unknown> }] &
      [string, Record<string, unknown>];
    expect(job.credentialTenantId).toBe('tenant-a');
    expect(job.routerOverride).toBeUndefined();
    expect(job.input._dispatch_credential_tenant).toBeUndefined();
    expect(job.input._dispatch_router_override).toBeUndefined();
  });

  it('applies reviewer modifications alongside the restored context', async () => {
    suspendedRun({ userPrompt: 'hello', _dispatch_credential_tenant: 'tenant-a' });

    await resumeRun('run-1', { action: 'approve', modifications: { userPrompt: 'edited' } });

    const [, job] = addJob.mock.calls[0] as [string, { input: Record<string, unknown> }];
    expect(job.input.userPrompt).toBe('edited');
    expect(job.input._dispatch_credential_tenant).toBeUndefined();
  });
});
