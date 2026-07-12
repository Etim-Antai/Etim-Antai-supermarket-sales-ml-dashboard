// =========================================
// charts.js
// Supermarket Sales Dashboard
// =========================================
function drawCharts(data){

    // Dashboard
    drawSalesTrend(data);
    drawBranchChart(data);
    drawProductChart(data);
    drawCityChart(data);
    drawPaymentChart(data);
    drawCustomerChart(data);
    drawGenderChart(data);
    drawRatingChart(data);
    drawHourlyChart(data);
    drawMonthlyChart(data);

    // Branch Analysis
    drawBranchSales(data);
    drawBranchIncome(data);
    drawBranchQuantity(data);
    drawBranchRating(data);
    drawBranchTransactions(data);
    drawBranchRadar(data);

    // Product Analysis
    drawProductSales(data);
    drawProductIncome(data);
    drawProductQuantity(data);
    drawProductRating(data);
    drawProductTransactions(data);
    drawProductRadar(data);

    // Customer Analysis
drawCustomerType(data);
drawCustomerGender(data);
drawCustomerRating(data);
drawCustomerSales(data);
drawCustomerTransactions(data);
drawCustomerRadar(data);

// Payment Analysis
drawPaymentMethod(data);
drawPaymentSales(data);
drawPaymentIncome(data);
drawPaymentTransactions(data);
drawPaymentRating(data);
drawPaymentRadar(data);

// Business Insights
drawTopProducts(data);
drawTopCustomers(data);
drawTopCities(data);
drawProfitMargin(data);
drawMonthlyGrowth(data);
drawSalesHeatmap(data);

}
// =========================================
// Helper Function
// =========================================

function groupBy(data,key,valueField="Sales"){

    const grouped={};

    data.forEach(row=>{

        const k=row[key];

        if(!grouped[k])
            grouped[k]=0;

        grouped[k]+=Number(row[valueField]);

    });

    return grouped;

}

// =========================================
// Sales Trend
// =========================================

