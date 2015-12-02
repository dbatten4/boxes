Order = function(box) {
  this.box = new box;
  this.priceSelections = [];
};

var PRICE_OPTIONS = [
  {"A Grade": 0.2, "B Grade": 0.1, "C Grade": 0.05},
  {"3 colours": 0.2, "2 colours": 0.1, "Black only": 0.05, "No printing": 0.00},
  {"Handles": 0.1, "Reinforced bottom": 0.05}
];

Order.prototype.newOrder = function(length, width, height, quantity) {
  this.box.receiveDimensions(length, width, height);
  return this.quantity = quantity;
};

Order.prototype.selectCardBoardGrade = function(selection) {
  if(selection === "C Grade" && this.box.surfaceArea > 2) { 
    throw "Must be less than 2M^2"
  }
  return this.priceSelections.push(selection);
};
