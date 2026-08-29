// Purpose: Provide a repository-scoped canvas for discovering, building, and previewing Slidev decks.
// Parameters: Canvas input and actions accept a deck identifier from presentations/<deck>/slides.md.
// Usage: Open the "Slidev Presentation Studio" canvas and select a presentation to build or preview.

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createConnection } from "node:net";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { createCanvas, CanvasError, joinSession } from "@github/copilot-sdk/extension";

const workspaceRoot = process.cwd();
const presentationsDirectory = join(workspaceRoot, "presentations");
const canvasServers = new Map();
const previewProcesses = new Map();
const maxCommandOutputLength = 12_000;

function deckPath(deckId) {
    return join(presentationsDirectory, deckId, "slides.md");
}

function formatDeckId(deckId) {
    return deckId
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

async function listPresentations() {
    const entries = await readdir(presentationsDirectory, { withFileTypes: true });
    const presentations = [];

    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const candidatePath = deckPath(entry.name);
        try {
            await readdir(join(presentationsDirectory, entry.name));
            presentations.push({
                id: entry.name,
                title: formatDeckId(entry.name),
                path: relative(workspaceRoot, candidatePath).split(sep).join("/"),
            });
        } catch {
            // A directory that cannot be read is not a selectable presentation.
        }
    }

    return presentations.sort((left, right) => left.title.localeCompare(right.title));
}

async function resolveDeck(deckId) {
    if (typeof deckId !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(deckId)) {
        throw new CanvasError("invalid_deck", "Select a valid presentation identifier.");
    }

    const presentations = await listPresentations();
    const deck = presentations.find((presentation) => presentation.id === deckId);

    if (!deck) {
        throw new CanvasError("deck_not_found", `No Slidev deck named "${deckId}" exists.`);
    }

    return deck;
}

function spawnPnpm(argumentsList) {
    if (process.platform === "win32") {
        const command = ["pnpm.cmd", ...argumentsList].join(" ");
        return spawn(process.env.ComSpec ?? "cmd.exe", ["/d", "/s", "/c", command], {
            cwd: workspaceRoot,
            windowsHide: true,
        });
    }

    return spawn("pnpm", argumentsList, { cwd: workspaceRoot });
}

function runPnpm(argumentsList, timeoutMilliseconds = 120_000) {
    return new Promise((resolve) => {
        const child = spawnPnpm(argumentsList);
        let output = "";
        let timedOut = false;

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
            clearTimeout(timeout);
            resolve({ success: false, output: error.message });
        });

        child.on("close", (code) => {
            clearTimeout(timeout);
            resolve({
                success: code === 0 && !timedOut,
                output: output.trim(),
                timedOut,
            });
        });
    });
}

async function findFreePort() {
    return new Promise((resolve, reject) => {
        const server = createServer();
        server.once("error", reject);
        server.listen(0, "127.0.0.1", () => {
            const address = server.address();
            const port = typeof address === "object" && address ? address.port : undefined;
            server.close((error) => (error ? reject(error) : resolve(port)));
        });
    });
}

async function isPortOpen(port) {
    return new Promise((resolve) => {
        const socket = createConnection({ host: "127.0.0.1", port });
        const complete = (isOpen) => {
            socket.destroy();
            resolve(isOpen);
        };
        socket.once("connect", () => complete(true));
        socket.once("error", () => complete(false));
        socket.setTimeout(500, () => complete(false));
    });
}

