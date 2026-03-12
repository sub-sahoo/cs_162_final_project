let currentFrame = -1;
let isTicking = false;
let simulationSeries = [];
let visualizationFrameIndices = [];
let plotStartFrameIndex = 0;

const DATASETS = {
  NE: "data/final_simulation_mean_results_NE.csv", // baseline
  TE: "data/final_simulation_mean_results_TE.csv", // no theft
  SE: "data/final_simulation_mean_results_SE.csv", // equal savings
  IE: "data/final_simulation_mean_results_IE.csv", // equal income
  AE: "data/final_simulation_mean_results_AE.csv" // all equal
};
// TODO: if adding more frames at the end, update the numbers below
const DATASET_TOGGLE_FRAMES = [frames.length - 2, frames.length - 1];

let currentDataset = "NE";
const Y_SCALE_MODE = "log";
const LOG_SCALE_MIN = 1;
const VIZ_CHART = {
  width: 920,
  height: 520,
  padding: { top: 28, right: 28, bottom: 52, left: 84 }
};

const VIZ_SERIES = [
  { key: "Mean_White_Wealth", label: "White families", color: "#0f172a" },
  {
    key: "Mean_Black_Wealth",
    label: "Black families (actual)",
    color: "#b91c1c"
  },
  {
    key: "Mean_Black_40_Wealth",
    label: "Black families (40 acres scenario)",
    color: "#0f766e"
  }
];

