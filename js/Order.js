Order = function(box) {
  this.box = new box;
};

Order.prototype.newOrder = function(length, width, height, quantity) {
  this.box.receiveDimensions(length, width, height);
  this.quantity = quantity;
};
