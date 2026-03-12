var VizVisibility = (function () {
    var HIDE_THRESHOLD = 50;
    var SHOW_THRESHOLD = 20;

    function getOverlapAmount() {
        var panel = document.getElementById('viz-panel');
        if (!panel) return 0;

        var panelRect = panel.getBoundingClientRect();
        var panelTop = panelRect.top;
        var panelBottom = panelRect.bottom;

        var maxOverlap = 0;
        for (var i = 0; i < frames.length; i++) {
            if (frames[i] && frames[i].hideViz === true) {
                var $frame = $('.frame').eq(i);
                if ($frame.length) {
                    var frameRect = $frame[0].getBoundingClientRect();
                    var overlapTop = Math.max(frameRect.top, panelTop);
                    var overlapBottom = Math.min(frameRect.bottom, panelBottom);
                    var overlap = Math.max(0, overlapBottom - overlapTop);
                    if (overlap > maxOverlap) maxOverlap = overlap;
                }
            }
        }
        var writeup = document.getElementById('writeup');
        if (writeup) {
            var wr = writeup.getBoundingClientRect();
            var oTop = Math.max(wr.top, panelTop);
            var oBottom = Math.min(wr.bottom, panelBottom);
            var wOverlap = Math.max(0, oBottom - oTop);
            if (wOverlap > maxOverlap) maxOverlap = wOverlap;
        }

        return maxOverlap;
    }

    function shouldShow(baseShow) {
        var overlap = getOverlapAmount();
        var isShowing = $('body').hasClass('show-viz');
        if (!baseShow) return false;
        return isShowing
            ? overlap < HIDE_THRESHOLD
            : overlap < SHOW_THRESHOLD;
    }

    function sync(frameIndex) {
        if (frameIndex < 0) return;
        var baseShow = VizState.shouldShowChart(frameIndex);
        var show = shouldShow(baseShow);
        $('body').toggleClass('show-viz', show);
    }

    return {
        shouldShow: shouldShow,
        sync: sync,
    };
})();
