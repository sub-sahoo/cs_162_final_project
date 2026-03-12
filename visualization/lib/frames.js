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
        var viewportTop = scrollTop;
        var viewportBottom = scrollTop + viewportHeight;

        var bestIndex = 0;
        var bestVisible = 0;
        var visibleByIndex = [];

        $frames.each(function (index) {
            var el = this;
            var rect = el.getBoundingClientRect();
            var frameTop = rect.top + scrollTop;
            var frameBottom = frameTop + rect.height;

            var visibleTop = Math.max(frameTop, viewportTop);
            var visibleBottom = Math.min(frameBottom, viewportBottom);
            var visibleHeight = Math.max(0, visibleBottom - visibleTop);

            visibleByIndex[index] = visibleHeight;
            if (visibleHeight > bestVisible) {
                bestVisible = visibleHeight;
                bestIndex = index;
            }
        });

        var current = currentFrameIndex;
        var hysteresisThreshold = viewportHeight * 0.15;

        if (current >= 0 && current < visibleByIndex.length && bestIndex !== current) {
            var currentVisible = visibleByIndex[current] || 0;
            if (currentVisible >= hysteresisThreshold && currentVisible >= bestVisible - viewportHeight * 0.05) {
                return current;
            }
        }

        return bestIndex;
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
