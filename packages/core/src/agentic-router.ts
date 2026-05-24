export interface AgenticRouterCase {
  key: string;
  label: string;
  description: string;
}

export interface AgenticRouterConfig {
  model: string;
  systemPrompt?: string | PromptRef;
  inputKey: string;
  cases: AgenticRouterCase[];
  routeOutputKey: string;
  confidenceOutputKey?: string;
  reasoningOutputKey?: string;
  confidenceThreshold?: number;
}

export interface PromptRef {
  ref: string;
  version?: number;
}
