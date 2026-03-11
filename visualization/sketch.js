$(document).ready(function () {
    prepareVisualizationState();
    renderStoryFrames();
    buildTimelineAndPanel();

    setInitialActiveFrame();
    syncFrameFromScroll();

    bindScrollAndResize();
    bindKeyboardNavigation();

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

    if (prevIndex >= 0) onFrameLeave(prevIndex);
    onFrameEnter(newIndex);
}

function updateChartForFrame(frameIndex) {
    var shouldShow = VizState.shouldShowChart(frameIndex);
    $('body').toggleClass('show-viz', shouldShow);

    if (!shouldShow) return;

    var eraTitle = VizState.getDateTitleForFrame(frameIndex);
    Timeline.updateVizEraTitle(eraTitle);

    var seriesData = Simulation.getSeries();
    if (!seriesData || !seriesData.length) return;

    var targetYear = VizState.getTargetYearForFrame(frameIndex, seriesData);
    Chart.renderLineChart(seriesData, targetYear);

    Timeline.updateVizYearReadout('Visible data through ' + targetYear + ' (log scale, from final_simulation_mean_results.csv)');
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
