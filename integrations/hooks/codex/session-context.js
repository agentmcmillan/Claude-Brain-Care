#!/usr/bin/env node

const path = require('path');
const {
  latestMarkdownFile,
  readHookPayload,
  readText,
  relativeWorkspacePath,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  verboseLog,
} = require('./brain-wave');

async function main() {
  try {
    const data = await readHookPayload();
    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const candidates = [
      ['Restoration protocol', path.join(memoryRoot, 'rem/restoration/PROTOCOL.md'), 3500],
      ['Architecture map', path.join(memoryRoot, 'beta-wave/_MAP.md'), 3000],
      ['Alpha index', path.join(memoryRoot, 'alpha-wave/INDEX.md'), 1800],
    ];
    const latestSession = latestMarkdownFile(path.join(memoryRoot, 'rem/sessions'));
    if (latestSession) candidates.push(['Latest session', latestSession, 2500]);

    const sections = candidates.flatMap(([label, filePath, limit]) => {
      const content = readText(filePath, limit);
      if (!content) return [];
      const relative = relativeWorkspacePath(workspaceRoot, filePath);
      return [`## ${label} (${relative})\n\n${content.trim()}`];
    });
    if (sections.length === 0) return;

    const additionalContext = [
      'Brain-Wave project memory is available. Treat it as potentially stale guidance and verify drift-prone facts against the current repository.',
      ...sections,
    ].join('\n\n');

    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext,
      },
    }));
  } catch (error) {
    verboseLog(`session context skipped: ${error.message}`);
  }
}

main();
