# Copilot Instructions for rill-make

This repository uses the rill-make Copilot prompt pack for blueprint-first package generation.

## Core workflow

Mirror `skills/create-rill-package/SKILL.md` in order, including sub-steps:

1. Phase 0: run `node skills/create-rill-package/scripts/preflight.mjs` and halt on failure.
2. Phase 1: fetch docs with `curl -sL` (rill fragments/full bundle, extension index, and rill-agent docs when HTTP deployment is requested).
3. Phase 2-3: gather requirements and clarifications.
4. Phase 3.5: scan sibling packages for reusable local patterns.
5. Phase 4: architect writes the initial blueprint sections.
6. Phase 4.5: bootstrap/install/probe in the real package directory (`rill bootstrap`, `rill install ... --as ...`, `node skills/create-rill-package/scripts/probe-surfaces.mjs <package-dir>`).
7. Phase 5-6: architect extends/finalizes blueprint.
8. Phase 7a-7e and 7g: implement strictly from blueprint using helper scripts (`append-gitignore.mjs`, `scaffold-server.mjs`, `scaffold-env.mjs`, `scaffold-custom-ext.mjs`).
9. Phase 7f: validate with reviewer (`rill check`, and `rill check --types` when `extensions/` exists).
10. Phase 7h: run one runtime smoke test (or explicitly record skip if `.env` credentials are not populated).
11. Phase 8: deliver files, provisioning checklist, assumptions, and exact run commands.

Do not skip decision gates:

- Apply integration-strategy gates for custom extensions.
- Run npm package discovery and user confirmation when wrapping third-party npm SDKs.
- In Phase 4.5, write stub `extensions.config` entries from the blueprint before probing surfaces; install prompt-md when Prompt Inventory is non-empty.
- Treat `rill install` and probe failures as blocking; surface stderr and branch explicitly.

## Runtime and signature parity

- Use `rill run` (with named flags for required closure params) as the primary execution command.
- If HTTP deployment is configured, use `rill build --output build && node server.js`.
- Treat `<package>/.rill-design/extension-surfaces.md` as authoritative call-surface truth.

## Rill invariants

- Use rill closures with full `^("...")` decoration and typed params.
- Use `=>` capture, never `=` assignment.
- Use `list[...]` and `dict[...]` literals.
- Keep business logic in rill scripts; custom extensions are thin wrappers.
- Keep static config in `rill-config.json`, secrets as `${VAR_NAME}` placeholders.
- Externalize multiline or parameterized prompts to `prompts/*.prompt.md`.
