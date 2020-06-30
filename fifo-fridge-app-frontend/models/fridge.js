class Fridge {
  constructor(name, capacity, foodItems) {
    if(Object.keys(foodItems).length <= capacity) {
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
    <h4>Capacity: ${this.capacity}</h4>
     ` + FoodItem.foodItemsCardHTML(this.foodItems) + `<br />`;
  };



  // delete our fridges



  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.id = this.id;
    fridgeCard.innerHTML += this.fridgeCardHTML();
    fridgeContainer.appendChild(fridgeCard);
  };
};
