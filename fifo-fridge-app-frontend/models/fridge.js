class Fridge {
  constructor(name, capacity=1, foodItems, id=null) {
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
    <h4>Capacity: ${this.capacity}</h4>
    <div id="food-items-container">` +
    FoodItem.foodItemsCardHTML(this.foodItems) +
    `</div>`;
  };


  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.setAttribute("id", this.id);
    fridgeCard.innerHTML += this.fridgeCardHTML();

    const addFoodItem = document.createElement('button');
    addFoodItem.innerText = "Add Food Item"
    addFoodItem.addEventListener("click", (e) => {
      e.preventDefault();
      API.addFoodItem(fridgeCard, this.id);
    });
    fridgeCard.appendChild(addFoodItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("class", "fridge-delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      API.deleteFridge(parseInt(e.target.parentElement.id))
    });
    fridgeCard.appendChild(deleteBtn);

    let newFoodItemForm = document.createElement('form');
    newFoodItemForm.id = "new-food-item-form";
    newFoodItemForm.innerHTML = `
    <input type="text" name="name" placeholder="food name" />
    <br />
    <input type="text" name="food_group" placeholder="food group" />
    <br />
    <input type="text" name="expiration_date" placeholder="expiration date (##/##/####)" />
    <br />
    <input type="number" name="quantity" placeholder="quantity" min=0 />
    <br />
    <input type="submit" value="Add Item" />
    `

    newFoodItemForm.style.display="none";
    fridgeCard.appendChild(newFoodItemForm);


    fridgeContainer.appendChild(fridgeCard);
  };
};
