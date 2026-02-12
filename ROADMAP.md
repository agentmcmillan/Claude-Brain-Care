# Brain-Wave Roadmap

Features inspired by top OpenClaw skills and community patterns.

## Inspired By

| Source Skill | Feature | Status |
|--------------|---------|--------|
| cognitive-memory | Multi-store memory layers | ✅ Implemented (4 layers) |
| shared-memory | Cross-instance context sharing | 🔜 Planned |
| quests | Guided multi-step processes | 🔜 Planned |
| summarize | Content summarization | ✅ Partial (alpha summaries) |
| trellis | Structured specs & workflows | 🔜 Planned |
| identity-manager | Agent identity persistence | 🔜 Planned |

---

## v1.1 - Hooks Integration

**Status**: In Development

Claude Code hooks for automatic Brain-Wave sync.

### Pre-Session Hook
```bash
# .claude/hooks/pre-session.sh
# Auto-load Brain-Wave context on session start
cat rem/restoration/PROTOCOL.md 2>/dev/null
```

### Post-Edit Hook
```bash
# .claude/hooks/post-edit.sh
# Track changed files for next REM sync
echo "$FILE_PATH" >> .brain-wave-pending
```

### Session-End Hook
```bash
# .claude/hooks/session-end.sh
# Auto-run REM on session end
# Requires: bypassPermissions mode
```

---

## v1.2 - Shared Memory

**Inspiration**: shared-memory skill

Share Brain-Wave context between Claude instances.

### Use Cases
- Team projects with multiple developers using Claude
- Syncing context across machines
- Collaborative AI-assisted development

### Proposed Structure
```
rem/
├── shared/
│   ├── exports/           # Shareable context snapshots
│   │   └── [timestamp].json
│   └── imports/           # Received context
│       └── [source].json
└── sync/
    ├── peers.json         # Known peer instances
    └── conflicts.md       # Merge conflicts log
```

### Sync Protocol
```
1. Export: REM creates shareable snapshot
2. Transfer: Git push/pull or direct share
3. Import: REM merges incoming context
4. Resolve: Conflicts logged for review
```

---

## v1.3 - Quests System

**Inspiration**: quests skill

Guided multi-step workflows with progress tracking.

### Proposed Quests

#### Quest: New Project Setup
```markdown
# Quest: Initialize New Project

## Steps
1. [ ] Create CLAUDE.md with project description
2. [ ] Run `use brain-wave-init agent`
3. [ ] Review generated architecture maps
4. [ ] Add project-specific notes to discoveries
5. [ ] Commit Brain-Wave files

## Progress: 0/5
```

#### Quest: Feature Development
```markdown
# Quest: Build [Feature Name]

## Steps
1. [ ] Run `/bart new` to plan feature
2. [ ] Review and refine requirements
3. [ ] Run `/bart create-prd` to generate stories
4. [ ] Run `/ralph` to execute stories
5. [ ] Run `use rem agent` to capture learnings
6. [ ] Commit changes with context

## Progress: 0/6
```

### Quest Runner Agent
```yaml
---
name: quest-runner
description: Guide through multi-step Brain-Wave workflows
---

Available quests:
- new-project: Initialize Brain-Wave for new project
- feature: Plan and build a feature
- refactor: Guided refactoring workflow
- debug: Systematic debugging quest
```

---

## v1.4 - Cognitive Memory

**Inspiration**: cognitive-memory skill

Enhanced memory with human-like characteristics.

### Memory Types

| Type | Human Analog | Brain-Wave Mapping |
|------|--------------|-------------------|
| Working | Current focus | `rem/sessions/` |
| Episodic | Past events | `rem/chats/` |
| Semantic | Facts & concepts | `alpha-wave/`, `beta-wave/` |
| Procedural | How-to knowledge | `beta-wave/_PATTERNS.md` |

### Proposed Enhancements

#### Forgetting Curve
```markdown
## Memory Decay
- Recent sessions: Full detail
- 7+ days: Summarized
- 30+ days: Key points only
- 90+ days: Archived or deleted
```

#### Importance Scoring
```markdown
## Memory Priority
Files touched frequently: High priority
Files with many dependents: High priority
Config files: Medium priority
Test files: Low priority
```

#### Contextual Retrieval
```markdown
## Smart Loading
When working on auth:
- Load beta-wave/src/auth/_MAP.md
- Load relevant discoveries
- Skip unrelated context
```

---

## v1.5 - Trellis Integration

**Inspiration**: trellis skill

Structured specs and workflow templates.

### Spec Templates

#### API Endpoint Spec
```markdown
# Spec: [Endpoint Name]

## Endpoint
- Method: POST
- Path: /api/v1/[resource]

## Request
```json
{
  "field": "type"
}
```

## Response
```json
{
  "id": "string",
  "created": "timestamp"
}
```

## Brain-Wave Context
- Related files: @alpha-wave/INDEX.md
- Patterns: @beta-wave/_PATTERNS.md
```

#### Component Spec
```markdown
# Spec: [Component Name]

## Props
| Prop | Type | Required | Default |
|------|------|----------|---------|

## State
[state management approach]

## Brain-Wave Context
- Similar components: [from index]
- UI patterns: [from patterns]
```

---

## v2.0 - OpenClaw Gateway Integration

**Future Vision**: Full OpenClaw integration.

### Multi-Channel Memory
```
WhatsApp session → Brain-Wave context
Telegram session → Same Brain-Wave context
Discord session → Same Brain-Wave context
```

### Persistent Identity
```yaml
agent:
  name: "Project Assistant"
  identity: "brain-wave-main"
  memory: "./brain-wave/"
  channels:
    - whatsapp
    - slack
    - telegram
```

### Session Continuity
```
Channel A: "Working on auth module"
  → Brain-Wave captures context

Channel B (later): "Continue auth work"
  → Brain-Wave restores context automatically
```

---

## Contributing

Ideas welcome. Open an issue or PR to propose features.

Priority given to features that:
1. Reduce context loss
2. Improve development flow
3. Enable collaboration
4. Maintain simplicity
