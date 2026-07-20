/* ==========================================================
   Retail Sales Intelligence Dashboard
   Shared Analytics Functions
   Author: Engr. Etim Antai
========================================================== */

// ==========================================================
// Global Dashboard Data
// ==========================================================

let dashboardData = [];

// ==========================================================
// Load CSV Data
// ==========================================================

function loadDashboardData(callback) {

    Papa.parse("../data/SuperMarket Analysis.csv", {

        download: true,

        header: true,

        dynamicTyping: true,

        skipEmptyLines: true,

        complete: function (results) {

            dashboardData = results.data.map(row => ({

                invoiceId: row["Invoice ID"],

                branch: row.Branch,

                city: row.City,

                customerType: row["Customer type"],

                gender: row.Gender,

                productLine: row["Product line"],

                unitPrice: Number(row["Unit price"]),

                quantity: Number(row.Quantity),

                tax: Number(row["Tax 5%"]),

                sales: Number(row.Sales),

                date: row.Date,

                time: row.Time,

                payment: row.Payment,

                cogs: Number(row.cogs),

                grossIncome: Number(row["gross income"]),

                rating: Number(row.Rating)

            }));

            console.log("===================================");

            console.log("CSV Loaded Successfully");

            console.log("Rows:", dashboardData.length);

            console.log(dashboardData[0]);

            console.log("===================================");

            if (callback) {

                callback(dashboardData);

            }

        },

        error: function (error) {

            console.error("CSV Loading Error:", error);

        }

    });

}

// ==========================================================
// Currency Formatter
// ==========================================================

function formatCurrency(value) {

    return "$" + Number(value).toLocaleString(undefined, {

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

    });

}

// ==========================================================
// Number Formatter
// ==========================================================

function formatNumber(value) {

    return Number(value).toLocaleString();

}

// ==========================================================
// Average
// ==========================================================

function average(array) {

    if (!array || array.length === 0) return 0;

    return array.reduce((a, b) => a + b, 0) / array.length;

}

// ==========================================================
// Sum
// ==========================================================

function sum(array) {

    if (!array || array.length === 0) return 0;

    return array.reduce((a, b) => a + b, 0);

}

// ==========================================================
// Group By
// ==========================================================

function groupBy(data, key) {

    return data.reduce((groups, item) => {

        const value = item[key];

        if (value === undefined || value === null || value === "") {

            return groups;

        }

        if (!groups[value]) {

            groups[value] = [];

        }

        groups[value].push(item);

        return groups;

    }, {});

}

// ==========================================================
// Sort By Value
// ==========================================================

function sortDescending(labels, values) {

    return labels
        .map((label, index) => ({

            label,

            value: values[index]

        }))
        .sort((a, b) => b.value - a.value);

}

// ==========================================================
// Plotly Default Layout
// ==========================================================

function defaultLayout(title = "") {

    return {

        title: {

            text: title,

            font: {

                size: 18,

                family: "Inter"

            }

        },

        paper_bgcolor: "#ffffff",

        plot_bgcolor: "#ffffff",

        font: {

            family: "Inter",

            size: 13,

            color: "#334155"

        },

        margin: {

            l: 55,

            r: 20,

            t: 60,

            b: 55

        },

        hovermode: "closest",

        showlegend: true

    };

}

// ==========================================================
// Plotly Config
// ==========================================================

const plotConfig = {

    responsive: true,

    displaylogo: false,

    modeBarButtonsToRemove: [

        "lasso2d",

        "select2d",

        "toggleSpikelines",

        "hoverCompareCartesian",

        "hoverClosestCartesian"

    ]

};

// ==========================================================
// Color Palette
// ==========================================================

const chartColors = [

    "#3A5CE0",

    "#10B981",

    "#F59E0B",

    "#EF4444",

    "#8B5CF6",

    "#06B6D4",

    "#EC4899",

    "#84CC16"

];

// ==========================================================
// Ready
// ==========================================================

console.log("===================================");

console.log("Common Analytics Loaded");

console.log("Retail Sales Intelligence Dashboard");

console.log("===================================");