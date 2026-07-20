/* ==========================================================
   Retail Sales Intelligence Dashboard
   Sales Analytics
   Author: Engr. Etim Antai
========================================================== */


let salesData = [];


// ==========================================================
// INITIALIZE SALES DASHBOARD
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {


    loadDashboardData(function(data){


        salesData = data;


        console.log(
            "Sales Analytics Loaded:",
            salesData.length
        );


        updateSalesKPIs();

        createSalesCharts();


    });


});




// ==========================================================
// KPI SECTION
// ==========================================================

function updateSalesKPIs(){


    // Total Sales

    let totalSales =
        sum(
            salesData.map(
                item => item.sales
            )
        );


    document.getElementById("totalSales").innerHTML =
        formatCurrency(totalSales);




    // Transactions

    let transactions =
        salesData.length;



    document.getElementById("totalTransactions").innerHTML =
        formatNumber(transactions);




    // Average Sale


    let averageSale =
        totalSales / transactions;



    document.getElementById("averageSale").innerHTML =
        formatCurrency(averageSale);





    // Quantity Sold


    let quantity =
        sum(
            salesData.map(
                item=>item.quantity
            )
        );


    document.getElementById("salesQuantity").innerHTML =
        formatNumber(quantity);





    // Gross Income


    let income =
        sum(
            salesData.map(
                item=>item.grossIncome
            )
        );



    document.getElementById("salesIncome").innerHTML =
        formatCurrency(income);






    // Best Month


    let monthlySales =
        {};



    salesData.forEach(item=>{


        let month =
            new Date(item.date)
            .toLocaleString(
                "default",
                {
                    month:"long"
                }
            );



        if(!monthlySales[month]){

            monthlySales[month]=0;

        }


        monthlySales[month]
            += item.sales;


    });




    let bestMonth =
        Object.entries(monthlySales)
        .sort(
            (a,b)=>b[1]-a[1]
        )[0][0];



    document.getElementById("bestMonth").innerHTML =
        bestMonth;


}






// ==========================================================
// CREATE SALES CHARTS
// ==========================================================


function createSalesCharts(){



    let monthly={};

    let daily={};

    let products={};

    let payments={};

    let branches={};

    let hours={};




    salesData.forEach(item=>{


        // MONTHLY SALES

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



        monthly[month] =
            (monthly[month] || 0)
            +
            item.sales;






        // DAILY SALES


        let day =
            item.date;



        daily[day] =
            (daily[day] || 0)
            +
            item.sales;







        // PRODUCT SALES


        products[item.productLine] =
            (products[item.productLine] || 0)
            +
            item.sales;







        // PAYMENT SALES


        payments[item.payment] =
            (payments[item.payment] || 0)
            +
            item.sales;







        // BRANCH SALES


        branches[item.branch] =
            (branches[item.branch] || 0)
            +
            item.sales;







        // HOURLY SALES


        let hour =
            item.time
            ?
            item.time.split(":")[0]
            :
            "Unknown";



        hours[hour] =
            (hours[hour] || 0)
            +
            item.sales;



    });






    // Monthly Chart


    Plotly.newPlot(

        "monthlySalesChart",

        [
            {
                x:Object.keys(monthly),

                y:Object.values(monthly),

                type:"line",

                mode:"lines+markers"

            }

        ],

        defaultLayout(
            "Monthly Sales Trend"
        ),

        plotConfig

    );







    // Daily Chart


    Plotly.newPlot(

        "dailySalesChart",

        [
            {

                x:Object.keys(daily),

                y:Object.values(daily),

                type:"scatter",

                mode:"lines"

            }

        ],

        defaultLayout(
            "Daily Sales Trend"
        ),

        plotConfig

    );







    // Product Chart


    Plotly.newPlot(

        "salesProductChart",

        [
            {

                x:Object.keys(products),

                y:Object.values(products),

                type:"bar"

            }

        ],

        defaultLayout(
            "Sales by Product Line"
        ),

        plotConfig

    );







    // Payment Chart


    Plotly.newPlot(

        "paymentSalesChart",

        [
            {

                labels:Object.keys(payments),

                values:Object.values(payments),

                type:"pie"

            }

        ],

        defaultLayout(
            "Sales by Payment Method"
        ),

        plotConfig

    );







    // Branch Chart


    Plotly.newPlot(

        "branchSalesChart",

        [
            {

                x:Object.keys(branches),

                y:Object.values(branches),

                type:"bar"

            }

        ],

        defaultLayout(
            "Sales by Branch"
        ),

        plotConfig

    );







    // Hour Chart


    Plotly.newPlot(

        "hourlySalesChart",

        [
            {

                x:Object.keys(hours),

                y:Object.values(hours),

                type:"bar"

            }

        ],

        defaultLayout(
            "Hourly Sales Pattern"
        ),

        plotConfig

    );



}