class API {
  // render all fridges to the index page
  static loadFridges() {
    fetch(`http://localhost:3000/fridges`)
      .then(res => res.json())
      .then(fridgeData => {
        for(let fridge of fridgeData) {
          const {name, capacity, food_items} = fridge;
          new Fridge(name, capacity, food_items);
      }})
  };

  static addFridge(e) {
    e.preventDefault();
    let data = {
      'name': e.target.name.value,
      'capacity': e.target.capacity.value,
      'food_items_attributes': {
        'name': e.target.food_item.name.value,
        'foodGroup': e.target.food_item.food_group.value,
        'expiration_date': e.target.food_item.expiration_date.value,
        'quantity': e.target.food_item.quantity.value,
        'created_at': e.target.food_item.created_at.value
      }
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
        const {name, capacity} = fridge;
        new Fridge(name, capacity);
        document.getElementById('fridge-form').reset();
      })
  };
};
