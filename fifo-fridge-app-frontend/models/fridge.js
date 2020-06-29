class Fridge {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.renderFridge();
  };

  fridgeCardHTML() {
    return `
    <h2>${this.name}</h2>
    <h4>Capacity: ${this.capacity}</h4>
    `
  };

  // delete our fridges

  // render all fridges to the index page
  static loadFridges() {
    fetch(`http://localhost:3000/fridges`)
      .then(res => res.json())
      .then(fridgeData => {
        for(let fridge of fridgeData) {
          let newFridge = new Fridge(fridge.name, fridge.capacity);
      }})
  };



  renderFridge() {
    const fridgeContainer = document.getElementById("fridge-container");
    const fridgeCard = document.createElement("div");
    fridgeCard.setAttribute("class", "fridge-card");
    fridgeCard.id = this.id;
    debugger;
  };
};


// link to a show page and show code
