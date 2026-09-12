# Changelog

## Unreleased

- Added a Data Deletion Request page (`/data`) with a form for business name,
  phone, email, and reason. Submitting it issues a reference and states the
  24-hour window and that deletion cannot be reversed. The receiving endpoint
  is not wired up yet — set `DELETION_ENDPOINT` in `src/data/legal.ts`. Until
  then the confirmation hands the requester a prefilled WhatsApp and email
  route so a request still reaches a person.
- Added the Privacy Policy (`/privacy`) and Terms of Service (`/terms`) pages,
  linked from the footer between GitHub and CV. All three legal pages are built
  as their own static entries so the URLs resolve without a host rewrite rule —
  platform reviewers such as Meta's WhatsApp Business API request them cold.
- Added the VacaSky Adventure Travel Website case study, with a captured hero image, live-site link, and public source link.
