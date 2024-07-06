// Attach event listener to the dynamically generated form
$('#mySidenav').load('../common/sidenav.html');

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

// Function to add a new purchase order
function addPurchaseOrder(item, quantity, supplier, price) {
    // Prepare data object
    const newPurchaseOrder = {
        item: item,
        quantity: quantity,
        supplier: supplier,
        price: price
    };

    // Send data to server using fetch API
    fetch('http://localhost:8080/addPurchaseOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPurchaseOrder)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add purchase order');
        }
        // Show success message
        alert('Purchase order added successfully');
        console.log('Purchase order added successfully');
        // Optionally, handle response data here if needed
    })
    .catch(error => {
        // Show error message
        alert('Error adding purchase order: ' + error.message);
        console.error('Error adding purchase order:', error);
    });
}
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

