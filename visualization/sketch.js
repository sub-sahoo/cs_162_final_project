const frames = [
    {
        template: 'title',
        title: '40 acres and a mule',
        subtitle: 'A promise to black families left unkempt.',
        attribution: 'A data story by Sub, Maddy, Pearl, and Sayuj',
        image: 'assets/frame1.png',
    },
    {
        template: 'card',
        image: 'assets/frame2.png',
        body: 'Wartime Order No. 15 was proclaimed by Union general William Sherman in 1865 during the American Civil War, to allot 400,000 acres to 18,000 formerly enslaved families in parcels of at most 40 acres of land. This land was across Georgia, South Carolina, and Florida. The promise was reversed by President Johnson.',
    },
    { title: "Frame 3", wage: 1 },
    { title: "Frame 4", wage: 1 },
    { title: "Frame 5", wage: 2 },
    { title: "Frame 6", wage: 1 },
    { title: "Frame 7", wage: 1 },
    { title: "Frame 8", wage: 1 },
    { title: "Frame 9", wage: 1 },
    { title: "Frame 10", wage: 1 },
    { title: "Frame 11", wage: 1 },
    { title: "Frame 12", wage: 1 },
    { title: "Frame 13", wage: 1 },
    { title: "Frame 14", wage: 1 },
    { title: "Frame 15", wage: 1 },
    { title: "Frame 16", wage: 1 },
    { title: "Frame 17", wage: 1 },
    { title: "Frame 18", wage: 1 },
    { title: "Frame 19", wage: 1 },
    { title: "Frame 20", wage: 1 },
    { title: "Frame 21", wage: 1 },
    { title: "Frame 22", wage: 1 },
    { title: "Frame 23", wage: 1 },
    { title: "Frame 24", wage: 1 },
    { title: "Frame 25", wage: 1 },
    { title: "Frame 26", wage: 1 },
    { title: "Frame 27", wage: 1 },
    { title: "Frame 28", wage: 1 },
    { title: "Frame 29", wage: 1 },
    { title: "Frame 30", wage: 1 },
    { title: "Frame 31", wage: 1 },
];

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
    -1, -1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,  // frames 0–11
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6,  // frames 12–23
    6, 6, 7, 7, 7, 7, 7,                   // frames 24–30
];

let currentFrame = -1;

$(document).ready(function () {
    const $container = $('#frames');
    frames.forEach(function (f, i) {
        if (f.template === 'card') {
            const img = f.image ? '<img class="frame-card-image" src="' + f.image + '" alt="">' : '';
            $container.append(
                '<section class="frame frame-card">' +
                '<div class="frame-content frame-card-content">' +
                img +
                '<p class="frame-card-text">' + (f.body || '') + '</p>' +
                '</div>' +
                '</section>'
            );
        } else if (f.template === 'title') {
            const img = f.image ? '<img class="frame-title-image" src="' + f.image + '" alt="">' : '';
            $container.append(
                '<section class="frame frame-title">' +
                '<div class="frame-content frame-title-content">' +
                img +
                '<div class="frame-title-text">' +
                '<div class="frame-title-left">' +
                '<h1 class="title-main">' + f.title + '</h1>' +
                '<p class="title-subtitle">' + f.subtitle + '</p>' +
                '</div>' +
                '<p class="title-attribution">' + f.attribution + '</p>' +
                '</div>' +
                '</div>' +
                '</section>'
            );
        } else {
            $container.append(
                '<section class="frame">' +
                '<div class="frame-content">' +
                '<h1>' + f.title + '</h1>' +
                '<p>$' + f.wage.toFixed(2) + '</p>' +
                '</div>' +
                '</section>'
            );
        }
    });

    // ── Timeline buckets (fixed categories, not tied to frames) ──
    const $timeline = $('<div id="timeline"></div>');
    TIMELINE_CATEGORIES.forEach(function (label, i) {
        $timeline.append(
            '<div class="timeline-bucket" data-index="' + i + '">' +
            '<span class="timeline-bucket-label">' + label + '</span>' +
            '</div>'
        );
    });
    $('body').prepend($timeline);

    updateActiveFrame(0);

    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const viewMid = scrollTop + $(window).height() / 2;

        $('.frame').each(function (index) {
            const frameTop = $(this).offset().top;
            const frameBottom = frameTop + $(this).outerHeight();

            if (viewMid >= frameTop && viewMid < frameBottom) {
                if (currentFrame !== index) {
                    updateActiveFrame(index);
                }
            }
        });
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            scrollToFrame(Math.min(currentFrame + 1, frames.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollToFrame(Math.max(currentFrame - 1, 0));
        }
    });
});

function scrollToFrame(index) {
    const target = $('.frame').eq(index);
    if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top }, 500);
    }
}

function updateActiveFrame(newIndex) {
    const prevIndex = currentFrame;
    currentFrame = newIndex;

    $('.frame').removeClass('active');
    $('.frame').eq(newIndex).addClass('active');

    // Fill buckets 0 through filledUpTo (inclusive) per FRAME_TO_FILLED_BUCKET config
    const filledUpTo = FRAME_TO_FILLED_BUCKET[newIndex] ?? -1;
    $('.timeline-bucket').removeClass('filled');
    $('.timeline-bucket').each(function () {
        const idx = parseInt($(this).data('index'), 10);
        if (idx <= filledUpTo) $(this).addClass('filled');
    });

    if (prevIndex >= 0) onFrameLeave(prevIndex);
    onFrameEnter(newIndex);
}

function onFrameEnter(frameIndex) {
    const data = frames[frameIndex];
    console.log('→ Entered frame', frameIndex, data);
}

function onFrameLeave(frameIndex) {
    const data = frames[frameIndex];
    console.log('← Left frame', frameIndex, data);
}
