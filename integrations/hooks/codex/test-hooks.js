#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { resolveMemoryRoot, shouldIgnorePath } = require('./brain-wave');
const { mergeConfig } = require('./merge-hooks');

const hooksDir = __dirname;
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'brain-wave-codex-'));

function write(relativePath, content) {
  const filePath = path.join(temporaryRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function read(relativePath) {
  return fs.readFileSync(path.join(temporaryRoot, relativePath), 'utf8');
}

function run(script, payload) {
  const result = spawnSync(process.execPath, [path.join(hooksDir, script)], {
    cwd: temporaryRoot,
    input: JSON.stringify({
      session_id: 'thr_test_123',
      cwd: temporaryRoot,
      model: 'test-model',
      ...payload,
    }),
    encoding: 'utf8',
  });
  assert.strictEqual(result.status, 0, `${script} failed: ${result.stderr}`);
  return result.stdout ? JSON.parse(result.stdout) : null;
}

try {
  const template = JSON.parse(fs.readFileSync(path.join(hooksDir, 'settings-hooks.json'), 'utf8'));
  const existingHook = {
    type: 'command',
    command: 'node /tmp/unrelated-stop-hook.js',
    timeout: 7,
  };
  const merged = mergeConfig({
    description: 'Keep this description',
    hooks: {
      Stop: [{ hooks: [existingHook] }],
      PostToolUse: [{
        matcher: 'Edit|Write',
        hooks: [{
          type: 'command',
          command: 'node "$(git rev-parse --show-toplevel)/integrations/hooks/codex/auto-sync-rem.js"',
        }],
      }],
    },
  }, template);
  assert.strictEqual(merged.description, 'Keep this description');
  assert.deepStrictEqual(merged.hooks.Stop[0].hooks[0], existingHook);
  assert.strictEqual(merged.hooks.PostToolUse.length, 1);
  assert.strictEqual(
    Object.values(merged.hooks).flatMap(groups => groups).flatMap(group => group.hooks)
      .filter(hook => hook.command?.includes('integrations/hooks/codex/')).length,
    7,
  );
  assert.deepStrictEqual(mergeConfig(merged, template), merged);

  assert.strictEqual(resolveMemoryRoot(temporaryRoot), temporaryRoot);
  assert.strictEqual(
    shouldIgnorePath(temporaryRoot, temporaryRoot, path.join(temporaryRoot, 'dost/lib/Foo.cpp')),
    false,
  );
  assert.strictEqual(
    shouldIgnorePath(temporaryRoot, temporaryRoot, path.join(temporaryRoot, 'rem/LAST-RUN.md')),
    true,
  );

  write('.claude/rem/restoration/PROTOCOL.md', '# Restore\n\nUse current repository evidence.\n');
  write('.claude/rem/sessions/initial.md', '# Initial Session\n');
  write('.claude/beta-wave/_MAP.md', '# Map\n');
  write('.claude/beta-wave/_CONNECTIONS.md', '- `dost/lib/Foo.cpp` depends on `dost/lib/Bar.cpp`\n');
  write('.claude/beta-wave/dost/_MAP.md', '# Dost Map\n');

  const patch = '*** Begin Patch\n*** Add File: dost/test/new-test.mlir\n+x\n*** Update File: dost/lib/Foo.cpp\n@@\n-x\n+y\n*** End Patch';
  const toolPayload = {
    hook_event_name: 'PostToolUse',
    tool_name: 'apply_patch',
    tool_input: { command: patch },
    tool_response: 'Done!',
  };
  run('auto-sync-rem.js', toolPayload);
  assert.match(read('.claude/rem/CHANGELOG.md'), /Added: `dost\/test\/new-test\.mlir`/);
  assert.match(read('.claude/rem/CHANGELOG.md'), /Updated: `dost\/lib\/Foo\.cpp`/);
  assert.match(read('.claude/rem/LAST-RUN.md'), /thr_test_123/);

  run('auto-index-alpha.js', toolPayload);
  run('auto-index-alpha.js', toolPayload);
  assert.match(read('.claude/alpha-wave/INDEX.md'), /dost\/test\/new-test\.mlir/);
  assert.match(read('.claude/alpha-wave/TOPICS.md'), /dost\/test\/new-test\.mlir/);
  assert.strictEqual(
    read('.claude/alpha-wave/INDEX.md').match(/dost\/test\/new-test\.mlir/g).length,
    1,
  );

  const context = run('session-context.js', {
    hook_event_name: 'SessionStart',
    source: 'startup',
  });
  assert.strictEqual(context.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(context.hookSpecificOutput.additionalContext, /Restoration protocol/);

  const hint = run('context-hint.js', {
    hook_event_name: 'PreToolUse',
    tool_name: 'Bash',
    tool_input: { command: "sed -n '1,20p' dost/lib/Foo.cpp" },
  });
  assert.strictEqual(hint.hookSpecificOutput.hookEventName, 'PreToolUse');
  assert.match(hint.hookSpecificOutput.additionalContext, /dost\/_MAP\.md/);

  const discovery = run('discovery-logger.js', {
    hook_event_name: 'SubagentStop',
    agent_type: 'explorer',
    last_assistant_message: '- Architecture: Foo depends on Bar.\n- Verified the dependency.',
  });
  assert.deepStrictEqual(discovery, {});
  assert.match(read('.claude/rem/discoveries/architecture.md'), /Foo depends on Bar/);

  run('session-checkpoint.js', {
    hook_event_name: 'PreCompact',
    trigger: 'auto',
    transcript_path: path.join(temporaryRoot, 'rollout.jsonl'),
  });
  const checkpoints = fs.readdirSync(path.join(temporaryRoot, '.claude/rem/sessions'))
    .filter(file => file.includes('thr_test_123'));
  assert.strictEqual(checkpoints.length, 1);
  assert.match(read(path.join('.claude/rem/sessions', checkpoints[0])), /Before auto compaction/);

  process.stdout.write('Brain-Wave Codex hook tests passed\n');
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
