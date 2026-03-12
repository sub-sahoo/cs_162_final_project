var Timeline = (function () {
    function buildTimeline() {
        var $timeline = $('<div id="timeline"></div>');
        TIMELINE_CATEGORIES.forEach(function (label, i) {
            $timeline.append(
                '<div class="timeline-bucket" data-index="' + i + '">' +
                '<span class="timeline-bucket-label">' + label + '</span>' +
                '</div>'
            );
        });
        $('body').prepend($timeline);
    }

    function buildVizPanel() {
        var seriesConfig = Chart.getDefaultSeries();
        var dims = Chart.getChartDimensions();

        var panelHtml =
            '<aside id="viz-panel" aria-label="Simulation line graph">' +
            '<div class="viz-panel-content">' +
            '<p id="viz-era-title" class="viz-era-title"></p>' +
            '<h2 class="viz-title">Wealth Trajectory Over Time</h2>' +
            '<svg id="viz-chart" viewBox="0 0 ' + dims.width + ' ' + dims.height + '" preserveAspectRatio="xMidYMid meet"></svg>' +
            '<div id="viz-legend" class="viz-legend"></div>' +
            '<div id="viz-dataset-toggle" style="display:none;">' +
            '<button data-dataset="NE" class="active">Baseline</button>' +
            '<button data-dataset="TE">No Systematic Theft</button>' +
            '<button data-dataset="SE">Equal Savings Access</button>' +
            '<button data-dataset="IE">Equal Income</button>' +
            '<button data-dataset="AE">All Barriers Removed</button>' +
            '</div>' +
            '<p id="viz-year-readout" class="viz-year-readout"></p>' +
            '</div>' +
            '</aside>';

        $('body').append(panelHtml);
    }

    function updateTimelineFill(filledUpTo) {
        $('.timeline-bucket').removeClass('filled');
        $('.timeline-bucket').each(function () {
            var idx = parseInt($(this).data('index'), 10);
            if (idx <= filledUpTo) $(this).addClass('filled');
        });
    }

    function updateVizEraTitle(label) {
        $('#viz-era-title').text(label);
    }

    function updateVizYearReadout(text) {
        $('#viz-year-readout').text(text);
    }

    function updateVizLegend(seriesConfig) {
        var html = Chart.buildLegendHtml(seriesConfig);
        $('#viz-legend').html(html);
    }

    return {
        buildTimeline: buildTimeline,
        buildVizPanel: buildVizPanel,
        updateTimelineFill: updateTimelineFill,
        updateVizEraTitle: updateVizEraTitle,
        updateVizYearReadout: updateVizYearReadout,
        updateVizLegend: updateVizLegend,
    };
})();
