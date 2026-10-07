// Photographs supplied by Hameediyah Restaurant (company profiles, 2022 and 2025).
// Files live in public/img/real. Unlike assets.ts this file is hand-written.

export interface RealAsset { id: string; src: string; alt: string; credit: string; license: string; width: number; height: number; usedIn: string }

const B = import.meta.env.BASE_URL
const CREDIT = 'Hameediyah Restaurant'
const LICENSE = 'Courtesy of Hameediyah'

function r(id: string, file: string, w: number, h: number, alt: string, usedIn: string): RealAsset {
  return { id, src: `${B}img/real/${file}.webp`, alt, credit: CREDIT, license: LICENSE, width: w, height: h, usedIn }
}

export const realImages = {
  // Dishes, shot by the restaurant on its signature yellow
  'R-murtabak': r('R-murtabak', 'dish-murtabak', 533, 356, 'Hameediyah’s murtabak on a white plate: a golden, griddle-browned square of folded bread, with pickled onion on the side.', 'H5, menu'),
  'R-ayam-bawang': r('R-ayam-bawang', 'dish-ayam-bawang', 533, 356, 'Nasi kandar with ayam bawang: fried chicken under a glossy red onion sambal with curry leaves and okra, over rice.', 'H5, H6, menu'),
  'R-mutton-kurma': r('R-mutton-kurma', 'dish-mutton-kurma', 533, 356, 'Kambing kurma: tender mutton in a pale, creamy kurma, with a sprig of mint.', 'H5, menu'),
  'R-mutton-mysore': r('R-mutton-mysore', 'dish-mutton-mysore', 533, 356, 'Kambing Mysore: dark, dry-fried mutton with coriander, star anise and a whole egg.', 'menu'),
  'R-ayam-kapitan': r('R-ayam-kapitan', 'dish-ayam-kapitan', 377, 252, 'Ayam kapitan: chicken pieces in a thick, spiced kapitan gravy.', 'menu'),
  'R-rendang-daging': r('R-rendang-daging', 'dish-rendang-daging', 390, 261, 'Daging rendang: slow-cooked beef in dark rendang with a turmeric leaf.', 'menu'),
  'R-lamb-shank': r('R-lamb-shank', 'dish-lamb-shank', 533, 356, 'Two lamb shanks in red curry, with coriander and a whole red chilli.', 'menu'),
  'R-kari-itik': r('R-kari-itik', 'dish-kari-itik', 533, 356, 'Kari itik: a duck leg in thick, spiced curry.', 'menu'),
  'R-kari-ayam': r('R-kari-ayam', 'dish-kari-ayam', 533, 356, 'Ayam kari: a whole chicken leg in golden curry gravy.', 'menu'),
  'R-kari-kambing': r('R-kari-kambing', 'dish-kari-kambing', 533, 356, 'Kambing kari: mutton in a rich orange curry with a turmeric leaf.', 'menu'),
  'R-kari-kepala-ikan': r('R-kari-kepala-ikan', 'dish-kari-kepala-ikan', 593, 392, 'Kari kepala ikan: a whole fish head in tangy red curry with okra, tomato and green chilli.', 'menu'),
  'R-sotong-goreng': r('R-sotong-goreng', 'dish-sotong-goreng', 533, 356, 'Sotong goreng Apollo: whole squid fried crisp in spice.', 'menu'),
  'R-kari-sotong': r('R-kari-sotong', 'dish-kari-sotong', 533, 356, 'Sotong kari: whole squid in red curry with curry leaves.', 'menu'),
  'R-telur-ikan': r('R-telur-ikan', 'dish-telur-ikan', 533, 356, 'Telur ikan: fried fish roe with a red chilli.', 'menu'),
  'R-nasi-briyani': r('R-nasi-briyani', 'dish-nasi-briyani', 533, 356, 'Nasi briyani udang: saffron biryani rice topped with two large prawns.', 'menu'),
  'R-ayam-goreng': r('R-ayam-goreng', 'dish-ayam-goreng', 533, 356, 'Ayam goreng: golden fried chicken pieces in a woven basket.', 'menu'),
  'R-rendang-pouch': r('R-rendang-pouch', 'rendang-pouch', 449, 278, 'Three retail pouches of Hameediyah rendang daging lembu.', 'H9'),

  // The family, from the restaurant's archive
  'R-anc-1': r('R-anc-1', 'anc-1', 296, 444, 'Portrait of K.M.P. Mohamed Sheriff Rawther in a white shirt and black songkok.', 'H7'),
  'R-anc-2': r('R-anc-2', 'anc-2', 296, 444, 'Portrait of N.M.S. Aboo Backer Rawther in a white shirt and black songkok.', 'H7'),
  'R-anc-3': r('R-anc-3', 'anc-3', 296, 444, 'Studio portrait of a young N.M.P. Abdul Hameed Rawther, stamped “M.C.O. Penang”.', 'H7'),
  'R-anc-4': r('R-anc-4', 'anc-4', 296, 444, 'Portrait of N.M.P. Abdul Aziz Rawther in a white shirt and black songkok.', 'H7'),
  'R-anc-5': r('R-anc-5', 'anc-5', 296, 444, 'Portrait of N.M.A. Mohamed Mohideen Rawther in a white shirt and black songkok.', 'H7'),
  'R-anc-6': r('R-anc-6', 'anc-6', 296, 444, 'Portrait of N.M.A. Abdul Sukkoor Rawther in a white shirt and black songkok.', 'H7'),

  // The shop in the 1970s
  'R-1970-crew': r('R-1970-crew', 'era70-1', 531, 339, 'The Hameediyah crew in the 1970s, standing together inside the shop in white shirts and sarongs.', 'H3, H8'),
  'R-1970-counter': r('R-1970-counter', 'era70-2', 531, 343, 'A cook in a patterned shirt laughs at the counter in the 1970s, beside a man holding a small child.', 'H8'),
  'R-1970-griddle': r('R-1970-griddle', 'era70-3', 531, 357, 'Two cooks at the murtabak griddle in the 1970s, dough balls lined up beside the hot plate.', 'H8'),
  'R-1970-trays': r('R-1970-trays', 'era70-4', 531, 345, 'The 1970s curry counter: rows of trays and pots, a cook serving and customers waiting.', 'H8'),
  'R-1970-doorway': r('R-1970-doorway', 'era70-5', 531, 343, 'The Hameediyah doorway on Campbell Street in the 1970s, with the vertical name sign and a “Murtabak $1.50” board.', 'H3, H8'),
  'R-1970-murtabak': r('R-1970-murtabak', 'era70-6', 531, 365, 'Under a “Murthabah $1.50” sign, cooks prepare food at a busy 1970s counter.', 'H8'),

  // Outlets today
  'R-outlet-campbell': r('R-outlet-campbell', 'outlet-campbell', 532, 355, 'The yellow Hameediyah Restaurant signboards above 164-A Lebuh Campbell, lit at night.', 'H9'),
  'R-outlet-prai': r('R-outlet-prai', 'outlet-prai', 532, 355, 'Hameediyah’s Prai outlet: a green shopfront with the restaurant name in yellow and diners at tables.', 'H9'),
  'R-outlet-ampang': r('R-outlet-ampang', 'outlet-ampang', 532, 355, 'Hameediyah’s Ampang outlet: the yellow and green signboard over an open-front dining room.', 'H9'),
  'R-outlet-sungai-ara': r('R-outlet-sungai-ara', 'outlet-sungai-ara', 532, 355, 'Hameediyah’s Sungai Ara outlet with its pale signboard over the entrance.', 'H9'),
  'R-outlet-bukit-bintang': r('R-outlet-bukit-bintang', 'outlet-bukit-bintang', 536, 402, 'The Bukit Bintang outlet in Kuala Lumpur: a green awning reading “The Oldest Nasi Kandar in Malaysia, est. 1907”, with tables outside.', 'H9'),
  'R-outlet-fine-dining': r('R-outlet-fine-dining', 'outlet-fine-dining', 596, 357, 'The Bukit Bintang fine-dining room: a long wooden table under warm pendant lights.', 'H9'),
  'R-outlet-masjid-india': r('R-outlet-masjid-india', 'outlet-masjid-india', 383, 510, 'Hameediyah’s Masjid India outlet in Kuala Lumpur, its yellow sign above a heritage arcade.', 'H9'),

  // People and proof
  'R-chef': r('R-chef', 'chef-ithrees', 558, 752, 'Chef A.S.S. Haji Ithrees in black chef’s whites and cap, giving a thumbs-up.', 'H4'),
  'R-cert-records': r('R-cert-records', 'cert-book-of-records', 397, 561, 'The Malaysia Book of Records certificate naming Hameediyah the oldest nasi kandar restaurant.', 'H7'),
  'R-cert-heritage': r('R-cert-heritage', 'cert-heritage', 397, 561, 'The George Town World Heritage Incorporated certificate of Cultural Continuity Recognition, Platinum status.', 'H7'),
} satisfies Record<string, RealAsset>

export type RealId = keyof typeof realImages

export const LOGO = { src: `${B}img/real/logo.webp`, width: 960, height: 308 }
