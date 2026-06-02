import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface LogConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  messageKey?: string;
  outputKey?: string;
}

export const coreLog: NodeModule<LogConfig> = {
  type: 'core:log',
  meta: {
    name: 'Log',
    description: 'Writes a message to the run log and emits it as an observable event',
    category: 'observability',
    icon: 'terminal',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['level', 'message'],
      properties: {
        level: {
          type: 'string',
          enum: ['debug', 'info', 'warn', 'error'],
          description: 'Log severity level',
        },
        message: {
          type: 'string',
          description: 'Message text or JSONata expression (if messageKey is set, uses context value)',
        },
        messageKey: {
          type: 'string',
          description: 'Context key whose value is used as the message (overrides message field)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the logged message to (optional)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _logged: { type: 'boolean' },
        _log_message: { type: 'string' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: LogConfig) {
    const message = config.messageKey
      ? String(ctx.get(config.messageKey) ?? config.message)
      : config.message;

    ctx.log(config.level, message);

    if (config.outputKey) {
      ctx.set(config.outputKey, message);
    }

    ctx.set('_logged', true);
    ctx.set('_log_message', message);

    ctx.emit('node.log', { level: config.level, message });

    return {
      status: 'complete' as const,
      outputs: { _logged: true, _log_message: message },
    };
  },
};
