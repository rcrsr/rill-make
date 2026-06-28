# GitHub Copilot Setup for rill-make

This repository now supports two installation models:

- Workspace-local setup using checked-in files.
- VS Code Marketplace extension setup via `copilot-marketplace-extension`.

The workspace-local model uses:

- `.github/copilot-instructions.md`
- `.github/prompts/create-rill-package.prompt.md`

## 1. Prerequisites

Install VS Code and Git.

Install GitHub Copilot extensions in VS Code:

```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

Sign in to GitHub in VS Code and make sure your Copilot subscription is active.

## 2. Clone and open this repository

```bash
git clone https://github.com/rcrsr/rill-make.git
cd rill-make
code .
```

## 3. Verify Copilot files are present

```bash
ls .github
ls .github/prompts
```

You should see:

- `.github/copilot-instructions.md`
- `.github/prompts/create-rill-package.prompt.md`

## 4. Run the prompt in Copilot Chat

1. Open Copilot Chat in VS Code.
2. Switch to Agent mode.
3. Run the reusable prompt file `.github/prompts/create-rill-package.prompt.md`.
4. Provide your package specification when prompted.

Suggested spec example:

```text
Summarize the top 5 AI news items each morning from a list of RSS feeds and write the summary to a markdown file.
```

## 5. Optional: Reuse this in another repository

If you want the same behavior in a different repo, copy these files into that repo:

```bash
cp /path/to/rill-make/.github/copilot-instructions.md /path/to/your-repo/.github/
mkdir -p /path/to/your-repo/.github/prompts
cp /path/to/rill-make/.github/prompts/create-rill-package.prompt.md /path/to/your-repo/.github/prompts/
```

Then open that repo in VS Code and run the prompt in Copilot Chat Agent mode.

## 6. Install via VS Code Marketplace (new)

This repo includes a publishable extension at `copilot-marketplace-extension/`.

### 6.1 Package a VSIX locally

```bash
npm install -g @vscode/vsce
cd copilot-marketplace-extension
vsce package
```

Install the generated VSIX:

```bash
code --install-extension rill-make-copilot-setup-0.1.0.vsix
```

### 6.2 Publish to the VS Code Marketplace

Set your publisher ID in `copilot-marketplace-extension/package.json` (`publisher` field), then:

```bash
cd copilot-marketplace-extension
vsce login <publisher-id>
vsce publish
```

After publish, users can install from VS Code Extensions by searching for `rill-make Copilot Setup`.

### 6.3 Use the command after install

In any target workspace, run command palette:

```text
rill-make: Install Copilot Prompt Pack
```

This command writes:

- `.github/copilot-instructions.md`
- `.github/prompts/create-rill-package.prompt.md`
