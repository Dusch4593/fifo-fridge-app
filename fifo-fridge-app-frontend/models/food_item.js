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

    for(let item of items) {
      const {name, food_group, expiration_date, quantity} = item;
      let newFoodItem = new FoodItem(name, food_group, expiration_date, quantity);
      let foodItemCard = document.createElement("div");
      foodItemCard.setAttribute("class", "food-item-card");
      foodItemCard.innerHTML = `
        <strong>${item.name}</strong> <br />
        <strong>Food Group: </strong> ${item.food_group} <br />
        <strong>Expiration Date: </strong> ${item.expiration_date} <br />
        <strong>Quantity: </strong> ${item.food_group} <br /><br />
      `
      foodItemsContainer.appendChild(foodItemCard);
    };


    return foodItemsContainer.innerHTML;

  };
};
