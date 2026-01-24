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

## Project Notes

[Add project-specific notes here]
