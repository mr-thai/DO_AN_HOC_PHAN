document.querySelectorAll(".notUpdatedBtn").forEach(function (button) {
  button.addEventListener("click", function () {
    var toast = new bootstrap.Toast(document.getElementById("contactToast"));
    toast.show();
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var toast = new bootstrap.Toast(document.getElementById("contactToast"));
    toast.show();
  });
