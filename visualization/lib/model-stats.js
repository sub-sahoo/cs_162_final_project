var ModelStats = (function () {
    function buildStatsGroup(label, data) {
        return (
            '<section class="model-stats-group">' +
            '<h4>' + label + '</h4>' +
            '<ul>' +
            '<li>Mean wealth: <strong>' + Utils.formatMoney(data.wealth) + '</strong></li>' +
            '<li>Mean land value: <strong>' + Utils.formatMoney(data.land) + '</strong></li>' +
            '<li>Mean investments: <strong>' + Utils.formatMoney(data.invest) + '</strong></li>' +
            '<li>Mean income (per annum): <strong>' + Utils.formatMoney(data.income) + '</strong></li>' +
            '</ul>' +
            '</section>'
        );
    }

    function buildMarkup(row, targetYear) {
        var whiteWealth = Utils.toFiniteOrZero(row.Mean_White_Wealth);
        var blackWealth = Utils.toFiniteOrZero(row.Mean_Black_Wealth);
        var black40Wealth = Utils.toFiniteOrZero(row.Mean_Black_40_Wealth);
        var actualRatio = whiteWealth > 0 ? blackWealth / whiteWealth : 0;
        var scenarioRatio = whiteWealth > 0 ? black40Wealth / whiteWealth : 0;

        return (
            '<h3 class="model-stats-heading">Simulation Statistics (' + row.year + ')</h3>' +
            '<p class="model-stats-meta">Nearest model year to requested checkpoint ' + targetYear + '</p>' +
            '<div class="model-stats-grid">' +
            buildStatsGroup('White Families', {
                wealth: row.Mean_White_Wealth,
                land: row.Mean_White_Land,
                invest: row.Mean_White_Invest,
                income: row.Mean_White_Income / 0.05,
            }) +
            buildStatsGroup('Black Families (Actual)', {
                wealth: row.Mean_Black_Wealth,
                land: row.Mean_Black_Land,
                invest: row.Mean_Black_Invest,
                income: row.Mean_Black_Income / 0.039,
            }) +
            buildStatsGroup('Black Families (40 Acres Scenario)', {
                wealth: row.Mean_Black_40_Wealth,
                land: row.Mean_Black_40_Land,
                invest: row.Mean_Black_40_Invest,
                income: row.Mean_Black_40_Income / 0.039,
            }) +
            '</div>' +
            '<ul class="model-stats-summary">' +
            '<li>Black/White wealth ratio (actual): <strong>' + Utils.formatPercent(actualRatio) + '</strong></li>' +
            '<li>Black/White wealth ratio (40 acres scenario): <strong>' + Utils.formatPercent(scenarioRatio) + '</strong></li>' +
            '<li>Scenario vs actual Black wealth uplift: <strong>' + Utils.formatPercent(blackWealth > 0 ? (black40Wealth - blackWealth) / blackWealth : 0) + '</strong></li>' +
            '</ul>'
        );
    }

    function populate(seriesData) {
        if (!seriesData || !seriesData.length) return;

        frames.forEach(function (frameData, index) {
            if (!Number.isFinite(frameData.statsYear)) return;

            var row = Simulation.getNearestRowForYear(frameData.statsYear);
            if (!row) return;

            var markup = buildMarkup(row, frameData.statsYear);
            var selector = '.frame[data-frame-index="' + index + '"] .frame-card-text';
            var $target = $(selector);
            if ($target.length) {
                $target.html(markup);
            }
        });
    }

    function populateError(message) {
        frames.forEach(function (frameData, index) {
            if (!Number.isFinite(frameData.statsYear)) return;
            var selector = '.frame[data-frame-index="' + index + '"] .frame-card-text';
            var $target = $(selector);
            if ($target.length) {
                $target.html('<p class="model-stats-loading">' + message + '</p>');
            }
        });
    }

    return {
        populate: populate,
        populateError: populateError,
    };
})();
