# Friction Log

Capture gaps between AI output and your actual preferences.

## How to Use

When Claude's output feels off, log it here:

```markdown
## [date] - [brief title]

### What I Got
[Describe the output]

### What I Needed
[Describe what you actually wanted]

### The Gap
[Identify the specific difference]

### Instruction Added
[The rule added to CLAUDE.md or memory]

### Status
[ ] Tested and working
```

## Quick Capture

During any conversation, ask Claude:
> "What patterns in my corrections reveal preferences not yet captured in memory?"

This surfaces blind spots automatically.

---

## Friction Entries

*Add new entries below*

---

## Example Entry

## 2026-02-11 - Too verbose explanations

### What I Got
Long paragraphs explaining basic concepts I already understand.

### What I Needed
Concise, actionable output assuming I know the basics.

### The Gap
Claude defaulting to tutorial-style explanations for an expert user.

### Instruction Added
```markdown
# In CLAUDE.md
Assume expert-level knowledge. Skip basic explanations unless asked.
Be concise - prefer bullet points over paragraphs.
```

### Status
[x] Tested and working
