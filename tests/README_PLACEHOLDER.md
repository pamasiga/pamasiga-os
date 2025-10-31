# tests/

This directory is reserved for **integration tests**, **end-to-end tests**, and **cross-cutting test utilities**.

## Purpose

While unit tests live alongside code, this directory contains tests that span multiple components or test the system as a whole.

## Examples

- `e2e/` — End-to-end user journey tests
- `integration/` — Cross-service integration tests
- `performance/` — Load and performance tests
- `security/` — Security and penetration tests
- `fixtures/` — Shared test data and fixtures
- `helpers/` — Test utilities and helpers

## Guidelines

- Keep tests independent and isolated
- Use realistic test data
- Clean up test resources after execution
- Run integration/e2e tests in CI/CD
- Document test scenarios and coverage

## Status

**Empty** — Add tests as you build features.
