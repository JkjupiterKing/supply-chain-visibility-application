let purchaseOrders = []; // Global variable to hold purchase orders

// Function to fetch purchase orders from JSON file
async function fetchPurchaseOrders() {
  try {
    const response = await fetch('http://localhost:8080/getAllPurchaseOrders'); // Replace with your JSON file path
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

// JavaScript for handling logout button click
document.getElementById('btn').addEventListener('click', function() {
  // Redirect to login page
  window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
});