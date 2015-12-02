Order = function(box) {
  this.box = new box;
  this.selections = [];
  this.isDiscounted = false;
};

var PRICE_OPTIONS = [
  {"A Grade": 0.2, "B Grade": 0.1, "C Grade": 0.05},
  {"3 colours": 0.2, "2 colours": 0.1, "Black only": 0.05, "No printing": 0.00, "FantasticBoxCo branding": 0.00},
  {"Handles": 0.1, "Reinforced bottom": 0.05}
];

var DISCOUNT = 0.95;

Order.prototype.newOrder = function(length, width, height, quantity) {
  this.box.receiveDimensions(length, width, height);
  return this.quantity = quantity;
};

Order.prototype.makeSelection = function(selection) {
  if(selection == "C Grade" && this.box.surfaceArea > 2) {
    throw "Must be less than 2M^2"
  }
  if(selection == "Reinforced bottom" && !(this.selections.indexOf("A Grade") > -1)) {
    throw "Only available for A Grade cardboard";
  };
  if(selection == "FantasticBoxCo branding") { this.isDiscounted = true }
  return this.selections.push(selection);
};


