# Brain-Care Project

## Brain-Wave Memory System

This project uses a three-agent memory system for persistent context across sessions.

## Auto-Loaded Context

@alpha-wave/INDEX.md
@beta-wave/_MAP.md
@rem/restoration/PROTOCOL.md

## Alpha-Wave Index
> Last indexed: 2026-01-23
> Files: 8

@alpha-wave/TOPICS.md

Quick summaries available in `alpha-wave/summaries/`

## Beta-Wave Maps
> Last mapped: 2026-01-23
> Directories: 4

@beta-wave/_CONNECTIONS.md

Detailed maps available in `beta-wave/[directory]/_MAP.md`

## REM Session Context
> Last sync: 2026-01-23
> Session: 2026-01-23-init.md

Latest session: `rem/sessions/2026-01-23-init.md`
Discoveries: `rem/discoveries/`

---

## Quick Start

```
# Initialize the full system (first time)
use brain-wave-init agent

# Or run individually:
use alpha-wave agent    # Index files
use beta-wave agent     # Create maps (after alpha)
use rem agent           # Sync & monitor
```

## Permission Modes

During initialization, you'll be asked to choose a permission mode:

| Mode | Behavior |
|------|----------|
| `bypassPermissions` | No prompts - fully autonomous |
| `acceptEdits` | Auto-accept file changes, prompt for bash (default) |
| `default` | Prompt for all operations |

Your choice is saved to `.claude/brain-wave-config.json` and applied to all agents.

## Background Execution

All Brain-Wave agents run in background by default, allowing you to keep working while they process.

**Monitor progress**:
- Agents output progress like `[alpha-wave] Phase 2/7: Index Creation`
- Watch live with `tail -f <output_file>`
- Look for `Complete ✓` to know an agent finished

**Continue working**: You can prompt Claude while agents run - they won't block you.

## File Size Limits

Brain-Wave creates many small files instead of large monolithic ones to avoid token limits.

| Type | Max Lines | Strategy |
|------|-----------|----------|
| Index/Overview | 50 | Links to detail files |
| Detail files | 100 | One topic/module per file |
| Summaries | 50 | Essential info only |
| Sessions | 50 | One per session |

Files are split into subdirectories when they would exceed limits.

## Agent Reference

| Agent | Purpose | Command |
|-------|---------|---------|
| alpha-wave | Index & summarize files | `use alpha-wave agent` |
| beta-wave | Deep directory mapping | `use beta-wave agent` |
| rem | Background sync & sessions | `use rem agent` |
| brain-wave-init | Initialize full system | `use brain-wave-init agent` |

## Workflow

```
New Project Setup:
  use brain-wave-init agent

Daily Work:
  [write code normally]
  use rem agent  (periodically)

New Session:
  [context auto-loads from @imports above]
```

## Startup Verification

On each session, Claude automatically verifies the Brain-Wave system is installed:
- Checks for agent definitions in `.claude/agents/`
- Checks for memory folders (`alpha-wave/`, `beta-wave/`, `rem/`)
- Prompts to initialize or repair if anything is missing

### Fresh Clone Setup

If you clone this repo to a new machine:
1. Claude will detect missing memory folders
2. Run `use brain-wave-init agent` to initialize
3. The system will index your codebase and create all memory files

### Missing Agents

If agent definitions are missing, download from GitHub:
```bash
git clone https://github.com/agentmcmillan/Claude-Brain-Care.git /tmp/brain-care
cp -r /tmp/brain-care/.claude/agents/* .claude/agents/
rm -rf /tmp/brain-care
```

## GitHub Repository

https://github.com/agentmcmillan/Claude-Brain-Care

## Project Notes

[Add project-specific notes here]
