# Security Policy

## Reporting a Vulnerability

**Do not file security vulnerabilities as public GitHub Issues.** Public disclosure before a fix is available puts all MagiCaal deployments at risk.

Report through **[GitHub Private Vulnerability Reporting](https://github.com/Jdubz-1/magicaal/security/advisories/new)** — the "Report a vulnerability" button under this repository's Security tab.

This is the only monitored channel. The report stays private between you and the maintainer until an advisory is published, and it gives us a shared thread to coordinate the fix and the disclosure in.

You will receive acknowledgment within **72 hours**. If you do not, you may proceed to coordinated disclosure.

---

## Disclosure Timeline

| Milestone | Target |
|---|---|
| Acknowledgment | 72 hours |
| Initial assessment (CVSS score, affected versions identified) | 7 days |
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
- **Workspace containers** *(once Phase 6 ships — not yet built)*: container escape, credential leakage from workspace environments

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

**Pre-1.0:** no versioned release has been published yet, so `DEV-main` is the only supported line. Report against it.

From the first tagged release onward, security patches are backported to the most recent stable release and the current LTS release (once designated at v1.0.0). Older versions do not receive security patches — upgrade to a supported version.

| Version | Supported |
|---|---|
| Latest stable | Yes |
| Older minor releases | No — upgrade required |
