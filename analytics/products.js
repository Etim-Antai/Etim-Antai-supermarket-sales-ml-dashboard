/* ==========================================================
   Retail Sales Intelligence Dashboard
   Product Analytics
   Author: Engr. Etim Antai
========================================================== */


let productData = [];


// ==========================================================
// INITIALIZE PRODUCT DASHBOARD
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {


    loadDashboardData(function (data) {


        productData = data;


        console.log("Product Analytics Loaded:", productData.length);


        updateProductKPIs();

        createProductCharts();


    });


});




// ==========================================================
// KPI SECTION
// ==========================================================

function updateProductKPIs() {


    // Product Lines

    let products = [
        ...new Set(
            productData.map(
                item => item.productLine
            )
        )
    ];


    document.getElementById("totalProducts").innerHTML =
        products.length;



    // Total Revenue

    let revenue =
        sum(
            productData.map(
                item => item.sales
            )
        );


    document.getElementById("productRevenue").innerHTML =
        formatCurrency(revenue);




    // Average Rating

    let avgRating =
        average(
            productData.map(
                item => item.rating
            )
        );


    document.getElementById("avgProductRating").innerHTML =
        avgRating.toFixed(2);




    // Average Unit Price

    let avgPrice =
        average(
            productData.map(
                item => item.unitPrice
            )
        );


    document.getElementById("avgUnitPrice").innerHTML =
        formatCurrency(avgPrice);




    // Quantity Sold

    let quantity =
        sum(
            productData.map(
                item => item.quantity
            )
        );


    document.getElementById("totalQuantity").innerHTML =
        formatNumber(quantity);




    // Top Product

    let revenueByProduct =
        {};


    productData.forEach(item => {


        if (!revenueByProduct[item.productLine]) {

            revenueByProduct[item.productLine] = 0;

        }


        revenueByProduct[item.productLine]
            += item.sales;


    });



    let topProduct =
        Object.entries(revenueByProduct)
        .sort(
            (a,b)=>b[1]-a[1]
        )[0][0];



    document.getElementById("topProduct").innerHTML =
        topProduct;


}




// ==========================================================
// CHARTS
// ==========================================================

function createProductCharts(){


    let revenue = {};

    let quantity = {};

    let rating = {};

    let price = {};

    let income = {};



    productData.forEach(item=>{


        let product =
            item.productLine;



        if(!revenue[product]){


            revenue[product]=0;

            quantity[product]=0;

            rating[product]=[];

            price[product]=[];

            income[product]=0;


        }



        revenue[product]
            += item.sales;



        quantity[product]
            += item.quantity;



        rating[product]
            .push(item.rating);



        price[product]
            .push(item.unitPrice);



        income[product]
            += item.grossIncome;



    });



    let labels =
        Object.keys(revenue);




    // Revenue Chart

    Plotly.newPlot(

        "productRevenueChart",

        [

            {

                x:labels,

                y:Object.values(revenue),

                type:"bar",

                marker:{
                    color:chartColors
                }

            }

        ],

        defaultLayout(
            "Revenue by Product Line"
        ),

        plotConfig

    );






    // Quantity Chart

    Plotly.newPlot(

        "productQuantityChart",

        [

            {

                x:labels,

                y:Object.values(quantity),

                type:"bar"

            }

        ],

        defaultLayout(
            "Quantity Sold by Product"
        ),

        plotConfig

    );






    // Rating Chart


    let avgRatings =
        labels.map(product=>{


            return average(
                rating[product]
            );


        });



    Plotly.newPlot(

        "productRatingChart",

        [

            {

                x:labels,

                y:avgRatings,

                type:"bar"

            }

        ],

        defaultLayout(
            "Average Customer Rating"
        ),

        plotConfig

    );






    // Price Chart


    let avgPrices =
        labels.map(product=>{


            return average(
                price[product]
            );


        });



    Plotly.newPlot(

        "productPriceChart",

        [

            {

                x:labels,

                y:avgPrices,

                type:"bar"

            }

        ],

        defaultLayout(
            "Average Unit Price"
        ),

        plotConfig

    );






    // Revenue Share


    Plotly.newPlot(

        "productShareChart",

        [

            {

                labels:labels,

                values:Object.values(revenue),

                type:"pie"

            }

        ],

        defaultLayout(
            "Revenue Contribution"
        ),

        plotConfig

    );







    // Gross Income


    Plotly.newPlot(

        "productProfitChart",

        [

            {

                x:labels,

                y:Object.values(income),

                type:"bar"

            }

        ],

        defaultLayout(
            "Gross Income by Product"
        ),

        plotConfig

    );



}