$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
    
    let customerOrders = []; // Array to hold customer orders data
    const pageSize = 10; // Adjust as needed
    let currentPage = 1; // Initialize current page
    let totalPages = 0; // Variable to hold total pages

    // Function to calculate total pages based on data length and page size
    function calculateTotalPages() {
        totalPages = Math.ceil(customerOrders.length / pageSize);
    }

    function renderTableRows(pageNumber) {
        const tableBody = document.getElementById('ordersTableBody');
        tableBody.innerHTML = ''; // Clear existing rows
    
        // Calculate start and end index for current page
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageOrders = customerOrders.slice(startIndex, endIndex);
    
        // Render rows for the current page
        pageOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.productName}</td>
                <td>${order.status}</td>
            `;
            tableBody.appendChild(row);
    
            // Add click event listener to each row
            row.addEventListener('click', function() {
                updateOrderDetails(order.orderId, order.customerName, order.productName, order.status);
            });
        });
    }
    
    // Function to display purchase orders for a specific page
    window.displayCustomerOrders = function(pageNumber, pageSize) {
        currentPage = pageNumber; // Update current page
        renderTableRows(pageNumber); // Render table rows for the selected page
        updatePagination(); // Update pagination links
    }

    // Example function to fetch customer orders (replace with actual fetch logic)
    function fetchCustomerOrders() {
        fetch('http://localhost:8080/getAllCustomerOrders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                customerOrders = data; // Assign fetched data to customerOrders array
                calculateTotalPages(); // Calculate total pages based on fetched data
                displayCustomerOrders(1, pageSize); // Display first page of orders
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to update pagination links based on current page and total pages
    function updatePagination() {
        const pagination = document.getElementById('pagination');
        let paginationHtml = '';

        // Generate pagination HTML dynamically
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#" onclick="window.displayCustomerOrders(${i}, ${pageSize})">${i}</a></li>`;
        }

        // Update the pagination container with the generated HTML
        pagination.innerHTML = paginationHtml;
    }

    // Initialize: Fetch data and set up pagination
    fetchCustomerOrders();

