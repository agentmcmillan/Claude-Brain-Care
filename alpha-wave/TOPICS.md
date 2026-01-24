# Topic Map
> Cross-references for conceptual navigation
> Generated: 2026-01-23

## Memory System Architecture
- Overview: `CLAUDE.md`
- Rules: `.claude/rules/brain-wave-system.md`
- Reference: `Claude Forgot My Entire Project... .pdf`

## Agent Definitions
- Orchestrator: `.claude/agents/brain-wave-init.md`
- Indexer: `.claude/agents/alpha-wave.md`
- Mapper: `.claude/agents/beta-wave.md`
- Monitor: `.claude/agents/rem.md`

## Output Locations
- Alpha-Wave outputs: `alpha-wave/`
- Beta-Wave outputs: `beta-wave/`
- REM outputs: `rem/`
- Memory hooks: `.claude/rules/`

## Workflows
### New Project Setup
1. `use brain-wave-init agent` - Full initialization
2. OR run individually: alpha-wave -> beta-wave -> rem

### Ongoing Maintenance
1. Work normally on code
2. Periodically run `use rem agent` to sync

### Context Restoration
1. Read `rem/restoration/PROTOCOL.md`
2. Check `rem/sessions/` for latest state
3. Reference `alpha-wave/INDEX.md` for overview

## Key Concepts
- **Persistence**: Files in `alpha-wave/`, `beta-wave/`, `rem/` survive context resets
- **Memory Hooks**: `.claude/rules/*.md` files auto-load on sessions
- **Restoration Protocol**: Structured approach to rebuild context
- **Discovery Logs**: Accumulated insights organized by topic

---
*Last updated: 2026-01-23*
