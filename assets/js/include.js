document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        console.error(`Could not fetch ${file}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error loading file ${file}:`, error);
    }
  });
});
