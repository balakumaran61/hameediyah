# Hameediyah Restaurant: FE Design Spec Sheet

**Project:** Internal Creative UI/UX & Frontend Challenge, Brand 1 of 3
**Brand:** Hameediyah Restaurant, 164A Lebuh Campbell, George Town, Penang (est. 1907)
**Current phase:** Phase 1, FE wireframes (local only, no hosting yet)
**Hard deadline (whole challenge):** Tue, 6 Oct 2026, 10:00 AM IST
**Spec version:** v0.4, 5 Oct 2026 (v0.2: asset register §14 · v0.3: task board in `tasks/` · v0.4: §14.5 facts from HAM-03, see below)

> **v0.4 changes (HAM-03, 5 Oct 2026; detail in `docs/FACTS.md`):**
> - §14.5: founder M. Mohamed Thamby Rawther, spice trader from Tamil Nadu, arrived early 1900s: now Verified (NST 2019, FMT 2020).
> - §14.5: origin town Chittarkottai, Ramanathapuram added as Single-source. No source names Chennai as his port or Weld Quay as his landing point (brief only).
> - §14.5: generation conflict decided: "seven generations" for the family (4 sources); never print the owner's own generation number.
> - §14.5: Book of Records award dated 7 Jul 2020.
> - §14.5: opening hours now conflict with a 2024 review (daily 10am–10pm). Still "re-check".
> - §14.5: Crab Curry and Ayam Bawang have no Campbell Street source. Kept as brief requirements with `[VERIFY]`.
> - §14.5: in-house roasting and grinding of whole spices added (NST 2019, FMT 2020).

---

## 1. What the brief asks for (source requirements)

Every task later in this spec traces back to one of these IDs.

| ID | Requirement (from the brief) | Type |
|----|------------------------------|------|
| BR-01 | Sensory-rich cultural journey, not a listing site | Concept |
| BR-02 | Celebrate the voyage from Chennai to Penang (Weld Quay docks) | Story |
| BR-03 | Show the spice-roasting rituals (roasted whole spices) | Story / Interaction |
| BR-04 | Feature signature dishes: **Murtabak, Ayam Bawang, Mutton Kurma, Crab Curry** | Content |
| BR-05 | Warm heritage palette: **turmeric, deep saffron, roasted cinnamon, brass** | Visual |
| BR-06 | Tactile typography | Visual |
| BR-07 | Historical photo integration (archival imagery) | Content / Visual |
| BR-08 | Interactive digital menu | Interaction |
| BR-09 | Tell the origin: founder M. Mohamed Thamby Rawther, Tamil Muslim spice merchant; bamboo shoulder pole ("kandar"); stall under an Angsana tree on Campbell Street; growth into 164A Lebuh Campbell; 115+ years, 7 generations | Story |
| BR-10 | **Avoid:** plain food-delivery grid (Swiggy/Zomato style) or a generic cafe template | Constraint |
| GR-01 | Think like a brand strategist / creative director; anti-template | Global |
| GR-02 | Delightful micro-interactions, rich animation, tactile responsiveness | Global |
| GR-03 | Every font, colour, image and component choice has a written branding reason | Global |
| GR-04 | Seamless responsiveness on mobile and desktop | Global |
| DL-01 | Wireframes and layout flow (low or high fidelity) showing structure and user journey | Deliverable |
| DL-02 | Live, responsive, clickable FE web app (React / Next.js / Vue / Tailwind / HTML-CSS-JS) on a free host | Deliverable (later phase) |
| DL-03 | Design and strategy rationale: brand strategy, UX and motion, client pitch value | Deliverable (later phase) |

**Reference material (from the brief):**
- Archival video: https://drive.google.com/file/d/17X_8d2uYF9OJ1LQBmIaGtR9JXVtAHb2T/view
- NST feature (2019): https://www.nst.com.my/news/nation/2019/08/514320/hameediyah-penangs-oldest-nasi-kandar-restaurant-still-going-strong
- Penang heritage archive post: https://www.facebook.com/groups/penangtoday/posts/3137769789707580/

### How it will be judged (rubric)

| Criterion | Weight | What it means for this design |
|-----------|--------|-------------------------------|
| Creative concept and storytelling | 25% | One strong narrative idea carried through every section |
| Visual design and typography | 25% | Heritage palette used with restraint, clear hierarchy, crafted type |
| Micro-interactions and UX motion | 25% | Interactions that *mean* something (roasting, pouring, voyage), not decoration |
| FE polish and responsiveness | 15% | Mobile designed as its own layout, not squeezed desktop |
| Design justification | 10% | A rationale entry for every major decision (section 11) |

---

## 2. Scope

### In scope now (Phase 1)
- Sitemap and user journeys
- Section-by-section wireframes for **desktop (1440px)** and **mobile (390px)**
- Annotated interaction and motion notes on the wireframes
- Proposed design tokens (palette, type, spacing) as a reference, not final visuals
- Built locally as greyscale HTML/CSS wireframes (see section 10)

### Later phases (not now)
- High-fidelity visual design and real imagery
- Production build, animation engineering, deployment to Vercel/Netlify
- Written rationale note and `submission.txt`

### Out of scope entirely
- Backend, real ordering, payments, reservations, login
- CMS or admin tooling
- Food delivery flows

