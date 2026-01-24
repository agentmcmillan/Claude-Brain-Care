# Architectural Patterns
> Generated: 2026-01-23

## Design Patterns Observed

### Agent Pattern
- **Location**: `.claude/agents/`
- **Implementation**: YAML frontmatter + markdown instructions
- **Purpose**: Encapsulate specialized behaviors as reusable agents
- **Structure**:
  ```yaml
  ---
  name: agent-name
  description: what it does
  tools: Read, Write, Glob, Grep, Bash
  model: sonnet/haiku
  ---
  # Agent instructions...
  ```

### Pipeline Pattern
- **Location**: Execution order in `brain-wave-init.md`
- **Implementation**: Sequential agent invocation
- **Purpose**: Ensure proper ordering (Alpha -> Beta -> REM)
- **Rationale**: Each stage builds on previous outputs

### Memory Hook Pattern
- **Location**: `.claude/rules/*.md`
- **Implementation**: Markdown files with YAML paths frontmatter
- **Purpose**: Auto-load context on every Claude Code session
- **Key Feature**: `paths: ["**/*"]` makes hook apply to all files

### Tiered Restore Pattern
- **Location**: `rem/restoration/PROTOCOL.md`
- **Implementation**: Quick/Full/Deep restore levels
- **Purpose**: Efficient context restoration based on needs
- **Rationale**: Not all sessions need full context

### Filesystem Persistence Pattern
- **Location**: `alpha-wave/`, `beta-wave/`, `rem/`
- **Implementation**: Markdown files in structured folders
- **Purpose**: Persist state outside conversation context
- **Key Insight**: Files survive context window resets

## Code Conventions

### Naming
- Agents: lowercase with hyphens (`alpha-wave`, `brain-wave-init`)
- Output folders: lowercase, match agent name (`alpha-wave/`)
- Index files: UPPERCASE.md (`INDEX.md`, `TOPICS.md`)
- Map files: Prefixed underscore (`_MAP.md`, `_CONNECTIONS.md`)

### File Organization
- Agent definitions: `.claude/agents/`
- Auto-load rules: `.claude/rules/`
- Generated outputs: Root level folders (`alpha-wave/`, etc.)

### Documentation Structure
- Frontmatter: YAML for metadata
- Headers: Hierarchical with `#`, `##`, `###`
- Tables: For structured data
- Code blocks: For diagrams and examples

### Error Handling
- Strategy: Check prerequisites before execution
- Reporting: Clear status messages at each phase
- Recovery: Suggest corrective actions

## Inferred Architecture Style

- **Type**: Multi-agent pipeline
- **Coordination**: Sequential with orchestrator
- **State**: Filesystem-based persistence
- **Integration**: Rule hooks for auto-loading

## Template Patterns

### Summary Template
```markdown
# [filename]
> Path: [path]
> Type: [type]

## Purpose
## Key Exports/Functions
## Dependencies
## Used By
## Notes
```

### Map Template
```markdown
# Map: [directory]
> Path: [path]
> Parent: [link]

## Purpose
## Structure
## Files Detail
## Internal Relationships
## Patterns Observed
```

### Session Template
```markdown
# Session State: [timestamp]

## Current Focus
## Active Context
## Pending Questions
## Next Actions
## Git State
```

---
*Last updated: 2026-01-23*
