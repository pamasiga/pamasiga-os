# services/

This directory is reserved for **microservices** or **backend services** that operate independently.

## Purpose

Services are standalone backend components that handle specific business domains or technical responsibilities.

## Examples

- `auth-service/` — Authentication and authorization
- `payment-service/` — Payment processing
- `notification-service/` — Email, SMS, push notifications
- `analytics-service/` — Data analytics and reporting
- `search-service/` — Search indexing and querying

## Guidelines

- Each service should be independently deployable
- Services communicate via APIs (REST, gRPC, message queues)
- Each service has its own database (if needed)
- Follow domain-driven design principles
- Include health checks and observability

## Status

**Empty** — Add services as your architecture evolves.
