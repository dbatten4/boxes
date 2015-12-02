Order = function(box) {
  this.box = new box;
};

Order.prototype.newOrder = function(length, width, height) {
  this.box.receiveDimensions(length, width, height);
};
