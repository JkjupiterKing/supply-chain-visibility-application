$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
    // Simulated data (replace with actual data fetching and processing)
    var ordersProcessed = 125;
    var inventoryLevels = 350;
    var shipmentCount = 0; // Initial count for shipment
    var shipmentStatuses = ['In transit', 'Out for delivery', 'Delivered'];
    var currentStatusIndex = 0; // Index to track current shipment status

    // Update dashboard metrics with simulated data
    document.getElementById('ordersProcessed').textContent = ordersProcessed;
    document.getElementById('inventoryLevels').textContent = inventoryLevels;
    document.getElementById('shipmentCount').textContent = shipmentCount; // Initial count display

    // Event listener for refresh button
    document.getElementById('refreshData').addEventListener('click', function () {
        // Simulated refresh action
        ordersProcessed += 10;
        inventoryLevels -= 5;
        shipmentCount += 1; // Increment shipment count

        // Update shipment status
        currentStatusIndex = (currentStatusIndex + 1) % shipmentStatuses.length; // Cycle through statuses
        var currentStatus = shipmentStatuses[currentStatusIndex];
        document.getElementById('shipmentStatusTitle').textContent = currentStatus;

        // Update displayed data
        document.getElementById('ordersProcessed').textContent = ordersProcessed;
        document.getElementById('inventoryLevels').textContent = inventoryLevels;
        document.getElementById('shipmentCount').textContent = shipmentCount; // Update shipment count
    });

    // JavaScript for handling logout button click
    document.getElementById('logoutBtn').addEventListener('click', function () {
        // Redirect to login page
        window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
    });
});

function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