async function waitForPreview(port, processHandle) {
    const timeoutAt = Date.now() + 30_000;
    while (Date.now() < timeoutAt) {
        if (processHandle.exitCode !== null) {
            return false;
        }
        if (await isPortOpen(port)) {
            return true;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
    return false;
}

async function startPreview(deckId) {
    const existing = previewProcesses.get(deckId);
    if (existing && existing.process.exitCode === null) {
        return existing;
    }

    const port = await findFreePort();
    const processHandle = spawnPnpm(
        ["exec", "slidev", deckPath(deckId), "--port", String(port), "--open", "false"],
    );
    let output = "";

    const appendOutput = (chunk) => {
        output = `${output}${chunk}`.slice(-maxCommandOutputLength);
    };

    processHandle.stdout.on("data", appendOutput);
    processHandle.stderr.on("data", appendOutput);

    const preview = {
        process: processHandle,
        port,
        url: `http://127.0.0.1:${port}/`,
        getOutput: () => output.trim(),
    };
    previewProcesses.set(deckId, preview);

    processHandle.once("close", () => {
        if (previewProcesses.get(deckId) === preview) {
            previewProcesses.delete(deckId);
        }
    });

    if (await waitForPreview(port, processHandle)) {
        return preview;
    }

    processHandle.kill();
    previewProcesses.delete(deckId);
    throw new CanvasError(
        "preview_start_failed",
        `Slidev preview did not become available. ${output.trim() || "Check the deck build output."}`,
    );
}

function stopPreview(deckId) {
    const preview = previewProcesses.get(deckId);
    if (!preview) {
        return false;
    }

    previewProcesses.delete(deckId);
    if (preview.process.exitCode === null) {
        preview.process.kill();
    }
    return true;
}

function renderHtml() {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Slidev Presentation Studio</title>
    <style>
      :root { color-scheme: light; }
      :root[data-color-mode="dark"] { color-scheme: dark; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--background-color-default, #fff); color: var(--text-color-default, #1f2328); font: var(--text-body-medium, 14px)/1.5 var(--font-sans, "Segoe UI", sans-serif); }
      main { display: grid; grid-template-columns: 270px minmax(0, 1fr); height: 100vh; }
      aside { border-right: 1px solid var(--border-color-default, #d0d7de); overflow: auto; padding: 18px; }
      h1 { font-size: var(--text-title-large, 22px); line-height: 1.2; margin: 0 0 4px; }
      .muted { color: var(--text-color-muted, #57606a); margin: 0 0 18px; }
      .deck { display: block; width: 100%; text-align: left; background: transparent; color: #24292f; border: 1px solid transparent; border-radius: 7px; cursor: pointer; padding: 10px; margin: 3px 0; font: inherit; }
      .deck:hover, .deck[aria-current="true"] { background: var(--background-color-neutral-muted, #f6f8fa); border-color: var(--border-color-default, #d0d7de); }
      .deck strong, .deck span { display: block; }
      .deck span { color: var(--text-color-muted, #57606a); font-size: 12px; margin-top: 2px; }
      section { min-width: 0; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
      .toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      h2 { margin: 0 auto 0 0; font-size: 18px; }
      button { border: 1px solid #d0d7de; background: #f6f8fa; color: #24292f; border-radius: 6px; cursor: pointer; padding: 7px 12px; font: inherit; }
      button.primary { background: #1f883d; border-color: #1f883d; color: #fff; }
      :root[data-color-mode="dark"] .deck { color: #f0f6fc; }
      :root[data-color-mode="dark"] .deck:hover, :root[data-color-mode="dark"] .deck[aria-current="true"] { background: #21262d; border-color: #30363d; }
      :root[data-color-mode="dark"] button { background: #21262d; border-color: #30363d; color: #f0f6fc; }
      :root[data-color-mode="dark"] button.primary { background: #238636; border-color: #238636; color: #fff; }
      button:focus-visible, .deck:focus-visible { outline: 2px solid var(--color-focus-outline, #0969da); outline-offset: 2px; }
      .status { min-height: 24px; color: var(--text-color-muted, #57606a); }
      .preview { border: 1px solid var(--border-color-default, #d0d7de); border-radius: 8px; flex: 1; min-height: 0; overflow: hidden; background: var(--background-color-neutral-muted, #f6f8fa); }
      iframe { width: 100%; height: 100%; border: 0; background: #fff; }
      pre { margin: 0; overflow: auto; max-height: 140px; background: var(--background-color-neutral-muted, #f6f8fa); padding: 12px; border-radius: 6px; font: var(--text-code-inline, 12px)/1.45 var(--font-mono, Consolas, monospace); white-space: pre-wrap; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <main>
      <aside>
        <h1>Presentation Studio</h1>
        <p class="muted">Slidev decks in this repository</p>
        <nav id="decks" aria-label="Presentations"></nav>
      </aside>
      <section>
        <div class="toolbar">
          <h2 id="title">Select a presentation</h2>
          <button id="build" type="button" disabled>Build</button>
          <button id="preview" class="primary" type="button" disabled>Preview</button>
          <button id="stop" type="button" disabled>Stop preview</button>
        </div>
        <div id="status" class="status" role="status">Loading presentations…</div>
        <pre id="output" hidden></pre>
        <div class="preview">
          <iframe id="frame" title="Slidev presentation preview" hidden></iframe>
        </div>
      </section>
    </main>
    <script>
      const state = { decks: [], selectedDeck: null };
      const decksElement = document.querySelector("#decks");
      const titleElement = document.querySelector("#title");
      const statusElement = document.querySelector("#status");
      const outputElement = document.querySelector("#output");
      const frameElement = document.querySelector("#frame");
      const buildButton = document.querySelector("#build");
      const previewButton = document.querySelector("#preview");
      const stopButton = document.querySelector("#stop");

      async function request(path, options) {
        const response = await fetch(path, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Request failed.");
        return data;
      }

      function setOutput(value) {
        outputElement.textContent = value || "";
        outputElement.hidden = !value;
      }

      function renderDecks() {
        decksElement.replaceChildren(...state.decks.map((deck) => {
          const button = document.createElement("button");
          button.className = "deck";
          button.innerHTML = "<strong></strong><span></span>";
          button.querySelector("strong").textContent = deck.title;
          button.querySelector("span").textContent = deck.path;
          button.setAttribute("aria-current", String(deck.id === state.selectedDeck));
          button.addEventListener("click", () => selectDeck(deck.id));
          return button;
        }));
      }

      function selectDeck(deckId) {
        state.selectedDeck = deckId;
        const deck = state.decks.find((item) => item.id === deckId);
        titleElement.textContent = deck.title;
        statusElement.textContent = "Ready to build or preview.";
        buildButton.disabled = false;
        previewButton.disabled = false;
        stopButton.disabled = true;
        frameElement.hidden = true;
        frameElement.removeAttribute("src");
        setOutput("");
        renderDecks();
      }

      async function loadDecks() {
        try {
          const data = await request("/api/presentations");
          state.decks = data.presentations;
          renderDecks();
          statusElement.textContent = state.decks.length ? "Select a presentation to begin." : "No Slidev presentations found.";
        } catch (error) {
          statusElement.textContent = error.message;
        }
      }

      buildButton.addEventListener("click", async () => {
        statusElement.textContent = "Building " + state.selectedDeck + "…";
        buildButton.disabled = true;
        setOutput("");
        try {
          const result = await request("/api/build", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deckId: state.selectedDeck }) });
          statusElement.textContent = "Build completed.";
          setOutput(result.output);
        } catch (error) {
          statusElement.textContent = "Build failed: " + error.message;
        } finally {
          buildButton.disabled = false;
        }
      });

      previewButton.addEventListener("click", async () => {
        statusElement.textContent = "Starting preview…";
        previewButton.disabled = true;
        setOutput("");
        try {
          const result = await request("/api/preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deckId: state.selectedDeck }) });
          frameElement.src = result.url;
          frameElement.hidden = false;
          stopButton.disabled = false;
          statusElement.textContent = "Preview running.";
        } catch (error) {
          statusElement.textContent = "Preview failed: " + error.message;
        } finally {
          previewButton.disabled = false;
        }
      });

      stopButton.addEventListener("click", async () => {
        try {
          await request("/api/preview", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deckId: state.selectedDeck }) });
          frameElement.hidden = true;
          frameElement.removeAttribute("src");
          stopButton.disabled = true;
          statusElement.textContent = "Preview stopped.";
        } catch (error) {
          statusElement.textContent = "Could not stop preview: " + error.message;
        }
      });

      loadDecks();
    </script>
  </body>
</html>`;
}

async function parseBody(request) {
    const chunks = [];
    for await (const chunk of request) {
        chunks.push(chunk);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(data));
}

async function handleRequest(request, response) {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");

    try {
        if (request.method === "GET" && url.pathname === "/") {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(renderHtml());
            return;
        }

        if (request.method === "GET" && url.pathname === "/api/presentations") {
            sendJson(response, 200, { presentations: await listPresentations() });
            return;
        }

        if (request.method === "POST" && url.pathname === "/api/build") {
            const { deckId } = await parseBody(request);
            const deck = await resolveDeck(deckId);
            const result = await runPnpm(["exec", "slidev", "build", deck.path]);
            if (!result.success) {
                sendJson(response, 500, { error: result.timedOut ? "Build timed out." : result.output });
                return;
            }
            sendJson(response, 200, { output: result.output });
            return;
        }

        if (request.method === "POST" && url.pathname === "/api/preview") {
            const { deckId } = await parseBody(request);
            await resolveDeck(deckId);
            const preview = await startPreview(deckId);
            sendJson(response, 200, { url: preview.url });
            return;
        }

        if (request.method === "DELETE" && url.pathname === "/api/preview") {
            const { deckId } = await parseBody(request);
            await resolveDeck(deckId);
            sendJson(response, 200, { stopped: stopPreview(deckId) });
            return;
        }

        sendJson(response, 404, { error: "Not found." });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error.";
        sendJson(response, 400, { error: message });
    }
}

async function startCanvasServer(instanceId) {
    const server = createServer((request, response) => {
        void handleRequest(request, response);
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    return { server, url: `http://127.0.0.1:${port}/`, instanceId };
}

const session = await joinSession({
    canvases: [
        createCanvas({
            id: "slidev-presentation-studio",
            displayName: "Slidev Presentation Studio",
            description: "Build and preview Slidev presentations in this repository.",
            inputSchema: {
                type: "object",
                properties: {
                    deckId: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
                },
                additionalProperties: false,
            },
            actions: [
                {
                    name: "list_presentations",
                    description: "List the Slidev presentation decks available in this repository.",
                    handler: async () => ({ presentations: await listPresentations() }),
                },
                {
                    name: "build_presentation",
                    description: "Build a selected Slidev presentation using the repository's pnpm command.",
                    inputSchema: {
                        type: "object",
                        properties: { deckId: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
                        required: ["deckId"],
                        additionalProperties: false,
                    },
                    handler: async (ctx) => {
                        const deck = await resolveDeck(ctx.input.deckId);
                        const result = await runPnpm(["exec", "slidev", "build", deck.path]);
                        if (!result.success) {
                            throw new CanvasError("build_failed", result.timedOut ? "Build timed out." : result.output);
                        }
                        return { deck, output: result.output };
                    },
                },
                {
                    name: "start_preview",
                    description: "Start a local Slidev preview server for a selected presentation.",
                    inputSchema: {
                        type: "object",
                        properties: { deckId: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
                        required: ["deckId"],
                        additionalProperties: false,
                    },
                    handler: async (ctx) => {
                        const deck = await resolveDeck(ctx.input.deckId);
                        const preview = await startPreview(deck.id);
                        return { deck, url: preview.url };
                    },
                },
                {
                    name: "stop_preview",
                    description: "Stop the local Slidev preview server for a selected presentation.",
                    inputSchema: {
                        type: "object",
                        properties: { deckId: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
                        required: ["deckId"],
                        additionalProperties: false,
                    },
                    handler: async (ctx) => {
                        await resolveDeck(ctx.input.deckId);
                        return { stopped: stopPreview(ctx.input.deckId) };
                    },
                },
            ],
            open: async (ctx) => {
                let entry = canvasServers.get(ctx.instanceId);
                if (!entry) {
                    entry = await startCanvasServer(ctx.instanceId);
                    canvasServers.set(ctx.instanceId, entry);
                }
                return { title: "Slidev Presentation Studio", url: entry.url };
            },
            onClose: async (ctx) => {
                const entry = canvasServers.get(ctx.instanceId);
                if (entry) {
                    canvasServers.delete(ctx.instanceId);
                    await new Promise((resolve) => entry.server.close(resolve));
                }
            },
        }),
    ],
});

await session.log("Slidev Presentation Studio is ready.", { ephemeral: true });
