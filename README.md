# Claude Brain-Care

A three-agent memory system for Claude Code that provides persistent context across sessions.

## The Problem

Claude Code forgets your project context between sessions. The context window fills up, older information gets pushed out, and you're left re-explaining your codebase over and over.

## The Solution

Brain-Care implements **structured persistence** - storing project knowledge in markdown files that automatically load on every session.

## The Three Agents

| Agent | Purpose | Output |
|-------|---------|--------|
| **Alpha-Wave** | Index & summarize files | `alpha-wave/` folder |
| **Beta-Wave** | Deep directory mapping | `beta-wave/` folder |
| **REM** | Background sync & sessions | `rem/` folder |

## Quick Start

### 1. Copy the agents to your project

```bash
cp -r .claude/agents/ /path/to/your/project/.claude/agents/
cp -r .claude/rules/ /path/to/your/project/.claude/rules/
```

### 2. Initialize the system

```
use brain-wave-init agent
```

Or run individually:
```
use alpha-wave agent    # Index files (run first)
use beta-wave agent     # Create maps (after alpha)
use rem agent           # Sync & monitor
```

### 3. Context auto-loads on new sessions

The agents install memory hooks in `.claude/rules/` that Claude Code automatically loads.

## How It Works

```
┌─────────────────────────────────────────────────────┐
│                   Your Codebase                     │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              Alpha-Wave (Indexer)                   │
│  • Scans all files                                  │
│  • Creates INDEX.md with file tree                  │
│  • Creates TOPICS.md with cross-references          │
│  • Generates per-file summaries                     │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              Beta-Wave (Mapper)                     │
│  • Creates architecture diagrams                    │
│  • Maps directory relationships                     │
│  • Documents patterns & conventions                 │
│  • Infers design decisions                          │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                 REM (Monitor)                       │
│  • Captures session states                          │
│  • Logs discoveries                                 │
│  • Creates restoration protocols                    │
│  • Syncs changes to indexes & maps                  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                   CLAUDE.md                         │
│  • @imports auto-load context                       │
│  • Updated by each agent                            │
│  • Persistent across sessions                       │
└─────────────────────────────────────────────────────┘
```

## File Structure

```
your-project/
├── CLAUDE.md                    # Project memory (auto-updated)
├── .claude/
│   ├── agents/
│   │   ├── alpha-wave.md        # Indexer agent
│   │   ├── beta-wave.md         # Mapper agent
│   │   ├── rem.md               # Monitor agent
│   │   └── brain-wave-init.md   # Initializer
│   └── rules/
│       ├── brain-wave-system.md # System documentation
│       ├── alpha-wave-context.md
│       ├── beta-wave-context.md
│       └── rem-context.md
├── alpha-wave/                  # File indexes & summaries
│   ├── INDEX.md
│   ├── TOPICS.md
│   ├── STATE.md
│   └── summaries/
├── beta-wave/                   # Architecture maps
│   ├── _MAP.md
│   ├── _CONNECTIONS.md
│   ├── _PATTERNS.md
│   ├── _DECISIONS.md
│   └── [directory]/_MAP.md      # Nested maps
└── rem/                         # Sessions & discoveries
    ├── CHANGELOG.md
    ├── LAST-RUN.md
    ├── sessions/
    ├── discoveries/
    └── restoration/
        └── PROTOCOL.md
```

## Workflow

### Daily Development
1. Work on code normally
2. Run `use rem agent` periodically to sync

### New Session
1. Context auto-loads from `@imports` in CLAUDE.md
2. For full context, read `rem/restoration/PROTOCOL.md`

### After Major Changes
1. Run `use alpha-wave agent` to refresh indexes
2. Run `use beta-wave agent` if structure changed

## Based On

This system implements concepts from [Claude Forgot My Entire Project. So I Built a Memory System](https://medium.com/@nbhyxq/claude-forgot-my-entire-project-so-i-built-a-memory-system-6a872a3cc58f) by Sylweriusz Szydlik.

Key concepts:
- **Session state snapshots** - Capture where you left off
- **Semantic indices** - Cross-reference entities and concepts
- **Discovery logs** - Accumulate insights over time
- **Restoration protocols** - Rebuild context efficiently

## License

MIT
