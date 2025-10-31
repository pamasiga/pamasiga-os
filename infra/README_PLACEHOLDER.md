# infra/

This directory is reserved for **infrastructure as code** (IaC) and deployment configurations.

## Purpose

Infrastructure code defines and manages your cloud resources, deployment pipelines, and runtime environments.

## Examples

- `terraform/` — Terraform infrastructure definitions
- `kubernetes/` — Kubernetes manifests and Helm charts
- `docker/` — Dockerfiles and docker-compose configs
- `ansible/` — Ansible playbooks for server configuration
- `pulumi/` — Pulumi infrastructure code
- `scripts/` — Infrastructure automation scripts

## Guidelines

- Version control all infrastructure code
- Use environment-specific configurations (dev, staging, prod)
- Include documentation for provisioning and deployment
- Follow security best practices (least privilege, encryption)
- Implement infrastructure testing where possible

## Status

**Empty** — Add infrastructure definitions when deploying.
