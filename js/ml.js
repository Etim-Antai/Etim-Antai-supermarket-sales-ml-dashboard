// =========================================
// Machine Learning Module
// =========================================

// Change this when you deploy to Render
// Render Backend API
const API_URL = "https://etim-antai-supermarket-sales-ml-dashboard.onrender.com/predict";

// =========================================
// Draw Charts when page loads
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    drawFeatureImportance();
    drawPredictionChart();

    const form = document.getElementById("predictionForm");

    if(form){
        form.addEventListener("submit", predictSales);
    }

});

// =========================================
// Predict Sales
// =========================================

async function predictSales(e){

    e.preventDefault();

    document.getElementById("predictionValue").innerHTML = "Predicting...";

    const data = {

        "Branch": document.getElementById("branch").value,

        "City": document.getElementById("city").value,

        "Customer type": document.getElementById("customerType").value,

        "Gender": document.getElementById("gender").value,

        "Product line": document.getElementById("productLine").value,

        "Unit price": Number(document.getElementById("unitPrice").value),

        "Quantity": Number(document.getElementById("quantity").value),

        "Payment": document.getElementById("payment").value,

        "Day": document.getElementById("day").value,

        "Hour": Number(document.getElementById("hour").value)

    };

    console.log("Sending:", data);

    try{

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        console.log(result);

        if(result.predicted_sales !== undefined){

            document.getElementById("predictionValue").innerHTML =
                "$" + Number(result.predicted_sales).toFixed(2);

        }else{

            document.getElementById("predictionValue").innerHTML =
                result.error || "Prediction Failed";

        }

    }catch(error){

        console.error(error);

        document.getElementById("predictionValue").innerHTML =
            "Server Offline";

    }

}
// =========================================
// Feature Importance
// =========================================
function drawFeatureImportance(){

    Papa.parse("../data/feature_importance.csv",{

        download:true,

        header:true,

        dynamicTyping:true,

        complete:function(results){

            const data = results.data.filter(row => row.Feature);

            Plotly.newPlot(

                "featureImportanceChart",

                [{

                    x:data.map(d=>d.Importance),

                    y:data.map(d=>d.Feature),

                    type:"bar",

                    orientation:"h"

                }],

                {

                    margin:{l:150},

                    paper_bgcolor:"transparent",

                    plot_bgcolor:"transparent",

                    font:{color:"white"}

                },

                {responsive:true}

            );

        }

    });

}
// =========================================
// Prediction vs Actual
// =========================================
function drawPredictionChart(){

    Papa.parse("../data/prediction_results.csv",{

        download:true,

        header:true,

        dynamicTyping:true,

        complete:function(results){

            const data = results.data.filter(r=>r.Actual);

            const actual=data.map(r=>r.Actual);

            const predicted=data.map(r=>r.Predicted);

            const max=Math.max(...actual,...predicted);

            Plotly.newPlot(

                "predictionChart",

                [

                    {

                        x:actual,

                        y:predicted,

                        mode:"markers",

                        type:"scatter",

                        name:"Predictions"

                    },

                    {

                        x:[0,max],

                        y:[0,max],

                        mode:"lines",

                        name:"Perfect Prediction"

                    }

                ],

                {

                    xaxis:{title:"Actual Sales"},

                    yaxis:{title:"Predicted Sales"},

                    paper_bgcolor:"transparent",

                    plot_bgcolor:"transparent",

                    font:{color:"white"}

                },

                {responsive:true}

            );

        }

    });

}
