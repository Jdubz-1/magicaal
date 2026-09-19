import type { CanonicalMessage } from '@magicaal/core';

/**
 * Reading stored conversation turns back into a request.
 *
 * Sessions are written by core:session-write and are not guaranteed to hold
 * clean CanonicalMessages:
 *
 * - Sessions written before `append` concatenated array values hold a list of
 *   turn-arrays. Spreading those into a request hands the provider adapter
 *   entries with no role/content — a crash inside the adapter rather than a
 *   degraded answer.
 * - A turn whose agent node produced no text was stored as `content: ''`.
 *   Providers reject a message with empty content, so one of those poisons
 *   every later invocation that injects the history.
 *
 * Callers that resend the whole conversation on every iteration — the agentic
 * loop — pass a cap, since the cost of carrying history there multiplies.
 */

export interface SessionHistoryLimits {
  /** Keep at most this many of the most recent messages. */
  maxMessages?: number;
  /** Rough character budget, applied from the most recent message backwards. */
  maxChars?: number;
}

function contentLength(content: CanonicalMessage['content']): number {
  if (typeof content === 'string') return content.length;
  return content.reduce((total, block) => total + ('text' in block ? block.text.length : 0), 0);
}

function isUsableMessage(value: unknown): value is CanonicalMessage {
  if (typeof value !== 'object' || value === null) return false;
  const m = value as { role?: unknown; content?: unknown };
  if (m.role !== 'user' && m.role !== 'assistant' && m.role !== 'tool_result') return false;

  if (typeof m.content === 'string') return m.content.trim() !== '';
  if (Array.isArray(m.content)) return m.content.length > 0;
  return false;
}

export function readSessionHistory(
  stored: unknown,
  limits: SessionHistoryLimits = {},
): CanonicalMessage[] {
  const flat = Array.isArray(stored) ? stored.flat() : [];
  let history = flat.filter(isUsableMessage);

  if (limits.maxMessages !== undefined && history.length > limits.maxMessages) {
    history = history.slice(-limits.maxMessages);
  }

  if (limits.maxChars !== undefined) {
    const kept: CanonicalMessage[] = [];
    let budget = limits.maxChars;
    for (let i = history.length - 1; i >= 0; i--) {
      const cost = contentLength(history[i].content);
      if (budget - cost < 0 && kept.length > 0) break;
      budget -= cost;
      kept.unshift(history[i]);
    }
    history = kept;
  }

  return history;
}
