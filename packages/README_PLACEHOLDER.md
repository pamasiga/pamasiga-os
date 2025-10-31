# packages/

This directory is reserved for **shared libraries** and **reusable packages** used across apps and services.

## Purpose

Packages contain reusable code that multiple applications or services depend on. They promote DRY (Don't Repeat Yourself) and consistency.

## Examples

- `common/` — Shared utilities and helpers
- `ui-components/` — Reusable UI component library
- `types/` — Shared TypeScript types or data models
- `validation/` — Input validation schemas
- `logger/` — Structured logging utilities
- `config/` — Configuration management
- `api-client/` — API client libraries

## Guidelines

- Each package should be independently versioned
- Packages should have clear, focused responsibilities
- Include tests for shared packages
- Document public APIs
- Minimize external dependencies

## Status

**Empty** — Create shared packages as patterns emerge.
