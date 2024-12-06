function showLoginToast(isSuccess) {
  const toastId = isSuccess ? "loginSuccessToast" : "loginErrorToast";
  const toast = new bootstrap.Toast(document.getElementById(toastId));
  toast.show();
}
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (username === "test@gmail.com" && password === "12345") {
      showLoginToast(true);
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    } else {
      showLoginToast(false);
    }
  });

function togglePassword() {
  var passwordField = document.getElementById("password");
  var toggleIcon = document.getElementById("togglePassword");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("bi-eye-slash");
    toggleIcon.classList.add("bi-eye");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("bi-eye");
    toggleIcon.classList.add("bi-eye-slash");
  }
}
