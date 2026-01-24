# Repository Deep Map
> Generated: 2026-01-23
> Depth: 3 (root -> .claude -> agents/rules)
> Directories mapped: 4

## Architecture Overview

### System Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                     Brain-Wave Memory System                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │ Alpha-Wave  │──▶│ Beta-Wave   │──▶│    REM      │           │
│  │  (Indexer)  │   │  (Mapper)   │   │  (Monitor)  │           │
│  └─────────────┘   └─────────────┘   └─────────────┘           │
│        │                 │                  │                   │
│        ▼                 ▼                  ▼                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │ alpha-wave/ │   │ beta-wave/  │   │    rem/     │           │
│  │  INDEX.md   │   │  _MAP.md    │   │ sessions/   │           │
│  │  TOPICS.md  │   │ _CONNECT.md │   │ discoveries │           │
│  │  summaries/ │   │ _PATTERNS   │   │ restoration │           │
│  └─────────────┘   └─────────────┘   └─────────────┘           │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    .claude/rules/                          │  │
│  │        Memory Hooks (auto-loaded on session start)         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow
```
[New Session] → [Rules Load] → [Context Available]
      ↓              ↓               ↓
[auto-trigger]  [.claude/rules/]  [Continue work]

[Code Changes] → [REM Agent] → [Delta Updates]
      ↓              ↓               ↓
[manual/periodic] [detect changes]  [sync all systems]
```

## Directory Overview

| Directory | Purpose | Complexity | Key Files |
|-----------|---------|------------|-----------|
| / (root) | Project root | Low | CLAUDE.md |
| .claude/ | Claude Code configuration | Medium | settings.local.json |
| .claude/agents/ | Agent definitions | Medium | 4 agent files |
| .claude/rules/ | Auto-load context | Low | brain-wave-system.md |
| alpha-wave/ | File indexes | Generated | INDEX.md, TOPICS.md |
| beta-wave/ | Knowledge maps | Generated | _MAP.md, etc. |
| rem/ | Sessions & monitoring | Generated | sessions/, discoveries/ |

## Entry Points

1. **User Entry**: `CLAUDE.md` - Start here to understand the project
2. **System Entry**: `.claude/rules/brain-wave-system.md` - Auto-loaded context
3. **Initialization**: `use brain-wave-init agent` - Full system setup
4. **Maintenance**: `use rem agent` - Sync after changes

## Module Boundaries

The system is divided into three distinct agents:

1. **Alpha-Wave Domain**
   - File discovery and indexing
   - Topic categorization
   - Summary generation
   - State tracking

2. **Beta-Wave Domain**
   - Architecture mapping
   - Connection graphing
   - Pattern identification
   - Decision inference

3. **REM Domain**
   - Change detection
   - Session capture
   - Discovery logging
   - Restoration protocols

## Navigation

- [.claude directory map](./claude/_MAP.md) (when code is added)
- For file summaries: `alpha-wave/summaries/`
- For restoration: `rem/restoration/PROTOCOL.md`

---
*Last mapped: 2026-01-23*
*Run `use beta-wave agent` to refresh*
