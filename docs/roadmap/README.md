# Roadmap

Parent objective: #1. Each ticket below is written so it can be copied into a
GitHub issue as is (title, objective, requirements, acceptance criteria,
dependencies, tests). Dependencies use ticket ids; when tickets become GitHub
issues, replace them with `Blocked by #<n>` lines so the factory waits for them.

| Milestone | Goal | Tickets |
| --------- | ---- | ------- |
| [M1 Foundation](m1-foundation.md) | Deployable skeleton, auth, ops | M1-01 to M1-07 |
| [M2 Recovery engine](m2-recovery.md) | Connect Stripe, detect and recover failed payments | M2-01 to M2-07 |
| [M3 Monetization](m3-monetization.md) | Charge for Lapsewise itself | M3-01 to M3-03 |
| [M4 Launch readiness](m4-launch.md) | Legal, security, acquisition, support | M4-01 to M4-06 |

M0 (research, business plan, architecture, foundation) is delivered by the
pull request for #1.

## Dependency graph

```text
M1-01 ─┬─ M1-02 ── M1-03 ─┬─ M2-01 ── M2-02 ─┬─ M2-03 ── M2-04 ── M2-05
       │                  │                  ├─ M2-06
       │                  │                  └─ M2-07 (needs M2-05)
       │                  └─ M3-01 ── M3-02 ── M3-03
       ├─ M1-04   M1-05   M1-06 ── M1-07
M4-01..M4-06 mostly independent; see each ticket.
```

Independent from the start: M1-01, M1-04, M1-05, M1-06, M4-01, M4-02, M4-05.
