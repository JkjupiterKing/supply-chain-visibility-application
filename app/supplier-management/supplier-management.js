$('#mySidenav').load('../common/sidenav.html');
function openNav() {
    document.getElementById("mySidenav").style.width = "16em";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
// JavaScript for handling logout button click
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Redirect to login page
    window.location.href = '/app/Login/login.html'; // Replace with your actual login page URL
});