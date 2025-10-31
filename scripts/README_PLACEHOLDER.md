# scripts/

This directory is reserved for **automation scripts** and **utility tools** used during development and operations.

## Purpose

Scripts automate repetitive tasks, assist with development workflows, and support operational activities.

## Examples

- `setup.sh` — Initial project setup
- `seed-data.js` — Database seeding for development
- `migrate.py` — Database migration runner
- `deploy.sh` — Deployment automation
- `backup.sh` — Backup utilities
- `cleanup.sh` — Cleanup and maintenance tasks

## Guidelines

- Scripts should be idempotent where possible
- Include usage instructions in comments or separate docs
- Use appropriate scripting languages (bash, python, node)
- Handle errors gracefully
- Avoid hardcoding secrets (use environment variables)

## Status

**Empty** — Add automation scripts as needed.
