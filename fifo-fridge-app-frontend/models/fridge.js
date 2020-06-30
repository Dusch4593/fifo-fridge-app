class Fridge {
  constructor(name, capacity=0, foodItems, id=null) {
    if(Object.keys(foodItems).length <= capacity) {
      this.id = id;
      this.name = name;
      this.capacity = capacity;
      this.foodItems = foodItems;
      this.renderFridge();
    } else {
      throw new Error("foodItems list exceded fridge's max capacity. Please try again with a shorter list.")
    };
  };

  fridgeCardHTML() {
    return `
    <h2>${this.name}</h2>
    <h4>Capacity: ${this.capacity}</h4>` +
    FoodItem.foodItemsCardHTML(this.foodItems);
  };


  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.setAttribute("id", this.id);
    fridgeCard.innerHTML += this.fridgeCardHTML();

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("class", "fridge-delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      API.deleteFridge(parseInt(e.target.parentElement.id))
    });
    fridgeCard.appendChild(deleteBtn);

    fridgeContainer.appendChild(fridgeCard);
  };
};
