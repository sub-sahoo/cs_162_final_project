// Frames, TIMELINE_CATEGORIES, and FRAME_TO_FILLED_BUCKET are defined in data/frames.js and config/timeline.js

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
        } else if (f.template === 'split') {
            const leftContent = f.image
                ? '<img class="frame-split-image" src="' + f.image + '" alt="">'
                : '<div class="frame-split-placeholder">' + (f.placeholderText || 'Image placeholder') + '</div>';
            $container.append(
                '<section class="frame frame-split">' +
                '<div class="frame-content frame-split-content">' +
                '<div class="frame-split-left">' + leftContent + '</div>' +
                '<div class="frame-split-right">' +
                '<p class="frame-split-text">' + (f.body || '') + '</p>' +
                '</div>' +
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
