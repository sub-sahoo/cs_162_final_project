let currentFrame = -1;

$(document).ready(function () {
    const $container = $('#frames');
    frames.forEach(function (frameData) {
        const templateName = frameData.template || 'placeholder';
        const renderer = TemplateRegistry.getRenderer(templateName);
        const html = renderer.render(frameData);
        $container.append(html);
    });

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

    // use FRAME_TO_FILLED_BUCKET config to fill up buckets 0 to filledUpTo
    // inclusive
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
