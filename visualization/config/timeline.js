const TIMELINE_CATEGORIES = [
  "Present",
  "1865",
  "1910s-20s",
  "1930s-40s",
  "1950s-60s",
  "1970s-80s",
  "2000s",
  "Present"
];

const FRAME_TO_FILLED_BUCKET = [
  -1, // frame 0  -> title
  -1, // frame 1  -> split (40 acres promise)
  0,  // frame 2  -> split (Current Situation) -> Present
  0,  // frame 3  -> card (What if) -> Present
  1,  // frame 4  -> card (1865) -> 1865
  1,  // frame 5  -> card (Our Simulation) -> 1865
  1,  // frame 6  -> card (statsYear 1880) -> 1865
  2,  // frame 7  -> card (1910s-20s) -> 1910s-20s
  2,  // frame 8  -> card (Our Simulation) -> 1910s-20s
  2,  // frame 9  -> card (statsYear 1920) -> 1910s-20s
  3,  // frame 10 -> card (1930s-40s) -> 1930s-40s
  3,  // frame 11 -> card (statsYear 1940) -> 1930s-40s
  4,  // frame 12 -> card (1950s-60s) -> 1950s-60s
  4,  // frame 13 -> card (statsYear 1960) -> 1950s-60s
  5,  // frame 14 -> card (1970s-80s) -> 1970s-80s
  5,  // frame 15 -> card (Our Simulation) -> 1970s-80s
  6,  // frame 16 -> card (2000s) -> 2000s
  7,  // frame 17 -> card (Present Day) -> Present
  7,  // frame 18 -> card (Beyond outright violence) -> Present
  7,  // frame 19 -> card (hideViz, conclusion) -> Present
  7,  // frame 20 -> card (hideViz, But what if) -> Present
  7,  // frame 21 -> card (What if systematic theft) -> Present
  7,  // frame 22 -> toggle (TE) -> Present
  7,  // frame 23 -> toggle (SE) -> Present
  7,  // frame 24 -> toggle (IE) -> Present
  7,  // frame 25 -> toggle (AE) -> Present
  7,  // frame 26 -> card (Explore / dataset toggle) -> Present
];
