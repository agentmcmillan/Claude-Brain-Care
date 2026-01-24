# Repository Connections
> Generated: 2026-01-23

## Dependency Graph
```
                    ┌──────────────────┐
                    │    CLAUDE.md     │
                    │  (Entry Point)   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  .claude/rules/  │
                    │ brain-wave-system│
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  alpha-wave/   │  │  beta-wave/    │  │     rem/       │
│   (Indexer)    │  │   (Mapper)     │  │   (Monitor)    │
└────────────────┘  └────────────────┘  └────────────────┘
         │                   │                   │
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  .claude/agents/ │
                    │   (Definitions)  │
                    └──────────────────┘
```

## Agent Execution Order
```
brain-wave-init
       │
       ├──1──▶ alpha-wave ───▶ alpha-wave/
       │
       ├──2──▶ beta-wave ────▶ beta-wave/
       │          │
       │          └──reads──▶ alpha-wave/INDEX.md
       │
       └──3──▶ rem ──────────▶ rem/
                  │
                  ├──reads──▶ alpha-wave/
                  └──reads──▶ beta-wave/
```

## Import Matrix

| Module | Depends On | Used By | Coupling |
|--------|------------|---------|----------|
| brain-wave-init | alpha-wave, beta-wave, rem | User | Orchestrator |
| alpha-wave | None | beta-wave, rem | Low |
| beta-wave | alpha-wave | rem | Medium |
| rem | alpha-wave, beta-wave | User | High |
| .claude/rules/ | All output folders | Claude sessions | Integration |

## Critical Paths

### Full Initialization
```
brain-wave-init → alpha-wave → beta-wave → rem
```

### Context Restoration
```
Session start → .claude/rules/ load → rem/restoration/PROTOCOL.md
```

### Incremental Update
```
Code changes → rem agent → delta updates to alpha-wave + beta-wave
```

## Circular Dependencies
None detected - agents follow strict sequential ordering.

## Hotspots

Files with highest connectivity:
1. `.claude/rules/brain-wave-system.md` - Central documentation, auto-loaded
2. `alpha-wave/INDEX.md` - Referenced by beta-wave and rem
3. `rem/restoration/PROTOCOL.md` - Entry point for context restoration

## Coupling Analysis

- **Tightly coupled**: Agent execution order (alpha -> beta -> rem)
- **Loosely coupled**: Individual agent outputs (each folder independent)
- **Integration point**: `.claude/rules/` connects all systems to sessions

## Recommendations

- Keep alpha-wave independent (no dependencies)
- Beta-wave reads but doesn't modify alpha-wave
- REM is the only agent that updates other agents' outputs

---
*Last updated: 2026-01-23*
