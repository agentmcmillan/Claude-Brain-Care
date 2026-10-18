#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  ensureDir,
  extractFileOperations,
  readHookPayload,
  relativeWorkspacePath,
  resolveMemoryRoot,
  resolveWorkspaceRoot,
  shouldIgnorePath,
  verboseLog,
} = require('./brain-wave');

const TOPIC_KEYWORDS = {
  architecture: ['architecture', 'design', 'dialect', 'pipeline'],
  codegen: ['codegen', 'alan', 'assembly', 'lowering'],
  configuration: ['config', 'settings', 'cmake', 'workflow'],
  documentation: ['readme', 'docs', 'guide'],
  scheduling: ['schedule', 'scheduler', 'latency', 'resource'],
  testing: ['test', 'spec', 'lit', 'gtest'],
};

function ensureIndex(indexPath) {
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, '# Alpha-Wave Index\n\nIncrementally maintained by Codex hooks. Run the Alpha-Wave agent for a full refresh.\n\n## Recent Files\n');
  }
}

function ensureTopics(topicsPath) {
  if (!fs.existsSync(topicsPath)) {
    const sections = Object.keys(TOPIC_KEYWORDS).map(topic => `## ${topic}\n`).join('\n');
    fs.writeFileSync(topicsPath, `# Alpha-Wave Topics\n\nIncrementally maintained by Codex hooks.\n\n${sections}`);
  }
}

function addUnderHeading(content, heading, entry) {
  if (content.includes(entry)) return content;
  const position = content.indexOf(heading);
  if (position === -1) return `${content.trimEnd()}\n\n${heading}\n${entry}\n`;
  const insertAt = content.indexOf('\n', position) + 1;
  return content.slice(0, insertAt) + entry + '\n' + content.slice(insertAt);
}

function detectTopics(relativePath) {
  const lower = relativePath.toLowerCase();
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some(keyword => lower.includes(keyword)))
    .map(([topic]) => topic);
}

async function main() {
  if (process.env.BRAIN_WAVE_AUTO_INDEX === 'false') return;
  try {
    const data = await readHookPayload();
    const workspaceRoot = resolveWorkspaceRoot(data);
    const memoryRoot = resolveMemoryRoot(workspaceRoot);
    const additions = extractFileOperations(data, workspaceRoot)
      .filter(operation => operation.action === 'add')
      .filter(operation => !shouldIgnorePath(workspaceRoot, memoryRoot, operation.path));
    if (additions.length === 0) return;

    const alphaDir = path.join(memoryRoot, 'alpha-wave');
    const indexPath = path.join(alphaDir, 'INDEX.md');
    const topicsPath = path.join(alphaDir, 'TOPICS.md');
    ensureDir(alphaDir);
    ensureIndex(indexPath);
    ensureTopics(topicsPath);

    let index = fs.readFileSync(indexPath, 'utf8');
    let topics = fs.readFileSync(topicsPath, 'utf8');
    for (const operation of additions) {
      const relative = relativeWorkspacePath(workspaceRoot, operation.path);
      index = addUnderHeading(index, '## Recent Files', `- \`${relative}\` (auto-indexed)`);
      for (const topic of detectTopics(relative)) {
        topics = addUnderHeading(topics, `## ${topic}`, `- \`${relative}\``);
      }
    }
    fs.writeFileSync(indexPath, index);
    fs.writeFileSync(topicsPath, topics);
  } catch (error) {
    verboseLog(`Alpha index skipped: ${error.message}`);
  }
}

main();
