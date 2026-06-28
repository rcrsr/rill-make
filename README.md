# rill-make

Claude Code plugin and GitHub Copilot prompt pack for authoring [rill](https://github.com/rcrsr/rill) packages.

This repository is the plugin source. Claude distribution is through the [`rcrsr/claude-plugins`](https://github.com/rcrsr/claude-plugins) marketplace. Copilot support is workspace-local via `.github/copilot-instructions.md` and `.github/prompts/create-rill-package.prompt.md`.

## GitHub Copilot Support

This repo now includes first-class GitHub Copilot support:

- `.github/copilot-instructions.md` gives Copilot the same architectural constraints used by the Claude plugin (blueprint-first design, architect/engineer/reviewer separation, and rill-specific invariants).
- `.github/prompts/create-rill-package.prompt.md` provides a reusable agent prompt that mirrors `/rill-make:create-rill-package`, including Phase 3.5 sibling-pattern scan, Phase 4.5 bootstrap/install/probe, reviewer validation, and the Phase 7h runtime smoke test.

Usage in VS Code Copilot Chat:

1. Open this repository in VS Code.
2. Open Copilot Chat in Agent mode.
3. Run the reusable prompt from `.github/prompts/create-rill-package.prompt.md` and provide your spec.

The generated package layout and workflow remain aligned with `ARCHITECTURE.md` and `GUIDE.md`.

## Installation

If you previously installed the plugin from the old `rcrsr/rill-plugins` marketplace, remove it first so the new `rill-make` plugin resolves cleanly:

```text
/plugin uninstall rill@rill-plugins
/plugin marketplace remove rill-plugins
```

Then add the current marketplace and install:

```text
/plugin marketplace add rcrsr/claude-plugins
/plugin install rill-make@claude-plugins
/reload-plugins
```

## What it ships

- **`/rill-make:create-rill-package`** — Skill that walks a specification through an 8-phase workflow: doc fetch, requirements gathering, clarifying questions, extension identification, data-flow design, custom-extension design, implementation, and validation. Produces a complete rill package with `rill-config.json`, scripts, and optional TypeScript extensions.
- **`rill-architect`**, **`rill-engineer`**, **`rill-reviewer`** — Subagents that own design, implementation, and validation respectively. Invoked by the skill against a frozen blueprint at `<package>/.rill-design/blueprint.md`.

See [`GUIDE.md`](./GUIDE.md) for end-to-end usage and [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the agent split and blueprint schema.

## License

[MIT](./LICENSE) © Andre Bremer

## User Responsibility

The `create-rill-package` skill references external vendor credentials via `${VAR_NAME}` placeholders and produces a provisioning checklist. It does not create vendor accounts, fetch API keys, or provision remote resources (buckets, vector collections, webhook endpoints). The user owns all accounts, credentials, quotas, and billing.
