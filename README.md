# Claude Brain-Care

A unified memory and context engineering system for Claude Code, integrating multiple open-source agent frameworks into a cohesive whole.

![Brain-Wave Architecture](https://img.shields.io/badge/Brain--Wave-Memory%20System-blue)
![Ralph](https://img.shields.io/badge/Ralph-Execution-green)
![GSD](https://img.shields.io/badge/GSD-Multi--Agent-orange)
![Planning](https://img.shields.io/badge/Planning-Persistence-purple)

## What This Is

Brain-Care combines four powerful context engineering patterns into one integrated system where **Brain-Wave memory** makes all other agents smarter:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Brain-Wave Memory Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐ │
│  │ Alpha-Wave  │  │ Beta-Wave   │  │          REM             │ │
│  │ (Index)     │  │ (Maps)      │  │  (Sessions/Discoveries)  │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬──────────────┘ │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │ provides       │ provides            │ captures
          │ file context   │ architecture        │ learnings
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│   Bart/Ralph    │      GSD        │    Planning-with-Files      │
│   (Stories)     │   (Multi-Agent) │    (Markdown Persistence)   │
└─────────────────────────────────────────────────────────────────┘
```

## Built On The Shoulders Of Giants

This project integrates and extends several excellent open-source projects:

### Core Inspirations

| Project | Author | Contribution | License |
|---------|--------|--------------|---------|
| [**Ralph Pattern**](https://ghuntley.com/ralph/) | Geoffrey Huntley | Master/worker agent architecture | - |
| [**Get Shit Done**](https://github.com/glittercowboy/get-shit-done) | glittercowboy | Multi-agent orchestration, parallel execution | MIT |
| [**Planning with Files**](https://github.com/OthmanAdi/planning-with-files) | OthmanAdi | Manus-style markdown persistence | MIT |
| [**Memory System Article**](https://medium.com/@nbhyxq/claude-forgot-my-entire-project-so-i-built-a-memory-system-6a872a3cc58f) | Sylweriusz Szydlik | Persistence architecture concepts | - |
| [**Claude Code Hooks**](https://github.com/karanb192/claude-code-hooks) | karanb192 | Hook patterns for automation | MIT |

### What We Added

**Brain-Wave** is our contribution - a three-agent memory system that:
- **Alpha-Wave**: Indexes files and creates summaries
- **Beta-Wave**: Maps architecture and dependencies
- **REM**: Captures sessions and discoveries

**The Integration Layer** connects Brain-Wave to all other systems:
- Enhanced Bart/Ralph with pre-loaded context
- GSD agents that skip redundant research
- Planning files that sync to persistent memory

## Quick Start

### 1. Copy to Your Project

```bash
# Clone this repo
git clone https://github.com/agentmcmillan/Claude-Brain-Care.git

# Copy to your project
cp -r Claude-Brain-Care/.claude/ /path/to/your/project/.claude/
cp Claude-Brain-Care/CLAUDE.md /path/to/your/project/

# Optional: Copy integration skills
cp -r Claude-Brain-Care/integrations/ /path/to/your/project/integrations/
```

### 2. Initialize Brain-Wave

```
cd /path/to/your/project

# In Claude Code:
use brain-wave-init agent
```

### 3. Use the Integrated Agents

```
# Master orchestrator (routes to best system)
use mcralph-orchestrator agent

# Or use specific systems:
use bart-enhanced agent      # Story planning with context
use ralph-enhanced agent     # Story execution with context
use gsd-orchestrator agent   # Complex multi-phase work
use planning-enhanced agent  # Exploratory research
```

## Agent Reference

### Brain-Wave Core (Memory)

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `alpha-wave` | Index files, create summaries | After major changes |
| `beta-wave` | Map architecture, dependencies | After restructuring |
| `rem` | Sync sessions, capture discoveries | After any work session |
| `brain-wave-init` | Initialize full system | First time setup |

### Enhanced Integrations

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `mcralph-orchestrator` | Route to best system | When unsure which to use |
| `bart-enhanced` | Plan features with context | New feature development |
| `ralph-enhanced` | Execute stories with context | After Bart creates PRD |
| `gsd-orchestrator` | Multi-agent complex work | Major refactors, migrations |
| `planning-enhanced` | Research with persistence | Investigation, exploration |

### Claude Code Hooks (Auto-Sync)

Brain-Wave can be enhanced with [Claude Code hooks](https://github.com/karanb192/claude-code-hooks) for automatic memory synchronization.

| Hook | Trigger | Purpose |
|------|---------|---------|
| `auto-sync-rem` | Edit, Write | Auto-updates `rem/CHANGELOG.md` and `rem/LAST-RUN.md` |
| `auto-index-alpha` | Write | Adds new files to `alpha-wave/INDEX.md` |
| `session-checkpoint` | idle_prompt | Saves session state to `rem/sessions/` |
| `discovery-logger` | Task | Logs agent insights to `rem/discoveries/` |
| `context-hint` | Read | Suggests related files from Beta-Wave |

Install hooks:
```bash
bash integrations/hooks/install.sh
```

## How the Integration Works

### Before Brain-Wave
```
Bart: "Scanning codebase... found 200 files... analyzing..."
      (10 minutes of redundant discovery)
```

### After Brain-Wave
```
Bart: "Loading Brain-Wave context...
       ✓ 200 files already indexed
       ✓ Architecture already mapped
       ✓ 5 prior discoveries loaded

       I see this is a TypeScript/Express project with
       Prisma ORM. What feature would you like to plan?"
       (instant context)
```

### The Integration Pattern

Every enhanced agent follows this pattern:

```python
# Pseudo-code for Brain-Wave integration

def execute_task(task):
    # 1. Load Brain-Wave context
    context = load_brain_wave()

    # 2. Check what's already known
    skip_research = context.already_indexed(task.files)

    # 3. Execute with context
    result = do_work(task, context)

    # 4. Capture learnings
    context.rem.add_discovery(result.learnings)

    # 5. Update memory
    context.sync()
```

## File Structure

```
Claude-Brain-Care/
├── CLAUDE.md                           # Project memory (auto-updated)
├── README.md                           # This file
├── LICENSE                             # MIT with attribution
├── .claude/
│   ├── agents/
│   │   ├── alpha-wave.md               # Core: Indexer
│   │   ├── beta-wave.md                # Core: Mapper
│   │   ├── rem.md                      # Core: Monitor
│   │   ├── brain-wave-init.md          # Core: Initializer
│   │   ├── mcralph-orchestrator.md     # Integration: Master router
│   │   ├── bart-enhanced.md            # Integration: Enhanced planner
│   │   ├── ralph-enhanced.md           # Integration: Enhanced executor
│   │   ├── gsd-orchestrator.md         # Integration: GSD coordinator
│   │   └── planning-enhanced.md        # Integration: Enhanced planning
│   └── rules/
│       └── brain-wave-system.md        # System documentation
├── integrations/
│   ├── bart/                           # Bart planning skill
│   │   └── SKILL.md
│   ├── ralph/                          # Ralph execution skill
│   │   ├── SKILL.md
│   │   └── AGENTS.md                   # Full Ralph documentation
│   ├── ralph-master/                   # Ralph orchestrator skill
│   │   └── SKILL.md
│   ├── prompts/                        # Worker prompts
│   │   ├── ralph-worker.md
│   │   └── bart-researcher.md
│   ├── prd/                            # PRD templates
│   │   └── SKILL.md
│   ├── gsd/                            # Get-Shit-Done agents
│   │   ├── gsd-project-researcher.md
│   │   ├── gsd-planner.md
│   │   ├── gsd-executor.md
│   │   ├── gsd-verifier.md
│   │   ├── gsd-debugger.md
│   │   └── ...
│   ├── planning-with-files/            # Manus-style planning
│   │   ├── SKILL.md
│   │   ├── templates/
│   │   └── scripts/
│   └── hooks/                          # Claude Code hooks for auto-sync
│       ├── README.md
│       ├── ARCHITECTURE.md
│       ├── install.sh
│       ├── auto-sync-rem.js
│       ├── auto-index-alpha.js
│       ├── session-checkpoint.js
│       ├── discovery-logger.js
│       └── context-hint.js
├── alpha-wave/                         # Generated: File indexes
├── beta-wave/                          # Generated: Architecture maps
└── rem/                                # Generated: Sessions & discoveries
```

## Recommended Workflows

### New Feature
```
1. use mcralph-orchestrator agent
2. "Add user authentication"
3. → Routes to Bart/Ralph
4. Brain-Wave provides instant context
5. Stories execute with pattern awareness
6. Learnings captured to REM
```

### Major Refactor
```
1. use gsd-orchestrator agent
2. "Migrate from REST to GraphQL"
3. → GSD researches (delta only - skips known)
4. → Plans with complexity data from Brain-Wave
5. → Executes in parallel with pattern compliance
6. → Verifies against architectural constraints
7. All learnings to REM
```

### Investigation
```
1. use planning-enhanced agent
2. "Why is auth slow?"
3. → Creates task_plan.md with Brain-Wave context
4. → findings.md captures discoveries
5. → Findings sync to rem/discoveries/
6. → If solution found, route to implementation
```

## Contributing

We welcome contributions. Please:
1. Respect the original licenses of integrated projects
2. Maintain attribution in any forks
3. Consider contributing back to the original projects

## Attribution

This project would not exist without the incredible work of:

- **Geoffrey Huntley** - The [Ralph pattern](https://ghuntley.com/ralph/) that inspired the master/worker architecture
- **glittercowboy** - [Get Shit Done](https://github.com/glittercowboy/get-shit-done) for multi-agent orchestration patterns
- **OthmanAdi** - [Planning with Files](https://github.com/OthmanAdi/planning-with-files) for Manus-style persistence
- **Sylweriusz Szydlik** - [Memory System article](https://medium.com/@nbhyxq/claude-forgot-my-entire-project-so-i-built-a-memory-system-6a872a3cc58f) for persistence architecture concepts

## License

MIT License - See [LICENSE](LICENSE)

The integrated components retain their original licenses:
- Get Shit Done: MIT
- Planning with Files: MIT

---

*Built with Brain-Wave - Because Claude shouldn't forget your project.*
