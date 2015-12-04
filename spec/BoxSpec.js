describe("Box", function() {

  var box;

  beforeEach(function() {
    box = new Box();
    box.receiveDimensions(1,2,3);
  });

  it("should have a length", function() {
    expect(box.length).toEqual(1);
  });

  it("should have a width", function() {
    expect(box.width).toEqual(2);
  });

  it("should have a height", function() {
    expect(box.height).toEqual(3);
  });

  it("should be able to calculate the surface area", function() {
    expect(box.surfaceArea).toEqual(22);
  });

});