---

## 3. Creative concept

### Big idea: "The Pole That Never Rested"

The kandar pole is the brand's origin and its name. It carried two pots of curry across Campbell Street in 1907, and the family has kept the same pots full for seven generations. The site is built as **one continuous journey the user carries forward**, the way the pole was carried: from a spice merchant's ship leaving the Coromandel coast, to the docks at Weld Quay, to the Angsana tree, to the shophouse at 164A, to the plate in front of you today.

Two design motifs repeat throughout:
1. **The balance line.** A thin brass horizontal line (the pole) with two weights at either end. It shows up as the progress indicator, section dividers, the menu "plate" balance and the loader.
2. **Roast heat.** The colour temperature of the page warms as the user scrolls deeper, from raw spice (pale ivory, turmeric) to fully roasted (cinnamon, near-black). The site literally "roasts" as you read.

### Tone of voice
Warm, proud, a little poetic, never touristy. Short sentences. Tamil and Malay words used where they belong (kandar, kuah, banjir, kuali, dulang), each with a quiet inline gloss.

### Anti-template guardrails (BR-10)
- No uniform card grid of dishes anywhere. Dishes appear as editorial "chapters", plated scenes or items on a counter.
- No stock "hero image + 3 feature columns + testimonials" layout.
- No add-to-cart buttons or delivery CTAs.
- Every section must answer "why could this only be Hameediyah?"

---

## 4. Users and journeys

| Persona | Goal | Primary path |
|---------|------|--------------|
| **Heritage tourist** (planning a Penang food trip) | Understand why this place matters, find it, know what to order | Hero → Voyage → Signature dishes → Visit |
| **Local regular / Penangite** | Check menu, hours, see what's new | Hero → Menu → Visit |
| **Food writer / media** | Story, facts, archival images, press | Hero → Seven generations → Archive & press |
| **Pitch audience** (Hameediyah leadership) | See their legacy treated with respect and ambition | Full scroll story end to end |

**Journey A, "first-time visitor" (primary, wireframe this end to end):**
Land on hero → scroll the voyage → stop at the spice ritual and play → meet the four signature dishes → open the interactive menu and build a plate → see "show this at the counter" → get directions to 164A Lebuh Campbell.

**Journey B, "just the menu":** Nav "Menu" (always one tap away) → filter by spice level or category → open a dish → back to menu.

---

## 5. Sitemap / information architecture

```
/                     Home: the scroll-story journey (sections H0 to H10)
/menu                 Interactive digital menu ("The Kandar Counter")
/menu/:dish           Dish detail (drawer on desktop, full sheet on mobile; deep-linkable)
/legacy               Seven generations: family timeline and archive (optional, can live on Home)
/visit                Location, hours, directions (also a Home section)
```

**Global navigation**
- Desktop: slim top bar with wordmark left; Story, Menu, Legacy, Visit; a persistent "Visit 164A" pill on the right.
- Mobile: wordmark and a menu button; full-screen overlay nav styled as a brass-rimmed tiffin lid opening. A sticky bottom bar on mobile with **Menu** and **Directions**.
- Scroll progress: the brass "pole" line across the top; two small pots at the ends fill as you progress.

---

## 6. Page and section requirements (Home)

Each section lists purpose, content, layout, interaction and mobile behaviour. **Wireframes must show all of these.**

### H0. Preloader: "Lighting the stove"
- **Purpose:** Set the sensory tone in under 2 seconds.
- **Content:** "1907" counting up to the current year, a flame or ember line that grows into the brass pole.
- **Interaction:** Plays once per session; skippable; skipped when `prefers-reduced-motion` is on.
- **Mobile:** Same, shorter duration.

### H1. Hero: "Since 1907. Seven generations. One pole that never rested."
- **Purpose:** Instant authority (oldest surviving nasi kandar in Malaysia) and emotional hook.
- **Content:** Headline, sub-line ("Malaysia's oldest nasi kandar, Lebuh Campbell, Penang"), kandar silhouette (pole and two pots), archival photo layer, CTAs **"Begin the journey"** (scroll) and **"See the menu"**.
- **Layout (desktop):** Oversized display type split around the kandar illustration; archival photo in a torn-paper or film-frame crop behind.
- **Interaction:** Cursor movement gently tilts the pole (balance physics); steam particles rise from the pots; the pole sways when you scroll.
- **Mobile:** Stacked; device tilt (gyro, with permission fallback) or touch-drag sways the pole.
- **Traces to:** BR-01, BR-05, BR-06, BR-09, GR-02

### H2. The Voyage: Chennai → Weld Quay
- **Purpose:** Tell the migration story (BR-02).
- **Content:** Stylised map across the Bay of Bengal from the Coromandel coast (Chennai / Ramanathapuram) to Penang's Weld Quay; 3 or 4 short story beats (the merchant, the spices he carried, arrival at the docks, the dockworkers he fed).
- **Layout (desktop):** Pinned section with **horizontal scroll**; a dashed route line draws itself as the user scrolls and a small ship travels along it; story cards pop in at waypoints.
- **Interaction:** Scroll-scrubbed route drawing; hover a waypoint to show a period illustration or archival photo.
- **Mobile:** Vertical map (route runs top to bottom), story beats stacked; no horizontal pinning.
- **Traces to:** BR-02, BR-07, BR-09

