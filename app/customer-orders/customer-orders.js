
$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
    // JavaScript for handling logout button click
    var logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = '/app/Login/login.html'; 
        });
    } else {
        console.error('Logout button not found.');
    }

    // Function to perform search
    function performSearch() {
        const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

        // Fetch original data from the table
        const tableBody = document.getElementById('ordersTableBody');
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        // Filter the rows based on searchInput
        rows.forEach(row => {
            const orderId = row.children[0].textContent.trim().toLowerCase();
            const customerName = row.children[1].textContent.trim().toLowerCase();

            if (orderId.includes(searchInput) || customerName.includes(searchInput)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        // Optionally show a message if no results found (not part of original code)
        const noResultsMessage = document.getElementById('noResultsMessage');
        if (noResultsMessage) {
            const visibleRows = rows.filter(row => row.style.display !== 'none');
            if (visibleRows.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }
    }

    // Fetch data from JSON file and populate table
    const tableBody = document.getElementById('ordersTableBody');
    fetch('http://localhost:8080/getAllCustomerOrders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(order => {
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

            // Initialize: Show page 1 by default
            showPage(1);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
// Function to show specific page of data
function showPage(pageNumber) {
    var rows = document.querySelectorAll('#ordersTableBody tr');
    rows.forEach(function(row) {
        row.style.display = 'none';
    });

    // Show rows based on the selected page number
    var rowsPerPage = 10; // Example number of rows per page
    var startIndex = (pageNumber - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    for (var i = startIndex; i < endIndex && i < rows.length; i++) {
        rows[i].style.display = '';
    }

    // Update active class in pagination
    var pagination = document.getElementById('pagination').querySelectorAll('.page-item');
    pagination.forEach(function(item) {
        item.classList.remove('active');
    });
    pagination[pageNumber].classList.add('active');

    // Toggle disabled state for Previous and Next buttons
    toggleDisabledState(pageNumber);
}

// Function for showing next page
function showNextPage() {
    var activeItem = document.querySelector('.pagination .active');
    var nextPage = activeItem.nextElementSibling;
    if (nextPage && !nextPage.classList.contains('disabled')) {
        var pageNumber = parseInt(activeItem.querySelector('a').innerText) + 1;
        showPage(pageNumber);
    }
}

// Function for showing previous page
function showPreviousPage() {
    var activeItem = document.querySelector('.pagination .active');
    var previousPage = activeItem.previousElementSibling;
    if (previousPage && !previousPage.classList.contains('disabled')) {
        var pageNumber = parseInt(activeItem.querySelector('a').innerText) - 1;
        showPage(pageNumber);
    }
}

// Function to toggle disabled state of Previous and Next buttons
function toggleDisabledState(pageNumber) {
    var previousPage = document.getElementById('previousPage');
    var nextPage = document.getElementById('nextPage');

    if (pageNumber === 1) {
        previousPage.classList.add('disabled');
        nextPage.classList.remove('disabled');
    } else if (pageNumber === 3) { // Example: Assuming 3 pages
        previousPage.classList.remove('disabled');
        nextPage.classList.add('disabled');
    } else {
        previousPage.classList.remove('disabled');
        nextPage.classList.remove('disabled');
    }
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

                // Initialize: Show page 1 by default
                showPage(1);
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

    // Event listeners for pagination buttons
    const previousPage = document.getElementById('previousPage');
    const nextPage = document.getElementById('nextPage');
    if (previousPage && nextPage) {
        previousPage.addEventListener('click', showPreviousPage);
        nextPage.addEventListener('click', showNextPage);
    } else {
        console.error('Pagination buttons not found.');
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


