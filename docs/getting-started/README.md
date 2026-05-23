# Getting Started

Everything you need to go from zero to a running local instance.

## Sections

| Guide | Description |
|---|---|
| [Installation](installation.md) | Prerequisites, clone, install, first run |

## Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org/))
- **npm** ≥ 10 (bundled with Node.js 20)
- **Git**

Optionally, for Docker-based development:
- **Docker** and **Docker Compose**

## What You'll Have After Setup

A locally running Express service at `http://localhost:3000` with:
- Hot reload via nodemon + ts-node
- Structured JSON logging to stdout
- Health endpoint at `GET /health`
- Full lint, type-check, and test toolchain

Continue to **[Installation →](installation.md)**
