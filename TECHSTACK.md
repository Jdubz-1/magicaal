# Tech Stack

## Runtime

| Library | Version | Purpose |
|---|---|---|
| [express](https://expressjs.com/) | ^4.21 | HTTP server and routing |
| [pino](https://getpino.io/) | ^9 | Structured JSON logger |
| [pino-http](https://github.com/pinojs/pino-http) | ^10 | HTTP request logging middleware |
| [helmet](https://helmetjs.github.io/) | ^8 | Security headers |
| [cors](https://github.com/expressjs/cors) | ^2.8 | CORS middleware |
| [drizzle-orm](https://orm.drizzle.team/) | ^0.44 | Type-safe SQLite ORM |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | ^11 | SQLite driver (WAL mode) |

## Queue & Cache

| Library | Version | Purpose |
|---|---|---|
| [bullmq](https://docs.bullmq.io/) | ^5 (Phase 1) | Job queue for run dispatch |
| [ioredis](https://github.com/redis/ioredis) | ^5 (Phase 1) | Redis client |

## Frontend (Phase 1+)

| Library | Version | Purpose |
|---|---|---|
| [datastar](https://data-star.dev/) | latest | Hypermedia-driven UI framework |

## Development Tooling

| Library | Version | Purpose |
|---|---|---|
| [typescript](https://www.typescriptlang.org/) | ^5.7 | Static typing |
| [ts-node](https://typestrong.org/ts-node/) | ^10 | TypeScript execution for development |
| [tsconfig-paths](https://github.com/dividab/tsconfig-paths) | ^4 | Path alias resolution at runtime |
| [nodemon](https://nodemon.io/) | ^3 | Hot reload in development |
| [jest](https://jestjs.io/) | ^29 | Test runner |
| [ts-jest](https://kulshekhar.github.io/ts-jest/) | ^29 | TypeScript preprocessor for Jest |
| [supertest](https://github.com/ladjs/supertest) | ^7 | HTTP integration testing |
| [drizzle-kit](https://orm.drizzle.team/kit-docs/overview) | ^0.30 | Schema migrations CLI |
| [eslint](https://eslint.org/) | ^8 | Linting |
| [@typescript-eslint](https://typescript-eslint.io/) | ^7 | TypeScript ESLint rules |
| [prettier](https://prettier.io/) | ^3 | Code formatting |

## Infrastructure

| Tool | Purpose |
|---|---|
| [pnpm](https://pnpm.io/) | ^9 | Workspace-aware package manager |
| [Devbox](https://www.jetify.com/devbox) | Reproducible dev environment (Node 22 + pnpm) |
| [SQLite](https://sqlite.org/) | Primary database + Telemetry store (WAL mode) |
| [Redis](https://redis.io/) | Job queue backend, rate-limit counters, pub/sub |
| [Docker](https://www.docker.com/) | Containerization |
| [Docker Compose](https://docs.docker.com/compose/) | Local multi-service orchestration |
