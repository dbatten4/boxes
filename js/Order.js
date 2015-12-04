Order = function(box) {
  this.box = new box;
  this.isExtras = false;
  this.selections = {
    "Extras": []
  };
};

var PRICE_OPTIONS = {
  "A": 0.2, "B": 0.1, "C": 0.05,
  "3-color": 0.2, "2-color": 0.1, "black-only": 0.05, "no-printing": 0.00, "FantasticBoxCo-branding": 0.00,
  "handles": 0.1, "reinforced-bottom": 0.05
};
var NAME_CONVERSIONS = {
  "A": "A Grade", "B": "B Grade", "C": "C Grade",
  "3-color": "3 colours", "2-color": "2 colours", "black-only": "Black only",
  "no-printing": "No printing", "FantasticBoxCo-branding": "FantasticBoxCo branding",
  "handles": "Handles", "reinforced-bottom": "Reinforced bottom"
};
var DISCOUNT = 0.95;

Order.prototype.newOrder = function(length, width, height, quantity) {
  this.dimensionsErrorCheck(length, width, height, quantity);
  this.box.receiveDimensions(length, width, height);
  return this.quantity = quantity;
};

Order.prototype.selectGrade = function(selection) {
  this.gradeErrorCheck(selection);
  return this.selections["Grade"] = selection;
};

Order.prototype.selectQuality = function(selection) {
  if(selection == "FantasticBoxCo-branding") { this.isDiscounted = true }
  return this.selections["Quality"] = selection;
};

Order.prototype.selectExtras = function(selection) {
  this.extrasErrorCheck(selection);
  this.isExtras = true;
  return this.selections["Extras"].push(selection);
};

Order.prototype.finaliseOrder = function() {
  this.calculateUnitCost();
  var totalCost = this.unitCost * this.quantity;
  totalCost = this.extasCondition(totalCost);
  if(this.isDiscounted) { totalCost = totalCost * DISCOUNT };
  return this.totalCost = parseFloat(totalCost.toFixed(2));
};

Order.prototype.calculateUnitCost = function() {
  var surfaceArea = this.box.surfaceArea;
  this.unitCost = 0;
  this.unitCost += surfaceArea * PRICE_OPTIONS[this.selections["Grade"]];
  this.unitCost += surfaceArea * PRICE_OPTIONS[this.selections["Quality"]];
  return this.unitCost;
};

Order.prototype.extasCondition = function(totalCost) {
  if(this.selections["Extras"].length > 0) {
    totalCost = this.calculateExtrasCost(totalCost);
  };
  return totalCost;
};

Order.prototype.calculateExtrasCost = function(totalCost) {
  for(var i = 0; i < this.selections["Extras"].length; i++) {
    totalCost += this.quantity * PRICE_OPTIONS[this.selections["Extras"][i]];
  };
  return totalCost;
};

Order.prototype.dimensionsErrorCheck = function(length, width, height, quantity) {
  if(length === 0 || width === 0 || height === 0 || quantity === 0) {
    var errorMessage = "Must not have a 0";
    alert(errorMessage);
    throw errorMessage;
  };
};

Order.prototype.gradeErrorCheck = function(selection) {
  if(selection == "C" && this.box.surfaceArea > 2) {
    var errorMessage = "Must be less than 2M^2"
    window.alert(errorMessage);
    throw errorMessage;
  };
};

Order.prototype.extrasErrorCheck = function(selection) {
  if(selection == "reinforced-bottom" && this.selections["Grade"] != "A") {
    var errorMessage = "Only available for A Grade cardboard";
    window.alert(errorMessage);
    throw errorMessage;
  };
  if(this.selections["Extras"].indexOf(selection) > -1) {
    throw "Already added";
  };
};

Order.prototype.nameConverter = function(input) {
  return output = NAME_CONVERSIONS[input];
};

Order.prototype.isOptionalExtras = function() {
  return this.isExtras;
};
