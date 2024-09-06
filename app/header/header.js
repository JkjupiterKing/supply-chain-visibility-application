// Function to fetch and insert header.html into the current page
export async function includeHeader(path) {
    try {
        // Load Header.html
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Failed to load header');
        }
        const headerHtml = await response.text();
        const headerElement = document.createElement('div');
        headerElement.innerHTML = headerHtml;
        document.body.prepend(headerElement);

        // Attach event listeners to the elements in the header
        attachEventListeners();

    } catch (error) {
        console.error('Error including header:', error);
    }
}

// Function to attach event listeners to header elements
function attachEventListeners() {
    // Event to go to Home Page
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', function () {
            window.location.href = '/app/index.html';
        });
    }

    // Event to handle Logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault(); 
            localStorage.removeItem('username'); 
            window.location.href = '/app/Customerlogin/Customerlogin.html'; 
        });
    }
}
