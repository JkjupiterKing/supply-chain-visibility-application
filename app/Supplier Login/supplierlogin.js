document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve email and password input values
      var emailInput = document.getElementById("email");
      var passwordInput = document.getElementById("password");

      // Check if email and password are not empty
      var email = emailInput.value.trim();
      var userpassword = passwordInput.value.trim();

      if (email !== "" && userpassword !== "") {
        fetch(`http://localhost:8080/getSupplierByEmail/${email}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data && data.password) {
              var storedPassword = data.password;
              if (storedPassword === userpassword) {
                // Store supplier information in localStorage
                localStorage.setItem("supplier", JSON.stringify(data));

                // Redirect to Manage Suppliers page
                window.location.href =
                  "../../app/Manage-Suppliers/Managesuppliers.html";
              } else {
                alert("Invalid email or password.");
              }
            } else {
              alert("User not found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            alert("Please enter valid email and password.");
          });
      } else {
        alert("Please enter both email and password.");
      }
    });
  } else {
    console.error("Could not find loginForm element.");
  }
});
