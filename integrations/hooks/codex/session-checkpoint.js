#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  ensureDir,
  formatDate,
  formatTimestamp,
  readHookPayload,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  safeSlug,
  verboseLog,
} = require('./brain-wave');

function recentChanges(remDir) {
  const changelog = path.join(remDir, 'CHANGELOG.md');
  if (!fs.existsSync(changelog)) return [];
  return fs.readFileSync(changelog, 'utf8')
    .split(/\r?\n/)
    .filter(line => line.startsWith('- ['))
    .slice(0, 10);
}

async function main() {
  try {
    const data = await readHookPayload();
    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const remDir = path.join(memoryRoot, 'rem');
    const sessionsDir = path.join(remDir, 'sessions');
    ensureDir(sessionsDir);

    const reason = data.hook_event_name === 'PreCompact'
      ? `Before ${data.trigger || 'manual'} compaction`
      : 'Codex session ended';
    const changes = recentChanges(remDir);
    const filename = `${formatDate()}-${safeSlug(data.session_id)}-checkpoint.md`;
    const transcript = data.transcript_path || 'unavailable';
    fs.writeFileSync(path.join(sessionsDir, filename), `# Codex Session Checkpoint

**Updated**: ${formatTimestamp()}
**Reason**: ${reason}
**Session**: ${data.session_id || 'unknown'}
**Model**: ${data.model || 'unknown'}
**Transcript**: ${transcript}

## Recent Changes

${changes.length > 0 ? changes.join('\n') : '- No tracked changes'}

## Restore

1. Read \`rem/restoration/PROTOCOL.md\` from the active Brain-Wave memory root.
2. Read this checkpoint.
3. Verify drift-prone facts against the current repository.
`);
  } catch (error) {
    verboseLog(`session checkpoint skipped: ${error.message}`);
  }
}

main();
