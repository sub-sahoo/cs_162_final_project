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

// indexes are into TIMELINE_CATEGORIES (array is 0-indexed)
const FRAME_TO_FILLED_BUCKET = [
  -1, // frame 0
  -1, // frame 1
  0, // frame 2  -> Present
  0, // frame 3  -> Present
  1, // frame 4  -> 1865
  1, // frame 5  -> 1865
  1, // frame 6  -> 1865
  2, // frame 7  -> 1910s-20s
  2, // frame 8  -> 1910s-20s
  2, // frame 9  -> 1910s-20s
  3, // frame 10 -> 1930s-40s
  3, // frame 11 -> 1930s-40s
  4, // frame 12 -> 1950s-60s
  4, // frame 13 -> 1950s-60s
  5, // frame 14 -> 1970s-80s
  5, // frame 15 -> 1970s-80s
  6, // frame 16 -> 2000s
  7, // frame 17 -> Present
  7, // frame 18 -> Present
  7, // frame 19 -> Present
  7, // frame 20 -> Present
  7, // frame 21 -> Present
  7, // frame 22 -> Present
  7 // frame 23 -> Present
];
