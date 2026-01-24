# Map
2026-01-24 | 6 dirs

```
brain-care/
├── .claude/agents/    # Agent definitions
├── .claude/rules/     # Auto-load context
├── integrations/      # External systems
├── alpha-wave/        # Index output
├── beta-wave/         # Map output
└── rem/               # Session output
```

## Flow
```
init → alpha → beta → rem
       ↓        ↓      ↓
    index/   maps/  sessions/
```

## Entry
- User: `CLAUDE.md`
- System: `.claude/rules/brain-wave-system.md`
