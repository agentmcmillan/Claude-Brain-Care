# beta-wave.md
> Path: /.claude/agents/beta-wave.md
> Type: Agent definition
> Purpose: Deep knowledge mapper

## Purpose
Defines the Beta-Wave agent - creates deeply nested knowledge maps that mirror repository structure, capturing institutional knowledge.

## Prerequisites
- Requires Alpha-Wave to have run first
- Checks for `alpha-wave/INDEX.md`

## Execution Protocol
1. **Structure Analysis**: Read Alpha-Wave index, map directories
2. **Root Map Creation**: Create `_MAP.md` with architecture overview
3. **Recursive Directory Mapping**: Create `_MAP.md` for each directory
4. **Connections Map**: Document dependency graphs
5. **Patterns Documentation**: Identify architectural patterns
6. **Decisions Documentation**: Infer design decisions
7. **Memory Integration**: Install context hook
8. **Completion Report**: Output statistics

## Outputs Created
- `beta-wave/_MAP.md` - Root-level overview
- `beta-wave/_CONNECTIONS.md` - Dependency graph
- `beta-wave/_PATTERNS.md` - Architectural patterns
- `beta-wave/_DECISIONS.md` - Inferred design decisions
- `beta-wave/[dir]/_MAP.md` - Per-directory maps
- `.claude/rules/beta-wave-context.md` - Memory hook

## Key Patterns
- ASCII diagrams for architecture visualization
- Recursive mapping as deep as structure requires
- Links to Alpha-Wave summaries

## Dependencies
- Requires: Alpha-Wave completion
- Model: sonnet

---
*Summary generated: 2026-01-23*
