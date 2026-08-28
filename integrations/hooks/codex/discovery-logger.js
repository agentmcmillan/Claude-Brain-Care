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
  stringifyResult,
  verboseLog,
} = require('./brain-wave');

const DISCOVERY_PATTERNS = [
  [/architecture|design|pipeline/i, 'architecture'],
  [/decision|chose|selected/i, 'decisions'],
  [/bug|issue|problem|error/i, 'issues'],
  [/optimization|performance|latency/i, 'performance'],
  [/security|vulnerability/i, 'security'],
  [/dependency|connection|relationship/i, 'connections'],
];

function extractInsights(result) {
  const bullets = result.match(/^[-*]\s+.+$/gm) || [];
  if (bullets.length > 0) return bullets.slice(0, 5).map(item => item.replace(/^[-*]\s+/, '').slice(0, 600));
  const paragraph = result.split(/\n\s*\n/).map(item => item.trim()).find(Boolean);
  return paragraph ? [paragraph.slice(0, 600)] : [];
}

function categoryFor(text) {
  return DISCOVERY_PATTERNS.find(([pattern]) => pattern.test(text))?.[1] || 'general';
}

function prependEntry(filePath, header, entry) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : header;
  const headerEnd = existing.indexOf('\n\n');
  const insertAt = headerEnd === -1 ? existing.length : headerEnd + 2;
  fs.writeFileSync(filePath, existing.slice(0, insertAt) + entry + existing.slice(insertAt));
}

async function main() {
  try {
    const data = await readHookPayload();
    const agentType = data.agent_type || data.tool_input?.agent_type || data.tool_input?.subagent_type || 'unknown';
    if (['alpha-wave', 'beta-wave', 'rem', 'brain-wave-init'].includes(agentType)) {
      process.stdout.write('{}');
      return;
    }

    const result = stringifyResult(data.last_assistant_message || data.tool_response || data.tool_result);
    const insights = extractInsights(result);
    if (insights.length === 0) {
      process.stdout.write('{}');
      return;
    }

    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const discoveriesDir = path.join(memoryRoot, 'rem/discoveries');
    ensureDir(discoveriesDir);
    const timestamp = formatTimestamp();
    const entry = `### ${timestamp} — ${agentType}\n\n${insights.map(insight => `- ${insight}`).join('\n')}\n\n`;
    const category = categoryFor(result);
    prependEntry(
      path.join(discoveriesDir, `${category}.md`),
      `# ${category[0].toUpperCase() + category.slice(1)} Discoveries\n\n`,
      entry,
    );
    prependEntry(
      path.join(discoveriesDir, `daily-${formatDate()}.md`),
      `# Daily Discovery Log — ${formatDate()}\n\n`,
      entry,
    );
    process.stdout.write('{}');
  } catch (error) {
    verboseLog(`discovery logging skipped: ${error.message}`);
    process.stdout.write('{}');
  }
}

main();