$(document).ready(function () {
  const $container = $("#frames");
  plotStartFrameIndex = getPlotStartFrameIndex();

  frames.forEach(function (frameData, index) {
    const templateName = frameData.template || "placeholder";
    const renderer = TemplateRegistry.getRenderer(templateName);
    const $frame = $(renderer.render(frameData));
    $frame.attr("data-frame-index", index);
    if (isVisualizationFrameIndex(index)) {
      $frame.addClass("frame-viz-step");
    }
    $container.append($frame);
  });

  buildTimeline();
  buildStickyVisualizationPanel();
  $("body").toggleClass("show-viz", plotStartFrameIndex <= 0);
  visualizationFrameIndices = getVisualizationFrameIndices();

  updateActiveFrame(0);
  updateActiveFrameFromScroll();

  $(window).on("scroll resize", queueScrollUpdate);

  $(document).on("keydown", function (e) {
    if (isEditingTarget(e.target)) return;

    if (e.key === "ArrowDown" || e.key === " ") {
      e.preventDefault();
      scrollToFrame(Math.min(currentFrame + 1, frames.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollToFrame(Math.max(currentFrame - 1, 0));
    }
  });

  loadSimulationSeries()
    .then(function () {
      populateModelStatsCards();
      updateVisualizationForFrame(currentFrame);
    })
    .catch(function (error) {
      console.error("Unable to load final simulation mean CSV.", error);
      $("#viz-year-readout").text("Could not load final simulation mean CSV.");
      populateModelStatsErrorState("Could not load final simulation mean CSV.");
    });

  $(document).on("click", "#viz-dataset-toggle button", function () {
    const dataset = $(this).data("dataset");

    if (dataset === currentDataset) return;

    currentDataset = dataset;

    // highlight active button
    $("#viz-dataset-toggle button").removeClass("active");
    $(this).addClass("active");

    const svg = document.getElementById("viz-chart");
    svg.style.opacity = 0;

    loadSimulationSeries().then(function () {
      populateModelStatsCards();
      updateVisualizationForFrame(currentFrame);
      svg.style.opacity = 1;
    });
  });
});

function buildTimeline() {
  const $timeline = $('<div id="timeline"></div>');
  TIMELINE_CATEGORIES.forEach(function (label, i) {
    $timeline.append(
      '<div class="timeline-bucket" data-index="' +
        i +
        '">' +
        '<span class="timeline-bucket-label">' +
        label +
        "</span>" +
        "</div>"
    );
  });
  $("body").prepend($timeline);
}

function buildStickyVisualizationPanel() {
  const legendHtml = VIZ_SERIES.map(function (series) {
    return (
      '<span class="viz-legend-item">' +
      '<span class="viz-legend-dot" style="background:' +
      series.color +
      ';"></span>' +
      series.label +
      "</span>"
    );
  }).join("");

  const panelHtml =
    '<aside id="viz-panel" aria-label="Simulation line graph">' +
    '<div class="viz-panel-content">' +
    '<p class="viz-kicker">Final simulation mean CSV</p>' +
    '<p id="viz-era-title" class="viz-era-title"></p>' +
    '<h2 class="viz-title">Wealth Trajectory Over Time</h2>' +
    '<svg id="viz-chart" viewBox="0 0 ' +
    VIZ_CHART.width +
    " " +
    VIZ_CHART.height +
    '" preserveAspectRatio="xMidYMid meet"></svg>' +
    '<div class="viz-legend">' +
    legendHtml +
    "</div>" +
    // dataset toggle buttons (hidden until final frames)
    '<div id="viz-dataset-toggle" style="display:none;">' +
    '<button data-dataset="NE">Baseline</button>' +
    '<button data-dataset="TE">No Systematic Theft</button>' +
    '<button data-dataset="SE">Equal Savings Access</button>' +
    '<button data-dataset="IE">Equal Income</button>' +
    '<button data-dataset="AE">All Barriers Removed</button>' +
    "</div>" +
    '<p id="viz-year-readout" class="viz-year-readout"></p>' +
    "</div>" +
    "</aside>";

  $("body").append(panelHtml);
  $("#viz-dataset-toggle button[data-dataset='NE']").addClass("active");
}

function getVisualizationFrameIndices() {
  const indices = [];
  frames.forEach(function (_frameData, index) {
    if (isVisualizationFrameIndex(index)) {
      indices.push(index);
    }
  });
  return indices;
}

function isVisualizationFrameIndex(index) {
  if (index < plotStartFrameIndex) return false;
  const frame = frames[index] || {};
  return frame.hideViz !== true;
}

function getPlotStartFrameIndex() {
  const exactIndex = frames.findIndex(function (frame) {
    return String(frame.title || "").trim() === "1865";
  });
  if (exactIndex >= 0) return exactIndex;

  const fuzzyIndex = frames.findIndex(function (frame) {
    return /\b1865\b/.test(String(frame.title || ""));
  });
  if (fuzzyIndex >= 0) return fuzzyIndex;

  return 0;
}

async function loadSimulationSeries() {
  const response = await fetch(DATASETS[currentDataset], {
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error(
      "HTTP " + response.status + " for " + DATASETS[currentDataset]
    );
  }

  const csvText = await response.text();
  simulationSeries = parseSimulationCsv(csvText)
    .filter(function (row) {
      return Number.isFinite(row.year);
    })
    .sort(function (a, b) {
      return a.year - b.year;
    });
}

function parseSimulationCsv(csvText) {
  const trimmed = csvText.trim();
  if (!trimmed) return [];

  const lines = trimmed.split(/\r?\n/);
  const headers = lines[0].split(",");
  const parsedRows = [];

  for (let i = 1; i < lines.length; i += 1) {
    if (!lines[i]) continue;
    const cells = lines[i].split(",");
    const row = {};

    for (let j = 0; j < headers.length; j += 1) {
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
      Mean_Black_40_Income: Number(row.Mean_Black_40_Income)
    });
  }

  return parsedRows;
}

function populateModelStatsCards() {
  if (!simulationSeries.length) return;

  frames.forEach(function (frameData, index) {
    if (!Number.isFinite(frameData.statsYear)) return;

    const row = getNearestSimulationRow(frameData.statsYear);
    if (!row) return;

    const markup = buildModelStatsMarkup(row, frameData.statsYear);
    const selector =
      '.frame[data-frame-index="' + index + '"] .frame-card-text';
    const $target = $(selector);
    if ($target.length) {
      $target.html(markup);
    }
  });
}

function populateModelStatsErrorState(message) {
  frames.forEach(function (frameData, index) {
    if (!Number.isFinite(frameData.statsYear)) return;
    const selector =
      '.frame[data-frame-index="' + index + '"] .frame-card-text';
    const $target = $(selector);
    if ($target.length) {
      $target.html('<p class="model-stats-loading">' + message + "</p>");
    }
  });
}

function getNearestSimulationRow(targetYear) {
  if (!simulationSeries.length) return null;

  let nearest = simulationSeries[0];
  let nearestDistance = Math.abs(nearest.year - targetYear);
  for (let i = 1; i < simulationSeries.length; i += 1) {
    const row = simulationSeries[i];
    const distance = Math.abs(row.year - targetYear);
    if (distance < nearestDistance) {
      nearest = row;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function buildModelStatsMarkup(row, targetYear) {
  const whiteWealth = toFiniteOrZero(row.Mean_White_Wealth);
  const blackWealth = toFiniteOrZero(row.Mean_Black_Wealth);
  const black40Wealth = toFiniteOrZero(row.Mean_Black_40_Wealth);
  const actualRatio = whiteWealth > 0 ? blackWealth / whiteWealth : 0;
  const scenarioRatio = whiteWealth > 0 ? black40Wealth / whiteWealth : 0;

  return (
    '<h3 class="model-stats-heading">Simulation Statistics (' +
    row.year +
    ")</h3>" +
    "</p>" +
    '<div class="model-stats-grid">' +
    buildStatsGroup("White Families", {
      wealth: row.Mean_White_Wealth,
      land: row.Mean_White_Land,
      invest: row.Mean_White_Invest,
      income: row.Mean_White_Income
    }) +
    buildStatsGroup("Black Families (Actual)", {
      wealth: row.Mean_Black_Wealth,
      land: row.Mean_Black_Land,
      invest: row.Mean_Black_Invest,
      income: row.Mean_Black_Income
    }) +
    buildStatsGroup("Black Families (40 Acres Scenario)", {
      wealth: row.Mean_Black_40_Wealth,
      land: row.Mean_Black_40_Land,
      invest: row.Mean_Black_40_Invest,
      income: row.Mean_Black_40_Income
    }) +
    "</div>" +
    "</p>" +
    '<ul class="model-stats-summary">' +
    "<li>Black/White wealth ratio (actual): <strong>" +
    formatPercent(actualRatio) +
    "</strong></li>" +
    "<li>Black/White wealth ratio (40 acres scenario): <strong>" +
    formatPercent(scenarioRatio) +
    "</strong></li>" +
    "<li>Scenario vs actual Black wealth uplift: <strong>" +
    formatPercent(
      blackWealth > 0 ? (black40Wealth - blackWealth) / blackWealth : 0
    ) +
    "</strong></li>" +
    "</ul>"
  );
}

function buildStatsGroup(label, data) {
  return (
    '<section class="model-stats-group">' +
    "<h4>" +
    label +
    "</h4>" +
    "<ul>" +
    "<li>Mean wealth: <strong>" +
    formatMoney(data.wealth) +
    "</strong></li>" +
    "<li>Mean land value: <strong>" +
    formatMoney(data.land) +
    "</strong></li>" +
    "<li>Mean investments: <strong>" +
    formatMoney(data.invest) +
    "</strong></li>" +
    "<li>Mean income: <strong>" +
    formatMoney(data.income) +
    "</strong></li>" +
    "</ul>" +
    "</section>"
  );
}

function toFiniteOrZero(value) {
  return Number.isFinite(value) ? value : 0;
}

function formatMoney(value) {
  const safe = toFiniteOrZero(value);
  return "$" + Math.round(safe).toLocaleString("en-US");
}

function formatPercent(value) {
  const safe = toFiniteOrZero(value);
  return (safe * 100).toFixed(1) + "%";
}

function isEditingTarget(target) {
  const tag = (target.tagName || "").toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
}

function queueScrollUpdate() {
  if (isTicking) return;

  isTicking = true;
  window.requestAnimationFrame(function () {
    updateActiveFrameFromScroll();
    isTicking = false;
  });
}

function getTimelineOffset() {
  const timelineHeight = $("#timeline").outerHeight() || 0;
  return timelineHeight + 16;
}

function getActiveFrameIndex() {
  const $frames = $(".frame");
  if (!$frames.length) return -1;

  const scrollTop = $(window).scrollTop();
  const viewportHeight = $(window).height();
  const activationLine = scrollTop + getTimelineOffset() + viewportHeight * 0.2;
  let activeIndex = 0;

  $frames.each(function (index) {
    const frameTop = $(this).offset().top;
    const frameBottom = frameTop + $(this).outerHeight();

    if (activationLine >= frameTop && activationLine < frameBottom) {
      activeIndex = index;
      return false;
    }

    if (activationLine >= frameBottom) {
      activeIndex = index;
    }
  });

  return activeIndex;
}

function updateActiveFrameFromScroll() {
  const newIndex = getActiveFrameIndex();
  if (newIndex >= 0 && newIndex !== currentFrame) {
    updateActiveFrame(newIndex);
  }
}

function scrollToFrame(index) {
  const target = $(".frame").eq(index);
  if (target.length) {
    const destination = Math.max(0, target.offset().top - getTimelineOffset());
    $("html, body").stop(true).animate({ scrollTop: destination }, 450);
  }
}

function updateActiveFrame(newIndex) {
  if (newIndex < 0 || newIndex >= frames.length) return;

  const prevIndex = currentFrame;
  currentFrame = newIndex;

  $(".frame").removeClass("active");
  $(".frame").eq(newIndex).addClass("active");

  const filledUpTo = FRAME_TO_FILLED_BUCKET[newIndex] ?? -1;
  $(".timeline-bucket").removeClass("filled");
  $(".timeline-bucket").each(function () {
    const idx = parseInt($(this).data("index"), 10);
    if (idx <= filledUpTo) $(this).addClass("filled");
  });

  updateVisualizationForFrame(newIndex);

  if (prevIndex >= 0) onFrameLeave(prevIndex);
  onFrameEnter(newIndex);
}

function updateVisualizationForFrame(frameIndex) {
  const shouldShowViz = isVisualizationFrameIndex(frameIndex);
  $("body").toggleClass("show-viz", shouldShowViz);

  const showToggle = DATASET_TOGGLE_FRAMES.includes(frameIndex);
  $("#viz-dataset-toggle").toggle(showToggle);

  if (!shouldShowViz) return;

  updateVisualizationDateTitle(frameIndex);

  if (!simulationSeries.length) return;

  const targetYear = getTargetYearForFrame(frameIndex);
  renderLineChart(targetYear);
}

function updateVisualizationDateTitle(frameIndex) {
  const label = getDateTitleForFrame(frameIndex);
  $("#viz-era-title").text(label);
}

function getDateTitleForFrame(frameIndex) {
  for (let i = frameIndex; i >= 0; i -= 1) {
    const title = frames[i] && frames[i].title;
    if (typeof title === "string" && isDateLikeTitle(title)) {
      return title.trim();
    }
  }

  const bucketIndex = getTimelineBucketForFrame(frameIndex);
  return TIMELINE_CATEGORIES[bucketIndex] || TIMELINE_CATEGORIES[0] || "";
}

function isDateLikeTitle(title) {
  return /\d/.test(title) || /\bpresent\b/i.test(title);
}

function getTimelineBucketForFrame(frameIndex) {
  for (let i = frameIndex; i >= 0; i -= 1) {
    const bucket = FRAME_TO_FILLED_BUCKET[i];
    if (Number.isInteger(bucket) && bucket >= 0) {
      return bucket;
    }
  }
  return 0;
}

function getTargetYearForFrame(frameIndex) {
  if (!simulationSeries.length) return null;

  const lastYear = simulationSeries[simulationSeries.length - 1].year;

  const title = getDateTitleForFrame(frameIndex);

  if (!title) return simulationSeries[0].year;

  if (title.includes("1865")) return 1870;
  if (title.includes("1910")) return 1915;
  if (title.includes("1930")) return 1935;
  if (title.includes("1950")) return 1955;
  if (title.includes("1970")) return 1975;
  if (title.includes("Present")) return 2022;
  if (title.includes("2000")) return 2005;
  if (title.includes("Present")) return 2022;
  if (title.toLowerCase().includes("present")) return lastYear;

  return simulationSeries[0].year;
}

function renderLineChart(targetYear) {
  const svg = document.getElementById("viz-chart");
  if (!svg || !simulationSeries.length) return;

  const rows = simulationSeries.filter(function (row) {
    return row.year <= targetYear;
  });

  if (!rows.length) return;

  const maxY = Math.max(
    1,
    ...simulationSeries.map(function (row) {
      return Math.max(
        row.Mean_White_Wealth || 0,
        row.Mean_Black_Wealth || 0,
        row.Mean_Black_40_Wealth || 0
      );
    })
  );

  const linearMaxY = maxY * 1.05;
  const logMaxY = Math.max(maxY * 1.05, LOG_SCALE_MIN * 10);
  const minYear = simulationSeries[0].year;
  const maxYear = simulationSeries[simulationSeries.length - 1].year;
  const chartWidth = VIZ_CHART.width;
  const chartHeight = VIZ_CHART.height;
  const padding = VIZ_CHART.padding;
  const logMin = Math.log10(LOG_SCALE_MIN);
  const logMax = Math.log10(logMaxY);

  const xScale = function (year) {
    if (maxYear === minYear) return padding.left;
    const pct = (year - minYear) / (maxYear - minYear);
    return padding.left + pct * (chartWidth - padding.left - padding.right);
  };

  const yScale = function (value) {
    const safe = Number.isFinite(value) ? value : 0;
    const drawableHeight = chartHeight - padding.top - padding.bottom;
    if (Y_SCALE_MODE === "log") {
      const clamped = Math.max(LOG_SCALE_MIN, safe);
      const pct = (Math.log10(clamped) - logMin) / (logMax - logMin || 1);
      return chartHeight - padding.bottom - pct * drawableHeight;
    }

    return chartHeight - padding.bottom - (safe / linearMaxY) * drawableHeight;
  };

  const yTicks = [];
  if (Y_SCALE_MODE === "log") {
    const minExp = Math.floor(logMin);
    const maxExp = Math.ceil(logMax);
    for (let exp = minExp; exp <= maxExp; exp += 1) {
      const tick = Math.pow(10, exp);
      if (tick >= LOG_SCALE_MIN && tick <= logMaxY * 1.0001) {
        yTicks.push(tick);
      }
    }
  } else {
    const yTickCount = 5;
    for (let i = 0; i < yTickCount; i += 1) {
      yTicks.push((linearMaxY * i) / (yTickCount - 1));
    }
  }

  const xTickYears = [1860, 1900, 1940, 1980, 2020].filter(function (year) {
    return year >= minYear && year <= maxYear;
  });

  let chartMarkup = "";

  yTicks.forEach(function (tickValue) {
    const y = yScale(tickValue);
    chartMarkup +=
      '<line class="viz-grid-line" x1="' +
      padding.left +
      '" y1="' +
      y +
      '" x2="' +
      (chartWidth - padding.right) +
      '" y2="' +
      y +
      '"></line>' +
      '<text class="viz-axis-label y-axis-label" x="' +
      (padding.left - 12) +
      '" y="' +
      y +
      '">' +
      formatYAxisTick(tickValue) +
      "</text>";
  });

  xTickYears.forEach(function (year) {
    const x = xScale(year);
    chartMarkup +=
      '<line class="viz-grid-line x-grid-line" x1="' +
      x +
      '" y1="' +
      padding.top +
      '" x2="' +
      x +
      '" y2="' +
      (chartHeight - padding.bottom) +
      '"></line>' +
      '<text class="viz-axis-label x-axis-label" x="' +
      x +
      '" y="' +
      (chartHeight - padding.bottom + 24) +
      '">' +
      year +
      "</text>";
  });

  chartMarkup +=
    '<line class="viz-axis" x1="' +
    padding.left +
    '" y1="' +
    (chartHeight - padding.bottom) +
    '" x2="' +
    (chartWidth - padding.right) +
    '" y2="' +
    (chartHeight - padding.bottom) +
    '"></line>' +
    '<line class="viz-axis" x1="' +
    padding.left +
    '" y1="' +
    padding.top +
    '" x2="' +
    padding.left +
    '" y2="' +
    (chartHeight - padding.bottom) +
    '"></line>';

  VIZ_SERIES.forEach(function (series) {
    const linePath = buildLinePath(rows, series.key, xScale, yScale);
    if (!linePath) return;
    chartMarkup +=
      '<path class="viz-series-line" d="' +
      linePath +
      '" stroke="' +
      series.color +
      '"></path>';
  });

  const finalRow = rows[rows.length - 1];
  VIZ_SERIES.forEach(function (series) {
    const value = finalRow[series.key];
    const x = xScale(finalRow.year);
    const y = yScale(value);
    chartMarkup +=
      '<circle class="viz-series-point" cx="' +
      x +
      '" cy="' +
      y +
      '" r="3.5" fill="' +
      series.color +
      '"></circle>';
  });

  svg.innerHTML = chartMarkup;

  const lines = svg.querySelectorAll(".viz-series-line");
  $("#viz-year-readout").text("Visible data through " + targetYear);
}

function buildLinePath(rows, valueKey, xScale, yScale) {
  if (!rows.length) return "";

  let path = "";
  rows.forEach(function (row, index) {
    const x = xScale(row.year);
    const y = yScale(row[valueKey]);
    path += (index === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  });
  return path.trim();
}

function formatCurrencyCompact(value) {
  if (!Number.isFinite(value)) return "$0";
  if (value >= 1000000000) return "$" + (value / 1000000000).toFixed(1) + "B";
  if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return "$" + Math.round(value / 1000) + "k";
  return "$" + Math.round(value);
}

function formatYAxisTick(value) {
  if (Y_SCALE_MODE === "log") {
    if (!Number.isFinite(value) || value <= 0) return "";
    return "10^" + Math.round(Math.log10(value));
  }

  return formatCurrencyCompact(value);
}

function onFrameEnter(frameIndex) {
  void frameIndex;
}

function onFrameLeave(frameIndex) {
  void frameIndex;
}
