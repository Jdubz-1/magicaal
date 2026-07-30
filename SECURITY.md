# Security Policy

## Reporting a Vulnerability

**Do not file security vulnerabilities as public GitHub Issues.** Public disclosure before a fix is available puts all MagiCaal deployments at risk.

Report via one of these channels:

- **Email:** `security@magicaal.dev`
- **GitHub Private Vulnerability Reporting:** Security → Advisories → Report a vulnerability (available in the repository's Security tab)

You will receive acknowledgment within **24 hours**. If you do not receive acknowledgment in 24 hours, you may proceed to coordinated disclosure.

---

## Disclosure Timeline

| Milestone | Target |
|---|---|
| Acknowledgment | 24 hours |
| Initial assessment (CVSS score, affected versions identified) | 72 hours |
| Fix developed and tested | 7–14 days (Critical/High); 30 days (Medium) |
| Patch release | Simultaneous with public disclosure |
| CVE ID assigned | At public disclosure |
| Hall of Fame credit | Post-disclosure |

We aim to coordinate public disclosure with the reporter. If circumstances require disclosure before a fix is ready, we will communicate this to the reporter as early as possible.

---

## Scope

### In-Scope

The following areas are in scope for security reports:

- **Authentication & authorization**: login flows, JWT validation, RBAC enforcement, API key hashing and validation, invocation auth strategies
- **Tenant isolation**: cross-tenant data access at the database layer, session context layer, or API layer
- **Credential storage**: AES-256-GCM encryption paths for integration credentials (`MAGICAAL_MASTER_KEY` usage), credential injection into runs
- **Invocation auth**: `api-key` and `jwt` invocation strategies, JWKS validation
- **Code node sandbox**: `core:code` isolated-vm escape or resource limit bypass
- **MCP client**: SSRF via MCP server registration, command injection via MCP tool responses
- **Session context isolation**: access to another session's context data
- **Workspace containers**: container escape, credential leakage from workspace environments

### Out-of-Scope

The following are **not** in scope:

- Attacks requiring physical access to the server
- Social engineering attacks against the maintainer or community members
- Vulnerabilities in third-party dependencies — please report these to the upstream project directly
- Theoretical vulnerabilities with no demonstrated practical exploitation path
- Self-XSS or attacks that require the attacker to already have admin access to the deployment

---

## Severity Guidelines

We follow the [CVSS v3.1](https://www.first.org/cvss/v3.1/specification-document) scoring system for severity assessment.

| Severity | CVSS Score | Response Target |
|---|---|---|
| Critical | 9.0–10.0 | Fix within 7 days |
| High | 7.0–8.9 | Fix within 14 days |
| Medium | 4.0–6.9 | Fix within 30 days |
| Low | 0.1–3.9 | Addressed in next minor release |

---

## Hall of Fame

We publicly credit security researchers who responsibly disclose vulnerabilities to us. Credit is given by name or alias, per the researcher's preference.

| Researcher | Severity | Report Date | CVE |
|---|---|---|---|
| *No reports yet* | — | — | — |

---

## Supported Versions

Security patches are backported to the most recent stable release and the current LTS release (once designated at v1.0.0). Older versions do not receive security patches — upgrade to a supported version.

| Version | Supported |
|---|---|
| Latest stable | Yes |
| Older minor releases | No — upgrade required |
