$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
    // Define API endpoints
    const apiEndpoints = {
        getCustomers: 'http://localhost:8080/getAllCustomerOrders' // Single endpoint for both fetching and refreshing
    };

    // Variables to store response data
    let processedCount = 0;
    let shippedCount = 0;
    let pendingCount = 0;
    let deliveredCount = 0;
    let customers = []; // Variable to store customer data
    let statusCycle = ['Processing', 'Shipped', 'Pending', 'Delivered']; // Cycle through statuses
    let currentStatusIndex = 0; // Index to track the current status

    // Function to fetch all customers from the API
    function fetchCustomers() {
        fetch(apiEndpoints.getCustomers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Store the customer data
                customers = data || []; // Directly assign data if not wrapped in an object

                // Update counts and dashboard metrics
                updateCounts();
                updateDashboard();
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
                // Handle error as needed
            });
    }

    // Function to update counts based on customer statuses
    function updateCounts() {
        processedCount = customers.filter(c => c.status === 'Processing').length;
        shippedCount = customers.filter(c => c.status === 'Shipped').length;
        pendingCount = customers.filter(c => c.status === 'Pending').length;
        deliveredCount = customers.filter(c => c.status === 'Delivered').length;
    }

    // Update dashboard display with stored data
    function updateDashboard() {
        const ordersProcessedElement = document.getElementById('ordersProcessed');
        const shipmentStatusTitleElement = document.getElementById('shipmentStatusTitle');
        const shipmentCountElement = document.getElementById('shipmentCount');

        if (ordersProcessedElement) {
            ordersProcessedElement.textContent = processedCount;
        } else {
            console.error('Element with ID "ordersProcessed" not found');
        }

        if (shipmentStatusTitleElement) {
            const currentStatus = statusCycle[currentStatusIndex];
            shipmentStatusTitleElement.textContent = currentStatus;
            shipmentCountElement.textContent = getCountForStatus(currentStatus);
        } else {
            console.error('Element with ID "shipmentStatusTitle" not found');
        }

        if (shipmentCountElement) {
            shipmentCountElement.textContent = getCountForStatus(statusCycle[currentStatusIndex]);
        } else {
            console.error('Element with ID "shipmentCount" not found');
        }
    }

    // Get count for the given status
    function getCountForStatus(status) {
        switch (status) {
            case 'Processing':
                return processedCount;
            case 'Shipped':
                return shippedCount;
            case 'Pending':
                return pendingCount;
            case 'Delivered':
                return deliveredCount;
            default:
                return 0;
        }
    }

    // Fetch customer data initially when the page loads
    fetchCustomers();

    // Event listener for refresh button
    document.getElementById('refreshData').addEventListener('click', function () {
        // Cycle to the next status
        currentStatusIndex = (currentStatusIndex + 1) % statusCycle.length;
        fetchCustomers(); // Reuse the same function for refreshing data
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
