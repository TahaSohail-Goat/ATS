# Entity Relationships

```mermaid
erDiagram
    CONTACT_SUBMISSION {
        uuid id PK
        string name
        string email
        string company
        string phone
        text message
        datetime createdAt
        datetime updatedAt
    }
```

No relationships yet — a single, independent table. This diagram grows as
modules (auth/users, projects, etc.) are actually built; do not pre-model
future entities here.
