$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display suppliers
    fetchSuppliers();

    // Handle form submission for adding new supplier
    document.getElementById('addSupplierFormElement').addEventListener('submit', function(event) {
        event.preventDefault();
        addSupplier();
    });

    // Event listener for showing manage suppliers
    var manageBtn = document.getElementById('manage-btn');
    manageBtn.addEventListener('click', function() {
        showManageSuppliers();
    });

    // Event listener for showing add new supplier form
    var addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        showAddSupplierForm();
    });

    // Event delegation for update and delete buttons
    var tableBody = document.getElementById('supplierTableBody');
    tableBody.addEventListener('click', function(event) {
        var target = event.target;

        // Handle update button click
        if (target.classList.contains('btn-update')) {
            var supplierId = target.getAttribute('data-supplier-id');
            openUpdateForm(supplierId); // Call function to open update form with supplier data
        }

        // Handle delete button click
        if (target.classList.contains('btn-delete')) {
            var supplierId = target.getAttribute('data-supplier-id');
            if (confirm('Are you sure you want to delete this supplier?')) {
                deleteSupplier(supplierId);
            }
        }
    });
});

// Function to fetch suppliers from API
function fetchSuppliers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/getAllSuppliers');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var suppliers = JSON.parse(xhr.responseText);
            displaySuppliers(suppliers);
        } else {
            console.error('Error fetching suppliers. Status code: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Error fetching suppliers. Network error.');
    };
    xhr.send();
}

// Function to display suppliers in the table
function displaySuppliers(suppliers) {
    var tableBody = document.getElementById('supplierTableBody');
    tableBody.innerHTML = '';

    suppliers.forEach(function(supplier) {
        var row = '<tr data-supplier-id="' + supplier.id + '">' +
          '<td>' + supplier.id + '</td>' +
          '<td>' + supplier.name + '</td>' +
          '<td>' + supplier.contactPerson + '</td>' +
          '<td>' + supplier.email + '</td>' +
          '<td>' + supplier.phone + '</td>' +
          '<td>' + supplier.address + '</td>' +
          '<td>' +
            '<button type="button" class="btn btn-primary btn-sm btn-update">Update</button>' +
            '<button type="button" class="btn btn-danger btn-sm btn-delete">Delete</button>' +
          '</td>' +
        '</tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    }      

    function openUpdateForm(event) {
        // Check if event object is available and event.target exists
        if (!event || !event.target) {
            console.error('Error: Event object or event target not available.');
            return;
        }
    
        // Get the closest table row element
        var clickedRow = event.target.closest('tr');
        if (!clickedRow) {
            console.error('Error: Update button not found within a table row.');
            return;
        }
    
        // Access the supplier ID from the data attribute
        var supplierId = clickedRow.dataset.supplierId;
        if (!supplierId) {
            console.error('Error: Supplier ID not found in data attribute.');
            return;
        }
    
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/getSupplierById/' + encodeURIComponent(supplierId));
        xhr.onload = function() {
            if (xhr.status === 200) {
                var supplier = JSON.parse(xhr.responseText);
                // Fill the update form fields with supplier data
                document.getElementById('updateSupplierId').value = supplier.id;
                document.getElementById('updateSupplierName').value = supplier.name;
                document.getElementById('updateContactPerson').value = supplier.contactPerson;
                document.getElementById('updateEmail').value = supplier.email;
                document.getElementById('updatePhone').value = supplier.phone;
                document.getElementById('updateAddress').value = supplier.address;
    
                // Show the update modal
                $('#updateSupplierModal').modal('show');
            } else {
                console.error('Error fetching supplier for update. Status code: ' + xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching supplier for update. Network error.');
        };
        xhr.send();
    }
    document.addEventListener('DOMContentLoaded', function() {
        var tableBody = document.getElementById('yourTableBodyId'); // Replace with your actual table body ID
        tableBody.addEventListener('click', function(event) {
            if (event.target.matches('.yourUpdateButtonClass')) { // Replace with your actual update button class
                openUpdateForm(event);
            }
        });
    });
        
    
// Function to add a new supplier via API
function addSupplier() {
    var formData = {
        name: document.getElementById('supplierName').value,
        contactPerson: document.getElementById('contactPerson').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/addSupplier');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 201) {
            // Clear form fields
            document.getElementById('supplierName').value = '';
            document.getElementById('contactPerson').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('address').value = '';

            // Refresh supplier table
            fetchSuppliers();

            // Show success message
            alert('Supplier added successfully!');
        } else {
            console.error('Error adding supplier. Status code: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Error adding supplier. Network error.');
    };
    xhr.send(JSON.stringify(formData));
}

// Function to delete a supplier via API
function deleteSupplier(supplierId) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8080/deleteSupplierById/' + supplierId, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            alert('Supplier deleted successfully.');
            fetchSuppliers(); // Refresh the supplier table
        } else {
            console.error('Error deleting supplier.');
        }
    };

    xhr.onerror = function() {
        console.error('Error deleting supplier.');
    };

    xhr.send();
}

// Function to update a supplier via API
document.getElementById('updateSupplierForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = {
        id: document.getElementById('updateSupplierId').value,
        name: document.getElementById('updateSupplierName').value,
        contactPerson: document.getElementById('updateContactPerson').value,
        email: document.getElementById('updateEmail').value,
        phone: document.getElementById('updatePhone').value,
        address: document.getElementById('updateAddress').value
    };

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:8080/updateSupplierById/' + formData.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Close the update modal
            $('#updateSupplierModal').modal('hide');
            // Refresh supplier table
            fetchSuppliers();
        } else {
            console.error('Error updating supplier. Status code: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Error updating supplier. Network error.');
    };
    xhr.send(JSON.stringify(formData));
});

