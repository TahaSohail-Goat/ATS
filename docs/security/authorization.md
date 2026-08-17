# Authorization

No authorization model exists in v1 (no authenticated resources). When
introduced, ATS will use role-based access control (RBAC) as the default
pattern, defined per module (e.g. `admin`, `customer` roles) rather than
ad hoc per-endpoint checks. Design finalized via ADR alongside the
authentication decision.
