# rem.md
> Path: /.claude/agents/rem.md
> Type: Agent definition
> Purpose: Repository evolution monitor

## Purpose
Defines the REM agent - a background agent that maintains "architecture of continuity" by keeping knowledge systems synchronized and context persisting across sessions.

## Four Persistence Layers
1. **Session State Snapshots**: Immediate working context
2. **Semantic Indices**: Cross-references across work
3. **Discovery Logs**: Structured insights
4. **Restoration Protocols**: How to rebuild context

## Execution Protocol
1. **Prerequisites Check**: Verify Alpha and Beta-Wave exist
2. **Change Detection**: Git and timestamp-based detection
3. **Session State Capture**: Create timestamped session file
4. **Delta Updates**: Update Alpha and Beta-Wave as needed
5. **Discovery Logging**: Log significant patterns
6. **Restoration Protocol Update**: Update PROTOCOL.md
7. **Memory Hook Update**: Update rem-context.md
8. **Changelog Update**: Append to CHANGELOG.md
9. **Last Run Update**: Update LAST-RUN.md

## Outputs Created/Maintained
- `rem/CHANGELOG.md` - History of updates
- `rem/LAST-RUN.md` - Most recent run status
- `rem/sessions/*.md` - Session state snapshots
- `rem/discoveries/*.md` - Insights by topic
- `rem/restoration/PROTOCOL.md` - Restore guide
- `.claude/rules/rem-context.md` - Memory hook

## Key Features
- Efficient delta updates (only changed files)
- Session archive management (keeps last 30)
- Conflict handling with `.rem-lock`

## Dependencies
- Requires: Alpha-Wave and Beta-Wave to exist
- Model: haiku (lightweight for background runs)

---
*Summary generated: 2026-01-23*
