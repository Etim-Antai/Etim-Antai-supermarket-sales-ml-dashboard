/* ==========================================================
   CUSTOMER ANALYTICS
   Retail Sales Intelligence Dashboard
   Author: Engr. Etim Antai
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDashboardData(function(data){

        updateCustomerKPIs(data);

        drawCustomerTypeChart(data);

        drawGenderChart(data);

        drawCustomerSpendingChart(data);

    });

});

/* ==========================================================
   CUSTOMER KPI CARDS
========================================================== */

function updateCustomerKPIs(data){

    // Total transactions
    document.getElementById("totalCustomers").textContent =
        formatNumber(data.length);

    // Average spending
    document.getElementById("avgSpending").textContent =
        formatCurrency(
            average(
                data.map(item => item.sales)
            )
        );

    // Average rating
    document.getElementById("avgRating").textContent =
        average(
            data.map(item => item.rating)
        ).toFixed(2);

    // Average basket size
    document.getElementById("avgBasket").textContent =
        average(
            data.map(item => item.quantity)
        ).toFixed(1);

}

/* ==========================================================
   CUSTOMER TYPE
========================================================== */

function drawCustomerTypeChart(data){

    const grouped = groupBy(data, "customerType");

    const labels = Object.keys(grouped);

    const values = labels.map(label => grouped[label].length);

    Plotly.newPlot(

        "customerTypeChart",

        [{

            labels: labels,

            values: values,

            type: "pie",

            hole: 0.55,

            textinfo: "label+percent",

            marker: {

                colors: [

                    "#3A5CE0",

                    "#10B981"

                ]

            }

        }],

        {

            ...defaultLayout("Customer Type")

        },

        plotConfig

    );

}

/* ==========================================================
   GENDER DISTRIBUTION
========================================================== */

function drawGenderChart(data){

    const grouped = groupBy(data, "gender");

    const labels = Object.keys(grouped);

    const values = labels.map(label => grouped[label].length);

    Plotly.newPlot(

        "genderChart",

        [{

            x: labels,

            y: values,

            type: "bar",

            text: values,

            textposition: "outside",

            marker: {

                color: [

                    "#3A5CE0",

                    "#10B981"

                ]

            }

        }],

        {

            ...defaultLayout("Gender Distribution"),

            yaxis:{

                title:"Customers"

            }

        },

        plotConfig

    );

}

/* ==========================================================
   AVERAGE SPENDING
========================================================== */

function drawCustomerSpendingChart(data){

    const grouped = groupBy(data, "customerType");

    const labels = [];

    const averages = [];

    Object.keys(grouped).forEach(customer => {

        labels.push(customer);

        averages.push(

            average(

                grouped[customer].map(item => item.sales)

            )

        );

    });

    Plotly.newPlot(

        "customerSpendingChart",

        [{

            x: labels,

            y: averages,

            type: "bar",

            marker:{

                color:"#7C3AED"

            },

            text: averages.map(v => formatCurrency(v)),

            textposition:"outside"

        }],

        {

            ...defaultLayout("Average Spending by Customer Type"),

            yaxis:{

                title:"Average Sales ($)"

            }

        },

        plotConfig

    );

}

console.log("Customer Analytics Loaded");