describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order(Box);
  });

  it("should be able to receive an order of a box", function() {
    order.newOrder(1,2,3,1);
    expect(order.box.dimensions).toEqual([1,2,3]);
  });

  it("should be able to receive an order of a specified quantity", function() {
    order.newOrder(1,2,3,4);
    expect(order.quantity).toEqual(4);
  });

});
