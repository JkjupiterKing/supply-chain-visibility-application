document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            // Retrieve username and password input values
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            
            // Check if username and password are not empty
            var username = usernameInput.value.trim();
            var password = passwordInput.value.trim();
            
            if (username !== '' && password !== '') {
                fetch(`http://localhost:8080/getUserByUsername/${username}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.password) {
                            var decodedPassword = atob(data.password);
                            if (decodedPassword === password) {
                                window.location.href = '../../app/dashboard/dashboard.html';
                            } else {
                                alert('Invalid username or password.');
                            }
                        } else {
                            alert('User not found.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                        alert('Please enter valid username and password.');
                    });
            } else {
                alert('Please enter both username and password.');
            }
        });
    } else {
        console.error('Could not find loginForm element.');
    }
});
