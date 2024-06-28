let purchaseOrders = []; // Global variable to hold purchase orders

// Function to fetch purchase orders from JSON file
async function fetchPurchaseOrders() {
  try {
    const response = await fetch('../../resources/data/purchase-orders.json'); // Replace with your JSON file path
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

document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('dynamic-form-container');

    // Event listener for the button click to toggle form visibility
    document.getElementById('showFormButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if form already exists, toggle visibility
        const existingForm = document.getElementById('create-order-form');
        if (existingForm) {
            formContainer.removeChild(existingForm);
        } else {
            // Generate the form dynamically
            generateOrderForm();
        }
    });
});

// Function to generate or remove the order creation form dynamically
function generateOrderForm() {
    const formContainer = document.getElementById('dynamic-form-container');

    // Create the form HTML dynamically
    const formHtml = `
        <h2>Create Purchase Order</h2>
        <form id="create-order-form">
            <div class="form-group">
                <label for="item">Item:</label>
                <input type="text" class="form-control" id="item" placeholder="Enter item name" required>
            </div>
            <br>
            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" class="form-control" id="quantity" placeholder="Enter quantity" required>
            </div>
            <br>
            <div class="form-group">
                <label for="supplier">Supplier:</label>
                <input type="text" class="form-control" id="supplier" placeholder="Enter supplier name" required>
            </div>
            <br>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" class="form-control" id="price" placeholder="Enter purchase price" required>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Create Purchase Order</button>
        </form>
    `;

    // Replace the content of formContainer with the generated form
    formContainer.innerHTML = formHtml;

    // Attach event listener to the dynamically generated form
    document.getElementById('create-order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle form submission (e.g., addPurchaseOrder function)
        const item = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;
        const supplier = document.getElementById('supplier').value;
        const price = document.getElementById('price').value;

        // Example: Call addPurchaseOrder function with the form values
        addPurchaseOrder(item, quantity, supplier, price);

        // Reset form fields after submission
        this.reset();
    });

}

// Function to add a new purchase order (example function)
function addPurchaseOrder(item, quantity, supplier, price) {
    // Example: Push data to purchaseOrders array or perform desired action
    console.log(`New Purchase Order: Item - ${item}, Quantity - ${quantity}, Supplier - ${supplier}, Price - ${price}`);
}
// JavaScript for handling logout button click
document.getElementById('btn').addEventListener('click', function() {
  // Redirect to login page
  window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
});
