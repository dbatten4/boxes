describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order(Box);
    order.newOrder(0.1,0.2,0.3,1);
  });

  it("should be able to receive an order of a box", function() {
    expect(order.box.dimensions).toEqual([0.1,0.2,0.3]);
  });

  it("should be able to receive an order of a specified quantity", function() {
    expect(order.quantity).toEqual(1);
  });

  it("should be able to select a cardboard grade of grade A", function() {
    order.selectCardBoardGrade("A Grade");
    expect(order.priceSelections).toEqual(["A Grade"]);
  });

  it("should be able to select a cardboard grade of grade B", function() {
    order.selectCardBoardGrade("B Grade");
    expect(order.priceSelections).toEqual(["B Grade"]);
  });

  it("should be able to select a cardboard grade of grade C", function() {
    order.selectCardBoardGrade("C Grade");
    expect(order.priceSelections).toEqual(["C Grade"]);
  });

  it("should not allow grade C selected if box is more than 2M^2", function() {
    var order2 = new Order(Box);
    order2.newOrder(1,2,3,4,1);
    expect(function(){order2.selectCardBoardGrade("C Grade");}).toThrow("Must be less than 2M^2");
  });

});
