/* ==========================================================
   Retail Sales Intelligence Dashboard
   Branch Analytics
   Author: Engr. Etim Antai
========================================================== */


let branchData = [];


// ==========================================================
// INITIALIZE BRANCH DASHBOARD
// ==========================================================

document.addEventListener("DOMContentLoaded", function(){


    loadDashboardData(function(data){


        branchData = data;


        console.log(
            "Branch Analytics Loaded:",
            branchData.length
        );


        updateBranchKPIs();

        createBranchCharts();


    });


});




// ==========================================================
// KPI SECTION
// ==========================================================

function updateBranchKPIs(){


    // Total Branches

    let branches =
        [
            ...new Set(
                branchData.map(
                    item=>item.branch
                )
            )
        ];



    document.getElementById("totalBranches").innerHTML =
        branches.length;






    // Total Revenue


    let revenue =
        sum(
            branchData.map(
                item=>item.sales
            )
        );



    document.getElementById("branchRevenue").innerHTML =
        formatCurrency(revenue);







    // Transactions


    document.getElementById("branchTransactions").innerHTML =
        formatNumber(
            branchData.length
        );







    // Average Rating


    let rating =
        average(
            branchData.map(
                item=>item.rating
            )
        );



    document.getElementById("branchRating").innerHTML =
        rating.toFixed(2);








    // Revenue By Branch


    let branchRevenue = {};



    branchData.forEach(item=>{


        if(!branchRevenue[item.branch]){

            branchRevenue[item.branch]=0;

        }


        branchRevenue[item.branch]
            += item.sales;


    });






    let bestBranch =
        Object.entries(branchRevenue)
        .sort(
            (a,b)=>b[1]-a[1]
        )[0][0];



    document.getElementById("bestBranch").innerHTML =
        bestBranch;








    // Income By Branch


    let branchIncome = {};



    branchData.forEach(item=>{


        if(!branchIncome[item.branch]){

            branchIncome[item.branch]=0;

        }


        branchIncome[item.branch]
            += item.grossIncome;


    });






    let topIncome =
        Object.entries(branchIncome)
        .sort(
            (a,b)=>b[1]-a[1]
        )[0][0];



    document.getElementById("topIncomeBranch").innerHTML =
        topIncome;


}







// ==========================================================
// CHART SECTION
// ==========================================================


function createBranchCharts(){



    let revenue={};

    let quantity={};

    let income={};

    let ratings={};

    let payments={};






    branchData.forEach(item=>{


        let branch =
            item.branch;



        if(!revenue[branch]){


            revenue[branch]=0;

            quantity[branch]=0;

            income[branch]=0;

            ratings[branch]=[];


        }



        revenue[branch]
            += item.sales;



        quantity[branch]
            += item.quantity;



        income[branch]
            += item.grossIncome;



        ratings[branch]
            .push(item.rating);





        if(!payments[item.payment]){

            payments[item.payment]=0;

        }


        payments[item.payment]
            += item.sales;



    });







    let labels =
        Object.keys(revenue);






    // Revenue Chart


    Plotly.newPlot(

        "branchRevenueChart",

        [

            {

                x:labels,

                y:Object.values(revenue),

                type:"bar"

            }

        ],

        defaultLayout(
            "Revenue by Branch"
        ),

        plotConfig

    );









    // Quantity Chart


    Plotly.newPlot(

        "branchQuantityChart",

        [

            {

                x:labels,

                y:Object.values(quantity),

                type:"bar"

            }

        ],

        defaultLayout(
            "Quantity Sold by Branch"
        ),

        plotConfig

    );









    // Gross Income Chart


    Plotly.newPlot(

        "branchIncomeChart",

        [

            {

                x:labels,

                y:Object.values(income),

                type:"bar"

            }

        ],

        defaultLayout(
            "Gross Income by Branch"
        ),

        plotConfig

    );









    // Rating Chart


    let avgRatings =
        labels.map(branch=>{


            return average(
                ratings[branch]
            );


        });




    Plotly.newPlot(

        "branchRatingChart",

        [

            {

                x:labels,

                y:avgRatings,

                type:"bar"

            }

        ],

        defaultLayout(
            "Average Customer Rating by Branch"
        ),

        plotConfig

    );









    // Payment Distribution


    Plotly.newPlot(

        "branchPaymentChart",

        [

            {

                labels:Object.keys(payments),

                values:Object.values(payments),

                type:"pie"

            }

        ],

        defaultLayout(
            "Payment Distribution"
        ),

        plotConfig

    );









    // Revenue Share


    Plotly.newPlot(

        "branchShareChart",

        [

            {

                labels:labels,

                values:Object.values(revenue),

                type:"pie"

            }

        ],

        defaultLayout(
            "Branch Revenue Share"
        ),

        plotConfig

    );



}