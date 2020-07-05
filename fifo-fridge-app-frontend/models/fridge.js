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

  // returns markup for a fridgeCard <div>
  fridgeCardHTML() {
    return `
    <h2>${this.name}</h2>
    <h4>Capacity: ${this.capacity}</h4>
    `
  };


  // sets up the container elements for the fetched Fridge (and FoodItem) data
  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.setAttribute("data-fridge-id", this.id);
    fridgeCard.innerHTML += this.fridgeCardHTML();

    // create "food-items-container <div> for current fridgeCard"
    // invoke FoodItem.renderFoodItems() to populate the container
    const foodItemsContainer = document.createElement("div");
    foodItemsContainer.setAttribute("class", "food-items-container");

    // render the food items and then append to foodItemsContainer?
    // TODO: Build FoodItem.renderFoodItems(foodItemsContainer, this.foodItems) <-- returns updated copy of foodItemsContainer with added food items
    // renderedFoodItems = FoodItem.renderFoodItems(foodItemsContainer, this.foodItems)
    // fridgeCard.appendChild(renderedFoodItems)

    const renderedFoodItems = FoodItem.renderFoodItems(foodItemsContainer, this.foodItems);
    fridgeCard.appendChild(renderedFoodItems);


    // create "Add Food Item" button
    // button comes with event listener that invokes API.addFoodItem() when clicked
    const addFoodItem = document.createElement('button');
    addFoodItem.innerText = "Add Food Item"
    addFoodItem.addEventListener("click", (e) => {
      e.preventDefault();
      API.addFoodItem(fridgeCard, this.id);
    });
    fridgeCard.appendChild(addFoodItem);

    // form for adding a new food item to the current fridgeCard
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

    // form is attached to to current fridgeCard and set to "dislpay:none" by default
    // (changes to "dislpay: block" when clicked and back to "none" when submitted)
    newFoodItemForm.style.display="none";
    fridgeCard.appendChild(newFoodItemForm);


    // button for deleting the current fridgeCard when clicked
    // uses API.deleteFridge() to send AJAX request to Rails API to
    // delete fridge from database
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("class", "fridge-delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      API.deleteFridge(parseInt(e.target.parentElement.getAttribute('data-fridge-id')))
    });
    fridgeCard.appendChild(deleteBtn);


    // finally, we append the fridgeCard to the existing fridgeContainer
    // it is now rendered
    fridgeContainer.appendChild(fridgeCard);
  };
};
