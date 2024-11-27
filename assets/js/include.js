document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");
  let promises = [];

  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    const promise = fetch(file)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Could not fetch ${file}: ${response.statusText}`);
        return response.text();
      })
      .then((data) => {
        el.innerHTML = data;
      })
      .catch((error) => {
        console.error(error);
        el.innerHTML = "Failed to load content.";
      });
    promises.push(promise);
  });

  // Sau khi tất cả các include hoàn tất, phát ra sự kiện 'includesLoaded'
  Promise.all(promises).then(() => {
    document.dispatchEvent(new Event("includesLoaded"));
  });
});

// assets/js/searchAndFilter.js

// Hàm khởi tạo chức năng lọc
function initializeFilters() {
  // Lưu các bộ lọc đang bật
  let activeFilters = [];

  // Lấy các nút lọc, input tìm kiếm và danh sách project
  const searchInput = document.querySelector(".search-input"); // Input tìm kiếm
  const filterButtons = document.querySelectorAll(".filter-btn"); // Nút lọc
  const projects = document.querySelectorAll(".project-item"); // Danh sách project

  if (!searchInput || filterButtons.length === 0 || projects.length === 0) {
    console.warn("Không tìm thấy các phần tử cần thiết để khởi tạo lọc.");
    return;
  }

  // Hàm cập nhật giao diện lọc
  function updateFilter() {
    const keyword = searchInput.value.toLowerCase(); // Lấy từ khóa tìm kiếm

    projects.forEach((project) => {
      // Kiểm tra project có khớp từ khóa không
      const matchesKeyword = project.textContent
        .toLowerCase()
        .includes(keyword);

      // Kiểm tra project có khớp bộ lọc không
      const matchesFilters =
        activeFilters.length === 0 || // Không có bộ lọc nào được chọn
        activeFilters.some((filter) => project.classList.contains(filter));

      // Hiển thị nếu khớp cả từ khóa và bộ lọc
      project.style.display =
        matchesKeyword && matchesFilters ? "block" : "none";
    });
  }

  // Xử lý khi bấm nút lọc
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      if (filter === "all") {
        // Reset nếu chọn "Tất cả"
        activeFilters = [];
      } else {
        // Toggle trạng thái của bộ lọc
        if (activeFilters.includes(filter)) {
          activeFilters = activeFilters.filter((f) => f !== filter);
        } else {
          activeFilters.push(filter);
        }
      }

      // Cập nhật giao diện nút
      filterButtons.forEach((b) => {
        if (b.dataset.filter === "all") {
          b.classList.toggle("active", activeFilters.length === 0);
        } else {
          b.classList.toggle(
            "active",
            activeFilters.includes(b.dataset.filter)
          );
        }
      });

      // Gọi hàm cập nhật giao diện lọc
      updateFilter();
    });
  });

  // Xử lý khi nhập tìm kiếm
  searchInput.addEventListener("input", updateFilter);
}

// Lắng nghe sự kiện 'includesLoaded' để khởi tạo lọc
document.addEventListener("includesLoaded", initializeFilters);
