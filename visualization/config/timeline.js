const TIMELINE_CATEGORIES = [
    'Present',
    '1865',
    '1910s-20s',
    '1930s-40s',
    '1950s-60s',
    '1970s-80s',
    '2000s',
    'Present',
];

// indexes are into TIMELINE_CATEGORIES (array is 0-indexed)
const FRAME_TO_FILLED_BUCKET = [
    -1, -1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,  // frames 0–12
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6,       // frames 13–24
    6, 6, 7, 7, 7, 7, 7,                      // frames 25–31
];
