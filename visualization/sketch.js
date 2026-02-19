let currentFrame = -1;
const totalFrames = 5;

$(document).ready(function () {
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
            scrollToFrame(Math.min(currentFrame + 1, totalFrames - 1));
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

    // Fire callbacks
    if (prevIndex >= 0) onFrameLeave(prevIndex);
    onFrameEnter(newIndex);
}

function onFrameEnter(frameIndex) {
    console.log('→ Entered frame', frameIndex);
    switch (frameIndex) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
}

function onFrameLeave(frameIndex) {
    console.log('← Left frame', frameIndex);
}
