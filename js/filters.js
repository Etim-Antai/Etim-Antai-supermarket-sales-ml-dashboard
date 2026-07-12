// ==========================================
// filters.js
// Advanced Dashboard Controls
// ==========================================

// Wait until page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    createToolbar();

});

// ==========================================
// Create Toolbar Buttons
// ==========================================

function createToolbar(){

    const filterSection = document.querySelector(".filters");

    if(!filterSection) return;

    // Reset Button
    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn-primary";
    resetBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Reset Filters';
    resetBtn.onclick = resetFilters;

    // Export Button
    const exportBtn = document.createElement("button");
    exportBtn.className = "btn btn-success";
    exportBtn.innerHTML = '<i class="bi bi-download"></i> Export CSV';
    exportBtn.onclick = exportFilteredData;

    filterSection.appendChild(resetBtn);
    filterSection.appendChild(exportBtn);

}

// ==========================================
// Reset Filters
// ==========================================

function resetFilters(){

    document.getElementById("branchFilter").value="";
    document.getElementById("cityFilter").value="";
    document.getElementById("productFilter").value="";
    document.getElementById("paymentFilter").value="";

    filteredData=[...salesData];

    updateDashboard();

}

// ==========================================
// Export Filtered Data
// ==========================================

function exportFilteredData(){

    if(filteredData.length===0){

        alert("No data available.");

        return;

    }

    const csv = Papa.unparse(filteredData);

    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});

    const link=document.createElement("a");

    const url=URL.createObjectURL(blob);

    link.href=url;

    link.download="filtered_supermarket_sales.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

// ==========================================
// Dashboard Summary
// ==========================================

function showFilterSummary(){

    const count=filteredData.length;

    console.log(`Showing ${count} records`);

}

// ==========================================
// Future Features
// ==========================================

// Date Range Filter
// Search Invoice
// Download Charts
// Theme Switch
// PDF Export
// Print Dashboard