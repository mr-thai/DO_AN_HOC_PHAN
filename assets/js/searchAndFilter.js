function initializeFilters() {
  let activeFilters = [];
  const searchInput = document.querySelector(".search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");
  if (!searchInput || filterButtons.length === 0 || projects.length === 0) {
    console.warn("Không tìm thấy các phần tử cần thiết để khởi tạo lọc.");
    return;
  }
  function updateFilter() {
    const keyword = searchInput.value.toLowerCase();
    projects.forEach((project) => {
      const matchesKeyword = project.textContent
        .toLowerCase()
        .includes(keyword);
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => project.classList.contains(filter));
      project.style.display =
        matchesKeyword && matchesFilters ? "block" : "none";
    });
  }
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      if (filter === "all") {
        activeFilters = [];
      } else {
        if (activeFilters.includes(filter)) {
          activeFilters = activeFilters.filter((f) => f !== filter);
        } else {
          activeFilters.push(filter);
        }
      }
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
      updateFilter();
    });
  });
  searchInput.addEventListener("input", updateFilter);
}
document.addEventListener("includesLoaded", initializeFilters);
