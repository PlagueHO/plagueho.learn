// Purpose: Run the installed Slidev CLI without passing paths through a shell.
// Parameters: CLI arguments, workspace root, and an optional command timeout.
// Usage: spawnSlidev(args, cwd) for previews; runSlidev(args, cwd) for bounded builds.

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const maxCommandOutputLength = 12_000;

export function spawnSlidev(argumentsList, workspaceRoot) {
    const require = createRequire(join(workspaceRoot, "package.json"));
    const entryPoint = require.resolve("@slidev/cli/bin/slidev.mjs");
    return spawn(process.execPath, [entryPoint, ...argumentsList], {
        cwd: workspaceRoot,
        windowsHide: true,
        shell: false,
    });
}

export function runSlidev(argumentsList, workspaceRoot, timeoutMilliseconds = 120_000) {
    return new Promise((resolve) => {
        const child = spawnSlidev(argumentsList, workspaceRoot);
        let output = "";
        let timedOut = false;
        let launchError;

        const appendOutput = (chunk) => {
            output = `${output}${chunk}`.slice(-maxCommandOutputLength);
        };

        child.stdout.on("data", appendOutput);
        child.stderr.on("data", appendOutput);

        const timeout = setTimeout(() => {
            timedOut = true;
            child.kill();
        }, timeoutMilliseconds);

        child.on("error", (error) => {
            launchError = error.message;
            clearTimeout(timeout);
        });

        child.on("close", (code) => {
            clearTimeout(timeout);
            resolve({
                success: code === 0 && !timedOut && !launchError,
                output: launchError ?? output.trim(),
                timedOut,
            });
        });
    });
}
