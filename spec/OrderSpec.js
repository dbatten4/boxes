describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order(Box);
  });

  it("should be able to receive an order of a box", function() {
    order.newOrder(1,2,3);
    expect(order.box.dimensions).toEqual([1,2,3]);
  });

});
