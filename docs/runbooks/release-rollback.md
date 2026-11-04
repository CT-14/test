# Release and roll back

- Release: merge to `main`; CI builds the image. Deploy the image tagged with
  the commit SHA (stop-then-start; one instance).
- Roll back: deploy the previous SHA's image. Migrations are forward-only, so a
  rollback across a migration needs that migration to be backward compatible;
  reviewers check this on every migration PR.