function showManageSuppliers() {
    document.getElementById('manageSuppliersTable').style.display = 'table';
    document.getElementById('addSupplierForm').style.display = 'none';
}

function showAddSupplierForm() {
    document.getElementById('manageSuppliersTable').style.display = 'none';
    document.getElementById('addSupplierForm').style.display = 'block';
}

function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display suppliers
    fetchSuppliers();

    // Event listener for handling search input changes
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchText = searchInput.value.toLowerCase().trim();
            filterSuppliers(searchText);
        });
    } else {
        console.error('searchInput not found.');
    }

    // Function to fetch suppliers from API
    function fetchSuppliers() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/getAllSuppliers');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var suppliers = JSON.parse(xhr.responseText);
                displaySuppliers(suppliers);
            } else {
                console.error('Error fetching suppliers. Status code: ' + xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching suppliers. Network error.');
        };
        xhr.send();
    }

    // Function to display suppliers in the table
    function displaySuppliers(suppliers) {
        var tableBody = document.getElementById('supplierTableBody');
        if (!tableBody) {
            console.error('supplierTableBody not found.');
            return;
        }
        tableBody.innerHTML = '';

        suppliers.forEach(function(supplier) {
            var row = '<tr>' +
                '<td>' + supplier.id + '</td>' +
                '<td>' + supplier.name + '</td>' +
                '<td>' + supplier.contactPerson + '</td>' +
                '<td>' + supplier.email + '</td>' +
                '<td>' + supplier.phone + '</td>' +
                '<td>' + supplier.address + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-primary btn-sm btn-update" data-supplier-id="' + supplier.id + '">Update</button>' +
                '<button type="button" class="btn btn-danger btn-sm btn-delete" data-supplier-id="' + supplier.id + '">Delete</button>' +
                '</td>' +
                '</tr>';
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Function to filter suppliers based on search text
    function filterSuppliers(searchText) {
        var tableRows = document.getElementById('supplierTableBody').getElementsByTagName('tr');
        Array.from(tableRows).forEach(function(row) {
            var id = row.cells[0].innerText.toLowerCase();
            var name = row.cells[1].innerText.toLowerCase();
            var contactPerson = row.cells[2].innerText.toLowerCase();
            if (id.includes(searchText) || name.includes(searchText) || contactPerson.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // JavaScript for handling logout button click
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
        });
    } else {
        console.error('logoutBtn not found.');
    }
});
