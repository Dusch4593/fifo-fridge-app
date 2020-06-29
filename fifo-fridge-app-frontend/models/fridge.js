class Fridge {
  constructor(name, capacity, foodItems) {
    if(foodItems.length <= capacity) {
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
    <br />

    <h4>List of Food Items</h4>
    <ul id="food-item-list">

    </ul>
    `
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


// link to a show page and show code
