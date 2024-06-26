document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            // Retrieve username and password input values
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            
            // Check if username and password are not empty
            var username = usernameInput.value.trim();
            var password = passwordInput.value.trim();
            
            if (username !== '' && password !== '') {
                // Redirect to dashboard.html (replace with your actual dashboard page)
                window.location.href = '../../app/dashboard/dashboard.html';
            } else {
                // Display an alert if either username or password is empty
                alert('Please enter both username and password.');
            }
        });
    } else {
        console.error('Could not find loginForm element.');
    }
});
