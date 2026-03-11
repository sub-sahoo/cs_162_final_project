var VizState = (function () {
    var plotStartFrameIndex = 0;
    var visualizationFrameIndices = [];

    function computePlotStartFrameIndex() {
        var exactIndex = frames.findIndex(function (frame) {
            return String(frame.title || '').trim() === '1865';
        });
        if (exactIndex >= 0) return exactIndex;

        var fuzzyIndex = frames.findIndex(function (frame) {
            return /\b1865\b/.test(String(frame.title || ''));
        });
        if (fuzzyIndex >= 0) return fuzzyIndex;

        return 0;
    }

    function isVisualizationFrameIndex(index) {
        if (index < plotStartFrameIndex) return false;
        var frame = frames[index] || {};
        return frame.hideViz !== true;
    }

    function getVisualizationFrameIndices() {
        var indices = [];
        frames.forEach(function (_frameData, index) {
            if (isVisualizationFrameIndex(index)) {
                indices.push(index);
            }
        });
        return indices;
    }

    function initialize() {
        plotStartFrameIndex = computePlotStartFrameIndex();
        visualizationFrameIndices = getVisualizationFrameIndices();
        return { plotStartFrameIndex: plotStartFrameIndex, visualizationFrameIndices: visualizationFrameIndices };
    }

    function getTargetYearForFrame(frameIndex, seriesData) {
        if (!seriesData || !seriesData.length) return null;

        var firstYear = seriesData[0].year;
        var lastYear = seriesData[seriesData.length - 1].year;
        var clampedFrameIndex = Math.max(plotStartFrameIndex, frameIndex);
        var vizStepIndex = visualizationFrameIndices.indexOf(clampedFrameIndex);

        var progress = 1;
        if (vizStepIndex >= 0 && visualizationFrameIndices.length > 1) {
            progress = vizStepIndex / (visualizationFrameIndices.length - 1);
        } else if (frames.length - 1 > plotStartFrameIndex) {
            progress = Math.min(1, Math.max(0, (clampedFrameIndex - plotStartFrameIndex) / (frames.length - 1 - plotStartFrameIndex)));
        }

        return Math.round(firstYear + progress * (lastYear - firstYear));
    }

    function isDateLikeTitle(title) {
        return /\d/.test(title) || /\bpresent\b/i.test(title);
    }

    function getTimelineBucketForFrame(frameIndex) {
        for (var i = frameIndex; i >= 0; i -= 1) {
            var bucket = FRAME_TO_FILLED_BUCKET[i];
            if (Number.isInteger(bucket) && bucket >= 0) {
                return bucket;
            }
        }
        return 0;
    }

    function getDateTitleForFrame(frameIndex) {
        for (var i = frameIndex; i >= 0; i -= 1) {
            var title = frames[i] && frames[i].title;
            if (typeof title === 'string' && isDateLikeTitle(title)) {
                return title.trim();
            }
        }
        var bucketIndex = getTimelineBucketForFrame(frameIndex);
        return TIMELINE_CATEGORIES[bucketIndex] || TIMELINE_CATEGORIES[0] || '';
    }

    function shouldShowChart(frameIndex) {
        return isVisualizationFrameIndex(frameIndex);
    }

    function getPlotStartFrameIndex() {
        return plotStartFrameIndex;
    }

    return {
        initialize: initialize,
        shouldShowChart: shouldShowChart,
        getTargetYearForFrame: getTargetYearForFrame,
        getDateTitleForFrame: getDateTitleForFrame,
        getPlotStartFrameIndex: getPlotStartFrameIndex,
        isVisualizationFrameIndex: isVisualizationFrameIndex,
    };
})();