### H3. Under the Angsana Tree
- **Purpose:** The founding moment: the shoulder-pole stall on Campbell Street.
- **Content:** Archival photo of old Campbell Street or the stall era; short text explaining "kandar" (the bamboo pole); Angsana tree leaf motif.
- **Interaction:** **"Then / Now" slider**: drag to wipe from the sepia archival scene to today's shophouse at 164A. Leaves drift across on scroll.
- **Mobile:** Slider stays (touch drag); full-width image.
- **Traces to:** BR-07, BR-09

### H4. The Roasting Ritual (signature interaction)
- **Purpose:** Make the spice mastery tangible (BR-03). The memorable "wow" moment.
- **Content:** Whole spices laid out: coriander seed, cumin, fennel, cardamom, clove, cinnamon bark, star anise, dried chilli. A brass or iron kuali (wok).
- **Interaction:**
  1. Drag (or tap on mobile) spices into the kuali.
  2. A **roast meter** advances as the user holds or scrolls; spice colour deepens from raw to toasted to roasted; smoke wisps rise.
  3. Each spice shows a one-line note on hover or tap (aroma, role in the kuah).
  4. Finish state: "This is how every pot has started since 1907", which then leads into the dishes.
- **Fallback:** Reduced motion gives a static, step-by-step illustrated sequence.
- **Mobile:** Tap to add; a large press-and-hold button to roast.
- **Traces to:** BR-01, BR-03, GR-02

### H5. The Four Signatures
- **Purpose:** Hero the four dishes named in the brief (BR-04) without a grid (BR-10).
- **Content per dish:** Name (with Malay/Tamil names where relevant), a two- or three-line story, key spices (linked back to H4), heat level shown as chilli or flame marks, hero photo.
  - **Murtabak**
  - **Ayam Bawang** (chicken with onion)
  - **Mutton Kurma**
  - **Crab Curry** (Kari Ketam)
- **Layout (desktop):** Four full-viewport "chapters". Each chapter is a plated dish on a steel or banana-leaf plate, with big editorial type wrapped around it. Chapter numbers in Roman or Tamil numerals.
- **Interaction:** Scroll rotates the plate slightly and reveals ingredients orbiting it; hover a spice chip to highlight its role. "Find it on the menu" link opens that dish in `/menu`.
- **Mobile:** Swipeable stacked chapters (one per screen) with a pagination pole.
- **Traces to:** BR-04, BR-05, BR-10

### H6. "Banjir": the kuah pour
- **Purpose:** Teach the nasi kandar ritual of mixing curries over rice (kuah campur / "banjir", flooded). A cultural detail that makes the site unmistakably nasi kandar.
- **Content:** A plate of rice; three or four curry pots (kurma, crab, fish head, chicken).
- **Interaction:** Tap the pots to ladle; the gravy pours and "floods" the rice with blended colours; a label names the combination. CTA: "Build your own plate on the menu".
- **Mobile:** Same, tap only.
- **Traces to:** BR-01, BR-08, GR-02

### H7. Seven Generations
- **Purpose:** Prove longevity and family continuity (BR-09).
- **Content:** Timeline 1907 → today; one node per generation; key milestones (pole stall, first shophouse, 164A, press recognition, today). **All facts and names must be verified before hi-fi** (see section 13).
- **Layout:** The brass pole becomes a horizontal timeline; each generation is a "weight" hanging from it.
- **Interaction:** Drag or scroll along the timeline; nodes expand to show photo and caption; the year counter animates.
- **Mobile:** Vertical timeline.
- **Traces to:** BR-07, BR-09

