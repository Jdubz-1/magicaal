# Code Standards

## TypeScript

- `strict: true` enforced — no implicit `any`, no implicit `this`
- Explicit return types on all exported functions and methods
- `import type` for type-only imports
- Path alias `@/*` → `src/*` for imports crossing multiple directory levels

```typescript
// ✅
import type { RequestHandler } from 'express';
import { config } from '@/config';

export const myHandler: RequestHandler = (req, res) => { ... };

// ❌
import { RequestHandler } from 'express';
import { config } from '../../config';

export const myHandler = (req: any, res: any) => { ... };
```

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `health.controller.ts` |
| Variables / functions | camelCase | `createApp`, `requestLogger` |
| Types / interfaces | PascalCase | `UserPayload` |
| Constants | camelCase (not SCREAMING_SNAKE) | `config`, `logger` |
| Route paths | kebab-case | `/api/v1/my-resource` |

## File Structure Rules

- One router per feature area in `src/routes/`
- One controller file per feature area in `src/controllers/`
- Middleware files export a single named middleware function
- `src/lib/` is for stateless utilities only — no route or controller logic

## Environment Variables

- All env vars read in `src/config.ts` only
- Required vars use `requireEnv()` — they throw at startup if absent
- Never use `process.env` outside of `src/config.ts`
- Every variable in `src/config.ts` must have a corresponding entry in `.env.example`

## Error Handling

- Controllers call `next(err)` — they do not send error responses themselves
- Attach `status` or `statusCode` to errors to control the HTTP response code
- `errorHandler.ts` is the only place that sends `{ error: ... }` responses

## Testing

- Integration tests use Supertest against the real Express `app` — no mocking of the framework
- Unit tests cover pure functions and modules (e.g., `config.ts`, utility functions)
- Coverage threshold: 80% lines, branches, functions, statements (enforced by Jest)
- Test file location: `tests/integration/<name>.test.ts` or `tests/unit/<name>.test.ts`
