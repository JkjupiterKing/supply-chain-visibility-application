//Load navBar
$('#mySidenav').load('../common/sidenav.html');

let purchaseOrders = []; // Global variable to hold purchase orders

// Fetch and populate suppliers in the form
fetchSuppliersAndPopulateSelect();

async function fetchPurchaseOrders() {
  try {
      const response = await fetch('http://localhost:8080/getAllPurchaseOrders'); 
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      purchaseOrders = Array.isArray(data) ? data : []; // Assign fetched data as an array
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

    // Show table container and hide form container
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
}

// Function to perform search as user types
function performSearch() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

  // Filter purchaseOrders based on search input
  const filteredOrders = purchaseOrders.filter(order => {
      const itemName = order.item.trim().toLowerCase();
      const supplierName = order.supplier.trim().toLowerCase();
      
      return itemName.includes(searchInput) || supplierName.includes(searchInput);
  });

  // Update table display based on filtered results
  let tableBodyHtml = '';
  filteredOrders.forEach(order => {
      tableBodyHtml += `<tr>
                          <td>${order.item}</td>
                          <td>${order.quantity}</td>
                          <td>${order.supplier}</td>
                          <td>${order.price}</td>
                        </tr>`;
  });

  document.getElementById('orders-table-body').innerHTML = tableBodyHtml;
}

// Function to handle showing the create order form
document.getElementById('createOrderBtn').addEventListener('click', function() {
    document.getElementById('table-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
});

// Function to handle form submission for creating a new purchase order
document.getElementById('create-order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let newItem = document.getElementById('item').value.trim();
    let newQuantity = parseInt(document.getElementById('quantity').value.trim(), 10);
    let newSupplier = document.getElementById('supplier').value.trim();
    let newPrice = parseFloat(document.getElementById('price').value.trim());

    // Validate form data (basic validation for demo purposes)
    if (!newItem || !newQuantity || !newSupplier || !newPrice) {
        alert('Please fill in all fields.');
        return;
    }

    // Create new order object
    const newOrder = {
        item: newItem,
        quantity: newQuantity,
        supplier: newSupplier,
        price: newPrice
    };

    // POST new order data to server API
    postNewOrder(newOrder);
});

// Function to handle cancellation of creating a new purchase order
document.getElementById('cancelOrderBtn').addEventListener('click', function() {
    // Clear form fields
    document.getElementById('create-order-form').reset();

    // Hide the form container and show table container
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('table-container').style.display = 'block';
});

async function postNewOrder(newOrder) {
  try {
      const response = await fetch('http://localhost:8080/addPurchaseOrder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
      });
      
      if (!response.ok) {
          throw new Error('Failed to create new order');
      }

      // Assuming server responds with updated purchase orders
      const updatedOrders = await response.json();
      purchaseOrders = Array.isArray(updatedOrders) ? updatedOrders : []; // Update global variable with updated orders as an array

      // Update table display
      displayPurchaseOrders();

      // Clear form fields
      document.getElementById('create-order-form').reset();

      // Hide the form container and show table container
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('table-container').style.display = 'block';

      // Show success message using Bootstrap modal or toast
      alert("purchase order created successfully");
      fetchPurchaseOrders();

  } catch (error) {
      console.error('Error creating new order:', error);
      // Optionally show an error message to the user
  }
}

// Function to fetch suppliers from API and populate the select element
function fetchSuppliersAndPopulateSelect() {
    fetch('http://localhost:8080/getAllSuppliers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch suppliers');
            }
            return response.json();
        })
        .then(suppliers => {
            // Populate the select element with fetched suppliers
            const selectElement = document.getElementById('supplier');
            selectElement.innerHTML = ''; // Clear existing options

            suppliers.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.name; // Assuming supplier name is used as value
                option.textContent = supplier.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching suppliers:', error);
            // Optionally handle or display the error
        });
}

// Initial fetch and populate table
document.addEventListener('DOMContentLoaded', function () {
    fetchPurchaseOrders();
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