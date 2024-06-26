document.addEventListener('DOMContentLoaded', function() {
    // Simulated data (replace with actual data fetching and processing)
    var ordersProcessed = 125;
    var inventoryLevels = 350;
    var shipmentStatus = 'In transit';

    // Update dashboard metrics with simulated data
    document.getElementById('ordersProcessed').textContent = ordersProcessed;
    document.getElementById('inventoryLevels').textContent = inventoryLevels;
    document.getElementById('shipmentStatus').textContent = shipmentStatus;

    // Event listener for refresh button
    document.getElementById('refreshData').addEventListener('click', function() {
        // Simulated refresh action
        ordersProcessed += 10;
        inventoryLevels -= 5;

        // Update shipment status with different statuses on each click
        switch (shipmentStatus) {
            case 'In transit':
                shipmentStatus = 'Out for delivery';
                break;
            case 'Out for delivery':
                shipmentStatus = 'Delivered';
                break;
            case 'Delivered':
                shipmentStatus = 'In transit';
                break;
            default:
                shipmentStatus = 'In transit'; // Default to 'In transit' if unknown status
                break;
        }

        // Update displayed data
        document.getElementById('ordersProcessed').textContent = ordersProcessed;
        document.getElementById('inventoryLevels').textContent = inventoryLevels;
        document.getElementById('shipmentStatus').textContent = shipmentStatus;
    });
});
     // JavaScript for handling logout button click
     document.getElementById('btn').addEventListener('click', function() {
        // Redirect to login page
        window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
    });

    document.getElementById('viewReports').addEventListener('click', function() {
        // Replace with code to navigate to reports page or display reports
        alert('Viewing reports...');
    });

