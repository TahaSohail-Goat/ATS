# Architecture Rules (AI-agent specific notes)

See root `AGENTS.md` §4 and §9. Key agent-specific reminder: the ADR
requirement is not a suggestion. If a task implicitly requires one of the
listed decisions (e.g. "add caching" implies Redis), stop and flag that an
ADR is needed rather than implementing around it.