### H8. From the Archive / Press
- **Purpose:** Third-party authority.
- **Content:** Archival video (from the brief's link) in a vintage film frame; NST 2019 feature pull-quote (short, attributed); heritage photos as a scattered "photo-on-the-table" collage.
- **Interaction:** Photos lift on hover (paper shadow); click to open a lightbox with caption and source credit. Video plays inline on click (never autoplay with sound).
- **Mobile:** Horizontal snap carousel of photos; video full-width.
- **Traces to:** BR-07

### H9. Visit 164A Lebuh Campbell
- **Purpose:** Convert interest into a visit.
- **Content:** Address, opening hours (Sun–Thu 10am–10pm; Fri 10am–12:30pm and 3pm–10pm, per FMT; re-check before launch), illustrated mini-map of George Town around Lebuh Campbell, nearby landmarks, **"Get directions"** (opens Google Maps), "Call".
- **Interaction:** Map pin bounces; hovering a landmark highlights the walking route.
- **Mobile:** Sticky "Directions" button; tap-to-call.
- **Traces to:** User journey A

### H10. Footer
- Wordmark, "Since 1907", social links, address, credits for archival sources, a small kandar sign-off animation.

---

## 7. Interactive Digital Menu: "The Kandar Counter" (/menu)

The real nasi kandar experience is walking along a counter of steel trays and pointing at curries. The menu recreates that, which keeps it clear of a delivery grid (BR-08, BR-10).

**Functional requirements**

| ID | Requirement |
|----|-------------|
| MN-01 | Categories shown as a horizontal **counter of steel trays**: Nasi & Rice, Curries (Kuah), Murtabak & Roti, Fried / Goreng, Seafood, Drinks (e.g. teh tarik) |
| MN-02 | Filters: spice level (1 to 5 chilli marks), protein (chicken, mutton, seafood, vegetarian), "Signature" tag |
| MN-03 | Dish detail drawer: photo, story line, key spices, heat level, pairing suggestion ("best with...") |
| MN-04 | **Build your plate**: pick rice plus up to N items plus kuah; a live illustrated plate assembles; the brass pole "balance" tips when the plate gets heavy (a playful cue) |
| MN-05 | "Show at counter" state: a full-screen, high-contrast summary of the chosen plate the user can show staff. No checkout. |
| MN-06 | Search by dish name (English and Malay) |
| MN-07 | Deep link to any dish (`/menu/murtabak`) for sharing |
| MN-08 | Prices shown only if verified; otherwise "Ask at counter". **Never invent prices.** |

**Layout**
- Desktop: counter strip at top (sticky), trays scroll horizontally; the selected tray expands below into an editorial list (photo, name, one-line story); a plate builder docked on the right.
- Mobile: counter as a swipeable tray rail; items as a vertical list; plate builder as a bottom sheet with a count badge.

---

## 8. Proposed design tokens (for reference; finalise in visual-design phase)

### Colour (BR-05)

| Token | Name | Hex (proposal) | Use |
|-------|------|----------------|-----|
| `--turmeric` | Turmeric | `#E2A012` | Primary accent, highlights, active states |
| `--saffron` | Deep saffron | `#D9661A` | CTAs, key interactive elements |
| `--cinnamon` | Roasted cinnamon | `#6E3B1F` | Headings on light, deep section backgrounds |
| `--brass` | Brass | `#B08D57` | The pole motif, rules, borders, icons |
| `--ember` | Smoked charcoal | `#1D1410` | Dark sections, roast end-state, body text on light |
| `--ivory` | Rice-paper ivory | `#F4EADB` | Base background |
| `--chilli` | Dried chilli | `#9E2B1C` | Heat indicators only (sparingly) |
| `--leaf` | Banana leaf | `#3E5B2E` | Rare accent: plating, vegetarian tags |

Contrast rule: body text only on ivory or ember. Turmeric and saffron never carry body text (WCAG AA).

### Typography (BR-06): proposal with reasoning
| Role | Typeface (Google Fonts) | Why |
|------|------------------------|-----|
| Display | **Fraunces** (variable, with "SOFT" and "WONK" axes) | Old-style, ink-trap warmth that reads hand-set and tactile; the variable axes can animate weight and softness on scroll (type that "roasts") |
| Body | **Source Serif 4** or **Literata** | Bookish and readable; supports the archival or editorial feel |
| Utility / labels | **Space Grotesk** or **IBM Plex Mono** | Ledger and trade-manifest feel for dates, coordinates, prices (nods to the spice-merchant trade) |
| Tamil accent | **Noto Serif Tamil** | Honours the founder's Tamil roots, used for single words or numerals, never full paragraphs |

Texture: subtle paper grain, letterpress emboss on display type, brass foil gradients on the pole motif.

### Layout and spacing
- 12-column grid at 1440 (max content width 1280), 4-column at 390.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Breakpoints: `sm 390`, `md 768`, `lg 1024`, `xl 1440`.

---

## 9. Motion and micro-interaction catalogue (GR-02)

| ID | Where | Trigger | Behaviour | Why (rationale seed) | Reduced-motion fallback |
|----|-------|---------|-----------|----------------------|------------------------|
| MO-01 | Global | Scroll | Brass pole progress bar; pots fill | Constant reminder of the kandar origin | Static bar |
| MO-02 | Global | Scroll depth | Page colour warms from ivory to ember ("roast heat") | The story deepens like a roast | Section colours, no blending |
| MO-03 | H1 | Cursor / tilt | Pole balance sway, steam particles | Tactile, alive, playful first impression | Static illustration |
| MO-04 | H2 | Scroll scrub | Route draws, ship sails | Makes the voyage physical | Full route drawn |
| MO-05 | H3 | Drag | Then/Now wipe | Shows continuity across 115 years | Side-by-side images |
| MO-06 | H4 | Drag / hold | Spices into kuali, roast colour shift, smoke | Signature sensory moment | Step sequence |
| MO-07 | H5 | Scroll | Plate rotation, ingredient orbit | Dishes as heroes, not thumbnails | Static plated image |
| MO-08 | H6 / MN-04 | Tap | Gravy pour and flood | Teaches a real cultural ritual | Instant fill |
| MO-09 | Display type | Scroll in | Fraunces weight and softness animate in | "Type that roasts" | Final weight |
| MO-10 | Buttons / links | Hover / press | Brass shimmer sweep; press squish (scale 0.97) | Tactile feedback | Colour change only |
| MO-11 | Cursor (desktop) | Over interactives | Custom cursor becomes a ladle or spice grain | Delight and brand texture | System cursor |
| MO-12 | Photos | Hover | Paper lift with soft shadow | Archival, tangible | None |

Motion principles: ease-out for entrances (300 to 600ms), physics-based springs for the pole, no motion over 1.2s blocking content, and everything honours `prefers-reduced-motion`.

---

## 10. Phase 1 deliverable: wireframes (local)

**Format:** Static greyscale HTML/CSS wireframes, runnable locally by opening `index.html` (no build step).

> The full file layout, the wireframe kit contract and file ownership are defined in [`tasks/CONVENTIONS.md`](tasks/CONVENTIONS.md). The tree below is a summary.

```
hameediyah/
├── SPEC.md                  ← this file
└── wireframes/
    ├── index.html           Home, sections H0 to H10 (desktop and mobile via responsive CSS)
    ├── menu.html            The Kandar Counter
    ├── flow.html            Sitemap and user journey diagram
    └── wireframe.css        Shared greyscale wireframe styles
```

**Wireframe conventions**
- Greyscale only, plus one annotation colour (e.g. blue) for interaction notes.
- Real photos from the asset register (section 14), shown in greyscale (`filter: grayscale(1)`) so the wireframe stays about structure. Use a labelled crossed box only where the register marks a gap.
- Videos embedded from YouTube using the IDs in section 14.
- Every section carries a numbered annotation tag (H1, H4...) matching this spec, with its interaction ID (MO-xx).
- Real headline copy, not lorem ipsum (copy carries the concept).
- A viewport toggle (desktop 1440 / mobile 390) to review both layouts.

**Phase 1 acceptance criteria**
- [x] All Home sections H0 to H10 wireframed at desktop and mobile
- [x] `/menu` wireframed including the plate builder and "Show at counter" state
- [x] Sitemap and Journey A / B flow diagram
- [x] Each section annotated with purpose, interaction ID(s) and BR trace
- [x] No dish grid anywhere (BR-10 check)
- [x] Opens locally in Chrome without errors

---

## 11. High-level task breakdown

> **Executable tasks live in [`tasks/README.md`](tasks/README.md)** (HAM-01 to HAM-22, with dependencies, file ownership and acceptance criteria). The tables below are the original high-level outline, kept for traceability.

### Phase 1: Discovery and wireframes (now)
| # | Task | Output | Traces |
|---|------|--------|--------|
| T1.1 | Review reference video, NST article and heritage post; pull facts and quotes | Fact sheet (verified vs unverified) | BR-07, BR-09 |
| T1.2 | Lock creative concept and narrative arc | Section 3 signed off | GR-01 |
| T1.3 | Define sitemap and user journeys | `flow.html` | DL-01 |
| T1.4 | Wireframe Home H0 to H10 (desktop) | `index.html` | DL-01 |
| T1.5 | Wireframe Home (mobile 390) | Responsive `index.html` | GR-04 |
| T1.6 | Wireframe Interactive Menu, plate builder, dish drawer | `menu.html` | BR-08 |
| T1.7 | Annotate interactions and motion (MO-xx) on wireframes | Annotations | GR-02 |
| T1.8 | Internal review against rubric and BR-10 anti-template check | Review notes | Rubric |

### Phase 2: Visual design (next)
| # | Task |
|---|------|
| T2.1 | Finalise palette, type, texture tokens |
| T2.2 | Moodboard: archival imagery, brass, spices, Penang shophouse details |
| T2.3 | Hi-fi key screens: Hero, Roasting Ritual, Signatures, Menu (desktop and mobile) |
| T2.4 | Illustration set: kandar pole, pots, kuali, spices, map, Angsana leaf |
| T2.5 | Source and license imagery; credit archival sources |

### Phase 3: Build
| # | Task |
|---|------|
| T3.1 | Set up stack (recommended: Vite + React + Tailwind + GSAP ScrollTrigger + Lenis smooth scroll) |
| T3.2 | Design tokens and global layout, nav, progress pole |
| T3.3 | Build sections H1 to H10 |
| T3.4 | Build the H4 Roasting Ritual and H6 Banjir interactions |
| T3.5 | Build `/menu` with data in a local JSON file |
| T3.6 | Responsive pass, reduced-motion pass, accessibility pass |
| T3.7 | Performance pass (image formats, lazy load, Lighthouse ≥ 90) |

### Phase 4: Rationale and submission
| # | Task |
|---|------|
| T4.1 | Write the rationale: brand strategy, UX and motion, client pitch value (DL-03) |
| T4.2 | Deploy to Vercel or Netlify; verify the URL in an incognito window |
| T4.3 | Add the Hameediyah entry to `submission.txt` (live URL, GitHub repo, rationale) |
| T4.4 | Optional: screen recording and screenshots into the Drive folder |

---

## 12. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Responsive | Designed layouts at 390, 768, 1024 and 1440; no horizontal page scroll on mobile; touch targets ≥ 44px |
| Accessibility | WCAG 2.1 AA contrast; full keyboard support for every interaction (roasting, plate builder, sliders); alt text on all archival photos; `prefers-reduced-motion` respected |
| Performance | LCP < 2.5s on 4G; images in AVIF/WebP; heavy interactions lazy-loaded below the fold |
| Browser | Latest Chrome, Safari (iOS) and Firefox |
| Content integrity | No invented facts, prices, names or quotes; archival sources credited |

---

## 13. Assumptions, open questions and risks

**Assumptions**
- English primary; Malay and Tamil used as accent words only.
- No real ordering; the menu is informational and experiential.
- Menu items beyond the four signatures can be representative placeholders, clearly marked, until a real menu is sourced.

**Open questions**
1. ~~Rights to photos and video~~ **Decided 5 Oct:** use photos and videos found online. Only freely licensed images (Wikimedia Commons: CC0, public domain, CC BY/BY-SA) and embedded YouTube videos go on the site. Copyrighted news or blog photos are reference only (section 14.4).
2. Is there a verified current menu and price list? (If not, MN-08 applies: "Ask at counter".)
3. Names and milestones for the 7 generations: what's verifiable from the NST article and heritage post?
4. ~~Opening hours~~ Found (FMT 2021; see H9). Re-check on Google Maps before launch, since they may have changed.
5. Single-page story plus `/menu`, or separate `/legacy` and `/visit` pages too? (Recommendation: Home plus `/menu` for the challenge, with Legacy and Visit as Home sections.)

**Risks**
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Deadline is 6 Oct 10:00 IST, and there are three brands in total | High | Wireframes time-boxed; build H1, H4, H5 and the menu first, since they carry the most rubric weight |
| Heavy animation hurts mobile performance | Medium | Mobile-specific simplified variants; lazy-load interactions |
| Archival image quality or rights | Medium | Illustrated fallbacks in the same style |
| Over-designed interactions confuse users | Medium | Every interaction has a visible hint and a skip path |

---

## 14. Asset register (photos, video, facts)

**Sourcing rule (decided 5 Oct):** use photos and video found online, under these conditions.
- **On the site:** only images with a free licence (CC0, public domain, CC BY, CC BY-SA), each credited in the footer credits panel, plus YouTube videos **embedded** with the standard player. Videos are never downloaded or re-uploaded; that breaks YouTube's terms.
- **Reference only:** photos from news sites, blogs, Instagram and the Penang heritage Facebook post are copyrighted. Use them to study the look and story; don't put them on the public site unless the restaurant gives permission.
- All embeddable status checked 5 Oct 2026 via YouTube oEmbed (HTTP 200 = embedding allowed).

### 14.1 Photos: cleared for use (Wikimedia Commons)

| Asset ID | Use in | Image | Licence / credit | Original |
|----------|--------|-------|------------------|----------|
| IMG-01 | H1 hero, H3 "Now" side | Hameediyah shopfront, Campbell St ([source](https://commons.wikimedia.org/wiki/File:Hameediyah_1.jpg)) | **CC0**, Slleong | 2524×3365 |
| IMG-02 | H8 / social proof ("the queue") | Queue outside Hameediyah ([source](https://commons.wikimedia.org/wiki/File:Hameediyah_2.jpg)) | **CC0**, Slleong | 4032×3024 |
| IMG-03 | H8 alt | Queue outside Hameediyah ([source](https://commons.wikimedia.org/wiki/File:Hameediyah_3.jpg)) | **CC0**, Slleong | 3304×2477 |
| IMG-04 | H9 Visit | Queue at Hameediyah ([source](https://commons.wikimedia.org/wiki/File:Hameediyah_4.jpg)) | **CC0**, Slleong | 2492×1869 |
| IMG-05 | H9 Visit, street context | Lebuh Campbell streetscape, May 2026 ([source](https://commons.wikimedia.org/wiki/File:Campbell_Street,_George_Town,_Penang_-_May_3_2026.jpg)) | CC BY-SA 4.0, Weareblahs | 3456×4608 |
| IMG-06 | **H2 Voyage arrival** | Weld Quay, Penang, c.1910 ([source](https://commons.wikimedia.org/wiki/File:KITLV_-_80022_-_Kleingrothe,_C.J._-_Medan_-_Weld_Quay,_Penang_-_circa_1910.tif)) | **Public domain**, C.J. Kleingrothe / KITLV | 3288×2171 |
| IMG-07 | H2 / H3 "Then" side | Weld Quay port, c.1910 ([source](https://commons.wikimedia.org/wiki/File:KITLV_-_80020_-_Kleingrothe,_C.J._-_Medan_-_Quay_in_Penang_-_circa_1910.tif)) | **Public domain**, C.J. Kleingrothe / KITLV | 4838×3238 |
| IMG-08 | H3 "Then" alt | Beach Street, Penang, c.1910 ([source](https://commons.wikimedia.org/wiki/File:KITLV_-_80026_-_Kleingrothe,_C.J._-_Medan_-_Beach_Street_in_Penang_-_circa_1910.tif)) | **Public domain**, C.J. Kleingrothe / KITLV | 3183×2161 |
| IMG-09 | H2 Penang waypoint (Tamil Muslim community anchor) | Kapitan Keling Mosque, Pitt St, c.1900 ([source](https://commons.wikimedia.org/wiki/File:KITLV_-_3648_-_Lambert_%26_Co.,_G.R._-_Singapore_-_Captain_Kling_Mosque_(built_in_1801),_Pitt_Street,_Penang_Island_-_circa_1900.tif)) | **Public domain**, G.R. Lambert & Co. / KITLV | 3360×2631 |
| IMG-10 | H2 Penang harbour postcard | "Penang. Harbour of Government Office" postcard ([source](https://commons.wikimedia.org/wiki/File:Penang._Harbour_of_Government_Offiece_(sic)_(NYPL_Hades-2359567-4044331).jpg)) | **Public domain**, NYPL | 4573×2921 |
| IMG-11 | **H2 Voyage departure** | Madras harbour, historic ([source](https://commons.wikimedia.org/wiki/File:Madras_harbour.jpg)) | **Public domain** | 1290×950 |
| IMG-12 | H2 departure alt (engraving) | "The New Harbour Works at Madras", The Graphic, 1880 ([source](https://commons.wikimedia.org/wiki/File:%22The_New_Harbour_Works_at_Madras,%22_from_The_Graphic,_1880.jpg)) | **Public domain** | 1422×1108 |
| IMG-13 | H6 Banjir, menu hero | Nasi kandar plate ([source](https://commons.wikimedia.org/wiki/File:Nasi_kandar_-_01.jpg)) | CC BY-SA 4.0, Wiki Asmah | 9200×6900 |
| IMG-14 | Menu, Nasi tray | Nasi kandar plate ([source](https://commons.wikimedia.org/wiki/File:Nasi_kandar_-_02.jpg)) | CC BY-SA 4.0, Wiki Asmah | 9200×6900 |
| IMG-15 | Menu alt | Nasi kandar ([source](https://commons.wikimedia.org/wiki/File:Nasi_Kandar_Kayu.jpg)) | CC BY-SA 4.0, Dannyjafni | 4618×3464 |
| IMG-16 | **H5 Murtabak** (stand-in) | Murtabak ([source](https://commons.wikimedia.org/wiki/File:Murtabak.jpg)) | CC BY-SA 4.0, Mojackjutaily | 3264×2448 |
| IMG-17 | **H5 Crab Curry** (stand-in) | Crab curry ([source](https://commons.wikimedia.org/wiki/File:Crab_Curry.jpg)) | CC BY-SA 4.0, Neil1422 | 3120×4208 |
| IMG-18 | **H4 Roasting Ritual** | Whole spices ([source](https://commons.wikimedia.org/wiki/File:Whole_Spice_-_April_2024_-_Sarah_Stierch_01.jpg)) | CC BY 4.0, Sarah Stierch | 5712×4284 |
| IMG-19 | H4 cinnamon bark close-up | Cassia bark ([source](https://commons.wikimedia.org/wiki/File:Whole_spices.jpg)) | CC BY-SA 4.0, Cholena Nashan | 700×525 |
| IMG-20 | H3 Angsana motif, traced into line art | *Pterocarpus indicus* (Angsana) botanical plate, Blanco ([source](https://commons.wikimedia.org/wiki/File:Pterocarpus_indicus_Blanco1.205.png)) | **Public domain** | 1417×2092 |
| IMG-21 | Menu, Drinks tray | Teh tarik being pulled ([source](https://commons.wikimedia.org/wiki/File:Teh_tarik_man_pulling_tea.jpg)) | CC BY-SA 2.0, Cheng from Austin | 1398×1649 |

Notes:
- **Food photos are stand-ins.** They are not Hameediyah's own dishes. Fine for wireframes and the internal pitch; replace them with the restaurant's photography if they become a client.
- **Licence obligations:** CC BY and BY-SA images need the author's name and licence in a credits panel. CC0 and public domain need no credit, but we credit the archives (KITLV, NYPL) anyway, because the archival story is part of the brand.
- **Delivery size:** use Commons' 1920px thumbnails (JPEG), not the original files. The KITLV originals are 20 to 45 MB TIFFs.

### 14.2 Gaps (no free image found)

| Need | Section | Plan |
|------|---------|------|
| **Ayam Bawang** | H5, menu | Illustrated dish (line art in the brand style), or ask the restaurant for a photo |
| **Mutton Kurma** | H5, menu | Same as above |
| A kandar hawker with a shoulder pole (archival) | H1, H3 | Illustrate from reference (see 14.4); the Ah Quee Street "Kandar" sculpture is a good drawing reference |
| Founder or family portraits | H7 | Silhouettes plus captions until we have the family's permission |

### 14.3 Video (YouTube embeds, all embedding-enabled)

| Asset ID | Use in | Video | Channel |
|----------|--------|-------|---------|
| VID-01 | **H8 Archive (primary)** | [The Oldest Nasi Kandar In Malaysia, Foodie Originals](https://www.youtube.com/watch?v=nKT1Vyo77wI) (interview with owner Ahamed Seeni Pakir) | Foodie |
| VID-02 | H8 alt, "112 years" | [Hameediyah Penang Oldest Nasi Kandar, 112 Years Since 1907](https://www.youtube.com/watch?v=OHx8d1uIuB8) | Hock Chai's Flavours Talk |
| VID-03 | H6 Banjir (kuah pour b-roll) | [Hameediyah Restaurant, Penang: Famous & Fabulous Nasi Kandar](https://www.youtube.com/watch?v=kJ8Uq8D9T_4) | 48 Holiao |
| VID-04 | H5 | [The OLDEST & BEST Nasi Kandar in ALL of Malaysia](https://www.youtube.com/watch?v=UKXhxgobtHc) | Dan vs Food |
| VID-05 | spare | [The Oldest Nasi Kandar In The World Since 1907](https://www.youtube.com/watch?v=5OCiOgW2EYc) | Cgodo Tv |
| VID-06 | spare | [FISH HEAD and NASI KANDAR: 100 Year Old Restaurant](https://www.youtube.com/watch?v=OgPPaM-WKeg) | Irfan's view |
| VID-07 | spare (Malay-language) | [Nasi Kandar Hameediyah, Lebuh Campbell](https://www.youtube.com/watch?v=4nkPlCicDbc) | SURR TV |
| VID-08 | spare | [Malaysia's Oldest Nasi Kandar](https://www.youtube.com/watch?v=Bl6oR6BDh30) | The Next Adventure |
| VID-00 | H8 (if shareable) | Archival footage from the brief ([Drive link](https://drive.google.com/file/d/17X_8d2uYF9OJ1LQBmIaGtR9JXVtAHb2T/view)) | Internal, from the brief. **Check whether it's OK on a public site** |

Embed rules: `youtube-nocookie.com` domain, click-to-load poster (no iframe until clicked, which keeps the page fast), no autoplay with sound.

### 14.4 Reference only (copyrighted; don't put on the site)
- NST 2019 feature: [nst.com.my](https://www.nst.com.my/news/nation/2019/08/514320/hameediyah-penangs-oldest-nasi-kandar-restaurant-still-going-strong)
- NST 2021, kandar-pole food donation (the 2021 re-enactment with poles and baskets is great story material): [nst.com.my](https://api.nst.com.my/news/nation/2021/08/717959/hameediyah-distributes-nasi-kandar-traditional-way)
- Malay Mail 2020, Malaysia Book of Records title: [malaymail.com](https://www.malaymail.com/news/eat-drink/2020/07/07/penangs-hameediyah-named-malaysias-oldest-nasi-kandar-restaurant/1882333)
- FMT 2021, oldest eateries in Penang (hours, facade): [freemalaysiatoday.com](https://fmtv5.freemalaysiatoday.com/category/highlight/2021/01/23/the-oldest-food-stalls-and-restaurants-in-penang)
- Travels with Sun, dish photos: [travelswithsun.com](https://www.travelswithsun.com/hameediyah-restaurant-at-campbell-street-penang/)
- Penang heritage Facebook post (from the brief): [facebook.com](https://www.facebook.com/groups/penangtoday/posts/3137769789707580/)
- Bamboo kandar pole, Singapore National Heritage Board collection: [roots.gov.sg](https://www.roots.gov.sg/collection-landing/listing/1071011)
- Kandar sculpture, Ah Quee St: [penang-traveltips.com](https://www.penang-traveltips.com/kandar-sculpture.htm)
- Instagram: @hameediyah_restaurant_1907

### 14.5 Facts found during sourcing

| Fact | Source | Status |
|------|--------|--------|
| Named Malaysia's oldest nasi kandar restaurant by the Malaysia Book of Records, 2020 | Malay Mail, FMT | Verified (2 sources) |
| Address: 164 / 164A Lebuh Campbell, 10100 George Town | FMT, brief | Verified |
| Hours: Sun–Thu 10am–10pm; Fri 10am–12:30pm, 3pm–10pm | FMT 2021 | Re-check: a 2024 review (Travels with Sun) lists daily 10am–10pm |
| Signature yellow-green shopfront | FMT | Verified (also visible in IMG-01). Consider it for an accent colour |
| Current owner: Ahamed Seeni Pakir Abdul Shukor | NST 2021, Malay Mail 2020 | Verified (name). His generation number is a **Conflict** (6th: NST 2019, Foodie video; 7th: FMT 2020, NST 2021). **Decided:** say "seven generations" for the family and never number the owner (`docs/FACTS.md`) |
| The family business has reached its seventh generation | Malay Mail 2020 (Book of Records), FMT 2020, NST 2019, NST 2021 | Verified (4 sources) |
| Founder M. Mohamed Thamby Rawther, spice trader from Tamil Nadu, arrived early 1900s | NST 2019, FMT 2020 | Verified. Town (Chittarkottai, Ramanathapuram) is single-source (NST 2019) |
| Started selling under a tree in a field on Campbell Street, food carried in two containers on a pole | NST 2019, FMT 2020, FMT 2021 | Verified. "Angsana" is single-source (NST 2019) plus the brief |
| Departure from Chennai; landing at Weld Quay | Brief only | **Unverified.** Sources say "Tamil Nadu" and "the docks at the nearby jetty" |
| Whole spices bought, roasted and ground in-house | NST 2019 (roast, grind), FMT 2020 (pestle and mortar) | Verified (grinding); roasting single-source |
| Malaysia Book of Records award date | Malay Mail, FMT | Verified: 7 Jul 2020 |
| Crab Curry, Ayam Bawang on the Campbell Street menu | Brief; Ayam Bawang at the Ampang branch (EatDrinkKL 2021) | **Unverified.** Keep as brief requirements with `[VERIFY]` |
| 2021: staff carried nasi kandar on shoulder poles to give 250 packets to the needy | NST 2021 | Verified. Strong story beat for H3 or H7 |
| Also known for murtabak, fish head curry, biryani | FMT, Hungry Onion | Verified |
