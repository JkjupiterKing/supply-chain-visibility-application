$('#mySidenav').load('../common/sidenav.html');

document.addEventListener("DOMContentLoaded", function() {
    fetchStocks(); // Initial fetch of stocks when the page loads
});

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
// Filtering function
function filterStocks() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var rows = document.querySelectorAll('#stockTableBody tr');

    rows.forEach(function(row) {
        var stockName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        if (stockName.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', filterStocks);

function addStock(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Get form data
    const stockName = document.getElementById("stockName").value;
    const description = document.getElementById("description").value;
    const unitPrice = document.getElementById("unitPrice").value;
    const stockQuantity = document.getElementById("stockQuantity").value;
  
    // Basic validation (more can be added)
    if (!stockName ||!description || !unitPrice || !stockQuantity) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const addStockUrl = 'http://localhost:8080/addStock';
  
    // Use fetch API to send a POST request with stock data
    fetch(addStockUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        stockName: stockName,
        description: description,
        unitPrice: unitPrice, // Fixed typo from Price to unitPrice
        stockQuantity: stockQuantity
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Stock added successfully, update the table
      console.log('Stock added:', data);
      displayStocks([data]); // Add the new stock object to an array and display
  
      // Clear the form after successful submission (optional)
      document.getElementById("addStockFormElement").reset();
  
      // Alert message for successful addition
      alert('Stock added successfully!');
    })
    .catch(error => {
      console.error('Error adding stock:', error);
      // Handle API errors (e.g., display error message to user)
      alert('Error adding stock. Please try again.');
    });
  }
  
  // Event listener for form submission
  document.getElementById('addStockFormElement').addEventListener('submit', addStock);
  
  
  function showUpdateStockModal(stockId) {
    fetch('http://localhost:8080/updateStockById/' + stockId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(stock => {
        console.log('Stock details:', stock);
        
        // Populate modal form fields with stock details
        document.getElementById('updateStockId').value = stock.stockId;
        document.getElementById('updateStockName').value = stock.stockName;
        document.getElementById('updateDescription').value = stock.description ? stock.description : '';
        document.getElementById('updateStockQuantity').value = stock.stockQuantity;
        document.getElementById('updatePrice').value = stock.price !== undefined ? stock.price : '';
  
        // Show the modal using jQuery (assuming you're using Bootstrap modal)
        $('#updateStockModal').modal('show');
      })
      .catch(error => {
        console.error('Error fetching stock details:', error);
      });
}

// Function to delete stock by stockId
function deleteStock(stockId) {
    // Ask for confirmation before proceeding
    if (confirm('Are you sure you want to delete this stock?')) {
        fetch('http://localhost:8080/deleteStockById/' + stockId, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted row from the table
                document.querySelector('tr[data-stock-id="' + stockId + '"]').remove();
                console.log('Stock deleted successfully.');

                // Alert message for successful deletion
                alert('Stock deleted successfully.');
            } else {
                console.error('Error deleting stock:', response.statusText);
                alert('Failed to delete stock. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting stock:', error);
            alert('Failed to delete stock. Please try again.');
        });
    } else {
        // If user cancels the delete operation
        console.log('Delete operation canceled.');
    }
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