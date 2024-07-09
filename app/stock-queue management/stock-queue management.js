$('#mySidenav').load('../common/sidenav.html');

// Initial fetch of stocks when the page loads
fetchStocks();

function displayStocks(stocks) {
    var tableBody = document.getElementById('stockTableBody');
    tableBody.innerHTML = '';

    stocks.forEach(function(stock) {
        var row = '<tr data-stock-id="' + stock.stockId + '">' +
                    '<td>' + stock.stockName + '</td>' +
                    '<td>' + (stock.description ? stock.description : '') + '</td>' +
                    '<td>' + stock.stockQuantity + '</td>' +
                    '<td>' + (stock.price !== undefined ? parseFloat(stock.price).toFixed(2) : '-') + '</td>' + // Assuming price is lowercase 'price' in the API response
                    '<td>' +
                        '<button type="button" class="btn btn-primary btn-sm btn-update" onclick="showUpdateStockModal(' + stock.stockId + ')">Update</button>' +
                        '<button type="button" class="btn btn-danger btn-sm btn-delete" onclick="deleteStock(' + stock.stockId + ')">Delete</button>' +
                    '</td>' +
                  '</tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Function to fetch stocks from API
function fetchStocks() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/getAllStocks');
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var stocks = JSON.parse(xhr.responseText);
                displayStocks(stocks);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.error('Error fetching stocks. Status code: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Error fetching stocks. Network error.');
    };
    xhr.send();
}

// Function to show update stock modal and populate fields
function showUpdateStockModal(stockId) {
    // Implement logic to show update modal and populate fields
    console.log('Update stock with ID:', stockId);
    // Example: open modal and fetch stock details by stockId
    // Then populate the update form fields with the fetched data
    document.getElementById('updateStockModal').style.display = 'block';
}

// Example delete function (adjust as per your actual implementation)
function deleteStock(stockId) {
    console.log('Delete stock with ID:', stockId);
    // Implement delete logic
    // Example: fetch('http://localhost:8080/deleteStock/' + stockId, { method: 'DELETE' })
    //          .then(response => {
    //              if (response.ok) {
    //                  // Handle success, e.g., remove row from table
    //                  document.querySelector('tr[data-stock-id="' + stockId + '"]').remove();
    //              } else {
    //                  // Handle error
    //                  console.error('Error deleting stock:', response.statusText);
    //              }
    //          })
    //          .catch(error => {
    //              console.error('Error deleting stock:', error);
    //          });
}


function showManageStock() {
    document.getElementById('manageStockTable').style.display = 'block';
    document.getElementById('addStockForm').style.display = 'none';
}

function showAddStockForm() {
    document.getElementById('manageStockTable').style.display = 'none';
    document.getElementById('addStockForm').style.display = 'block';
}
function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
// JavaScript for handling logout button click
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Redirect to login page
    window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
});