Box = function() {};

Box.prototype.receiveDimensions = function(length, width, height) {
  this.length = length;
  this.width = width;
  this.height = height;
  return this.calculateSurfaceArea();
};

Box.prototype.calculateSurfaceArea = function() {
  var l = this.length;
  var w = this.width;
  var h = this.height;
  return this.surfaceArea = 2 * (l*w + w*h + l*h);
};