function drawSalesTrend(data){

    const grouped={};

    data.forEach(row=>{

        const date=row.Date.toLocaleDateString();

        if(!grouped[date])
            grouped[date]=0;

        grouped[date]+=row.Sales;

    });

    const x=Object.keys(grouped);
    const y=Object.values(grouped);

    Plotly.newPlot("salesTrend",[{

        x:x,
        y:y,
        mode:"lines+markers",
        line:{width:3}

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Branch
// =========================================

function drawBranchChart(data){

    const g=groupBy(data,"Branch");

    Plotly.newPlot("branchChart",[{

        labels:Object.keys(g),
        values:Object.values(g),
        type:"pie",
        hole:.45

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Product Line
// =========================================

function drawProductChart(data){

    const g=groupBy(data,"Product line");

    Plotly.newPlot("productChart",[{

        x:Object.keys(g),
        y:Object.values(g),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// City
// =========================================

function drawCityChart(data){

    const g=groupBy(data,"City");

    Plotly.newPlot("cityChart",[{

        labels:Object.keys(g),
        values:Object.values(g),
        type:"pie"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Payment
// =========================================

function drawPaymentChart(data){

    const counts={};

    data.forEach(r=>{

        counts[r.Payment]=(counts[r.Payment]||0)+1;

    });

    Plotly.newPlot("paymentChart",[{

        x:Object.keys(counts),
        y:Object.values(counts),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Customer Type
// =========================================

function drawCustomerChart(data){

    const counts={};

    data.forEach(r=>{

        counts[r["Customer type"]]=(counts[r["Customer type"]]||0)+1;

    });

    Plotly.newPlot("customerChart",[{

        labels:Object.keys(counts),
        values:Object.values(counts),
        type:"pie",
        hole:.4

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Gender
// =========================================

function drawGenderChart(data){

    const counts={};

    data.forEach(r=>{

        counts[r.Gender]=(counts[r.Gender]||0)+1;

    });

    Plotly.newPlot("genderChart",[{

        x:Object.keys(counts),
        y:Object.values(counts),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Ratings
// =========================================

function drawRatingChart(data){

    const ratings=data.map(r=>r.Rating);

    Plotly.newPlot("ratingChart",[{

        x:ratings,
        type:"histogram"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Hourly Sales
// =========================================

// =========================================
// Monthly Sales
// =========================================

function drawMonthlyChart(data){

    const months={};

    data.forEach(r=>{

        const month=r.Date.toLocaleString("default",{month:"short"});

        if(!months[month])
            months[month]=0;

        months[month]+=r.Sales;

    });

    const order=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const x=[];
    const y=[];

    order.forEach(m=>{

        if(months[m]){

            x.push(m);
            y.push(months[m]);

        }

    });

    Plotly.newPlot("monthlyChart",[{

        x:x,
        y:y,
        type:"scatter",
        mode:"lines+markers"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}


function drawHourlyChart(data){

    const hours={};

    data.forEach(r=>{

        const h=r.Time.split(":")[0];

        if(!hours[h])
            hours[h]=0;

        hours[h]+=r.Sales;

    });
Plotly.newPlot("hourlyChart",[{
    x:Object.keys(hours),
    y:Object.values(hours),
    type:"scatter",
    mode:"lines+markers"

}],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Branch Sales
// =========================================

function drawBranchSales(data){

    const sales = {};

    data.forEach(r=>{

        sales[r.Branch] = (sales[r.Branch] || 0) + r.Sales;

    });

    Plotly.newPlot("branchSalesChart",[{

        x:Object.keys(sales),
        y:Object.values(sales),
        type:"bar"

    }],{

        title:"",
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}


// =========================================
// Branch Gross Income
// =========================================

function drawBranchIncome(data){

    const income = {};

    data.forEach(r=>{

        income[r.Branch] =
            (income[r.Branch] || 0) + Number(r["gross income"]);

    });

    Plotly.newPlot("branchIncomeChart",[{

        x:Object.keys(income),
        y:Object.values(income),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Branch Quantity
// =========================================

function drawBranchQuantity(data){

    const qty = {};

    data.forEach(r=>{

        qty[r.Branch] =
            (qty[r.Branch] || 0) + r.Quantity;

    });

    Plotly.newPlot("branchQuantityChart",[{

        x:Object.keys(qty),
        y:Object.values(qty),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}
// =========================================
// Branch Rating
// =========================================

function drawBranchRating(data){

    const total = {};
    const count = {};

    data.forEach(r=>{

        total[r.Branch] =
            (total[r.Branch] || 0) + r.Rating;

        count[r.Branch] =
            (count[r.Branch] || 0) + 1;

    });

    const branches = Object.keys(total);

    const avg = branches.map(b=>total[b]/count[b]);

    Plotly.newPlot("branchRatingChart",[{

        x:branches,
        y:avg,
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Branch Transactions
// =========================================

function drawBranchTransactions(data){

    const counts = {};

    data.forEach(r=>{

        counts[r.Branch] =
            (counts[r.Branch] || 0) + 1;

    });

    Plotly.newPlot("branchTransactionChart",[{

        x:Object.keys(counts),
        y:Object.values(counts),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}
// =========================================
// Branch Radar
// =========================================

function drawBranchRadar(data){

    const sales = {};
    const income = {};
    const qty = {};

    data.forEach(r=>{

        sales[r.Branch] =
            (sales[r.Branch] || 0) + r.Sales;

        income[r.Branch] =
            (income[r.Branch] || 0) + Number(r["gross income"]);

        qty[r.Branch] =
            (qty[r.Branch] || 0) + r.Quantity;

    });

    const branches = Object.keys(sales);

    branches.forEach(branch=>{

        Plotly.addTraces("branchRadarChart",{

            type:"scatterpolar",

            r:[
                sales[branch]/10000,
                income[branch]/1000,
                qty[branch]
            ],

            theta:[
                "Sales",
                "Income",
                "Quantity"
            ],

            fill:"toself",

            name:branch

        });

    });

    Plotly.newPlot("branchRadarChart",[],{

        polar:{
            radialaxis:{
                visible:true
            }
        },

        showlegend:true,

        margin:{t:20},

        paper_bgcolor:"transparent",

        font:{color:"white"}

    },{responsive:true});

}


function drawBranchRadar(data){

    const sales = {};
    const income = {};
    const qty = {};

    data.forEach(r=>{

        sales[r.Branch] = (sales[r.Branch] || 0) + r.Sales;
        income[r.Branch] = (income[r.Branch] || 0) + Number(r["gross income"]);
        qty[r.Branch] = (qty[r.Branch] || 0) + r.Quantity;

    });

    const traces = [];

    Object.keys(sales).forEach(branch=>{

        traces.push({

            type:"scatterpolar",

            r:[
                sales[branch]/10000,
                income[branch]/1000,
                qty[branch]
            ],

            theta:[
                "Sales",
                "Income",
                "Quantity"
            ],

            fill:"toself",

            name:branch

        });

    });

    Plotly.newPlot("branchRadarChart", traces, {

        polar:{
            radialaxis:{
                visible:true
            }
        },

        showlegend:true,

        margin:{t:20},

        paper_bgcolor:"transparent",

        plot_bgcolor:"transparent",

        font:{color:"white"}

    }, {responsive:true});

}

function drawProductSales(data){

    const sales = groupBy(data, "Product line");

    Plotly.newPlot("productSalesChart",[{

        x: Object.keys(sales),
        y: Object.values(sales),
        type: "bar"

    }],{

        title: "Sales by Product Line",
        margin:{t:40},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

function drawProductIncome(data){

    const income = groupBy(data,"Product line","gross income");

    Plotly.newPlot("productIncomeChart",[{

        x:Object.keys(income),
        y:Object.values(income),
        type:"bar"

    }],{

        title:"Gross Income by Product Line",
        margin:{t:40},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}


function drawProductQuantity(data){

    const quantity = groupBy(data,"Product line","Quantity");

    Plotly.newPlot("productQuantityChart",[{

        x:Object.keys(quantity),
        y:Object.values(quantity),
        type:"bar"

    }],{

        title:"Quantity Sold by Product Line",
        margin:{t:40},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

function drawProductRating(data){

    const totals = {};
    const counts = {};

    data.forEach(r=>{

        if(!totals[r["Product line"]]){

            totals[r["Product line"]] = 0;
            counts[r["Product line"]] = 0;

        }

        totals[r["Product line"]] += r.Rating;
        counts[r["Product line"]]++;

    });

    const labels = Object.keys(totals);

    const averages = labels.map(p => totals[p] / counts[p]);

    Plotly.newPlot("productRatingChart",[{

        x: labels,
        y: averages,
        type:"bar"

    }],{

        title:"Average Rating by Product Line",
        margin:{t:40},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}


function drawProductTransactions(data){

    const transactions = {};

    data.forEach(r=>{

        transactions[r["Product line"]] =
        (transactions[r["Product line"]] || 0) + 1;

    });

    Plotly.newPlot("productTransactionChart",[{

        x:Object.keys(transactions),
        y:Object.values(transactions),
        type:"bar"

    }],{

        title:"Transactions by Product Line",
        margin:{t:40},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

function drawProductRadar(data){

    const sales = groupBy(data,"Product line");

    Plotly.newPlot("productRadarChart",[{

        type:"scatterpolar",

        r:Object.values(sales),

        theta:Object.keys(sales),

        fill:"toself"

    }],{

        title:"Product Performance Radar",

        polar:{
            radialaxis:{
                visible:true
            }
        },

        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// CUSTOMER ANALYSIS
// =========================================

// Customer Type Distribution
function drawCustomerType(data){

    const counts = {};

    data.forEach(r=>{
        counts[r["Customer type"]] =
            (counts[r["Customer type"]] || 0) + 1;
    });

    Plotly.newPlot("customerTypeChart",[{

        labels:Object.keys(counts),
        values:Object.values(counts),
        type:"pie",
        hole:0.45

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Customer Gender
// =========================================

function drawCustomerGender(data){

    const counts = {};

    data.forEach(r=>{
        counts[r.Gender] =
            (counts[r.Gender] || 0) + 1;
    });

    Plotly.newPlot("customerGenderChart",[{

        x:Object.keys(counts),
        y:Object.values(counts),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Average Rating by Customer Type
// =========================================

function drawCustomerRating(data){

    const grouped = {};

    data.forEach(r=>{

        if(!grouped[r["Customer type"]]){

            grouped[r["Customer type"]] = {
                total:0,
                count:0
            };

        }

        grouped[r["Customer type"]].total += r.Rating;
        grouped[r["Customer type"]].count++;

    });

    const x = [];
    const y = [];

    Object.keys(grouped).forEach(k=>{

        x.push(k);
        y.push(grouped[k].total/grouped[k].count);

    });

    Plotly.newPlot("customerRatingChart",[{

        x:x,
        y:y,
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Sales by Customer Type
// =========================================

function drawCustomerSales(data){

    const grouped = groupBy(data,"Customer type");

    Plotly.newPlot("customerSalesChart",[{

        x:Object.keys(grouped),
        y:Object.values(grouped),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Transactions by Customer Type
// =========================================

function drawCustomerTransactions(data){

    const counts = {};

    data.forEach(r=>{

        counts[r["Customer type"]] =
            (counts[r["Customer type"]] || 0) + 1;

    });

    Plotly.newPlot("customerTransactionChart",[{

        x:Object.keys(counts),
        y:Object.values(counts),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// =========================================
// Customer Performance Radar
// =========================================

function drawCustomerRadar(data){

    const grouped = {};

    data.forEach(r=>{

        const key = r["Customer type"];

        if(!grouped[key]){

            grouped[key] = {

                sales:0,
                quantity:0,
                rating:0,
                count:0

            };

        }

        grouped[key].sales += r.Sales;
        grouped[key].quantity += r.Quantity;
        grouped[key].rating += r.Rating;
        grouped[key].count++;

    });

    const customer = Object.keys(grouped)[0];

    Plotly.newPlot("customerRadarChart",[{

        type:"scatterpolar",

        r:[
            grouped[customer].sales,
            grouped[customer].quantity,
            grouped[customer].rating/grouped[customer].count
        ],

        theta:[
            "Sales",
            "Quantity",
            "Rating"
        ],

        fill:"toself",
        name:customer

    }],{

        polar:{
            radialaxis:{
                visible:true
            }
        },

        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}



// =========================================
// PAYMENT METHOD DISTRIBUTION
// =========================================

function drawPaymentMethod(data){

    const counts={};

    data.forEach(r=>{
        counts[r.Payment]=(counts[r.Payment]||0)+1;
    });

    Plotly.newPlot("paymentMethodChart",[{
        labels:Object.keys(counts),
        values:Object.values(counts),
        type:"pie",
        hole:.45
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}
    },{responsive:true});

}


// =========================================
// SALES BY PAYMENT METHOD
// =========================================

function drawPaymentSales(data){

    const g=groupBy(data,"Payment");

    Plotly.newPlot("paymentSalesChart",[{
        x:Object.keys(g),
        y:Object.values(g),
        type:"bar"
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}
    },{responsive:true});

}


// =========================================
// GROSS INCOME BY PAYMENT
// =========================================

function drawPaymentIncome(data){

    const income={};

    data.forEach(r=>{
        income[r.Payment]=(income[r.Payment]||0)+r["gross income"];
    });

    Plotly.newPlot("paymentIncomeChart",[{
        x:Object.keys(income),
        y:Object.values(income),
        type:"bar"
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}
    },{responsive:true});

}


// =========================================
// TRANSACTIONS BY PAYMENT
// =========================================

function drawPaymentTransactions(data){

    const trans={};

    data.forEach(r=>{
        trans[r.Payment]=(trans[r.Payment]||0)+1;
    });

    Plotly.newPlot("paymentTransactionChart",[{
        labels:Object.keys(trans),
        values:Object.values(trans),
        type:"pie"
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}
    },{responsive:true});

}


// =========================================
// AVERAGE RATING BY PAYMENT
// =========================================

function drawPaymentRating(data){

    const total={};
    const count={};

    data.forEach(r=>{

        if(!total[r.Payment]){
            total[r.Payment]=0;
            count[r.Payment]=0;
        }

        total[r.Payment]+=r.Rating;
        count[r.Payment]++;

    });

    const methods=Object.keys(total);

    const avg=methods.map(m=>total[m]/count[m]);

    Plotly.newPlot("paymentRatingChart",[{
        x:methods,
        y:avg,
        type:"bar"
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}
    },{responsive:true});

}


// =========================================
// PAYMENT PERFORMANCE RADAR
// =========================================

function drawPaymentRadar(data){

    const sales={};

    data.forEach(r=>{
        sales[r.Payment]=(sales[r.Payment]||0)+r.Sales;
    });

    Plotly.newPlot("paymentRadarChart",[{
        type:"scatterpolar",
        r:Object.values(sales),
        theta:Object.keys(sales),
        fill:"toself"
    }],{
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"},
        polar:{
            bgcolor:"transparent",
            radialaxis:{visible:true}
        }
    },{responsive:true});

}



// =========================================
// BUSINESS INSIGHTS
// =========================================

// -----------------------------------------
// Top Selling Product Lines
// -----------------------------------------
function drawTopProducts(data){

    const g = groupBy(data, "Product line");

    Plotly.newPlot("topProductsChart",[{

        x:Object.keys(g),
        y:Object.values(g),
        type:"bar"

    }],{

        title:"",
        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// -----------------------------------------
// Sales by City
// -----------------------------------------
function drawTopCities(data){

    const g = groupBy(data,"City");

    Plotly.newPlot("topCitiesChart",[{

        labels:Object.keys(g),
        values:Object.values(g),
        type:"pie",
        hole:.45

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// -----------------------------------------
// Sales by Customer Type
// -----------------------------------------
function drawTopCustomers(data){

    const g = groupBy(data,"Customer type");

    Plotly.newPlot("topCustomersChart",[{

        x:Object.keys(g),
        y:Object.values(g),
        type:"bar"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// -----------------------------------------
// Profit Margin
// -----------------------------------------
function drawProfitMargin(data){

    const totalSales = data.reduce((s,r)=>s+r.Sales,0);

    const grossIncome = data.reduce((s,r)=>s+r["gross income"],0);

    Plotly.newPlot("profitMarginChart",[{

        labels:["Gross Income","Remaining Sales"],
        values:[grossIncome,totalSales-grossIncome],
        type:"pie",
        hole:.55

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// -----------------------------------------
// Monthly Growth Trend
// -----------------------------------------
function drawMonthlyGrowth(data){

    const months={};

    data.forEach(r=>{

        const month=r.Date.toLocaleString("default",{month:"short"});

        months[month]=(months[month]||0)+r.Sales;

    });

    const order=[
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const x=[];
    const y=[];

    order.forEach(m=>{

        if(months[m]){

            x.push(m);
            y.push(months[m]);

        }

    });

    Plotly.newPlot("growthChart",[{

        x:x,
        y:y,
        type:"scatter",
        mode:"lines+markers"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}

// -----------------------------------------
// Sales Heatmap (Hour vs Day)
// -----------------------------------------
function drawSalesHeatmap(data){

    const days=[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const hours=[
        "00","01","02","03","04","05",
        "06","07","08","09","10","11",
        "12","13","14","15","16","17",
        "18","19","20","21","22","23"
    ];

    const matrix=days.map(()=>Array(24).fill(0));

    data.forEach(r=>{

        const date=new Date(r.Date);

        const day=(date.getDay()+6)%7;

        const hour=parseInt(r.Time.split(":")[0]);

        matrix[day][hour]+=r.Sales;

    });

    Plotly.newPlot("heatmapChart",[{

        z:matrix,
        x:hours,
        y:days,
        type:"heatmap"

    }],{

        margin:{t:20},
        paper_bgcolor:"transparent",
        plot_bgcolor:"transparent",
        font:{color:"white"}

    },{responsive:true});

}