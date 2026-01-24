# Discovery Log: Architecture

## 2026-01-23 - Three-Agent Pipeline Architecture
- **Context**: Initial system analysis during installation
- **Observation**: The Brain-Wave system uses a three-agent pipeline with strict ordering
- **Evidence**:
  - `brain-wave-init.md` orchestrates Alpha -> Beta -> REM sequence
  - Beta-Wave checks for Alpha-Wave output before running
  - REM checks for both Alpha and Beta outputs
- **Implications**:
  - Agents cannot run in parallel
  - Each agent's output is input for the next
  - Full re-initialization requires running all three in order
- **Status**: Confirmed

## 2026-01-23 - Filesystem as Memory
- **Context**: Analyzing persistence strategy
- **Observation**: All state is stored as markdown files in dedicated folders
- **Evidence**:
  - `alpha-wave/` for indexes and summaries
  - `beta-wave/` for maps and connections
  - `rem/` for sessions and discoveries
- **Implications**:
  - Context survives session resets
  - State is git-trackable
  - Human-readable and editable
- **Status**: Confirmed

## 2026-01-23 - Memory Hook Integration
- **Context**: Understanding context restoration
- **Observation**: `.claude/rules/` files auto-load on session start
- **Evidence**:
  - `brain-wave-system.md` uses `paths: ["**/*"]` pattern
  - Additional hooks will be created for each agent
- **Implications**:
  - Immediate context availability
  - No manual loading required
  - Limited by rule file size
- **Status**: Confirmed

---
*Log initialized: 2026-01-23*
