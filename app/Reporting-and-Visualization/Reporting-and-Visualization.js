  //Load navBar
$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
  // Set up canvas contexts for multiple charts
  const customerOrdersCtx = document.getElementById('customerOrdersChart').getContext('2d');
  const purchaseOrdersCtx = document.getElementById('purchaseOrdersChart').getContext('2d');
  const stocksCtx = document.getElementById('stocksChart').getContext('2d');
  const suppliersCtx = document.getElementById('suppliersChart').getContext('2d');

  let customerOrdersChart = null;
  let purchaseOrdersChart = null;
  let stocksChart = null;
  let suppliersChart = null;

  function fetchDataAndDisplayChart(url, chart, ctx) {
      fetch(url)
          .then(response => response.json())
          .then(data => {
              // Update chart with new data
              updateChart(data, chart, ctx);
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function updateChart(data, chart, ctx) {
      const labels = data.map(item => item.label); // Adjust according to your data structure
      const values = data.map(item => item.value); // Adjust according to your data structure

      if (chart) {
          chart.destroy();
      }

      chart = new Chart(ctx, {
          type: 'bar', // Change this to 'line', 'pie', etc. depending on your need
          data: {
              labels: labels,
              datasets: [{
                  label: 'Data',
                  data: values,
                  backgroundColor: 'rgba(0, 127, 162, 0.2)',
                  borderColor: 'rgba(0, 127, 162, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  // Fetch data and display charts on page load
  fetchDataAndDisplayChart('http://localhost:8080/getAllCustomerOrders', customerOrdersChart, customerOrdersCtx);
  fetchDataAndDisplayChart('http://localhost:8080/getAllPurchaseOrders', purchaseOrdersChart, purchaseOrdersCtx);
  fetchDataAndDisplayChart('http://localhost:8080/getAllStocks', stocksChart, stocksCtx);
  fetchDataAndDisplayChart('http://localhost:8080/getAllSuppliers', suppliersChart, suppliersCtx);

  // Export functions
  function fetchDataAndExport(url, filename) {
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const ws = XLSX.utils.json_to_sheet(data);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, filename);
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  document.getElementById('export-customer-orders').addEventListener('click', function () {
      fetchDataAndExport('http://localhost:8080/getAllCustomerOrders', 'CustomerOrders.xlsx');
  });

  document.getElementById('export-purchase-orders').addEventListener('click', function () {
      fetchDataAndExport('http://localhost:8080/getAllPurchaseOrders', 'PurchaseOrders.xlsx');
  });

  document.getElementById('export-stocks').addEventListener('click', function () {
      fetchDataAndExport('http://localhost:8080/getAllStocks', 'Stocks.xlsx');
  });

  document.getElementById('export-suppliers').addEventListener('click', function () {
      fetchDataAndExport('http://localhost:8080/getAllSuppliers', 'Suppliers.xlsx');
  });

  function openNav() {
      document.getElementById("mySidenav").style.width = "16em";
  }

  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }

  document.getElementById('logoutBtn').addEventListener('click', function() {
      window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
  });
});

  function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  // JavaScript for handling logout button click
  document.getElementById('logoutBtn').addEventListener('click', function() {
    // Redirect to login page
    window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
  });