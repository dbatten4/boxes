Box = function() {
};

Box.prototype.receiveDimensions = function(length, width, height) {
  return this.dimensions = [length, width, height];
};

Box.prototype.calculateSurfaceArea = function() {
  var l = this.dimensions[0];
  var w = this.dimensions[1];
  var h = this.dimensions[2];
  return this.surfaceArea = 2 * ( l*w + w*h + l*h);
};
