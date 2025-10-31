# apps/

This directory is reserved for **application code** — frontend, backend, mobile, or CLI applications.

## Purpose

Applications are the user-facing or service-facing entry points of your system. Each application should be independent and deployable.

## Examples

- `web/` — Web frontend application
- `api/` — REST or GraphQL API server
- `admin/` — Admin dashboard
- `mobile/` — Mobile application code
- `cli/` — Command-line interface tools

## Guidelines

- Each app should have its own README with setup instructions
- Apps may share packages from `/packages`
- Apps should be independently deployable
- Configuration should be environment-based (use `.env`)

## Status

**Empty** — Add your first application when ready.
