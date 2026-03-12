var ToggleState = {};

$(document).ready(function () {
    prepareVisualizationState();
    renderStoryFrames();
    buildTimelineAndPanel();

    setInitialActiveFrame();
    syncFrameFromScroll();

    bindScrollAndResize();
    bindKeyboardNavigation();
    bindToggleButtons();

    loadSimulationDataAndPopulate();
});

/* ── Frame Rendering ── */
function renderStoryFrames() {
    var $container = $('#frames');
    var plotStart = VizState.getPlotStartFrameIndex();

    frames.forEach(function (frameData, index) {
        var templateName = frameData.template || 'placeholder';
        var renderer = TemplateRegistry.getRenderer(templateName);
        var $frame = $(renderer.render(frameData));
        $frame.attr('data-frame-index', index);
        if (VizState.isVisualizationFrameIndex(index)) {
            $frame.addClass('frame-viz-step');
        }
        $container.append($frame);
    });

    $('body').toggleClass('show-viz', plotStart <= 0);
}

/* ── Timeline and Panel ── */
function buildTimelineAndPanel() {
    Timeline.buildTimeline();
    Timeline.buildVizPanel();
}

/* ── Visualization State ── */
function prepareVisualizationState() {
    VizState.initialize();
}

/* ── Active Frame / Sync Scrolling ── */
function setInitialActiveFrame() {
    updateActiveFrame(0);
    syncFrameFromScroll();
}

function syncFrameFromScroll() {
    var newIndex = Frames.getActiveFrameIndex();
    if (newIndex >= 0 && newIndex !== Frames.getCurrentFrameIndex()) {
        updateActiveFrame(newIndex);
    }
}

function updateActiveFrame(newIndex) {
    if (newIndex < 0 || newIndex >= frames.length) return;

    var prevIndex = Frames.getCurrentFrameIndex();
    Frames.setCurrentFrameIndex(newIndex);

    $('.frame').removeClass('active');
    $('.frame').eq(newIndex).addClass('active');

    var filledUpTo = FRAME_TO_FILLED_BUCKET[newIndex] ?? -1;
    Timeline.updateTimelineFill(filledUpTo);

    updateChartForFrame(newIndex);

    if (prevIndex >= 0 && typeof onFrameLeave === 'function') onFrameLeave(prevIndex);
    if (typeof onFrameEnter === 'function') onFrameEnter(newIndex);
    syncToggleButtonsForFrame(newIndex);
}

function updateChartForFrame(frameIndex) {
    var shouldShow = VizState.shouldShowChart(frameIndex);
    $('body').toggleClass('show-viz', shouldShow);

    if (!shouldShow) return;

    var frameData = frames[frameIndex] || {};
    var seriesData = Simulation.getSeries();
    if (!seriesData || !seriesData.length) return;

    var targetYear = VizState.getTargetYearForFrame(frameIndex, seriesData);

    if (frameData.template === 'toggle' && frameData.factorKey) {
        var factorKey = frameData.factorKey;
        var baselineData = Simulation.getSeriesForFactor('NE');
        var factorData = Simulation.getSeriesForFactor(factorKey);
        if (!baselineData.length || !factorData.length) return;

        targetYear = seriesData[seriesData.length - 1].year;

        var showFactorAsPrimary = (ToggleState[frameIndex] !== 'actual');
        var factorLabel = frameData.toggleOptionA || factorKey;
        var baselineLabel = frameData.toggleOptionB || 'Actual';

        var baselineRows = baselineData.filter(function (r) { return r.year <= targetYear; });
        var factorRows = factorData.filter(function (r) { return r.year <= targetYear; });

        var comparisonSeries = [
            { key: 'Mean_White_Wealth', label: 'White families', color: '#0f172a', rows: baselineRows },
            showFactorAsPrimary
                ? [
                    { key: 'Mean_Black_40_Wealth', label: factorLabel, color: '#0f766e', rows: factorRows },
                    { key: 'Mean_Black_40_Wealth', label: baselineLabel, color: '#64748b', rows: baselineRows, strokeDasharray: '8 4' },
                ]
                : [
                    { key: 'Mean_Black_40_Wealth', label: baselineLabel, color: '#b91c1c', rows: baselineRows },
                    { key: 'Mean_Black_40_Wealth', label: factorLabel, color: '#64748b', rows: factorRows, strokeDasharray: '8 4' },
                ],
        ].flat();

        Chart.renderLineChart(seriesData, targetYear, {
            series: comparisonSeries,
            comparisonRows: factorData,
        });
        Timeline.updateVizLegend(comparisonSeries);
    } else {
        Chart.renderLineChart(seriesData, targetYear);
        Timeline.updateVizLegend(Chart.getDefaultSeries());
    }

    var eraTitle = VizState.getDateTitleForFrame(frameIndex);
    Timeline.updateVizEraTitle(eraTitle);
    Timeline.updateVizYearReadout('Visible data through ' + targetYear + ' (log scale)');
}

/* ── Event Handlers ── */
function bindScrollAndResize() {
    $(window).on('scroll resize', function () {
        Frames.queueScrollUpdate(syncFrameFromScroll);
    });
}

function bindKeyboardNavigation() {
    $(document).on('keydown', function (e) {
        if (Utils.isEditingTarget(e.target)) return;

        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            Frames.scrollToFrame(Math.min(Frames.getCurrentFrameIndex() + 1, frames.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            Frames.scrollToFrame(Math.max(Frames.getCurrentFrameIndex() - 1, 0));
        }
    });
}

function bindToggleButtons() {
    $(document).on('click', '.frame-toggle-btn', function () {
        var $btn = $(this);
        var $frame = $btn.closest('.frame');
        var frameIndex = parseInt($frame.attr('data-frame-index'), 10);
        var value = $btn.attr('data-value');

        if (isNaN(frameIndex) || !value) return;

        ToggleState[frameIndex] = value;

        $frame.find('.frame-toggle-btn').attr('aria-pressed', 'false');
        $btn.attr('aria-pressed', 'true');

        if (Frames.getCurrentFrameIndex() === frameIndex) {
            updateChartForFrame(frameIndex);
        }
    });
}

function syncToggleButtonsForFrame(frameIndex) {
    var frameData = frames[frameIndex];
    if (frameData && frameData.template === 'toggle') {
        var value = ToggleState[frameIndex] || 'factor';
        var $frame = $('.frame').eq(frameIndex);
        $frame.find('.frame-toggle-btn').attr('aria-pressed', 'false');
        $frame.find('.frame-toggle-btn[data-value="' + value + '"]').attr('aria-pressed', 'true');
    }
}

/* ── Load Data ── */
function loadSimulationDataAndPopulate() {
    Simulation.load()
        .then(function () {
            ModelStats.populate(Simulation.getSeries());
            updateChartForFrame(Frames.getCurrentFrameIndex());
        })
        .catch(function (error) {
            console.error('Unable to load final simulation mean CSV.', error);
            Timeline.updateVizYearReadout('Could not load final simulation mean CSV.');
            ModelStats.populateError('Could not load final simulation mean CSV.');
        });
}
