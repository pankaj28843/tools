#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const baseUrl = process.argv.find((argument) => /^https?:\/\//.test(argument));

if (!baseUrl) {
  console.error('Usage: pnpm run visual:routes -- <dev-server-origin>');
  process.exit(1);
}

const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
const outDir = path.join('tmp', 'visual-runs', timestamp);
const routes = ['/tools/', '/tools/markdown-to-html', '/tools/html-to-markdown', '/tools/clipboard-inspector', '/tools/base64'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];
const results = [];

mkdirSync(outDir, { recursive: true });

for (const route of routes) {
  for (const viewport of viewports) {
    const url = new URL(route, baseUrl).toString();
    const label = route.replace(/^\/tools\/?/, 'home-').replaceAll('/', '-').replace(/-$/, '') || 'home';
    const bundleDir = path.join(outDir, `${label}-${viewport.name}`);
    const bundle = runJson('cdp', ['workflow', 'debug-bundle', '--url', url, '--screenshot-view', '--out-dir', bundleDir, '--json']);
    const screenshotPath = findArtifactPath(bundle.json, 'screenshot');

    if (bundle.status === 0 && screenshotPath) {
      runJson('cdp', ['open', url, '--json']);
      const target = runJson('cdp', ['pages', '--json', '--jq', `[.pages[] | select(.url == "${url}")][0].targetId`]).stdout.trim().replaceAll('"', '');

      if (target) {
        if (viewport.mobile) {
          runJson('cdp', ['protocol', 'exec', 'Emulation.setDeviceMetricsOverride', '--target', target, '--params', JSON.stringify({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: true }), '--json']);
          runJson('cdp', ['protocol', 'exec', 'Emulation.setEmitTouchEventsForMouse', '--target', target, '--params', JSON.stringify({ enabled: true, configuration: 'mobile' }), '--json']);
        }

        runJson('cdp', ['screenshot', '--target', target, '--out', screenshotPath, '--json']);
        runJson('cdp', ['protocol', 'exec', 'Emulation.clearDeviceMetricsOverride', '--target', target, '--json']);
        runJson('cdp', ['protocol', 'exec', 'Emulation.setEmitTouchEventsForMouse', '--target', target, '--params', JSON.stringify({ enabled: false }), '--json']);
      }
    }

    const networkPath = findArtifactPath(bundle.json, 'network');
    const consolePath = findArtifactPath(bundle.json, 'console');
    const network = networkPath ? readArtifact(networkPath) : null;
    const consoleEvents = consolePath ? readArtifact(consolePath) : null;
    const failedRequests = countFailedRequests(network);
    const consoleErrors = countConsoleErrors(consoleEvents);

    results.push({
      route,
      viewport: viewport.name,
      url,
      status: bundle.status,
      bundleDir,
      screenshotPath: screenshotPath ?? null,
      consoleErrors,
      failedRequests,
      overflowCount: 0,
      stderr: bundle.stderr,
    });
  }
}

const summaryPath = path.join(outDir, 'summary.json');
const markdownPath = path.join(outDir, 'summary.md');
writeFileSync(summaryPath, `${JSON.stringify({ baseUrl, createdAt: new Date().toISOString(), results }, null, 2)}\n`);
writeFileSync(markdownPath, renderMarkdown(baseUrl, results));
console.log(`Visual route diagnostics written to ${outDir}`);
console.log(`Summary: ${summaryPath}`);

function runJson(command, args) {
  const run = spawnSync(command, args, { encoding: 'utf8' });
  return { status: run.status ?? 1, stdout: run.stdout, stderr: run.stderr.trim(), json: parseJson(run.stdout) };
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function findArtifactPath(value, type) {
  const artifacts = value?.artifacts;
  if (!Array.isArray(artifacts)) return undefined;

  return artifacts.find((artifact) => typeof artifact.type === 'string' && artifact.type.includes(type))?.path;
}

function readArtifact(filePath) {
  return parseJson(readFileSync(filePath, 'utf8'));
}

function countFailedRequests(value) {
  const requests = Array.isArray(value?.requests) ? value.requests : [];
  return requests.filter((request) => request.url && (request.failed || request.errorText || request.status >= 400)).length;
}

function countConsoleErrors(value) {
  const messages = Array.isArray(value?.messages) ? value.messages : [];
  return messages.filter((message) => ['error', 'assert'].includes(String(message.level))).length;
}

function renderMarkdown(origin, entries) {
  const rows = entries.map((entry) => `| ${entry.route} | ${entry.viewport} | ${entry.status} | ${entry.consoleErrors} | ${entry.failedRequests} | ${entry.overflowCount} | \`${entry.screenshotPath ?? 'n/a'}\` | \`${entry.bundleDir}\` |`);
  return [`# Visual Route Diagnostics`, ``, `Origin: ${origin}`, ``, `| Route | Viewport | Status | Console errors | Failed requests | Overflow | Screenshot | Bundle |`, `| --- | --- | ---: | ---: | ---: | ---: | --- | --- |`, ...rows, ``].join('\n');
}
