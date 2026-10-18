#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  ensureDir,
  extractFileOperations,
  formatTimestamp,
  readHookPayload,
  relativeWorkspacePath,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  shouldIgnorePath,
  verboseLog,
} = require('./brain-wave');

function updateChangelog(changelogPath, entries) {
  const header = '# REM Changelog\n\nAutomatically tracked changes from Codex hooks.\n\n## Recent Changes\n\n';
  const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf8') : header;
  const marker = '## Recent Changes\n';
  const position = existing.indexOf(marker);
  if (position === -1) {
    fs.writeFileSync(changelogPath, `${existing.trimEnd()}\n\n${marker}\n${entries.join('\n')}\n`);
    return;
  }
  const insertAt = position + marker.length;
  fs.writeFileSync(
    changelogPath,
    existing.slice(0, insertAt) + '\n' + entries.join('\n') + existing.slice(insertAt),
  );
}

async function main() {
  if (process.env.BRAIN_WAVE_AUTO_SYNC === 'false') return;
  try {
    const data = await readHookPayload();
    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const operations = extractFileOperations(data, workspaceRoot)
      .filter(operation => !shouldIgnorePath(workspaceRoot, memoryRoot, operation.path));
    if (operations.length === 0) return;

    const remDir = path.join(memoryRoot, 'rem');
    ensureDir(remDir);
    const timestamp = formatTimestamp();
    const entries = operations.map(operation => {
      const relative = relativeWorkspacePath(workspaceRoot, operation.path);
      const action = operation.action === 'add' ? 'Added' : operation.action === 'delete' ? 'Deleted' : 'Updated';
      return `- [${timestamp}] ${action}: \`${relative}\``;
    });
    updateChangelog(path.join(remDir, 'CHANGELOG.md'), entries);

    const files = operations
      .map(operation => `- \`${relativeWorkspacePath(workspaceRoot, operation.path)}\` (${operation.action})`)
      .join('\n');
    fs.writeFileSync(path.join(remDir, 'LAST-RUN.md'), `# Last Run State

**Updated**: ${timestamp}
**Hook Event**: ${data.hook_event_name || 'PostToolUse'}
**Tool**: ${data.tool_name || 'unknown'}
**Session**: ${data.session_id || 'unknown'}

## Files

${files}

## Memory

- Changelog: \`${relativeWorkspacePath(workspaceRoot, path.join(remDir, 'CHANGELOG.md'))}\`
- Restoration: \`${relativeWorkspacePath(workspaceRoot, path.join(remDir, 'restoration/PROTOCOL.md'))}\`
`);
  } catch (error) {
    verboseLog(`REM sync skipped: ${error.message}`);
  }
}

main();
