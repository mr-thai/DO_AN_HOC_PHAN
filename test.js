// JavaScript (script.js)

window.addEventListener("mousemove", function (event) {
  // Lấy phần tử hình ảnh
  const cursorImage = document.getElementById("cursorImage");

  // Đặt vị trí của hình ảnh dựa trên vị trí của con trỏ chuột
  cursorImage.style.left = event.pageX + "px";
  cursorImage.style.top = event.pageY + "px";
});
