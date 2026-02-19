const frames = [
    { title: "Frame 1", year: 1920, wage: 5 },
    { title: "Frame 2", year: 1945, wage: 7 },
    { title: "Frame 3", year: 1970, wage: 1 },
    { title: "Frame 4", year: 1995, wage: 1 },
    { title: "Frame 5", year: 2020, wage: 2 },
];

let currentFrame = -1;

$(document).ready(function () {
    const $container = $('#frames');
    frames.forEach(function (f, i) {
        $container.append(
            '<section class="frame">' +
            '<div class="frame-content">' +
            '<h1>' + f.title + '</h1>' +
            '<p>' + f.year + ' &mdash; $' + f.wage.toFixed(2) + '</p>' +
            '</div>' +
            '</section>'
        );
    });

    // ── Progress bar ──
    $('body').prepend(
        '<div id="frame-progress"><div id="frame-progress-bar"></div></div>'
    );

    updateActiveFrame(0);

    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $('#frame-progress-bar').css('width', scrollPct + '%');

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
