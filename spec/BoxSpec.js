describe("Box", function() {

  var box;

  beforeEach(function() {
    box = new Box();
  });

  it("should have a length, width and height", function() {
    box.receiveDimensions(1,2,3);
    expect(box.dimensions).toEqual([1,2,3]);
  });

  it("should be able to calculate the surface area", function() {
    box.receiveDimensions(1,2,3);
    expect(box.surfaceArea).toEqual(22);
  });

});
