# Shared Memory

This directory contains shareable Brain-Wave context snapshots.

## Structure

```
shared/
├── exports/     # Snapshots you create
│   └── *.json   # Timestamped exports
├── imports/     # Snapshots from others
│   └── *.json   # Source-named imports
└── README.md    # This file
```

## Creating an Export

Use the shared-memory skill:
```
/shared-memory export
```

Or manually create a snapshot following the schema in `exports/`.

## Importing Context

```
/shared-memory import imports/[filename].json
```

## What's Shared

| Included | Not Included |
|----------|--------------|
| Session focus | Full conversations |
| Discoveries | Code contents |
| Architecture maps | Secrets/credentials |
| File paths | Personal data |

## Git Workflow

To share via git:

```bash
# Export
/shared-memory export

# Commit and push
git add rem/shared/exports/
git commit -m "Share Brain-Wave context"
git push

# On other machine
git pull
/shared-memory import rem/shared/exports/latest.json
```

## Privacy Note

Review exports before sharing. While exports are designed to exclude sensitive data, always verify before committing to shared repositories.
