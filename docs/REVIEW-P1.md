# REVIEW-P1 · Phase 1 wireframe review

Reviewer: Claude (HAM-11) · 5 Oct 2026 · Scope: `wireframes/` (index, menu, flow, credits)

Status: **closed 5 Oct 2026.** SPEC §10 ticked with owner approval. One criterion (full replay of HAM-04 to HAM-09 acceptance tests) is carried to HAM-20.

## 1. Traceability matrix (SPEC §1)

Locations come from the `BR-`/`GR-`/`DL-` annotation tags in the wireframes.

| ID | Where satisfied | Verdict |
|---|---|---|
| BR-01 sensory journey | index H0, H1, H6; flow.html (journeys) | Covered |
| BR-02 Chennai → Penang voyage | index H2 | Covered, but Chennai and Weld Quay are `[VERIFY]` (sources name neither) |
| BR-03 spice-roasting ritual | index H4 (working prototype); flow.html | Covered |
| BR-04 four signatures | index H5; menu.html (signature tag) | Covered, Crab Curry and Ayam Bawang at 164A `[VERIFY]` |
| BR-05 palette | index H1, H5 (greyscale by design) | **Deferred to Phase 2 (HAM-12)**, annotated only |
| BR-06 tactile type | index H1 | **Deferred to Phase 2**, annotated only |
| BR-07 archival photos | index H1, H2, H3, H7, H8 | Covered; IMG-18 is a weak fit |
| BR-08 interactive menu | menu.html (MN-01 to MN-08), index H6, flow.html | Covered |
| BR-09 origin story | index NAV, H1, H2, H3, H7, H10 | Covered; generation wording open, see §5 |
| BR-10 anti-template | index H5; menu.html | Covered (see §3.4) |
| GR-01 strategist thinking | flow.html | Covered |
| GR-02 micro-interactions | index NAV, H0, H3, H4, H6, H9, H10; menu | Covered (specified, partly prototyped) |
| GR-03 written reason per choice | No wireframe location | **Open by design**: belongs to HAM-21 rationale |
| GR-04 responsive | index (all regions), flow.html | Covered, verified at 390 and 1440 |
| DL-01 wireframes and flow | all pages; flow.html | Covered |
| DL-02, DL-03 | n/a | Later phases |

MN-01 to MN-08 and MO-01 to MO-12 were checked in the earlier coverage pass; every ID is annotated somewhere.

## 2. Regression sweep (this session)

Playwright on system Chrome against `python3 -m http.server 4173`.

| Check | Result |
|---|---|
| Horizontal scroll, 4 pages × (1440, 390) | 0px on all 8 |
| Console errors / page errors | none |
| `menu.html#murtabak` opens the dish drawer | pass |
| Cart / checkout / delivery language | only in annotations that say it is absent (index.html:795, menu.html:182) |
| `KITTEST` region | removed (no references left apart from a comment in `kit.js:81`) |
| Touch targets under 44px at 390 | only the review toolbar (`wf-toolbar`: 4 links, 3 buttons, 1 select, 30px high). It is review tooling, not product UI |

Not re-run in this pass: the full per-task acceptance scripts for HAM-04 to HAM-09 (the originals were in a scratchpad that is gone). The checks above cover the kit-change risks (layout, console, deep link). A full replay of each task's criteria in the browser is still outstanding. See §5.

## 3. Defects and notes

1. **Fixed earlier:** image captions overflowed in stretched grid rows; touch targets below 44px on mobile; KITTEST region.
2. **Accepted:** four inline links on flow.html are under 44px (WCAG inline-text exception).
3. **Open, content:** all `[VERIFY]` items in `docs/FACTS.md` remain visible on the wireframes. IMG-18 (price-tag jars) should be replaced.
4. **Anti-template (BR-10):** six trays, chapters in four different layouts, a timeline and an archive. No equal card grid, no cart language. One thing to watch in Phase 2: the dish list in the menu is the most grid-like surface, so make the tray / counter metaphor carry it.
5. **Open, infrastructure:** images still hot-link Wikimedia thumbnails (HAM-02 blocked). Five originals are blocked by ORB, so the manifest points at thumb URLs.

## 4. Rubric scores

| Criterion | Score | Reason |
|---|---|---|
| Concept and storytelling | 4/5 | The kandar pole runs through the nav, timeline, plate builder and footer |
| Visual design | 2/5 | Greyscale by design; palette and type untested |
| Micro-interactions | 4/5 | Specified throughout; H3, H4, H6 and menu prototyped |
| Responsiveness | 4/5 | Zero overflow; mobile re-layouts (swipe deck, bottom bar, bottom sheet) |
| Design justification | 3/5 | Annotations only; rationale doc is HAM-21 |

## 5. Top 3 for Phase 2, and what blocks closing Phase 1

Phase 2 priorities:
1. Resolve the `[VERIFY]` items with the family.
2. Replace weak imagery and draw missing dishes (HAM-13).
3. Prove the "roast heat" palette and variable "type that roasts" in hi-fi for H1, H4, H5 and the menu (HAM-12, HAM-14).

Open before HAM-11 can be marked done:
- Owner approval to tick SPEC §10 (CONVENTIONS allows SPEC edits only with approval).
- Owner decisions: generation wording, unsourced brief items, HAM-02 image downloads.
- Optional: replay the HAM-04 to HAM-09 acceptance criteria end to end.

## 6. Proposals from section tasks

None logged were adopted or rejected in this pass; review the handoff logs of HAM-05 to HAM-10 if a shared-primitive proposal is wanted.
