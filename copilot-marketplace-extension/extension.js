const vscode = require("vscode");
const fs = require("node:fs/promises");
const path = require("node:path");

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyFileWithMode(sourcePath, targetPath, mode) {
  const exists = await pathExists(targetPath);
  if (exists && mode === "skip") {
    return "skipped";
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
  return exists ? "overwritten" : "created";
}

async function installPromptPack(context) {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage(
      "Open a workspace folder before running rill-make Copilot setup."
    );
    return;
  }

  const workspaceRoot = folders[0].uri.fsPath;
  const templateRoot = path.join(context.extensionPath, "templates", ".github");

  const targets = [
    {
      src: path.join(templateRoot, "copilot-instructions.md"),
      dst: path.join(workspaceRoot, ".github", "copilot-instructions.md")
    },
    {
      src: path.join(templateRoot, "prompts", "create-rill-package.prompt.md"),
      dst: path.join(
        workspaceRoot,
        ".github",
        "prompts",
        "create-rill-package.prompt.md"
      )
    }
  ];

  const existing = [];
  for (const target of targets) {
    if (await pathExists(target.dst)) {
      existing.push(target.dst);
    }
  }

  let mode = "overwrite";
  if (existing.length > 0) {
    const choice = await vscode.window.showWarningMessage(
      "rill-make Copilot files already exist in this workspace. How would you like to proceed?",
      { modal: true },
      "Overwrite",
      "Skip existing",
      "Cancel"
    );

    if (choice === "Cancel" || !choice) {
      return;
    }

    mode = choice === "Skip existing" ? "skip" : "overwrite";
  }

  let created = 0;
  let overwritten = 0;
  let skipped = 0;

  for (const target of targets) {
    const result = await copyFileWithMode(target.src, target.dst, mode);
    if (result === "created") {
      created += 1;
    } else if (result === "overwritten") {
      overwritten += 1;
    } else {
      skipped += 1;
    }
  }

  vscode.window.showInformationMessage(
    `rill-make Copilot setup complete. Created: ${created}, overwritten: ${overwritten}, skipped: ${skipped}.`
  );
}

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "rillMakeCopilot.initialize",
    async () => {
      try {
        await installPromptPack(context);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`rill-make setup failed: ${message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
