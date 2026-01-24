# Discovery Log: Conventions

## 2026-01-23 - File Naming Conventions
- **Context**: Initial system setup
- **Observation**: Consistent naming patterns across the system
- **Evidence**:
  - Agents: lowercase with hyphens (`alpha-wave`, `beta-wave`, `rem`)
  - Index files: UPPERCASE.md (`INDEX.md`, `TOPICS.md`)
  - Map files: underscore prefix (`_MAP.md`, `_CONNECTIONS.md`)
  - Summary files: `[filename]-summary.md`
- **Implications**:
  - Easy to identify file purposes
  - Consistent discovery by Glob patterns
- **Status**: Confirmed

## 2026-01-23 - Markdown Structure Conventions
- **Context**: Analyzing output file formats
- **Observation**: All files follow consistent markdown structure
- **Evidence**:
  - Frontmatter with YAML metadata
  - Header comment with generation info
  - Hierarchical sections with `##`, `###`
  - Tables for structured data
  - Code blocks for diagrams
- **Implications**:
  - Easy to parse programmatically
  - Consistent reading experience
- **Status**: Confirmed

## 2026-01-23 - Timestamp Format
- **Context**: Session and changelog files
- **Observation**: ISO 8601 timestamps used throughout
- **Evidence**:
  - Session files: `2026-01-23-init.md`
  - Changelog entries: `2026-01-23T00:00:00Z`
- **Implications**:
  - Chronological sorting works correctly
  - Internationally unambiguous
- **Status**: Confirmed

---
*Log initialized: 2026-01-23*
