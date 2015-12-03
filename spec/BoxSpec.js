describe("Box", function() {

  var box;

  beforeEach(function() {
    box = new Box();
  });

  it("should have a length", function() {
    box.receiveDimensions(1,2,3);
    expect(box.length).toEqual(1);
  });

  it("should have a width", function() {
    box.receiveDimensions(1,2,3);
    expect(box.width).toEqual(2);
  });

  it("should have a height", function() {
    box.receiveDimensions(1,2,3);
    expect(box.height).toEqual(3);
  });

  it("should be able to calculate the surface area", function() {
    box.receiveDimensions(1,2,3);
    expect(box.surfaceArea).toEqual(22);
  });

});
