var Chart = (function () {
    var Y_SCALE_MODE = 'log';
    var LOG_SCALE_MIN = 1;
    var CHART_DIMS = {
        width: 920,
        height: 520,
        padding: { top: 28, right: 28, bottom: 52, left: 84 },
    };

    var DEFAULT_SERIES = [
        { key: 'Mean_White_Wealth', label: 'White families', color: '#0f172a' },
        { key: 'Mean_Black_Wealth', label: 'Black families (actual)', color: '#b91c1c' },
        { key: 'Mean_Black_40_Wealth', label: 'Black families (40 acres scenario)', color: '#0f766e' },
    ];

    function formatYAxisTick(value, scaleMode) {
        var mode = scaleMode || Y_SCALE_MODE;
        if (mode === 'log') {
            if (!Number.isFinite(value) || value <= 0) return '';
            return '10^' + Math.round(Math.log10(value));
        }
        return Utils.formatCurrencyCompact(value);
    }

    function buildLinePath(rows, valueKey, xScale, yScale) {
        if (!rows.length) return '';

        var path = '';
        rows.forEach(function (row, index) {
            var x = xScale(row.year);
            var y = yScale(row[valueKey]);
            path += (index === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
        });
        return path.trim();
    }

    function renderLineChart(seriesData, targetYear, options) {
        var svg = document.getElementById('viz-chart');
        if (!svg || !seriesData || !seriesData.length) return;

        var seriesConfig = (options && options.series) || DEFAULT_SERIES;
        var scaleMode = (options && options.yScaleMode) || Y_SCALE_MODE;

        var rows = seriesData.filter(function (row) {
            return row.year <= targetYear;
        });

        if (!rows.length) return;

        var allRowsForMax = seriesData;
        if (options && options.comparisonRows) {
            allRowsForMax = seriesData.concat(options.comparisonRows);
        }
        var maxY = Math.max(
            1,
            Math.max.apply(null, allRowsForMax.map(function (row) {
                return Math.max(
                    row.Mean_White_Wealth || 0,
                    row.Mean_Black_Wealth || 0,
                    row.Mean_Black_40_Wealth || 0
                );
            }))
        );

        var linearMaxY = maxY * 1.05;
        var logMaxY = Math.max(maxY * 1.05, LOG_SCALE_MIN * 10);
        var minYear = seriesData[0].year;
        var maxYear = seriesData[seriesData.length - 1].year;
        var chartWidth = CHART_DIMS.width;
        var chartHeight = CHART_DIMS.height;
        var padding = CHART_DIMS.padding;
        var logMin = Math.log10(LOG_SCALE_MIN);
        var logMax = Math.log10(logMaxY);

        var xScale = function (year) {
            if (maxYear === minYear) return padding.left;
            var pct = (year - minYear) / (maxYear - minYear);
            return padding.left + pct * (chartWidth - padding.left - padding.right);
        };

        var yScale = function (value) {
            var safe = Number.isFinite(value) ? value : 0;
            var drawableHeight = chartHeight - padding.top - padding.bottom;
            if (scaleMode === 'log') {
                var clamped = Math.max(LOG_SCALE_MIN, safe);
                var pct = (Math.log10(clamped) - logMin) / (logMax - logMin || 1);
                return chartHeight - padding.bottom - pct * drawableHeight;
            }
            return chartHeight - padding.bottom - (safe / linearMaxY) * drawableHeight;
        };

        var yTicks = [];
        if (scaleMode === 'log') {
            var minExp = Math.floor(logMin);
            var maxExp = Math.ceil(logMax);
            for (var exp = minExp; exp <= maxExp; exp += 1) {
                var tick = Math.pow(10, exp);
                if (tick >= LOG_SCALE_MIN && tick <= logMaxY * 1.0001) {
                    yTicks.push(tick);
                }
            }
        } else {
            var yTickCount = 5;
            for (var i = 0; i < yTickCount; i += 1) {
                yTicks.push((linearMaxY * i) / (yTickCount - 1));
            }
        }

        var xTickYears = [1860, 1900, 1940, 1980, 2020].filter(function (year) {
            return year >= minYear && year <= maxYear;
        });

        var chartMarkup = '';

        yTicks.forEach(function (tickValue) {
            var y = yScale(tickValue);
            chartMarkup +=
                '<line class="viz-grid-line" x1="' + padding.left + '" y1="' + y + '" x2="' + (chartWidth - padding.right) + '" y2="' + y + '"></line>' +
                '<text class="viz-axis-label y-axis-label" x="' + (padding.left - 12) + '" y="' + y + '">' + formatYAxisTick(tickValue, scaleMode) + '</text>';
        });

        xTickYears.forEach(function (year) {
            var x = xScale(year);
            chartMarkup +=
                '<line class="viz-grid-line x-grid-line" x1="' + x + '" y1="' + padding.top + '" x2="' + x + '" y2="' + (chartHeight - padding.bottom) + '"></line>' +
                '<text class="viz-axis-label x-axis-label" x="' + x + '" y="' + (chartHeight - padding.bottom + 24) + '">' + year + '</text>';
        });

        chartMarkup +=
            '<line class="viz-axis" x1="' + padding.left + '" y1="' + (chartHeight - padding.bottom) + '" x2="' + (chartWidth - padding.right) + '" y2="' + (chartHeight - padding.bottom) + '"></line>' +
            '<line class="viz-axis" x1="' + padding.left + '" y1="' + padding.top + '" x2="' + padding.left + '" y2="' + (chartHeight - padding.bottom) + '"></line>';

        seriesConfig.forEach(function (s) {
            var seriesRows = (s.rows !== undefined) ? s.rows.filter(function (r) { return r.year <= targetYear; }) : rows;
            var linePath = buildLinePath(seriesRows, s.key, xScale, yScale);
            if (!linePath) return;
            var dashAttr = s.strokeDasharray ? ' stroke-dasharray="' + s.strokeDasharray + '"' : '';
            chartMarkup += '<path class="viz-series-line" d="' + linePath + '" stroke="' + s.color + '"' + dashAttr + '></path>';
        });

        seriesConfig.forEach(function (s) {
            var seriesRows = (s.rows !== undefined) ? s.rows.filter(function (r) { return r.year <= targetYear; }) : rows;
            if (!seriesRows.length) return;
            var finalRow = seriesRows[seriesRows.length - 1];
            var value = finalRow[s.key];
            var x = xScale(finalRow.year);
            var y = yScale(value);
            chartMarkup += '<circle class="viz-series-point" cx="' + x + '" cy="' + y + '" r="3.5" fill="' + s.color + '"></circle>';
        });

        svg.innerHTML = chartMarkup;
    }

    function getChartDimensions() {
        return CHART_DIMS;
    }

    function getDefaultSeries() {
        return DEFAULT_SERIES;
    }

    function buildLegendHtml(seriesConfig) {
        var config = seriesConfig || DEFAULT_SERIES;
        return config.map(function (s) {
            var dashHint = s.strokeDasharray ? ' <span class="viz-legend-dash">(dashed)</span>' : '';
            return (
                '<span class="viz-legend-item">' +
                '<span class="viz-legend-dot" style="background:' + s.color + ';"></span>' +
                s.label + dashHint +
                '</span>'
            );
        }).join('');
    }

    return {
        renderLineChart: renderLineChart,
        getChartDimensions: getChartDimensions,
        getDefaultSeries: getDefaultSeries,
        buildLegendHtml: buildLegendHtml,
    };
})();
