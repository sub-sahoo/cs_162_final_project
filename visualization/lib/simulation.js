var Simulation = (function () {
    var SIMULATION_CSV_PATH = 'data/final_simulation_mean_results.csv';
    var SIMULATION_CSV_BY_FACTOR = {
        NE: 'data/final_simulation_mean_results_NE.csv',
        TE: 'data/final_simulation_mean_results_TE.csv',
        SE: 'data/final_simulation_mean_results_SE.csv',
        IE: 'data/final_simulation_mean_results_IE.csv',
        AE: 'data/final_simulation_mean_results_AE.csv',
    };
    var series = [];
    var seriesByFactor = {};

    function parseCsv(csvText) {
        var trimmed = csvText.trim();
        if (!trimmed) return [];

        var lines = trimmed.split(/\r?\n/);
        var headers = lines[0].split(',');
        var parsedRows = [];

        for (var i = 1; i < lines.length; i += 1) {
            if (!lines[i]) continue;
            var cells = lines[i].split(',');
            var row = {};

            for (var j = 0; j < headers.length; j += 1) {
                row[headers[j]] = cells[j];
            }

            parsedRows.push({
                year: Number(row.Year),
                Mean_White_Wealth: Number(row.Mean_White_Wealth),
                Mean_Black_Wealth: Number(row.Mean_Black_Wealth),
                Mean_Black_40_Wealth: Number(row.Mean_Black_40_Wealth),
                Mean_White_Land: Number(row.Mean_White_Land),
                Mean_Black_Land: Number(row.Mean_Black_Land),
                Mean_Black_40_Land: Number(row.Mean_Black_40_Land),
                Mean_White_Invest: Number(row.Mean_White_Invest),
                Mean_Black_Invest: Number(row.Mean_Black_Invest),
                Mean_Black_40_Invest: Number(row.Mean_Black_40_Invest),
                Mean_White_Income: Number(row.Mean_White_Income),
                Mean_Black_Income: Number(row.Mean_Black_Income),
                Mean_Black_40_Income: Number(row.Mean_Black_40_Income),
            });
        }

        return parsedRows;
    }

    function processSeries(parsed) {
        return parsed
            .filter(function (row) {
                return Number.isFinite(row.year);
            })
            .sort(function (a, b) {
                return a.year - b.year;
            });
    }

    function load() {
        var factorKeys = Object.keys(SIMULATION_CSV_BY_FACTOR);

        var promises = factorKeys.map(function (key) {
            var path = SIMULATION_CSV_BY_FACTOR[key];
            return fetch(path, { cache: 'no-store' })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('HTTP ' + response.status + ' for ' + path);
                    }
                    return response.text();
                });
        });

        return Promise.all(promises)
            .then(function (results) {
                factorKeys.forEach(function (key, idx) {
                    seriesByFactor[key] = processSeries(parseCsv(results[idx]));
                });
                series = seriesByFactor.NE || seriesByFactor[factorKeys[0]];

                return series;
            });
    }

    function getSeries() {
        return series;
    }

    function getSeriesForFactor(factorKey) {
        return seriesByFactor[factorKey] || series;
    }

    function getAllFactorKeys() {
        return Object.keys(SIMULATION_CSV_BY_FACTOR);
    }

    function getNearestRowForYear(targetYear) {
        if (!series.length) return null;

        var nearest = series[0];
        var nearestDistance = Math.abs(nearest.year - targetYear);
        for (var i = 1; i < series.length; i += 1) {
            var row = series[i];
            var distance = Math.abs(row.year - targetYear);
            if (distance < nearestDistance) {
                nearest = row;
                nearestDistance = distance;
            }
        }
        return nearest;
    }

    return {
        load: load,
        getSeries: getSeries,
        getSeriesForFactor: getSeriesForFactor,
        getAllFactorKeys: getAllFactorKeys,
        getNearestRowForYear: getNearestRowForYear,
    };
})();
