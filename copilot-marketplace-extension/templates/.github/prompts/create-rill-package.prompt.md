---
agent: agent
description: Create a complete rill package from a specification using the rill-make architecture.
---

Create a complete rill package in this workspace, following the rill-make architecture and guardrails.

Input specification:

${input:Describe the package or paste a spec path (for example ./spec.md)}

Execution requirements:

1. Follow `skills/create-rill-package/SKILL.md` exactly, including Phases 3.5, 4.5, and 7h (smoke test).
2. Use `ARCHITECTURE.md` as source of truth for blueprint schema and architect/engineer/reviewer boundaries.
3. Run prerequisites first with `node skills/create-rill-package/scripts/preflight.mjs`; halt on failure and report output.
4. Fetch docs with `curl -sL` (not summarized fetches). Reuse fetched docs across phases.
5. Write and freeze blueprint at `<package>/.rill-design/blueprint.md` before implementation; if unclear, stop and report `Blueprint gap`.
6. Bootstrap/install/probe in the real package directory (Phase 4.5):
   - `rill bootstrap`
   - install each required extension from the blueprint with `rill install <package> --as <mount>`
   - if Prompt Inventory is non-empty, install `@rcrsr/rill-ext-prompt-md --as prompt`
   - write stub `extensions.config` entries from blueprint `config keys:` before probing
   - `node skills/create-rill-package/scripts/probe-surfaces.mjs <package-dir>`
   Treat `<package>/.rill-design/extension-surfaces.md` as authoritative call-surface truth.
   If install/probe fails, surface stderr and follow a blocking branch; do not silently continue.
7. Preserve ownership boundaries:
   - Design: extension plan, prompt inventory, pipeline blueprint, custom extension API designs.
   - Implementation: `rill-config.json`, `prompts/*.prompt.md`, `.rill` scripts, `extensions/*.ts`.
   - Validation: reviewer checks and conformance grading.
8. Use helper scripts where required (`skills/create-rill-package/scripts/append-gitignore.mjs`, `skills/create-rill-package/scripts/scaffold-server.mjs`, `skills/create-rill-package/scripts/scaffold-env.mjs`, `skills/create-rill-package/scripts/scaffold-custom-ext.mjs`) instead of ad-hoc replacements.
9. Apply decision gates exactly:
   - if custom extensions exist, require `integration option` + `rationale` in blueprint
   - if option 4 (MCP bridge) is selected, stop and get explicit user approval before Phase 4.5
   - if custom extension wraps npm package, perform npm package discovery and get user confirmation
10. Keep custom extensions as thin wrappers around SDK/API calls; keep business logic in rill scripts.
11. Validate with reviewer flow:
   - `rill check` (project scripts)
   - `rill check --types` when `extensions/` exists
12. Run Phase 7h smoke test:
   - Ask whether `.env` is populated
   - Run once with `rill run` (plus required `--<param_name> <value>` flags)
   - Record `SMOKE TEST: PASS` or `SMOKE TEST: SKIPPED (no credentials)`
13. End with:
   - package tree
   - generated file list
   - provisioning checklist for required external credentials/resources
   - complete `rill-config.json`
   - assumptions and next steps
   - exact run commands (`rill run` with required flags; if HTTP serve is requested: `rill build --output build && node server.js`)

Use Posix-compatible shell commands in examples. On Windows, target WSL paths and commands.
