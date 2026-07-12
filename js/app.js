// =====================================
// Supermarket Sales Dashboard
// app.js
// =====================================

let salesData = [];
let filteredData = [];

// =====================================
// Initialize Dashboard
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard Initialized");

    loadData();

    // Filter Events
    document.getElementById("branchFilter").addEventListener("change", applyFilters);
    document.getElementById("cityFilter").addEventListener("change", applyFilters);
    document.getElementById("productFilter").addEventListener("change", applyFilters);
    document.getElementById("paymentFilter").addEventListener("change", applyFilters);

});

// =====================================
// Load CSV
// =====================================

function loadData(){

    console.log("Loading CSV...");

    Papa.parse("data/SuperMarket Analysis.csv",{

        download:true,
        header:true,
        dynamicTyping:true,
        skipEmptyLines:true,

        complete:function(results){

            console.log("CSV Loaded Successfully");

            salesData = results.data;

            console.log("Rows:", salesData.length);
            console.log("First Row:", salesData[0]);

            salesData.forEach(row=>{

                // Convert Numbers
                row.Sales = Number(row.Sales) || 0;
                row.Quantity = Number(row.Quantity) || 0;
                row["gross income"] = Number(row["gross income"]) || 0;
                row.Rating = Number(row.Rating) || 0;

                // Convert Date Safely
                if(row.Date){

                    const d = new Date(row.Date);

                    if(!isNaN(d)){
                        row.Date = d;
                    }

                }

            });

            filteredData = [...salesData];

            populateFilters();

            updateDashboard();

        },

        error:function(error){

            console.error("CSV Load Error:",error);

        }

    });

}

// =====================================
// Update Dashboard
// =====================================

function updateDashboard(){

    updateKPIs();

    if(typeof drawCharts === "function"){

        drawCharts(filteredData);

    }else{

        console.warn("charts.js not loaded.");

    }

}

// =====================================
// KPI Cards
// =====================================

function updateKPIs(){

    const totalSales = filteredData.reduce((sum,row)=>sum+row.Sales,0);

    const transactions = filteredData.length;

    const grossIncome = filteredData.reduce((sum,row)=>sum+row["gross income"],0);

    const quantity = filteredData.reduce((sum,row)=>sum+row.Quantity,0);

    const avgRating = transactions > 0
        ? filteredData.reduce((sum,row)=>sum+row.Rating,0)/transactions
        : 0;

    const averageSale = transactions > 0
        ? totalSales/transactions
        : 0;

    document.getElementById("totalSales").innerHTML =
        "$" + totalSales.toLocaleString(undefined,{maximumFractionDigits:2});

    document.getElementById("transactions").innerHTML =
        transactions.toLocaleString();

    document.getElementById("grossIncome").innerHTML =
        "$" + grossIncome.toLocaleString(undefined,{maximumFractionDigits:2});

    document.getElementById("avgRating").innerHTML =
        avgRating.toFixed(2);

    // Optional KPI Cards
    const qty = document.getElementById("totalQuantity");

    if(qty){

        qty.innerHTML = quantity.toLocaleString();

    }

    const avg = document.getElementById("averageSale");

    if(avg){

        avg.innerHTML = "$" + averageSale.toFixed(2);

    }

}

// =====================================
// Populate Filters
// =====================================

function populateFilters(){

    fillSelect("branchFilter","Branch");
    fillSelect("cityFilter","City");
    fillSelect("productFilter","Product line");
    fillSelect("paymentFilter","Payment");

}

// =====================================
// Fill Select
// =====================================

function fillSelect(id,column){

    const select = document.getElementById(id);

    if(!select) return;

    // Keep the first option
    while(select.options.length > 1){

        select.remove(1);

    }

    const values = [...new Set(
        salesData
            .map(row=>row[column])
            .filter(value=>value !== null && value !== "")
    )];

    values.sort();

    values.forEach(value=>{

        const option=document.createElement("option");

        option.value=value;

        option.textContent=value;

        select.appendChild(option);

    });

}

// =====================================
// Apply Filters
// =====================================

function applyFilters(){

    const branch=document.getElementById("branchFilter").value;

    const city=document.getElementById("cityFilter").value;

    const product=document.getElementById("productFilter").value;

    const payment=document.getElementById("paymentFilter").value;

    filteredData=salesData.filter(row=>{

        return(

            (!branch || row.Branch===branch) &&
            (!city || row.City===city) &&
            (!product || row["Product line"]===product) &&
            (!payment || row.Payment===payment)

        );

    });

    console.log("Filtered Records:", filteredData.length);

    updateDashboard();

}