//Load navBar
$('#mySidenav').load('../common/sidenav.html');


let purchaseOrders = []; // Global variable to hold purchase orders

// Function to fetch purchase orders from JSON file
async function fetchPurchaseOrders() {
  try {
    const response = await fetch('http://localhost:8080/getAllPurchaseOrders'); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    purchaseOrders = data; // Assign fetched data to global variable
    displayPurchaseOrders(); // Display initial set of purchase orders
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to display existing purchase orders in a table with pagination
function displayPurchaseOrders(pageNumber = 1, pageSize = 5) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = purchaseOrders.slice(startIndex, endIndex);

  let tableBodyHtml = '';
  paginatedOrders.forEach(order => {
    tableBodyHtml += `<tr>
                        <td>${order.item}</td>
                        <td>${order.quantity}</td>
                        <td>${order.supplier}</td>
                        <td>${order.price}</td>
                      </tr>`;
  });

  document.getElementById('orders-table-body').innerHTML = tableBodyHtml;

  // Pagination (assuming purchaseOrders is already populated)
  const totalPages = Math.ceil(purchaseOrders.length / pageSize);
  let paginationHtml = '';
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<li class="page-item ${pageNumber === i ? 'active' : ''}"><a class="page-link" href="#" onclick="displayPurchaseOrders(${i}, ${pageSize})">${i}</a></li>`;
  }
  document.getElementById('pagination').innerHTML = paginationHtml;
}

// Call fetchPurchaseOrders to start fetching and displaying data
fetchPurchaseOrders();

// Function to perform search as user types
function performSearch() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const rows = document.querySelectorAll('#orders-table-body tr');

  rows.forEach(row => {
    const itemName = row.children[0].textContent.trim().toLowerCase();
    const supplierName = row.children[2].textContent.trim().toLowerCase();

    // Show or hide rows based on search input match
    if (itemName.includes(searchInput) || supplierName.includes(searchInput)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Function to fetch and populate table initially
function fetchAndPopulateTable() {
  fetch(`http://localhost:8080/getAllPurchaseOrders`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      // Populate table with initial data
      populateTable(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Optionally show an error message to the user
    });
}

// Function to populate table with data
function populateTable(data) {
  const tableBody = document.getElementById('orders-table-body');
  tableBody.innerHTML = ''; // Clear existing content

  // Iterate through data and create rows for the table
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.item}</td>
      <td>${item.quantity}</td>
      <td>${item.supplier}</td>
      <td>${item.price}</td>
    `;
    tableBody.appendChild(row); // Append row to table body
  });
}

// Initial fetch and populate table
document.addEventListener('DOMContentLoaded', function () {
  fetchAndPopulateTable();
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