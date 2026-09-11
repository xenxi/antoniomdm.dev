# A4 — Experience + Competencies + Achievements

## Scope

Profile now renders the A2 professional model as navigable Experience, Competencies, Achievements, Education and Languages sections. No professional claims or source dates were added.

## Experience design

The nine A2 experiences retain their exact chronology and overlaps. Native `details/summary` elements provide keyboard, touch and no-JS expansion; Domingo Alonso opens with its supported areas visible.

## Competency design

All 19 A2 competencies are shown with separate classification and recency fields, skills, anchors and evidence links. Grouping remains presentation-only.

## Achievement design

The two A2 achievements show scope, related experience/cases and reusable readable metrics. Approximate values remain labelled; no unsupported score or rating is used.

## Education

Uses the exact A2 wording and does not imply an awarded degree.

## Languages

Uses A2 wording without CEFR levels or invented proficiency scores.

## Evidence relationships

Experience tags link to competency anchors; competency and achievement evidence links back to experiences and published architecture/project routes when present.

## Accessibility

Native expandable controls, descriptive headings, readable metric text, focus outlines and CSS-independent timeline order are provided.

## Responsive

Existing responsive profile layout is preserved; timeline content stacks naturally and competency evidence wraps without horizontal overflow.

## Performance

The change uses HTML/CSS and existing selectors only. No timeline or chart dependency and no case-study bodies are loaded.

## Tests

`npm run typecheck`, `npm run lint` and `npm test` pass. Existing E2E coverage remains available; full gate execution is pending in this pass.

## Content review

Visible professional content is sourced from `src/data/professional/model.ts` through selectors. No new claims were introduced.

## Screenshots

Not captured in this implementation pass.

## Known gaps

Dedicated A4-specific unit/E2E assertions, visual captures, and Linux CI verification remain to be added.

## Ready for A5?

NO — A4 is PARTIAL until the remaining gates and visual/content QA are completed.
