# ADR 0003: One container on a small host with a persistent volume

Status: accepted, 2026-11-04 (provider choice pending owner approval)

## Decision

Ship a single Docker image. Run one instance on any host that offers a
persistent volume: Fly.io, Railway, Render, or a small VPS (Hetzner, DigitalOcean)
with Docker. TLS terminates at the platform or at Caddy on a VPS.

## Consequences

- Portable; no lock-in to a provider's proprietary services.
- Choosing and paying for the host is a human action (issue section 9).
  Recommendation: a ~$5/mo VPS or a PaaS free/hobby tier with a 1 GB volume.
