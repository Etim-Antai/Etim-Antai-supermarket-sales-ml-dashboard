// =========================================================================
// charts.js
// Retail Sales Intelligence Dashboard — Executive Analytics charts
// Updated to match the 2026 Modern Design System
// =========================================================================

// -------------------------------------------------------------------------
// Design tokens — Synced with CSS :root variables
// -------------------------------------------------------------------------
const CHART_COLORS = {
  primary:      "#2563EB", // --primary (Blue)
  success:      "#10B981", // --success (Green)
  warning:      "#F59E0B", // --warning (Orange)
  danger:       "#EF4444", // --danger (Red)
  info:         "#38BDF8", // --secondary (Light Blue)
  purple:       "#7C3AED", // (Purple)
};

const CHART_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.purple,
  CHART_COLORS.info,
  CHART_COLORS.danger,
];

const CHART_TEXT_COLOR = "#475569";  // --text-secondary
const CHART_GRID_COLOR = "#F1F5F9";  // --border-light (Clean grid lines)

// Shared layout configuration for consistent design across all charts
function baseLayout(overrides = {}) {
  return Object.assign(
    {
      margin: { t: 20, r: 20, b: 40, l: 50 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { 
        color: CHART_TEXT_COLOR, 
        family: "'Inter', sans-serif", 
        size: 11 
      },
      colorway: CHART_PALETTE,
      xaxis: { 
        gridcolor: CHART_GRID_COLOR, 
        zeroline: false,
        tickfont: { size: 10 }
      },
      yaxis: { 
        gridcolor: CHART_GRID_COLOR, 
        zeroline: false,
        tickfont: { size: 10 }
      },
      legend: { 
        font: { size: 11 },
        orientation: "h",
        y: -0.2
      },
    },
    overrides
  );
}

const PLOTLY_CONFIG = { 
  responsive: true, 
  displayModeBar: false 
};

// -------------------------------------------------------------------------
// Entry point — called once data is parsed
// -------------------------------------------------------------------------
function drawCharts(data) {
  // Line chart (Main Trend)
  if (document.getElementById("salesTrend")) drawSalesTrend(data);
  
  // Bar charts
  if (document.getElementById("salesByBranch")) drawBranchChart(data);
  if (document.getElementById("salesByProduct")) drawProductChart(data);
  
  // Pie charts
  if (document.getElementById("salesByCity")) drawCityChart(data);
  if (document.getElementById("paymentMethods")) drawPaymentChart(data);
}

// -------------------------------------------------------------------------
// Helper — Aggregation logic
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
// 1. Sales Trend (Line Chart)
// -------------------------------------------------------------------------
function drawSalesTrend(data) {
  const grouped = {};
  data.forEach((row) => {
    const date = row.Date instanceof Date ? row.Date.toLocaleDateString() : row.Date;
    grouped[date] = (grouped[date] || 0) + Number(row.Sales);
  });

  const trace = {
    x: Object.keys(grouped),
    y: Object.values(grouped),
    type: "scatter",
    mode: "lines",
    line: { width: 3.5, color: CHART_COLORS.primary, shape: "spline" },
    fill: "tozeroy",
    fillcolor: "rgba(37, 99, 235, 0.06)", // Soft blue fill
    hovertemplate: "<b>Date:</b> %{x}<br><b>Sales:</b> $%{y:,.2f}<extra></extra>",
  };

  Plotly.newPlot("salesTrend", [trace], baseLayout(), PLOTLY_CONFIG);
}

// -------------------------------------------------------------------------
// 2. Branch Performance (Vertical Bar)
// -------------------------------------------------------------------------
function drawBranchChart(data) {
  const g = groupBy(data, "Branch");
  const trace = {
    x: Object.keys(g),
    y: Object.values(g),
    type: "bar",
    marker: { 
      color: CHART_COLORS.primary,
      line: { color: CHART_COLORS.primary, width: 1 }
    },
    hovertemplate: "<b>Branch:</b> %{x}<br><b>Total:</b> $%{y:,.0f}<extra></extra>",
  };

  Plotly.newPlot("salesByBranch", [trace], baseLayout(), PLOTLY_CONFIG);
}

// -------------------------------------------------------------------------
// 3. Product Performance (Horizontal Bar)
// -------------------------------------------------------------------------
function drawProductChart(data) {
  const g = groupBy(data, "Product line");
  const trace = {
    x: Object.values(g),
    y: Object.keys(g),
    type: "bar",
    orientation: "h",
    marker: { color: CHART_COLORS.success },
    hovertemplate: "<b>Sales:</b> $%{x:,.0f}<extra></extra>",
  };

  Plotly.newPlot("salesByProduct", [trace], baseLayout({
    margin: { t: 10, r: 20, b: 40, l: 140 },
    xaxis: { title: "Revenue ($)" }
  }), PLOTLY_CONFIG);
}

// -------------------------------------------------------------------------
// 4. City Performance (Donut Chart)
// -------------------------------------------------------------------------
function drawCityChart(data) {
  const g = groupBy(data, "City");
  const trace = {
    labels: Object.keys(g),
    values: Object.values(g),
    type: "pie",
    hole: 0.6,
    marker: { colors: CHART_PALETTE },
    textinfo: "percent",
    hovertemplate: "<b>City:</b> %{label}<br><b>Sales:</b> $%{value:,.0f}<extra></extra>",
  };

  Plotly.newPlot("salesByCity", [trace], baseLayout({ showlegend: true }), PLOTLY_CONFIG);
}

// -------------------------------------------------------------------------
// 5. Payment Methods (Donut Chart)
// -------------------------------------------------------------------------
function drawPaymentChart(data) {
  const counts = {};
  data.forEach((r) => {
    counts[r.Payment] = (counts[r.Payment] || 0) + 1;
  });

  const trace = {
    labels: Object.keys(counts),
    values: Object.values(counts),
    type: "pie",
    hole: 0.6,
    marker: { colors: CHART_PALETTE },
    textinfo: "percent",
    hovertemplate: "<b>Method:</b> %{label}<br><b>Count:</b> %{value}<extra></extra>",
  };

  Plotly.newPlot("paymentMethods", [trace], baseLayout({ showlegend: true }), PLOTLY_CONFIG);
}
