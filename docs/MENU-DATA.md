# Hameediyah · Menu data (The Kandar Counter)

**Owner:** HAM-03 · **Last checked:** 5 Oct 2026 · **Used by:** HAM-10 (wireframe), HAM-19 (build, as JSON)

## Rules for this table

- **The menu is representative, not the restaurant's current menu** (SPEC §13 assumption). It's compiled from press and reviews dated 2014–2024, so the menu page shows a visible notice: "Compiled from press and reviews, 2014–2024. Check the current menu with the restaurant."
- **Every dish is sourced.** Source IDs (S1–S11, B) are defined in [`FACTS.md`](FACTS.md#sources). A dish seen only at a branch (S8, Ampang) or only in the brief (B) carries in its story.
- **Price:** always "Ask at counter" (MN-08). Two dated prices exist (S9, Mar 2024: lamb shank RM50, biryani with fried chicken RM16). They're kept in the notes below for reference only and are **not displayed**: they're 2½ years old and come from one blog.
- **Heat 1–5 is an editorial estimate, not a sourced fact.** No source gives heat levels. Treat the whole column as.
- **"Pairs with" is an editorial suggestion** built from dishes on this list. It isn't a claim about how Hameediyah serves them.
- **Signature = the four dishes named in the brief (BR-04).** Other house favourites are noted in the story line instead.
- **Trays (MN-01):** `nasi` Nasi & Rice · `kuah` Curries (Kuah) · `roti` Murtabak & Roti · `goreng` Fried / Goreng · `laut` Seafood · `minum` Drinks.
- **Protein (MN-02):** `chicken` (includes duck and turkey) · `mutton` · `beef` · `seafood` · `vegetarian` · `egg`. Beef and egg are extra values because the menu has them; filters must handle them.

## Dishes

| slug | name (EN) | name (Malay) | tray | protein | heat | signature | one-line story | pairs with | price | source |
|------|-----------|--------------|------|---------|------|-----------|----------------|------------|-------|--------|
| murtabak | Murtabak | Murtabak | roti | chicken / mutton | 2 | y | Folded on the hot griddle at the front door; in full view of the queue. | kari-daging, dalca | Ask at counter | S1, S3, S6, S8, S9 |
| ayam-bawang | Chicken with onion | Ayam Bawang | kuah | chicken | 2 | y | Fried chicken simmered in a slow, sweet onion gravy: an easy first plate. | nasi-kandar, kuah-campur | Ask at counter | S8, B |
| mutton-kurma | Mutton kurma | Kurma Kambing | kuah | mutton | 1 | y | Mild, thick and pale: one of the house signatures. | nasi-briyani, murtabak | Ask at counter | S3, S6 |
| kari-ketam | Crab curry | Kari Ketam | laut | seafood | 4 | y | Whole crab in a deep red kuah. | nasi-kandar, telur-rebus | Ask at counter | B |
| nasi-kandar | Nasi kandar (steamed rice) | Nasi Kandar | nasi | vegetarian | 1 | n | The plate it all starts on: rice first, then your pieces, then the kuah. | kuah-campur, ayam-kapitan | Ask at counter | S1, S4, S5 |
| kuah-campur | Mixed gravies over rice | Kuah Campur ("banjir") | nasi | vegetarian | 3 | n | Ask for a ladle of several curries over your rice. Regulars call a full flood *banjir*. | nasi-kandar | Ask at counter | Nasi kandar ordering custom (SPEC §6 H6). |
| nasi-briyani | Biryani rice | Nasi Briyani | nasi | vegetarian | 2 | n | Bright orange grains, cooked the old-fashioned way. | mutton-kurma, ayam-goreng | Ask at counter | S1, S3, S6 |
| briyani-ayam-goreng | Biryani with fried chicken | Nasi Briyani Ayam Goreng | nasi | chicken | 2 | n | Fragrant biryani topped with crisp spiced chicken. | kuah-campur | Ask at counter | S9 |
| nasi-tomato | Tomato rice | Nasi Tomato | nasi | vegetarian | 1 | n | Tomato-tinted rice, a softer base than biryani. | kari-itik | Ask at counter | S7 |
| telur-rebus | Hard-boiled egg | Telur Rebus | nasi | egg | 1 | n | A classic side; part of the old 20-to-30-sen plate. | kari-ketam, kari-ikan | Ask at counter | S5 |
| bendi | Boiled okra | Bendi Rebus | nasi | vegetarian | 1 | n | Ladies' fingers; part of the old 20-to-30-sen plate. | kari-ikan | Ask at counter | S5 |
| ayam-kapitan | Kapitan chicken | Kari Ayam Kapitan | kuah | chicken | 3 | n | A thick, rich chicken curry; its spice mix is a family recipe. | nasi-kandar, nasi-briyani | Ask at counter | S1, S3, S5, S6, S7 |
| kari-ayam | Chicken curry | Kari Ayam | kuah | chicken | 3 | n | The everyday curry whose spice blend, the family says, hasn't changed in 100 years. | nasi-kandar | Ask at counter | S3 |
| kari-daging | Beef curry | Kari Daging | kuah | beef | 3 | n | The family says they made more of it during the 1940s occupation. | murtabak, nasi-kandar | Ask at counter | S1, S3, S7 |
| rendang-daging | Beef rendang | Rendang Daging | kuah | beef | 3 | n | Slow-cooked until the gravy clings to the meat. | nasi-kandar | Ask at counter | S1, S3, S6 |
| daging-masak-hitam | Beef in dark soy gravy | Daging Masak Hitam | kuah | beef | 2 | n | On the plate the family remembers selling for 20 to 30 sen. | nasi-kandar, bendi | Ask at counter | S5 |
| mutton-mysore | Mutton Mysore | Kambing Mysore | kuah | mutton | 4 | n | A dry, peppery mutton fry, and a house favourite. | nasi-kandar | Ask at counter | S3 |
| kari-kambing | Mutton curry | Kari Kambing | kuah | mutton | 3 | n | Thick and deeply spiced. | nasi-briyani | Ask at counter | S6, S7 |
| lamb-shank | Lamb shank | Kambing Shank | kuah | mutton | 2 | n | A whole shank in the house masala. | nasi-briyani | Ask at counter | S8, S9 |
| kari-ayam-belanda | Turkey curry | Kari Ayam Belanda | kuah | chicken | 3 | n | Giant turkey legs in curry, a Hameediyah oddity worth the photo. | nasi-kandar | Ask at counter | S5, S6 |
| ayam-masak-ros | Chicken in rose gravy | Ayam Masak Ros | kuah | chicken | 1 | n | Mild, sweet-tomato gravy for those who want less heat. | nasi-tomato | Ask at counter | S5 |
| kari-itik | Duck curry | Kari Itik | kuah | chicken | 3 | n | Duck drumsticks in the house spice blend. | nasi-tomato | Ask at counter | S7, S8 |
| dalca | Dhal curry | Dalca | kuah | vegetarian | 2 | n | Lentils and vegetables; the family's dhal recipe is a century old. | murtabak, nasi-kandar | Ask at counter | S3, S7 |
| kari-kepala-ikan | Fish-head curry | Kari Kepala Ikan | laut | seafood | 4 | n | A whole fish head in a sour, spiced kuah. Big enough to share. | nasi-kandar | Ask at counter | S7, S8, SPEC §14.5 |
| kari-ikan | Fish curry | Kari Ikan | laut | seafood | 3 | n | On the 20-to-30-sen plate the family remembers from the old days. | nasi-kandar, bendi | Ask at counter | S5 |
| kari-sotong | Squid curry | Kari Sotong | laut | seafood | 3 | n | Tender squid in a red curry. | nasi-kandar | Ask at counter | S7 |
| telur-ikan | Fish roe | Telur Ikan | laut | seafood | 2 | n | Fried roe, one of the lesser-known house signatures. | nasi-kandar | Ask at counter | S3 |
| sotong-goreng | Fried squid | Sotong Goreng | goreng | seafood | 2 | n | A best-seller: crisp, spiced squid. | nasi-kandar, kuah-campur | Ask at counter | S8, S9 |
| ayam-goreng | Fried chicken | Ayam Goreng | goreng | chicken | 2 | n | Marinated in spices, fried crisp, still juicy inside. | nasi-briyani | Ask at counter | S6, S9 |
| ayam-rempah | Spice-rubbed chicken | Ayam Rempah | goreng | chicken | 3 | n | Chicken fried in a thick rempah (spice paste). | nasi-kandar | Ask at counter | S7 |
| mee-goreng | Fried noodles | Mee Goreng | goreng | seafood | 3 | n | Wok-fried noodles; a long-time favourite. | iced-lemon-tea | Ask at counter | S1, S8 |
| tandoori-ayam | Tandoori chicken | Ayam Tandoori | goreng | chicken | 2 | n | From Hameediyah Tandoori House, two doors down. | roti-naan | Ask at counter | S1, S8 |
| roti-naan | Naan | Roti Naan | roti | vegetarian | 1 | n | Soft naan straight from the tandoor. | tandoori-ayam, mutton-kurma | Ask at counter | S8 |
| teh-tarik | Pulled milk tea | Teh Tarik | minum | vegetarian | 1 | n | Sweet milk tea, poured from a height until it froths. | murtabak | Ask at counter | SPEC §7 MN-01 (example) |
| iced-lemon-tea | Iced lemon tea | Teh O Ais Limau | minum | vegetarian | 1 | n | Strong, not too sweet: the cool-down after the kuah. | mee-goreng, nasi-briyani | Ask at counter | S9 |

**Count:** 35 dishes · 4 signatures · trays: nasi 7, kuah 14, roti 2, goreng 5, laut 5, minum 2.

## Notes

- **Ayam Bawang and Crab Curry** are brief requirements with weak or no sourcing at Campbell Street. They stay on the menu as signatures, each with a, until the restaurant confirms them (open question for the user, see the HAM-03 log).
- **Murtabak fillings:** S8 says chicken or mutton, onions and ghee. S6 (2014, via search summary) adds beef, prawn and vegetarian options. Not used until re-checked.
- **Kuah campur** is a row so the menu can show it in the Nasi tray and so the H6 banjir CTA has something to deep-link to.
- **Dated prices (not displayed):** lamb shank RM50, biryani with fried chicken RM16 (S9, 3 Mar 2024).
- **Search terms (MN-06):** the search should match the EN name, the Malay name and the slug (for example "ketam", "kambing", "ayam").
