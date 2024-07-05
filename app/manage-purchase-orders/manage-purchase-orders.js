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

// Function to perform search
function performSearch() {
  const searchInput = document.getElementById('searchInput').value.trim(); // Get input value

  // Check if search input is empty
  if (searchInput === '') {
      alert('Please enter a search input.');
      return;
  }

  // Perform API request here only if search input is not empty
  fetch(`http://localhost:8080/getAllPurchaseOrders`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Parse JSON response
      })
      .then(data => {
          // Filter data based on search input
          const filteredData = data.filter(item => {
              // Check if item name or supplier name contains the search input (case insensitive)
              return item.item.toLowerCase().includes(searchInput.toLowerCase()) ||
                     item.supplier.toLowerCase().includes(searchInput.toLowerCase());
          });

          if (filteredData.length === 0) {
              alert('Order not found. Please enter valid item name or supplier name.');
          } else {
              // Handle received data and update the div
              updateDiv(filteredData); // Update div with filtered search results
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          // Optionally show an error message to the user
      });
}

// Function to update the div with search results
function updateDiv(data) {
  const manageorders = document.getElementById('manage-orders');
  manageorders.innerHTML = ''; // Clear existing content

  // Iterate through data and create content for the div
  data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('purchase-order'); // Optional: Add CSS class for styling
      itemDiv.innerHTML = `
          <h4>${item.item}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>Supplier: ${item.supplier}</p>
          <p>Price: ${item.price}</p>
          <br>
      `;
      manageorders.appendChild(itemDiv); // Append item div to manage-orders div
  });
}
function openNav() {
  document.getElementById("mySidenav").style.width = "16em";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// JavaScript for handling logout button click
document.getElementById('btn').addEventListener('click', function() {
  // Redirect to login page
  window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
});