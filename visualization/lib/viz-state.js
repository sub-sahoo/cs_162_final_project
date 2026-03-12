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

    function buildYearCheckpoints(seriesData) {
        var firstYear = seriesData[0].year;
        var lastYear = seriesData[seriesData.length - 1].year;
        var checkpoints = [];

        for (var i = 0; i < visualizationFrameIndices.length; i++) {
            var fi = visualizationFrameIndices[i];
            var frame = frames[fi];
            if (frame && Number.isFinite(frame.statsYear)) {
                checkpoints.push({ vizStep: i, year: frame.statsYear });
            }
        }

        if (checkpoints.length === 0) {
            return [
                { vizStep: 0, year: firstYear },
                { vizStep: visualizationFrameIndices.length - 1, year: lastYear },
            ];
        }

        if (checkpoints[0].vizStep > 0) {
            checkpoints.unshift({ vizStep: 0, year: firstYear });
        }

        var lastVizStep = visualizationFrameIndices.length - 1;
        if (checkpoints[checkpoints.length - 1].vizStep < lastVizStep) {
            checkpoints.push({ vizStep: lastVizStep, year: lastYear });
        }

        return checkpoints;
    }

    function getTargetYearForFrame(frameIndex, seriesData) {
        if (!seriesData || !seriesData.length) return null;

        var clampedFrameIndex = Math.max(plotStartFrameIndex, frameIndex);
        var vizStepIndex = visualizationFrameIndices.indexOf(clampedFrameIndex);

        if (vizStepIndex < 0) {
            for (var k = 0; k < visualizationFrameIndices.length; k++) {
                if (visualizationFrameIndices[k] >= clampedFrameIndex) {
                    vizStepIndex = k;
                    break;
                }
            }
            if (vizStepIndex < 0) vizStepIndex = visualizationFrameIndices.length - 1;
        }

        var checkpoints = buildYearCheckpoints(seriesData);

        var prev = checkpoints[0];
        for (var i = 0; i < checkpoints.length; i++) {
            if (checkpoints[i].vizStep <= vizStepIndex) {
                prev = checkpoints[i];
            } else {
                break;
            }
        }

        var next = checkpoints[checkpoints.length - 1];
        for (var j = 0; j < checkpoints.length; j++) {
            if (checkpoints[j].vizStep >= vizStepIndex) {
                next = checkpoints[j];
                break;
            }
        }

        if (prev.vizStep === vizStepIndex) return prev.year;

        var range = next.vizStep - prev.vizStep;
        if (range <= 0) return prev.year;

        var progress = (vizStepIndex - prev.vizStep) / range;
        return Math.round(prev.year + progress * (next.year - prev.year));
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
