
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
