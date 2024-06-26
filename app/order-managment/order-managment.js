// JavaScript to handle pagination and row visibility
function showPage(pageNumber) {
    // Hide all rows by default
    var rows = document.querySelectorAll('.page1, .page2');
    rows.forEach(function(row) {
        row.style.display = 'none';
    });

    // Show rows based on the selected page number
    if (pageNumber === 1) {
        // Show rows for page 1
        var order1 = document.getElementById('order1');
        var order2 = document.getElementById('order2');
        if (order1) order1.style.display = '';
        if (order2) order2.style.display = '';
    } else if (pageNumber === 2) {
        // Show rows for page 2
        var order3 = document.getElementById('order3');
        var order4 = document.getElementById('order4');
        if (order3) order3.style.display = '';
        if (order4) order4.style.display = '';
    } else if (pageNumber === 3) {
        // Show rows for page 3 (if needed)
        // Add logic here for additional pages
    }

    // Update active class in pagination
    var pagination = document.getElementById('pagination').querySelectorAll('.page-item');
    pagination.forEach(function(item) {
        item.classList.remove('active');
    });
    pagination[pageNumber].classList.add('active');

    // Toggle disabled class for Previous and Next buttons
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

// Initialize: Show page 1 by default
showPage(1);

// Event listeners for Previous and Next buttons
document.getElementById('previousPage').addEventListener('click', showPreviousPage);
document.getElementById('nextPage').addEventListener('click', showNextPage);

// Function to toggle disabled state of Previous and Next buttons
function toggleDisabledState(pageNumber) {
    var previousPage = document.getElementById('previousPage');
    var nextPage = document.getElementById('nextPage');

    if (pageNumber === 1) {
        previousPage.classList.add('disabled');
        nextPage.classList.remove('disabled');
    } else if (pageNumber === 3) {
        previousPage.classList.remove('disabled');
        nextPage.classList.add('disabled');
    } else {
        previousPage.classList.remove('disabled');
        nextPage.classList.remove('disabled');
    }
}
