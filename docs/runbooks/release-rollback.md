# Release and roll back

Today CI only builds the image to check it; nothing is published. Until M1-06
ships, releases are manual:

- Release: merge to `main`, check out the merge commit on the host, and
  `docker build -t lapsewise:<sha> .` so each release keeps its own tag. Run it
  as in [deployment.md](../deployment.md) (stop-then-start; one instance).
- Roll back: run the previous `lapsewise:<sha>` image still on the host.

After M1-06, CI pushes the image to GHCR tagged with the commit SHA on merge:
release deploys that image and rollback deploys the previous SHA's image.

Either way, migrations are forward-only, so a rollback across a migration needs
that migration to be backward compatible; reviewers check this on every
migration PR.
