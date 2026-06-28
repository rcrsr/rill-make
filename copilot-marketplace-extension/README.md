# rill-make Copilot Setup Extension

This VS Code extension adds a marketplace-installable setup path for `rill-make` GitHub Copilot support.

## What it does

Command: `rill-make: Install Copilot Prompt Pack`

When run in a workspace, it writes:

- `.github/copilot-instructions.md`
- `.github/prompts/create-rill-package.prompt.md`

If files already exist, it asks whether to overwrite or skip.

## Local test

1. Open this folder (`copilot-marketplace-extension`) in VS Code.
2. Press `F5` to launch an Extension Development Host.
3. In the dev host, open a target workspace.
4. Run command palette: `rill-make: Install Copilot Prompt Pack`.

## Package for marketplace

Install the publisher tool:

```bash
npm install -g @vscode/vsce
```

Package from this folder:

```bash
cd copilot-marketplace-extension
vsce package
```

This produces a `.vsix` you can install manually:

```bash
code --install-extension rill-make-copilot-setup-0.1.0.vsix
```

## Publish to VS Code Marketplace

Before publishing:

1. Set `publisher` in `package.json` to your real Marketplace publisher ID.
2. Create a Personal Access Token in Azure DevOps with Marketplace publish permissions.
3. Login and publish:

```bash
cd copilot-marketplace-extension
vsce login <publisher-id>
vsce publish
```

After publish, users can install from VS Code Extensions Marketplace by searching `rill-make Copilot Setup`.
