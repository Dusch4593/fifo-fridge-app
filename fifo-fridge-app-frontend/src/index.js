document.addEventListener("DOMContentLoaded", () => {
  API.loadFridges();
  document.getElementById('fridge-form').addEventListener('submit', API.addFridge);
});
