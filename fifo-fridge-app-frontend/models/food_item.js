class FoodItem {
  constructor(name, foodGroup, expirationDate, quantity) {
    this.name = name;
    this.foodGroup = foodGroup;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
  };

  static foodItemsCardHTML(items) {
    let foodItemsContainer = document.createElement("div");
    foodItemsContainer.setAttribute("class", "food-items-container");

    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    items.sort((a, b) => parseInt(a.expiration_date.replace('/', '')) - parseInt(b.expiration_date.replace('/', '')))

    for(let item of items) {
      const {name, food_group, expiration_date, quantity} = item;
      let newFoodItem = new FoodItem(name, food_group, expiration_date, quantity);
      let foodItemCard = document.createElement("div");
      foodItemCard.setAttribute("class", "food-item-card");


      if(parseInt(item.expiration_date.replace('/','') < parseInt(today.replace('/', '')))) {
        foodItemCard.innerHTML += `
          <strong>${item.name} (EXPIRED)</strong> <br />
          <strong>Food Group: </strong> ${item.food_group[0].toUpperCase() + item.food_group.slice(1)} <br />
          <strong>Expiration Date: </strong> ${item.expiration_date} <br />
          <strong>Quantity: </strong> ${item.quantity} <br /><br />`
      };



      foodItemCard.innerHTML += `
        <strong>${item.name}</strong> <br />
        <strong>Food Group: </strong> ${item.food_group[0].toUpperCase() + item.food_group.slice(1)} <br />
        <strong>Expiration Date: </strong> ${item.expiration_date} <br />
        <strong>Quantity: </strong> ${item.quantity} <br /><br />
      `


      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.setAttribute("class", "food-item-delete-btn");

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        API.deleteFoodItem(parseInt(e.target.parentElement.id))
      });

      foodItemCard.appendChild(deleteBtn);
      foodItemsContainer.appendChild(foodItemCard);
    };

    return foodItemsContainer.innerHTML;

  };


  static addItemToFridge(fridge, item) {
    const {name, food_group, expiration_date, quantity} = item;
    const newFoodItem = new FoodItem(name, food_group, expiration_date, quantity);
    let foodItemsContainer = fridge.querySelector("#food-items-container");
    let foodItemCard = document.createElement('div');
    foodItemCard.setAttribute("class", "food-item-card");

    foodItemCard.innerHTML += `
      <strong>${item.name}</strong> <br />
      <strong>Food Group: </strong> ${item.food_group[0].toUpperCase() + item.food_group.slice(1)} <br />
      <strong>Expiration Date: </strong> ${item.expiration_date} <br />
      <strong>Quantity: </strong> ${item.quantity} <br /><br />
    `


    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.setAttribute("class", "food-item-delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      API.deleteFoodItem(parseInt(e.target.parentElement.id))
    });

    let linkBreak = document.createElement("br");
    foodItemCard.appendChild(deleteBtn);
    foodItemsContainer.appendChild(foodItemCard);

    debugger;

    fridge.getElementsByTagName("form")[0].reset();
    fridge.getElementsByTagName("form")[0].style.display="none";
  };
};
