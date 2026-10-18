#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BRAIN_WAVE_SCRIPT_NAMES = new Set([
  'auto-index-alpha.js',
  'auto-sync-rem.js',
  'context-hint.js',
  'discovery-logger.js',
  'session-checkpoint.js',
  'session-context.js',
]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isBrainWaveHandler(handler) {
  if (!handler || handler.type !== 'command' || typeof handler.command !== 'string') return false;
  const normalized = handler.command.replace(/\\/g, '/');
  if (!normalized.includes('integrations/hooks/codex/')) return false;
  return [...BRAIN_WAVE_SCRIPT_NAMES].some(script => normalized.includes(`/${script}`));
}

function withoutBrainWaveHandlers(groups) {
  if (!Array.isArray(groups)) throw new Error('hook event entries must be arrays');
  return groups.flatMap(group => {
    if (!group || !Array.isArray(group.hooks)) {
      throw new Error('each hook matcher group must contain a hooks array');
    }
    const hooks = group.hooks.filter(handler => !isBrainWaveHandler(handler));
    return hooks.length > 0 ? [{ ...group, hooks }] : [];
  });
}

function mergeConfig(current, template) {
  if (!current || typeof current !== 'object' || Array.isArray(current)) {
    throw new Error('existing hooks config must be a JSON object');
  }
  if (!template || typeof template !== 'object' || !template.hooks) {
    throw new Error('Brain-Wave hooks template is invalid');
  }

  const merged = clone(current);
  if (!merged.description && template.description) merged.description = template.description;
  if (merged.hooks === undefined) merged.hooks = {};
  if (!merged.hooks || typeof merged.hooks !== 'object' || Array.isArray(merged.hooks)) {
    throw new Error('existing hooks field must be a JSON object');
  }

  for (const [event, groups] of Object.entries(merged.hooks)) {
    const cleaned = withoutBrainWaveHandlers(groups);
    if (cleaned.length > 0) merged.hooks[event] = cleaned;
    else delete merged.hooks[event];
  }

  for (const [event, groups] of Object.entries(template.hooks)) {
    if (!Array.isArray(groups)) throw new Error(`template event ${event} must be an array`);
    merged.hooks[event] = [...(merged.hooks[event] || []), ...clone(groups)];
  }
  return merged;
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`cannot parse ${filePath}: ${error.message}`);
  }
}

function writeAtomic(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(temporaryPath, content, { mode: 0o644 });
    fs.renameSync(temporaryPath, filePath);
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}

function main() {
  const [, , targetPath, templatePath] = process.argv;
  if (!targetPath || !templatePath) {
    console.error('usage: node merge-hooks.js TARGET_HOOKS_JSON TEMPLATE_HOOKS_JSON');
    process.exit(2);
  }

  try {
    const current = readJson(targetPath, {});
    const template = readJson(templatePath);
    const serialized = `${JSON.stringify(mergeConfig(current, template), null, 2)}\n`;
    const existing = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : null;
    if (existing === serialized) {
      process.stdout.write(`unchanged ${targetPath}\n`);
      return;
    }
    writeAtomic(targetPath, serialized);
    process.stdout.write(`updated ${targetPath}\n`);
  } catch (error) {
    console.error(`Brain-Wave Codex hook merge failed: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { isBrainWaveHandler, mergeConfig };
