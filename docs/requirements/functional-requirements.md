# Functional Requirements

Template for every FR:

```
FR-ID:            FR-XXX
Title:
Description:
Actor:
Preconditions:
Main Flow:
Alternative Flow:
Exception Flow:
Postconditions:
Acceptance Criteria:
Priority:          Must | Should | Could
Dependencies:
```

---

## FR-001 — Contact Form Submission

- **Actor:** Website Visitor
- **Preconditions:** Visitor is on the `/contact` page.
- **Main Flow:**
  1. Visitor fills name, email, message (and optional company/phone).
  2. Client-side validation (Zod via React Hook Form) checks required
     fields and email format.
  3. Visitor submits; frontend calls `POST /api/v1/contact`.
  4. Backend validates payload, persists a `Lead`/`ContactSubmission`
     record, returns `201`.
  5. Frontend shows a success confirmation.
- **Alternative Flow:** Visitor leaves optional fields blank — submission
  still succeeds.
- **Exception Flow:**
  - Invalid input → `400` with field-level errors, shown inline.
  - Rate limit exceeded → `429`, frontend shows a "try again later" message.
  - Server error → `500`, frontend shows a generic retry message; nothing
    is silently swallowed.
- **Postconditions:** A contact submission exists in the database.
- **Acceptance Criteria:**
  - Submitting valid data returns `201` and persists a record.
  - Submitting invalid data returns `400` with per-field error messages.
  - The endpoint is rate-limited per IP.
  - No submission occurs without passing both client and server validation.
- **Priority:** Must
- **Dependencies:** `contact` backend module, `packages/validation` schema.

---

## FR-002 — View Company/Services Information

- **Actor:** Website Visitor
- **Preconditions:** None.
- **Main Flow:** Visitor navigates the public site (home, about, services)
  and reads static/CMS-sourced content.
- **Postconditions:** None (read-only).
- **Acceptance Criteria:** Pages render with correct metadata, are
  responsive, and meet the accessibility bar in
  `../frontend/accessibility.md`.
- **Priority:** Must
- **Dependencies:** None.

---

## FR-003 — Health Check Endpoint

- **Actor:** External Services (uptime monitors, orchestrators)
- **Preconditions:** API process is running.
- **Main Flow:** Caller sends `GET /api/v1/health`; API returns process
  status, and `GET /api/v1/health/ready` returns DB connectivity status.
- **Postconditions:** None.
- **Acceptance Criteria:** `200` when healthy; `503` when a dependency
  (e.g. database) is unreachable.
- **Priority:** Must
- **Dependencies:** Database connection.

---

Additional FRs are added here as requirements are confirmed by the business.
Do not add speculative FRs for unscoped features (auth, billing, etc.) —
track those as roadmap items in `../product/roadmap.md` instead.
