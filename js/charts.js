// =========================================================================
// charts.js
// Retail Sales Intelligence Dashboard — Executive Analytics charts
//
// This file only draws the charts that exist on index.html:
//   #salesTrend      Sales Trend (featured line chart)
//   #salesByBranch   Branch Performance
//   #salesByProduct  Product Performance
//   #salesByCity     City Performance
//   #paymentMethods  Payment Analysis
//
// Chart functions for other pages (Sales/Branch/Product/Customer/Payment
// Analytics, Business Insights) belong in that page's own script once the
// page is built, so they aren't declared here against divs that don't exist.
// =========================================================================

// -------------------------------------------------------------------------
// Design tokens — kept in sync with css/style.css
// -------------------------------------------------------------------------
const CHART_COLORS = {
  sales:        "#3A5CE0", // --c-sales
  transactions: "#7C3AED", // --c-transactions
  profit:       "#12946A", // --c-profit
  rating:       "#D97706", // --c-rating
  quantity:     "#EA580C", // --c-quantity
  average:      "#0D9488", // --c-average
};

const CHART_PALETTE = [
  CHART_COLORS.sales,
  CHART_COLORS.profit,
  CHART_COLORS.rating,
  CHART_COLORS.transactions,
  CHART_COLORS.quantity,
  CHART_COLORS.average,
];

const CHART_TEXT_COLOR = "#475467";  // --text-secondary, readable on white cards
const CHART_GRID_COLOR = "#E7EAF1";  // --border

// Shared layout so every chart matches the card's light background
function baseLayout(overrides = {}) {
  return Object.assign(
    {
      margin: { t: 16, r: 16, b: 40, l: 48 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: CHART_TEXT_COLOR, family: "Inter, sans-serif", size: 12 },
      colorway: CHART_PALETTE,
      xaxis: { gridcolor: CHART_GRID_COLOR, zeroline: false },
      yaxis: { gridcolor: CHART_GRID_COLOR, zeroline: false },
      legend: { font: { color: CHART_TEXT_COLOR } },
    },
    overrides
  );
}

const PLOTLY_CONFIG = { responsive: true, displayModeBar: false };

// -------------------------------------------------------------------------
// Entry point — called once the dataset is parsed and filtered
// -------------------------------------------------------------------------
function drawCharts(data) {
  drawSalesTrend(data);
  drawBranchChart(data);
  drawProductChart(data);
  drawCityChart(data);
  drawPaymentChart(data);
}

// -------------------------------------------------------------------------
// Helper — sum a numeric field grouped by a categorical field
// -------------------------------------------------------------------------
function groupBy(data, key, valueField = "Sales") {
  const grouped = {};
  data.forEach((row) => {
    const k = row[key];
    grouped[k] = (grouped[k] || 0) + Number(row[valueField]);
  });
  return grouped;
}

// -------------------------------------------------------------------------
// Sales Trend  →  #salesTrend
// -------------------------------------------------------------------------
function drawSalesTrend(data) {
  const grouped = {};
  data.forEach((row) => {
    const date = row.Date.toLocaleDateString();
    grouped[date] = (grouped[date] || 0) + Number(row.Sales);
  });

  Plotly.newPlot(
    "salesTrend",
    [
      {
        x: Object.keys(grouped),
        y: Object.values(grouped),
        type: "scatter",
        mode: "lines+markers",
        line: { width: 3, color: CHART_COLORS.sales, shape: "spline" },
        marker: { size: 5, color: CHART_COLORS.sales },
        fill: "tozeroy",
        fillcolor: "rgba(58, 92, 224, 0.08)",
        hovertemplate: "%{x}<br>$%{y:,.0f}<extra></extra>",
      },
    ],
    baseLayout(),
    PLOTLY_CONFIG
  );
}

// -------------------------------------------------------------------------
// Branch Performance  →  #salesByBranch
// -------------------------------------------------------------------------
function drawBranchChart(data) {
  const g = groupBy(data, "Branch");
  Plotly.newPlot(
    "salesByBranch",
    [
      {
        x: Object.keys(g),
        y: Object.values(g),
        type: "bar",
        marker: { color: CHART_COLORS.sales, cornerradius: 6 },
        hovertemplate: "%{x}<br>$%{y:,.0f}<extra></extra>",
      },
    ],
    baseLayout(),
    PLOTLY_CONFIG
  );
}

// -------------------------------------------------------------------------
// Product Performance  →  #salesByProduct
// -------------------------------------------------------------------------
function drawProductChart(data) {
  const g = groupBy(data, "Product line");
  Plotly.newPlot(
    "salesByProduct",
    [
      {
        x: Object.values(g),
        y: Object.keys(g),
        type: "bar",
        orientation: "h",
        marker: { color: CHART_COLORS.average, cornerradius: 6 },
        hovertemplate: "%{y}<br>$%{x:,.0f}<extra></extra>",
      },
    ],
    baseLayout({
      margin: { t: 16, r: 16, b: 40, l: 140 },
      yaxis: { automargin: true },
    }),
    PLOTLY_CONFIG
  );
}

// -------------------------------------------------------------------------
// City Performance  →  #salesByCity
// -------------------------------------------------------------------------
function drawCityChart(data) {
  const g = groupBy(data, "City");
  Plotly.newPlot(
    "salesByCity",
    [
      {
        labels: Object.keys(g),
        values: Object.values(g),
        type: "pie",
        hole: 0.55,
        marker: { colors: CHART_PALETTE, line: { color: "#FFFFFF", width: 2 } },
        textinfo: "label+percent",
        textfont: { color: CHART_TEXT_COLOR, size: 11 },
        hovertemplate: "%{label}<br>$%{value:,.0f}<extra></extra>",
      },
    ],
    baseLayout({ showlegend: false }),
    PLOTLY_CONFIG
  );
}

// -------------------------------------------------------------------------
// Payment Analysis  →  #paymentMethods
// -------------------------------------------------------------------------
function drawPaymentChart(data) {
  const counts = {};
  data.forEach((r) => {
    counts[r.Payment] = (counts[r.Payment] || 0) + 1;
  });

  Plotly.newPlot(
    "paymentMethods",
    [
      {
        labels: Object.keys(counts),
        values: Object.values(counts),
        type: "pie",
        hole: 0.55,
        marker: { colors: CHART_PALETTE, line: { color: "#FFFFFF", width: 2 } },
        textinfo: "label+percent",
        textfont: { color: CHART_TEXT_COLOR, size: 11 },
        hovertemplate: "%{label}<br>%{value} transactions<extra></extra>",
      },
    ],
    baseLayout({ showlegend: false }),
    PLOTLY_CONFIG
  );
}
