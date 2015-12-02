Order = function(box) {
  this.box = new box;
  this.selections = [];
  this.optionalExtras = [];
  this.isDiscounted = false;
};

var PRICE_OPTIONS = {
  "A Grade": 0.2, "B Grade": 0.1, "C Grade": 0.05,
  "3 colours": 0.2, "2 colours": 0.1, "Black only": 0.05, "No printing": 0.00, "FantasticBoxCo branding": 0.00,
  "Handles": 0.1, "Reinforced bottom": 0.05
};

var DISCOUNT = 0.95;

Order.prototype.newOrder = function(length, width, height, quantity) {
  this.box.receiveDimensions(length, width, height);
  return this.quantity = quantity;
};

Order.prototype.makeSelection = function(selection) {
  this.errorChecking(selection);
  if(selection == "FantasticBoxCo branding") { this.isDiscounted = true }
  if(selection == "Handles" || selection == "Reinforced bottom") {
    this.optionalExtras.push(selection);
  } else {
    return this.selections.push(selection);
  };
};

Order.prototype.finaliseOrder = function() {
  var surfaceArea = this.box.surfaceArea;
  var total = 0;
  var optionsTotal = 0;
  for(var i = 0; i < this.selections.length; i++) {
    total += surfaceArea * PRICE_OPTIONS[this.selections[i]];
  };
  this.unitCost = parseFloat(total.toFixed(2));
  if(this.optionalExtras.length > 0) {
    for(var i = 0; i < this.optionalExtras.length; i++) {
      optionsTotal += this.quantity * PRICE_OPTIONS[this.optionalExtras[i]];
    };
  };
  this.totalCost = this.unitCost * this.quantity + parseFloat(optionsTotal.toFixed(2));
  if(this.isDiscounted) {
    this.totalCost = parseFloat((this.totalCost * DISCOUNT).toFixed(2));
  };
};

Order.prototype.errorChecking = function(selection) {
  if(selection == "C Grade" && this.box.surfaceArea > 2) {
    throw "Must be less than 2M^2"
  };
  if(selection == "Reinforced bottom" && !(this.selections.indexOf("A Grade") > -1)) {
    throw "Only available for A Grade cardboard";
  };
};
