# ADR 0005: Provider-agnostic transactional email

Status: accepted, 2026-11-04

## Decision

An `EmailSender` interface with a console implementation (development, tests)
and an HTTP implementation for a transactional provider (Postmark or Resend
recommended for deliverability and free/low tiers). Sending domains must be
verified per customer for branded from-addresses.

## Consequences

Provider account creation and DNS records are human actions.