// Function to perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    // Filter customerOrders based on search input
    const filteredOrders = customerOrders.filter(order => {
        const orderId = String(order.orderId || '').trim().toLowerCase();
        const customerName = String(order.customerName || '').trim().toLowerCase();

        return orderId.includes(searchInput) || customerName.includes(searchInput);
    });

    // Update table display based on filtered results
    let tableBodyHtml = '';
    filteredOrders.forEach(order => {
        tableBodyHtml += `<tr>
                            <td>${order.orderId}</td>
                            <td>${order.customerName}</td>
                            <td>${order.productName}</td>
                            <td>${order.status}</td>
                        </tr>`;
    });

    // Update the table body
    document.getElementById('ordersTableBody').innerHTML = tableBodyHtml;

    // Show message if no results found
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (noResultsMessage) {
        if (filteredOrders.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
    
    // Reset pagination and display the first page of filtered results
    currentPage = 1;
    calculateTotalPages(filteredOrders);
    displayPurchaseOrders(currentPage, pageSize, filteredOrders);
}

    // Function to update order details container
    function updateOrderDetails(orderId, customerName, productName, status) {
        const orderDetailsHtml = `
            <div class="card">
                <div class="row d-flex justify-content-between px-3 top">
                    <div class="d-flex">
                        <h5 style="font-weight: bold;">ORDERID <span class="text-primary font-weight-bold">#${orderId}</span></h5>
                    </div>
                    <div class="d-flex flex-column text-sm-right">
                        <p class="mb-0">Expected Arrival <span>${generateExpectedDeliveryDate()}</span></p>
                        <p>Grasshoppers <span class="font-weight-bold"><a href="#">${generateRandomProductCode()}</a></span></p>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="col-12">
                        <ul id="progressbar" class="text-center">
                            <li class="step0"></li>
                            <li class="step0"></li>
                            <li class="step0"></li>
                            <li class="step0"></li>
                        </ul>
                    </div>
                </div>
                <div class="row justify-content-between top" id="icons">
                    <div class="col-md-8 col-lg-2" id="icon-1"> 
                            <div class="row d-flex icon-content">
                                <img class="icon" src="/resources/Images/order-designing.png">
                                <div class="d-flex flex-column">
                                    <p>Order<br>Pending</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-2" id="icon-2"> 
                            <div class="row d-flex icon-content">
                                <img class="icon" src="/resources/Images/order-processed.png">
                                <div class="d-flex flex-column">
                                    <p>Order<br>Processed</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-2" id="icon-3"> 
                            <div class="row d-flex icon-content">
                                <img class="icon" src="/resources/Images/order-shipped.png">
                                <div class="d-flex flex-column">
                                    <p>Order<br>Shipped</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-2" id="icon-5"> 
                            <div class="row d-flex icon-content">
                                <img class="icon" src="/resources/Images/order-arrived.png">
                                <div class="d-flex flex-column">
                                    <p>Order<br>Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;

        const orderDetailsContainer = document.getElementById('orderDetailsContainer');
        if (orderDetailsContainer) {
            orderDetailsContainer.innerHTML = orderDetailsHtml;
            updateProgressBar(status);
            orderDetailsContainer.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
            console.error('Order details container not found.');
        }
    }

    // Function to update progress bar based on order status
    function updateProgressBar(status) {
        const progressBarItems = document.querySelectorAll('#progressbar li');
        
        if (!progressBarItems || progressBarItems.length === 0) {
            console.error('Progress bar items not found.');
            return;
        }

        // Reset all progress steps
        progressBarItems.forEach(item => {
            item.className = 'step0';
        });

        // Update progress steps based on status
        switch (status.toLowerCase()) {
            case 'shipped':
                if (progressBarItems.length >= 3) {
                    progressBarItems[0].className = 'active step0';
                    progressBarItems[1].className = 'active step0';
                    progressBarItems[2].className = 'active step0';
                }
                break;
            case 'processing':
                if (progressBarItems.length >= 2) {
                    progressBarItems[0].className = 'active step0';
                    progressBarItems[1].className = 'active step0';
                }
                break;
            case 'delivered':
                if (progressBarItems.length >= 4) {
                    progressBarItems[0].className = 'active step0';
                    progressBarItems[1].className = 'active step0';
                    progressBarItems[2].className = 'active step0';
                    progressBarItems[3].className = 'active step0';
                }
                break;
            case 'pending':
                if (progressBarItems.length >= 1) {
                    progressBarItems[0].className = 'active step0';
                }
                break;
            default:
                break;
        }
    }

    // Example function to generate expected delivery date (for demonstration)
    function generateExpectedDeliveryDate() {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 30)); // Random date within next 10 days
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return formattedDate;
    }

    // Example function to generate random product code (for demonstration)
    function generateRandomProductCode() {
        return 'V' + Math.floor(Math.random() * 1000) + 'HB'; 
    }

    // Function to handle filtering the table
    function filterTable(status) {
        const tableBody = document.getElementById('ordersTableBody');
        fetch('http://localhost:8080/getAllCustomerOrders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Filter data based on status
                const filteredData = status === 'all' ? data : data.filter(order => order.status.toLowerCase() === status);

                // Clear existing table rows
                tableBody.innerHTML = '';

                // Populate table with filtered data
                filteredData.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.orderId}</td>
                        <td>${order.customerName}</td>
                        <td>${order.productName}</td>
                        <td>${order.status}</td>
                    `;
                    tableBody.appendChild(row);

                    // Add click event listener to each row
                    row.addEventListener('click', function() {
                        updateOrderDetails(order.orderId, order.customerName, order.productName, order.status);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
 
    // Event listener for search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    } else {
        console.error('Search input not found.');
    }

    // Event listeners for filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            filterTable(status);
        });
    });
});

function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
// JavaScript for handling logout button click
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Redirect to login page
    window.location.href = '/app/login/login.html'; // Replace with your actual login page URL
});