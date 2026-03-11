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

        var legendHtml = seriesConfig.map(function (series) {
            return (
                '<span class="viz-legend-item">' +
                '<span class="viz-legend-dot" style="background:' + series.color + ';"></span>' +
                series.label +
                '</span>'
            );
        }).join('');

        var panelHtml =
            '<aside id="viz-panel" aria-label="Simulation line graph">' +
            '<div class="viz-panel-content">' +
            '<p class="viz-kicker">Final simulation mean CSV</p>' +
            '<p id="viz-era-title" class="viz-era-title"></p>' +
            '<h2 class="viz-title">Wealth Trajectory Over Time</h2>' +
            '<svg id="viz-chart" viewBox="0 0 ' + dims.width + ' ' + dims.height + '" preserveAspectRatio="xMidYMid meet"></svg>' +
            '<div class="viz-legend">' + legendHtml + '</div>' +
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

    return {
        buildTimeline: buildTimeline,
        buildVizPanel: buildVizPanel,
        updateTimelineFill: updateTimelineFill,
        updateVizEraTitle: updateVizEraTitle,
        updateVizYearReadout: updateVizYearReadout,
    };
})();
