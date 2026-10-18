#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  normalizeWorkspacePath,
  readHookPayload,
  relativeWorkspacePath,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  verboseLog,
} = require('./brain-wave');

function extractCandidatePaths(data, workspaceRoot) {
  const input = data.tool_input || {};
  const direct = input.file_path || input.path;
  if (direct) {
    const normalized = normalizeWorkspacePath(workspaceRoot, direct);
    return normalized ? [normalized] : [];
  }

  if (typeof input.command !== 'string') return [];
  const matches = input.command.match(/(?:\.{0,2}\/)?(?:[A-Za-z0-9_.@()+-]+\/)+[A-Za-z0-9_.@()+-]+|(?:^|\s)[A-Za-z0-9_.@()+-]+\.[A-Za-z0-9_+-]+/g) || [];
  return matches
    .map(match => match.trim().replace(/["'`,;:]$/g, ''))
    .map(match => normalizeWorkspacePath(workspaceRoot, match))
    .filter(Boolean);
}

function relatedFromConnections(relativePath, content) {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  const basename = path.basename(relativePath);
  const related = new Set();
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes(relativePath) && !lines[index].includes(basename)) continue;
    for (let nearby = Math.max(0, index - 4); nearby <= Math.min(lines.length - 1, index + 4); nearby += 1) {
      for (const match of lines[nearby].matchAll(/`([^`]+\.[A-Za-z0-9_+-]+)`/g)) {
        if (match[1] !== relativePath && match[1] !== basename) related.add(match[1]);
      }
    }
  }
  return [...related];
}

async function main() {
  if (process.env.BRAIN_WAVE_CONTEXT_HINTS === 'false') return;
  try {
    const data = await readHookPayload();
    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const betaDir = path.join(memoryRoot, 'beta-wave');
    const connectionsPath = path.join(betaDir, '_CONNECTIONS.md');
    const connections = fs.existsSync(connectionsPath) ? fs.readFileSync(connectionsPath, 'utf8') : '';
    const hints = new Set();

    for (const filePath of extractCandidatePaths(data, workspaceRoot)) {
      const relative = relativeWorkspacePath(workspaceRoot, filePath);
      if (relative.startsWith('.claude/') || relative.startsWith('alpha-wave/') || relative.startsWith('beta-wave/') || relative.startsWith('rem/')) continue;
      const topDirectory = relative.split('/')[0];
      const directoryMap = path.join(betaDir, topDirectory, '_MAP.md');
      if (fs.existsSync(directoryMap)) {
        hints.add(`Map for \`${relative}\`: \`${relativeWorkspacePath(workspaceRoot, directoryMap)}\``);
      }
      for (const related of relatedFromConnections(relative, connections)) {
        hints.add(`Related to \`${relative}\`: \`${related}\``);
      }
    }

    const selected = [...hints].slice(0, Number.parseInt(process.env.BRAIN_WAVE_MAX_HINTS || '3', 10));
    if (selected.length === 0) return;
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: `Brain-Wave hints:\n${selected.map(hint => `- ${hint}`).join('\n')}`,
      },
    }));
  } catch (error) {
    verboseLog(`context hint skipped: ${error.message}`);
  }
}

main();
