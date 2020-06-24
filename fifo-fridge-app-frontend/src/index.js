document.addEventListener("DOMContentLoaded", () => {
  loadFridges();
});


function loadFridges() {
  fetch(`http://localhost:3000/fridges`)
    .then(res => res.json())
    .then(fridgeData => {
      for(let fridge of fridgeData) {
      renderFridge(fridge);
    }})
};

function renderFridge(f) {
  let fridgeCard = document.createElement("div");
  fridgeCard.setAttribute("class", "fridge-card");
  debugger
}
