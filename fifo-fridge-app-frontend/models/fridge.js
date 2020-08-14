class Fridge {

  static fridgesArray = [];

  constructor(name, capacity=1, foodItems, id=null) {
    if(Object.keys(foodItems).length <= capacity) {
      this.id = id;
      this.name = name;
      this.capacity = capacity;
      this.foodItems = foodItems;
      Fridge.fridgesArray.push(this);
    } else {
      throw new Error("foodItems list exceded fridge's max capacity. Please try again with a shorter list.")
    };
  };


  //  toggleLike(e) function
  toggleLike = (e) => {
    e.target.style.backgroundColor == "" ? e.target.style.backgroundColor="red" : e.target.style.backgroundColor = ""
    ;
  }

  // returns markup for a fridgeCard <div>
  fridgeCardHTML() {
    return `
    <h2>${this.name}</h2>
    <h4>Capacity: ${this.capacity}</h4>
    `
  };

  // iterates through Fridge.fridgesArray and renders each fridge
  static renderFridges(fridgesArray) {
    for(let fridge of fridgesArray) {
      fridge.renderFridge()
    }
  }

  // sets up the container elements for the fetched Fridge (and FoodItem) data
  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.setAttribute("data-fridge-id", this.id);
    fridgeCard.innerHTML += this.fridgeCardHTML();

    // create "Like Fridge" button
    // button listens for a click;
    const likeFridgeBtn = document.createElement('button');
    likeFridgeBtn.innerText = "Like!"
    likeFridgeBtn.setAttribute("class", "like-btn");
    likeFridgeBtn.addEventListener("click", (e) => {
      if(e.target.className == 'like-btn') {
        // call separate method
        this.toggleLike(e)
      }
    })

    fridgeCard.appendChild(likeFridgeBtn);

    // create "Add Food Item" button
    // button comes with event listener that invokes API.addFoodItem() when clicked
    const addFoodItem = document.createElement('button');
    addFoodItem.innerText = "Add Food Item"
    addFoodItem.setAttribute("class", "add-food-item-btn")
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
    <select name="food-group-options" id="food-group-options">
      <option value="Choose a Food Group" selected>Choose A Food Group</option>
      <option value="Fruits">Fruits</option>
      <option value="Vegetables">Vegetables</option>
      <option value="Grains">Grains</option>
      <option value="Protein Foods">Protein Foods (Meats, Poultry, Seafood, etc)</option>
      <option value="Dairy">Dairy</option>
    </select>
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
      API.deleteFridge(parseInt(e.target.parentElement.getAttribute('data-fridge-id')))
    });
    fridgeCard.appendChild(deleteBtn);


    // create "food-items-container <div> for current fridgeCard"
    // invoke FoodItem.renderFoodItems() to populate the container
    const foodItemsContainer = document.createElement("div");
    foodItemsContainer.setAttribute("class", "food-items-container");

    // render the food items and then append to foodItemsContainer?
    // TODO: Build FoodItem.renderFoodItems(foodItemsContainer, this.foodItems) <-- returns updated copy of foodItemsContainer with added food items
    // renderedFoodItems = FoodItem.renderFoodItems(foodItemsContainer, this.foodItems)
    // fridgeCard.appendChild(renderedFoodItems)

    const renderedFoodItems = FoodItem.renderFoodItems(this.id, foodItemsContainer, this.foodItems);
    fridgeCard.appendChild(renderedFoodItems);


    // finally, we append the fridgeCard to the existing fridgeContainer
    // it is now rendered
    fridgeContainer.appendChild(fridgeCard);
  };
};
