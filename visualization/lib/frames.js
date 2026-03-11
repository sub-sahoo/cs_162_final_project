var Frames = (function () {
    var currentFrameIndex = -1;
    var isTicking = false;

    function getTimelineOffset() {
        var timelineHeight = $('#timeline').outerHeight() || 0;
        return timelineHeight + 16;
    }

    function getActiveFrameIndex() {
        var $frames = $('.frame');
        if (!$frames.length) return -1;

        var scrollTop = $(window).scrollTop();
        var viewportHeight = $(window).height();
        var activationLine = scrollTop + getTimelineOffset() + viewportHeight * 0.2;
        var activeIndex = 0;

        $frames.each(function (index) {
            var frameTop = $(this).offset().top;
            var frameBottom = frameTop + $(this).outerHeight();

            if (activationLine >= frameTop && activationLine < frameBottom) {
                activeIndex = index;
                return false;
            }

            if (activationLine >= frameBottom) {
                activeIndex = index;
            }
        });

        return activeIndex;
    }

    function queueScrollUpdate(onUpdate) {
        if (isTicking) return;
        isTicking = true;
        window.requestAnimationFrame(function () {
            if (typeof onUpdate === 'function') onUpdate();
            isTicking = false;
        });
    }

    function scrollToFrame(index) {
        var target = $('.frame').eq(index);
        if (target.length) {
            var destination = Math.max(0, target.offset().top - getTimelineOffset());
            $('html, body').stop(true).animate({ scrollTop: destination }, 450);
        }
    }

    function getCurrentFrameIndex() {
        return currentFrameIndex;
    }

    function setCurrentFrameIndex(index) {
        currentFrameIndex = index;
    }

    return {
        getActiveFrameIndex: getActiveFrameIndex,
        queueScrollUpdate: queueScrollUpdate,
        scrollToFrame: scrollToFrame,
        getTimelineOffset: getTimelineOffset,
        getCurrentFrameIndex: getCurrentFrameIndex,
        setCurrentFrameIndex: setCurrentFrameIndex,
    };
})();
