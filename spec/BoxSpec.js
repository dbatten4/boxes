describe("Box", function() {
 
  it("should have a length, width and height", function() {
    var box = new Box(1,2,3);
    expect(box.dimensions).toEqual([1,2,3]);
  });

});
