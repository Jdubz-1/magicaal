export type WorkspaceTool = 'bash' | 'file' | 'git' | 'process' | '*';

export type PermissionCondition =
  | { type: 'command_match'; pattern: string }
  | { type: 'command_deny'; pattern: string }
  | { type: 'path_scope'; glob: string }
  | { type: 'branch_match'; pattern: string }
  | { type: 'arg_match'; arg: string; pattern: string };

export interface PermissionRule {
  effect: 'allow' | 'deny';
  tool: WorkspaceTool;
  operations?: string[];
  conditions?: PermissionCondition[];
  message?: string;
}

export interface WorkspacePermissions {
  profile?: string;
  defaultPosture: 'allow' | 'deny';
  rules: PermissionRule[];
}

export type GitHookOperation =
  | { op: 'fetch'; remote?: string; args?: string[] }
  | { op: 'checkout'; branch: string; create?: boolean }
  | { op: 'config'; key: string; value: string }
  | { op: 'tag'; name: string; message?: string };

export interface WorkspaceHook {
  name: string;
  type: 'bash' | 'git' | 'http';
  command?: string;
  gitOp?: GitHookOperation;
  workingDir?: string;
  timeoutSeconds?: number;
  onFailure: 'abort' | 'warn' | 'continue';
}

export interface WorkspaceLifecycleHooks {
  afterClone?: WorkspaceHook[];
  afterBoot?: WorkspaceHook[];
  onSessionResume?: WorkspaceHook[];
  beforeTeardown?: WorkspaceHook[];
  onError?: WorkspaceHook[];
}

export interface WorkspaceConfig {
  repository: {
    url: string;
    ref?: string;
    depth?: number;
    sparse?: string[];
  };
  gitCredentials?: string;
  environment: {
    image?: string;
    useDevContainer?: boolean;
    dockerfile?: string;
    env?: Record<string, string>;
    setupCommands?: string[];
    resources: {
      cpuLimit: string;
      memoryLimit: string;
      diskLimit: string;
    };
    networkPolicy: 'none' | 'allowlist';
    allowedDomains?: string[];
  };
  lifecycle: 'session' | 'run';
  hooks?: WorkspaceLifecycleHooks;
  permissions?: WorkspacePermissions;
  onTeardown?: {
    autoCommit?: string;
    push?: boolean;
    createPR?: {
      titleTemplate: string;
      bodyTemplate: string;
      targetBranch: string;
    };
  };
}
