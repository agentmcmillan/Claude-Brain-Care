# Inferred Design Decisions
> Generated: 2026-01-23

These decisions are inferred from the codebase structure and patterns.

## ADR-001: Three-Agent Architecture
- **Status**: Inferred from structure
- **Context**: Need for persistent memory across Claude sessions
- **Decision**: Split functionality into three specialized agents
- **Evidence**: Separate agent files in `.claude/agents/`
- **Rationale**:
  - Alpha-Wave: Fast indexing, can run independently
  - Beta-Wave: Deep mapping, needs index to exist
  - REM: Monitoring, lightweight updates
- **Consequences**:
  - Clear separation of concerns
  - Sequential execution required
  - Each agent has distinct output folder

## ADR-002: Filesystem-Based Persistence
- **Status**: Inferred from outputs
- **Context**: Claude's context window resets between sessions
- **Decision**: Store state as markdown files in project folders
- **Evidence**: `alpha-wave/`, `beta-wave/`, `rem/` output folders
- **Rationale**:
  - Files persist indefinitely
  - Git-trackable (survives machine changes)
  - Human-readable (can be manually edited)
  - Tool-accessible (Claude can Read/Write)
- **Consequences**:
  - Must regenerate when code changes
  - Adds files to project structure
  - Requires periodic sync

## ADR-003: Memory Hook Integration
- **Status**: Inferred from `.claude/rules/`
- **Context**: Need automatic context loading on session start
- **Decision**: Use Claude Code's rules system for auto-loading
- **Evidence**: `.claude/rules/brain-wave-system.md`
- **Rationale**:
  - Rules auto-load without user action
  - Can reference other files via `@` syntax
  - Part of native Claude Code functionality
- **Consequences**:
  - Context available immediately
  - Limited by what fits in rules
  - Must keep rules files concise

## ADR-004: Markdown as Universal Format
- **Status**: Inferred from all output files
- **Context**: Need format that's both machine and human readable
- **Decision**: Use markdown for all persistent files
- **Evidence**: All `.md` files throughout system
- **Rationale**:
  - Claude Code handles markdown natively
  - GitHub renders markdown nicely
  - Supports structured content (tables, code blocks)
  - Easy to edit manually
- **Consequences**:
  - No binary formats
  - Diagrams limited to ASCII art
  - Parsing is simple

## ADR-005: Tiered Restoration Protocol
- **Status**: Inferred from `rem/restoration/PROTOCOL.md`
- **Context**: Different sessions need different context depths
- **Decision**: Provide Quick/Full/Deep restoration levels
- **Evidence**: PROTOCOL.md structure with three tiers
- **Rationale**:
  - Quick: Resume after short break (< 1 min)
  - Full: Resume after longer break (< 5 min)
  - Deep: Full context rebuild (as needed)
- **Consequences**:
  - Efficient for common cases
  - Full context available when needed
  - User chooses appropriate level

## ADR-006: Haiku for REM, Sonnet for Others
- **Status**: Explicit in agent frontmatter
- **Context**: Balance between cost/speed and capability
- **Decision**: Use haiku for REM (monitoring), sonnet for indexing/mapping
- **Evidence**: `model:` field in agent definitions
- **Rationale**:
  - REM runs frequently, needs to be fast/cheap
  - Alpha/Beta need more intelligence for analysis
- **Consequences**:
  - REM is very fast
  - Quality might vary between agents

## Open Questions

1. **Scaling**: How well does this work with very large codebases?
2. **Conflicts**: What happens if multiple sessions run agents simultaneously?
3. **Drift**: How to detect when regeneration is needed vs incremental update?
4. **Custom Topics**: Should users be able to add their own topic categories?

## Technical Debt

None detected - this is a fresh initialization.

---
*Last updated: 2026-01-23*
