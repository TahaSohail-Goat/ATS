# Disaster Recovery

**TBD.** For v1 (marketing site, no critical transactional data beyond
contact submissions), formal DR planning is lower priority than for a
product handling customer data/payments. Revisit and fill in this
document before any phase-3+ feature (see `../product/roadmap.md`) that
introduces customer accounts or billing.

At minimum, once a hosting provider is chosen, document:
- Backup restore procedure and tested RTO/RPO
- Failover plan if the primary region/provider has an outage
- Communication plan for an outage affecting the public site
