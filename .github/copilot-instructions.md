# Copilot Instructions for rill-make

This repository ships a Claude plugin and a Copilot prompt pack for authoring rill packages. When helping with package generation, preserve the same architecture and workflow used by the Claude skill.

## Core workflow

Mirror `skills/create-rill-package/SKILL.md` in order, including sub-steps:

1. Phase 0: run `node skills/create-rill-package/scripts/preflight.mjs` and halt on failure.
2. Phase 1: fetch docs with `curl -sL` (rill fragments/full bundle, extension index, and rill-agent docs when HTTP deployment is requested).
3. Phase 2-3: gather requirements and clarifications.
4. Phase 3.5: scan sibling packages for reusable local patterns.
5. Phase 4: architect writes the initial blueprint sections.
6. Phase 4.5: bootstrap/install/probe in the real package directory (`rill bootstrap`, `rill install ... --as ...`, `node skills/create-rill-package/scripts/probe-surfaces.mjs <package-dir>`).
7. Phase 5-6: architect extends/finalizes blueprint.
8. Phase 7a-7e and 7g: implement strictly from blueprint using the engineer role and helper scripts (`append-gitignore.mjs`, `scaffold-server.mjs`, `scaffold-env.mjs`, `scaffold-custom-ext.mjs`).
9. Phase 7f: validate with reviewer (`rill check`, and `rill check --types` when `extensions/` exists).
10. Phase 7h: run one runtime smoke test (or explicitly record skip if `.env` credentials are not populated).
11. Phase 8: deliver files, provisioning checklist, assumptions, and exact run commands.

Do not skip any Claude-skill decision gate:

- Apply the integration-strategy gate for custom extensions (record `integration option` + `rationale`; if option 4 MCP bridge is chosen, require explicit user approval before proceeding).
- Run npm package discovery and user confirmation when the blueprint requires wrapping a third-party npm SDK.
- In Phase 4.5, write stub `extensions.config` entries from the blueprint before probing surfaces; install prompt-md when Prompt Inventory is non-empty.
- Treat `rill install` and probe failures as blocking; surface stderr and branch exactly as the skill specifies (no silent fallback).

## Separation of concerns

Keep these boundaries explicit even when running as a single Copilot session:

- Architect role: extension selection, pipeline design, custom extension API design.
- Engineer role: write `rill-config.json`, `.rill`, `.prompt.md`, and TS extension files from blueprint.
- Reviewer role: run checks and grade conformance against the blueprint.

Do not redesign during implementation. If blueprint is incomplete, raise a "Blueprint gap" and resolve design first.

## Runtime and command parity

- Use `rill run` (with named flags for required closure params) as the primary execution command.
- If HTTP deployment is configured, use `rill build --output build && node server.js`.
- Do not replace these with `npm run dev` / `npm run build && npm run serve` unless the generated package explicitly defines those scripts.

## Probe and signature parity

- Treat `<package>/.rill-design/extension-surfaces.md` (from `rill describe project --stubs`) as authoritative call-surface truth.
- Architect, engineer, and reviewer must validate extension call sites against that inventory; do not guess signatures.

## Delivery parity

- Include the same smoke-test status reporting as the Claude skill: `SMOKE TEST: PASS` or `SMOKE TEST: SKIPPED (no credentials)`.
- Include run commands that match the blueprint closure signature (required flags spelled from closure param names).
- End delivery with a clear final report (files, assumptions, provisioning checklist, run commands, and smoke-test status).

## Rill invariants

- Use rill closures with full `^("...")` decoration and typed params.
- Use `=>` capture, never `=` assignment.
- Use `list[...]` and `dict[...]` literals.
- Keep business logic in rill scripts; custom extensions are thin wrappers.
- Keep static config in `rill-config.json`, secrets as `${VAR_NAME}` placeholders.
- Externalize multiline or parameterized prompts to `prompts/*.prompt.md`.

## Repository references

- Architecture: `ARCHITECTURE.md`
- End-user flow: `GUIDE.md`
- Claude skill orchestration: `skills/create-rill-package/SKILL.md`
- Agents:
  - `agents/rill-architect.md`
  - `agents/rill-engineer.md`
  - `agents/rill-reviewer.md`
