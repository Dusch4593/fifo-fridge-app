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
    debugger;
    let data = {
      'name': e.target.name[0].value,
      'capacity': parseInt(e.target.capacity.value),
      'food_items_attributes': [{
        'name': e.target.name[1].value,
        'food_group': e.target.food_group.value,
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
        debugger;
        const {name, capacity, food_items} = fridge;
        new Fridge(name, capacity, food_items);
        document.getElementById('fridge-form').reset();
      })
  };
};
