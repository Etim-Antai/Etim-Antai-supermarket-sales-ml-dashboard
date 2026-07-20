/* ==========================================================
   Retail Sales Intelligence Dashboard
   Executive Dashboard Analytics
   Author: Engr. Etim Antai
========================================================== */


let dashboardOverviewData = [];


// ==========================================================
// LOAD DASHBOARD DATA
// ==========================================================

document.addEventListener("DOMContentLoaded", function(){


    loadDashboardData(function(data){


        dashboardOverviewData = data;


        console.log(
            "Executive Dashboard Loaded:",
            dashboardOverviewData.length
        );


        updateDashboardKPIs();

        createDashboardCharts();


    });


});




// ==========================================================
// KPI FUNCTIONS
// ==========================================================

function updateDashboardKPIs(){


    // Total Revenue

    let revenue =
        sum(
            dashboardOverviewData.map(
                item => item.sales
            )
        );


    document.getElementById(
        "dashboardSales"
    ).innerHTML =
        formatCurrency(revenue);





    // Transactions

    document.getElementById(
        "dashboardTransactions"
    ).innerHTML =
        formatNumber(
            dashboardOverviewData.length
        );







    // Gross Income

    let income =
        sum(
            dashboardOverviewData.map(
                item => item.grossIncome
            )
        );



    document.getElementById(
        "dashboardIncome"
    ).innerHTML =
        formatCurrency(income);








    // Average Rating


    let rating =
        average(
            dashboardOverviewData.map(
                item => item.rating
            )
        );


    document.getElementById(
        "dashboardRating"
    ).innerHTML =
        rating.toFixed(2);








    // Quantity


    let quantity =
        sum(
            dashboardOverviewData.map(
                item => item.quantity
            )
        );



    document.getElementById(
        "dashboardQuantity"
    ).innerHTML =
        formatNumber(quantity);









    // Top Branch


    let branchSales = {};



    dashboardOverviewData.forEach(item=>{


        branchSales[item.branch] =
            (branchSales[item.branch] || 0)
            +
            item.sales;


    });





    let topBranch =
        Object.entries(branchSales)
        .sort(
            (a,b)=>b[1]-a[1]
        )[0][0];




    document.getElementById(
        "dashboardBranch"
    ).innerHTML =
        topBranch;



}








// ==========================================================
// CHARTS
// ==========================================================

function createDashboardCharts(){



    let monthlySales={};

    let productSales={};

    let branchSales={};

    let paymentSales={};






    dashboardOverviewData.forEach(item=>{



        // Monthly

        let date =
            new Date(item.date);



        let month =
            date.toLocaleString(
                "default",
                {
                    month:"short",
                    year:"numeric"
                }
            );



        monthlySales[month] =
            (monthlySales[month] || 0)
            +
            item.sales;








        // Product


        productSales[item.productLine] =
            (productSales[item.productLine] || 0)
            +
            item.sales;







        // Branch


        branchSales[item.branch] =
            (branchSales[item.branch] || 0)
            +
            item.sales;







        // Payment


        paymentSales[item.payment] =
            (paymentSales[item.payment] || 0)
            +
            item.sales;



    });









    // Monthly Trend


    Plotly.newPlot(

        "dashboardSalesTrend",

        [

            {

                x:Object.keys(monthlySales),

                y:Object.values(monthlySales),

                type:"scatter",

                mode:"lines+markers"

            }

        ],

        defaultLayout(
            "Monthly Revenue Trend"
        ),

        plotConfig

    );









    // Product Chart


    Plotly.newPlot(

        "dashboardProductChart",

        [

            {

                x:Object.keys(productSales),

                y:Object.values(productSales),

                type:"bar"

            }

        ],

        defaultLayout(
            "Sales by Product Line"
        ),

        plotConfig

    );









    // Branch Chart


    Plotly.newPlot(

        "dashboardBranchChart",

        [

            {

                x:Object.keys(branchSales),

                y:Object.values(branchSales),

                type:"bar"

            }

        ],

        defaultLayout(
            "Branch Performance"
        ),

        plotConfig

    );









    // Payment Chart


    Plotly.newPlot(

        "dashboardPaymentChart",

        [

            {

                labels:Object.keys(paymentSales),

                values:Object.values(paymentSales),

                type:"pie"

            }

        ],

        defaultLayout(
            "Payment Distribution"
        ),

        plotConfig

    );



}