class API {
  // render all fridges to the index page
  static loadFridges() {
    fetch(`http://localhost:3000/fridges`)
      .then(res => res.json())
      .then(fridgeData => {
        for(let fridge of fridgeData) {
          const {name, capacity, food_items, id} = fridge;
          new Fridge(name, capacity, food_items, id);
        }
        Fridge.renderFridges(Fridge.fridgesArray)
      })
  };

  // fetch a POST request with the submitted form data to add a new Fridge
  static addFridge(e) {
    e.preventDefault();
    let foodGroupSelectBox = e.target.getElementsByTagName("select")[0]
    let data = {
      'name': e.target.name[0].value,
      'capacity': parseInt(e.target.capacity.value),
      'food_items_attributes': [{
        'name': e.target.name[1].value,
        'food_group': foodGroupSelectBox.options[foodGroupSelectBox.selectedIndex].value,
        'expiration_date': e.target.expiration_date.value,
        'quantity': parseInt(e.target.quantity.value)
      }]
    };

    fetch(`http://localhost:3000/fridges`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(fridge => {
        const {name, capacity, food_items, id} = fridge;
        new Fridge(name, capacity, food_items, id);
        document.getElementById('fridge-form').reset();
      })
  };

  // delete our fridges
  static deleteFridge(fridgeID) {
    fetch(`http://localhost:3000/fridges/${fridgeID}`, {method: "DELETE"});
    document.getElementsByClassName('fridge-card')[fridgeID-1].remove();
    return "The fridge was deleted!";
  };

  static deleteFoodItem(foodItemID) {
    fetch(`http://localhost:3000/food_items/${foodItemID}`, {method: "DELETE"});
    document.getElementById(foodItemID.toString()).remove();
    return "The food item was deleted!";
  };


  //add food item
  static addFoodItem(fridgeCard, fridgeID) {
    let newFoodItemForm = fridgeCard.getElementsByTagName('form')[0];
    newFoodItemForm.style.display="block";

    newFoodItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let foodGroupSelectBox = e.target.getElementsByTagName("select")[0]
      let data = {
        'food_items_attributes': [{
          'name': e.target.name.value,
          'food_group': foodGroupSelectBox.options[foodGroupSelectBox.selectedIndex].value,
          'expiration_date': e.target.expiration_date.value,
          'quantity': parseInt(e.target.quantity.value)
        }]
      };
      fetch(`http://localhost:3000/fridges/${fridgeID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        const currentFridgeCard = document.getElementsByClassName('fridge-card')[result.id-1]
        let currentFridge = Fridge.fridgesArray.find(fridge => {return fridge.id === fridgeID});
        const foodItemsContainer = currentFridgeCard.querySelector("#food-items-container");
        let newFoodItem = result.food_items[result.food_items.length-1];


        FoodItem.addItemToFridge(currentFridge, currentFridgeCard, newFoodItem)
      });
    });
  };
};
