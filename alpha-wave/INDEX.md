# Repository Index
> Generated: 2026-01-23T00:00:00Z
> Files: 2 | Directories: 2
> Last commit: 4bff4ef initial

## Quick Reference
- Entry point: N/A (memory system template project)
- Main config: `CLAUDE.md`
- Test command: N/A
- Build command: N/A

## Project Purpose
This is the Brain-Wave Memory System - a three-agent persistent context system for Claude Code. It provides structured state persistence across sessions through:
- **Alpha-Wave**: File indexing and summarization
- **Beta-Wave**: Deep knowledge mapping
- **REM**: Session monitoring and restoration

## File Tree
```
brain-care/
├── .claude/
│   ├── agents/
│   │   ├── alpha-wave.md        # Indexer agent definition
│   │   ├── beta-wave.md         # Mapper agent definition
│   │   ├── brain-wave-init.md   # Orchestrator agent definition
│   │   └── rem.md               # Monitor agent definition
│   ├── rules/
│   │   └── brain-wave-system.md # System usage rules
│   └── settings.local.json      # Local settings
├── CLAUDE.md                    # Project instructions
└── Claude Forgot My Entire Project... .pdf  # Reference article
```

## By Type

### Core Files
| File | Purpose | Type |
|------|---------|------|
| CLAUDE.md | Project overview and instructions | Markdown |
| .claude/rules/brain-wave-system.md | System rules and workflow | Markdown |

### Agent Definitions
| File | Purpose | Agent |
|------|---------|-------|
| .claude/agents/brain-wave-init.md | System orchestrator | brain-wave-init |
| .claude/agents/alpha-wave.md | Knowledge indexer | alpha-wave |
| .claude/agents/beta-wave.md | Deep mapper | beta-wave |
| .claude/agents/rem.md | Evolution monitor | rem |

### Configuration
| File | Purpose |
|------|---------|
| .claude/settings.local.json | Local Claude settings |

### Reference Materials
| File | Purpose |
|------|---------|
| Claude Forgot My Entire Project... .pdf | Original article describing the memory system concept |

## Architecture Summary
The Brain-Wave system creates three layers of persistent memory:
1. **alpha-wave/**: File indexes, topics, and summaries
2. **beta-wave/**: Nested directory maps and connection graphs
3. **rem/**: Sessions, discoveries, and restoration protocols

These are integrated via `.claude/rules/` memory hooks that auto-load context on each session.

---
*Last indexed: 2026-01-23*
*Run `use alpha-wave agent` to refresh*
