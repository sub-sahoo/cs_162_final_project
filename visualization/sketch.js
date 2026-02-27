const frames = [
    {
        template: 'title',
        title: '40 acres and a mule',
        subtitle: 'A promise to black families left unkempt.',
        attribution: 'A data story by Sub, Maddy, Pearl, and Sayuj',
        image: 'assets/frame1.png',
    },
    { title: "Frame 2", year: 1945, wage: 7 },
    { title: "Frame 3", year: 1970, wage: 1 },
    { title: "Frame 4", year: 1995, wage: 1 },
    { title: "Frame 5", year: 2020, wage: 2 },
];

let currentFrame = -1;

$(document).ready(function () {
    const $container = $('#frames');
    frames.forEach(function (f, i) {
        if (f.template === 'title') {
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
                '<p>' + f.year + ' &mdash; $' + f.wage.toFixed(2) + '</p>' +
                '</div>' +
                '</section>'
            );
        }
    });

    // ── Timeline buckets (one per frame) ──
    const $timeline = $('<div id="timeline"></div>');
    frames.forEach(function (f, i) {
        const label = f.template === 'title' ? 'Intro' : (() => {
            const next = i < frames.length - 1 ? frames[i + 1] : null;
            const nextYear = next && next.year ? next.year : f.year;
            return f.year + (nextYear !== f.year ? '–' + nextYear : '');
        })();
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

    // Fill buckets 0 through (newIndex - 1); first frame has none filled
    $('.timeline-bucket').removeClass('filled');
    $('.timeline-bucket').each(function () {
        const idx = parseInt($(this).data('index'), 10);
        if (idx < newIndex) $(this).addClass('filled');
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
