// Fixed timeline categories (top bar labels). Index 0 = leftmost, 7 = rightmost.
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

// Frame index → last bucket index to fill (inclusive). -1 = no buckets filled.
// Bucket indices: 0=Present, 1=1865, 2=1910s-20s, 3=1930s-40s, 4=1950s-60s, 5=1970s-80s, 6=2000s, 7=Present
const FRAME_TO_FILLED_BUCKET = [
    -1, -1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,  // frames 0–12
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6,  // frames 13–24
    6, 6, 7, 7, 7, 7, 7,                   // frames 25–31
];
