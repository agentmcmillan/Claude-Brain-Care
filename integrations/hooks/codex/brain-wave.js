#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

async function readHookPayload() {
  let payload = '';
  for await (const chunk of process.stdin) payload += chunk;
  return JSON.parse(payload || '{}');
}

function resolveWorkspaceRoot(data = {}) {
  if (process.env.BRAIN_WAVE_ROOT) return path.resolve(process.env.BRAIN_WAVE_ROOT);
  const workingDirectory = path.resolve(data.cwd || process.cwd());
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd: workingDirectory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return workingDirectory;
  }
}

function scoreMemoryRoot(candidate) {
  const expected = [
    'alpha-wave/INDEX.md',
    'beta-wave/_MAP.md',
    'beta-wave/_CONNECTIONS.md',
    'rem/restoration/PROTOCOL.md',
    'rem/DISCOVERIES.md',
  ];
  return expected.filter(file => fs.existsSync(path.join(candidate, file))).length;
}

function resolveMemoryRoot(workspaceRoot) {
  if (process.env.BRAIN_WAVE_MEMORY_ROOT) {
    const configured = process.env.BRAIN_WAVE_MEMORY_ROOT;
    return path.resolve(workspaceRoot, configured);
  }

  const candidates = [workspaceRoot, path.join(workspaceRoot, '.claude')];
  return candidates
    .map(candidate => ({ candidate, score: scoreMemoryRoot(candidate) }))
    .sort((left, right) => right.score - left.score)[0].candidate;
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function isWithin(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative));
}

function normalizeWorkspacePath(workspaceRoot, filePath) {
  if (!filePath || typeof filePath !== 'string') return null;
  const cleaned = filePath.trim().replace(/^['"]|['"]$/g, '');
  if (!cleaned || cleaned === '/dev/null') return null;
  const absolute = path.resolve(workspaceRoot, cleaned);
  return isWithin(workspaceRoot, absolute) ? absolute : null;
}

function extractPatchOperations(command) {
  if (typeof command !== 'string') return [];
  const operations = [];
  const lines = command.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\*\*\* (Add|Update|Delete) File: (.+)$/);
    if (!match) continue;
    const operation = { action: match[1].toLowerCase(), path: match[2].trim() };
    if (match[1] === 'Update' && lines[index + 1]) {
      const move = lines[index + 1].match(/^\*\*\* Move to: (.+)$/);
      if (move) operation.moveTo = move[1].trim();
    }
    operations.push(operation);
  }
  return operations;
}

function extractFileOperations(data, workspaceRoot) {
  const toolInput = data.tool_input || {};
  const directPath = toolInput.file_path || toolInput.path;
  if (directPath) {
    const absolute = normalizeWorkspacePath(workspaceRoot, directPath);
    return absolute
      ? [{ action: data.tool_name === 'Write' ? 'add' : 'update', path: absolute }]
      : [];
  }

  return extractPatchOperations(toolInput.command)
    .flatMap(operation => {
      const results = [];
      const absolute = normalizeWorkspacePath(workspaceRoot, operation.path);
      if (absolute) results.push({ action: operation.action, path: absolute });
      if (operation.moveTo) {
        const moved = normalizeWorkspacePath(workspaceRoot, operation.moveTo);
        if (moved) results.push({ action: 'add', path: moved });
      }
      return results;
    });
}

function relativeWorkspacePath(workspaceRoot, filePath) {
  return path.relative(workspaceRoot, filePath).split(path.sep).join('/');
}

function shouldIgnorePath(workspaceRoot, memoryRoot, filePath) {
  if (!filePath || !isWithin(workspaceRoot, filePath)) return true;
  const relative = relativeWorkspacePath(workspaceRoot, filePath);
  const relativeMemory = path.relative(memoryRoot, filePath).split(path.sep).join('/');
  const memoryIsWorkspace = path.resolve(memoryRoot) === path.resolve(workspaceRoot);
  const isMemoryFile = memoryIsWorkspace
    ? /^(?:alpha-wave|beta-wave|rem)(?:\/|$)/.test(relative)
    : relativeMemory === '' || (!relativeMemory.startsWith('../') && relativeMemory !== '..');
  if (isMemoryFile) return true;
  return /(^|\/)(?:\.git|build|node_modules)(?:\/|$)/.test(relative);
}

function formatTimestamp(date = new Date()) {
  return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, 'Z');
}

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function readText(filePath, maxCharacters = Infinity) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.length <= maxCharacters) return content;
  return content.slice(0, maxCharacters).trimEnd() + '\n…';
}

function latestMarkdownFile(directory) {
  if (!fs.existsSync(directory)) return null;
  const files = fs.readdirSync(directory)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(directory, file));
  if (files.length === 0) return null;
  return files.sort((left, right) => fs.statSync(right).mtimeMs - fs.statSync(left).mtimeMs)[0];
}

function safeSlug(value, fallback = 'session') {
  const slug = String(value || fallback).replace(/[^A-Za-z0-9_-]+/g, '-');
  return slug.slice(-48) || fallback;
}

function stringifyResult(value) {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function verboseLog(message) {
  if (process.env.BRAIN_WAVE_VERBOSE === 'true') {
    console.error(`[brain-wave-codex] ${message}`);
  }
}

module.exports = {
  ensureDir,
  extractFileOperations,
  extractPatchOperations,
  formatDate,
  formatTimestamp,
  isWithin,
  latestMarkdownFile,
  normalizeWorkspacePath,
  readHookPayload,
  readText,
  relativeWorkspacePath,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  safeSlug,
  shouldIgnorePath,
  stringifyResult,
  verboseLog,
};
