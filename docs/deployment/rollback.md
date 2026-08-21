# Rollback

- **Application rollback:** redeploy the previous known-good frontend
  build/tag through the hosting provider.
- **Hosted form rollback:** if a provider or endpoint change causes delivery
  issues, restore the previous `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` value and
  redeploy. The frontend does not own lead storage or database migrations.
- **Future services:** any later API, database, or authentication service must
  define its own rollback procedure in an architecture decision record before
  it is introduced.
