function showSignupToast(isSuccess) {
  const toastId = isSuccess ? "signupSuccessToast" : "signupErrorToast";
  const toast = new bootstrap.Toast(document.getElementById(toastId));
  toast.show();
  setTimeout(function () {
    window.location.href = "login.html";
  }, 3000);
}
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword && password !== "") {
      showSignupToast(true);
    } else {
      showSignupToast(false);
    }
  });
