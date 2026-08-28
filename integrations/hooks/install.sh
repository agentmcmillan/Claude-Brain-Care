#!/usr/bin/env bash
# Brain-Wave hooks installer for Claude Code and Codex.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
TARGET="claude"
PROJECT_DIR=""

usage() {
  cat <<'EOF'
Usage: bash integrations/hooks/install.sh [claude|codex|all] [--project PATH]

Targets:
  claude  Install the existing user-level Claude Code hooks (default).
  codex   Install repository-local Codex hooks into PATH or this repository.
  all     Install both Claude Code and Codex hooks.

Options:
  --project PATH  Git repository that receives the Codex integration.
  -h, --help      Show this help.

Examples:
  bash integrations/hooks/install.sh
  bash integrations/hooks/install.sh codex
  bash integrations/hooks/install.sh codex --project /path/to/project
EOF
}

if [[ $# -gt 0 && "$1" != --* ]]; then
  TARGET="$1"
  shift
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      [[ $# -ge 2 ]] || { echo "error: --project requires a path" >&2; exit 2; }
      PROJECT_DIR="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "error: required command not found: $1" >&2
    exit 1
  }
}

install_claude() {
  local claude_dir="$HOME/.claude"
  local hooks_dir="$claude_dir/hooks/brain-wave"
  local settings_file="$claude_dir/settings.json"

  echo "🧠 Brain-Wave Claude Code Hooks Installer"
  echo "=========================================="
  echo "📁 Creating hooks directory..."
  mkdir -p "$hooks_dir"

  echo "📋 Copying hook scripts..."
  cp "$SCRIPT_DIR/auto-sync-rem.js" "$hooks_dir/"
  cp "$SCRIPT_DIR/auto-index-alpha.js" "$hooks_dir/"
  cp "$SCRIPT_DIR/session-checkpoint.js" "$hooks_dir/"
  cp "$SCRIPT_DIR/discovery-logger.js" "$hooks_dir/"
  cp "$SCRIPT_DIR/context-hint.js" "$hooks_dir/"
  cp "$SCRIPT_DIR/README.md" "$hooks_dir/"
  chmod +x "$hooks_dir"/*.js
  echo "✅ Hook scripts installed to $hooks_dir"

  if [[ ! -f "$settings_file" ]]; then
    echo "⚠️  No settings.json found at $settings_file"
    echo "   Add the configuration from integrations/hooks/settings-hooks.json manually."
    return
  fi

  if grep -q "brain-wave" "$settings_file" 2>/dev/null; then
    echo "⚠️  Brain-Wave hooks already appear in $settings_file"
    echo "   Review that file manually if you want to update the Claude hook definitions."
    return
  fi

  echo "📝 Add the hooks from integrations/hooks/settings-hooks.json to $settings_file"
  echo "   The installer preserves the existing manual Claude configuration workflow."
}

resolve_codex_project() {
  local requested="$PROJECT_DIR"
  if [[ -z "$requested" ]]; then
    requested="$(cd "$SCRIPT_DIR/../.." && pwd -P)"
  fi
  [[ -d "$requested" ]] || {
    echo "error: Codex project directory does not exist: $requested" >&2
    exit 1
  }
  git -C "$requested" rev-parse --show-toplevel 2>/dev/null || {
    echo "error: Codex hooks require a Git repository: $requested" >&2
    exit 1
  }
}

install_codex() {
  require_command git
  require_command node

  local project_root
  project_root="$(resolve_codex_project)"
  local source_dir="$SCRIPT_DIR/codex"
  local target_dir="$project_root/integrations/hooks/codex"
  local target_config="$project_root/.codex/hooks.json"

  [[ -f "$source_dir/settings-hooks.json" ]] || {
    echo "error: missing Codex hooks template: $source_dir/settings-hooks.json" >&2
    exit 1
  }
  [[ -f "$source_dir/merge-hooks.js" ]] || {
    echo "error: missing Codex hooks merger: $source_dir/merge-hooks.js" >&2
    exit 1
  }

  echo "🧠 Brain-Wave Codex Hooks Installer"
  echo "===================================="
  echo "📁 Project: $project_root"

  if [[ "$source_dir" != "$target_dir" ]]; then
    echo "📋 Copying Codex hook adapters..."
    mkdir -p "$target_dir"
    cp "$source_dir"/*.js "$target_dir/"
    cp "$source_dir/settings-hooks.json" "$target_dir/"
  else
    echo "📋 Codex hook adapters are already in the target repository."
  fi
  chmod +x "$target_dir"/*.js

  echo "📝 Merging repository hook configuration..."
  node "$target_dir/merge-hooks.js" "$target_config" "$target_dir/settings-hooks.json"

  echo "✅ Brain-Wave Codex hooks installed"
  echo ""
  echo "Next steps:"
  echo "1. Review $target_config and the scripts in $target_dir"
  echo "2. Start or restart Codex in $project_root"
  echo "3. Run /hooks and trust the Brain-Wave definitions you reviewed"
  echo ""
  echo "The installer does not modify Codex's private hook-trust state."
}

case "$TARGET" in
  claude)
    install_claude
    ;;
  codex)
    install_codex
    ;;
  all)
    install_claude
    echo ""
    install_codex
    ;;
  *)
    echo "error: target must be claude, codex, or all (got: $TARGET)" >&2
    usage >&2
    exit 2
    ;;
esac

echo ""
echo "Environment variables (optional):"
echo "  BRAIN_WAVE_ROOT         - Project source root (default: Git root)"
echo "  BRAIN_WAVE_MEMORY_ROOT  - Brain-Wave store (default: root or .claude)"
echo "  BRAIN_WAVE_AUTO_SYNC    - Enable/disable REM sync (default: true)"
echo "  BRAIN_WAVE_VERBOSE      - Verbose hook logging (default: false)"
