Order.prototype.makeSelection = function(selection) {
  this.errorChecking(selection);
  if(selection == "FantasticBoxCo-branding") { this.isDiscounted = true }
  if(selection == "handles" || selection == "reinforced-bottom") {
    this.optionalExtras.push(selection);
  } else {
    this.selections.push(selection);
  };
};

Order.prototype.finaliseOrder = function() {
  this.calculateUnitCost();
  this.totalCost = this.unitCost * this.quantity;
  if(this.optionalExtras.length > 0) {
    this.calculateOptionalExtrasCost();
  };
  if(this.isDiscounted) {
    this.totalCost = parseFloat((this.totalCost * DISCOUNT).toFixed(2));
  };
};

Order.prototype.calculateUnitCost = function() {
  var surfaceArea = this.box.surfaceArea;
  var total = 0;
  for(var i = 0; i < this.selections.length; i++) {
    total += surfaceArea * PRICE_OPTIONS[this.selections[i]];
  };
  return this.unitCost = parseFloat(total.toFixed(2));
};

Order.prototype.calculateOptionalExtrasCost = function() {
  var optionsTotal = 0;
  for(var i = 0; i < this.optionalExtras.length; i++) {
    optionsTotal += this.quantity * PRICE_OPTIONS[this.optionalExtras[i]];
  };
  return this.totalCost = this.unitCost * this.quantity + parseFloat(optionsTotal.toFixed(2));
};

Order.prototype.errorChecking = function(selection) {
  if(selection == "C" && this.box.surfaceArea > 2) {
    var errorMessage = "Must be less than 2M^2"
    throw errorMessage;
    window.alert(errorMessage);
  };
  if(selection == "reinforced-bottom" && !(this.selections.indexOf("A") > -1)) {
    var errorMessage =  "Only available for A Grade cardboard";
    throw errorMessage;
    window.alert(errorMessage);
  };
}
