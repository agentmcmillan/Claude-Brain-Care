# brain-wave-init.md
> Path: /.claude/agents/brain-wave-init.md
> Type: Agent definition
> Purpose: System orchestrator

## Purpose
Defines the Brain-Wave-Init agent - an orchestrator that initializes the complete Brain-Wave memory system in the correct order.

## Execution Protocol
1. **Preparation**: Check existing installation, count files
2. **Alpha-Wave Initialization**: Invoke Alpha-Wave agent
3. **Beta-Wave Initialization**: Invoke Beta-Wave agent (after Alpha)
4. **REM Initialization**: Invoke REM agent (after Beta)
5. **Verification**: Check all outputs exist
6. **Summary Report**: Output completion statistics

## Options
- **Fresh Install**: Remove existing folders and start fresh
- **Update Only**: Keep existing content, update changed files
- **Partial Install**: Run individual agents as needed

## Key Rules
- Always run agents in order: Alpha -> Beta -> REM
- Wait for each agent to complete before next
- Report progress at each phase
- Verify all outputs exist at end

## Dependencies
- Invokes: alpha-wave, beta-wave, rem agents
- Model: sonnet

## Verification Checks
- alpha-wave/INDEX.md
- alpha-wave/TOPICS.md
- alpha-wave/summaries/
- beta-wave/_MAP.md
- beta-wave/_CONNECTIONS.md
- rem/LAST-RUN.md
- rem/sessions/
- rem/restoration/PROTOCOL.md
- .claude/rules/*-context.md

---
*Summary generated: 2026-01-23*
