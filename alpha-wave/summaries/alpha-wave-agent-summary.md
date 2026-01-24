# alpha-wave.md
> Path: /.claude/agents/alpha-wave.md
> Type: Agent definition
> Purpose: Knowledge indexer agent

## Purpose
Defines the Alpha-Wave agent - a specialized indexer that builds comprehensive knowledge indexes and integrates them with Claude's memory system.

## Execution Protocol
1. **Discovery**: Scan repository structure, categorize files
2. **Index Creation**: Create INDEX.md with file tree and metadata
3. **Topic Mapping**: Create TOPICS.md with cross-references
4. **Summarization**: Generate per-file summaries
5. **Memory Integration**: Install context hook in .claude/rules/
6. **Completion Report**: Output statistics

## Outputs Created
- `alpha-wave/INDEX.md` - Master file index
- `alpha-wave/TOPICS.md` - Topic-based categorization
- `alpha-wave/summaries/*.md` - Per-file summaries
- `alpha-wave/STATE.md` - Current state snapshot
- `.claude/rules/alpha-wave-context.md` - Memory hook

## Key Patterns
- Uses ASCII tree for file visualization
- Tables for structured file information
- Links between related files

## Dependencies
- Requires: Glob, Read, Write, Bash tools
- Model: sonnet

---
*Summary generated: 2026-01-23*
