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
      'name': e.target.elements['name'][0].value,
      'capacity': e.target.elements['capacity'].value,
      'food_items_attributes': {
        'name': e.target.elements['name'][1].value,
        'foodGroup': e.target.elements['foodGroup'].value,
        'expiration_date': e.target.elements['expiration_date'].value,
        'quantity': e.target.elements['quantity'].value
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
