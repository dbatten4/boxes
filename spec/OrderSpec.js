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

  describe("selecting cardboard grade", function() {

    it("should be able to select a cardboard grade of grade A", function() {
      order.makeSelection("A");
      expect(order.selections).toEqual(["A"]);
    });

    it("should be able to select a cardboard grade of grade B", function() {
      order.makeSelection("B");
      expect(order.selections).toEqual(["B"]);
    });

    it("should be able to select a cardboard grade of grade C", function() {
      order.makeSelection("C");
      expect(order.selections).toEqual(["C"]);
    });

    it("should not allow grade C selected if box is more than 2M^2", function() {
      var order2 = new Order(Box);
      order2.newOrder(1,2,3,4,1);
      expect(function(){order2.makeSelection("C");}).toThrow("Must be less than 2M^2");
    });

  });

  describe("selecting print quality", function() {

    beforeEach(function() {
      order.makeSelection("A");
    });

    it("should be able to select 3 colour print quality", function() {
      order.makeSelection("3-colour");
      expect(order.selections).toEqual(["A", "3-colour"]);
    });

    it("should be able to select 2 colour print quality", function() {
      order.makeSelection("2-colour");
      expect(order.selections).toEqual(["A", "2-colour"]);
    });

    it("should be able to select Black only print quality", function() {
      order.makeSelection("black-only");
      expect(order.selections).toEqual(["A", "black-only"]);
    });

    it("should be able to select no printing", function() {
      order.makeSelection("no-printing");
      expect(order.selections).toEqual(["A", "no-printing"]);
    });

    it("should trigger discount if fantasticboxco branding is selected", function() {
      order.makeSelection("FantasticBoxCo-branding");
      expect(order.isDiscounted).toBe(true);
    });

  });

  describe("selecting optional extras", function() {

    it("should be able to add handles", function() {
      order.makeSelection("A");
      order.makeSelection("3-colour");
      order.makeSelection("handles");
      expect(order.optionalExtras).toEqual(["handles"]);
    });

    it("should be able to add a reinforced bottom", function() {
      order.makeSelection("A");
      order.makeSelection("3-colour");
      order.makeSelection("reinforced-bottom");
      expect(order.optionalExtras).toEqual(["reinforced-bottom"]);
    });

    it("should not be able to add reinforced bottom unless grade A cardboard is selected", function() {
      order.makeSelection("B");
      order.makeSelection("3-colour");
      expect(function(){order.makeSelection("reinforced-bottom");}).toThrow("Only available for A Grade cardboard");
    });

  });

  describe("completing an order", function() {

    beforeEach(function() {
      order.makeSelection("A");
    });

    it("should correctly calculate the unit cost with no optional extras", function() {
      order.makeSelection("3-colour");
      order.finaliseOrder();
      expect(order.unitCost).toEqual(0.09);
    });

    it("should correctly calculate the total cost with no optional extras", function() {
      var order2 = new Order(Box);
      order2.newOrder(0.1,0.2,0.3,3);
      order2.makeSelection("A");
      order2.makeSelection("3-colour");
      order2.finaliseOrder();
      expect(order2.totalCost).toEqual(0.27);
    });

    it("should correctly calculate the total cost with optional extras", function() {
      order.makeSelection("3-colour");
      order.makeSelection("handles");
      order.makeSelection("reinforced-bottom");
      order.finaliseOrder();
      expect(order.totalCost).toEqual(0.24);
    });

    it("should correctly calculate the total cost if there is a discount", function() {
      order.makeSelection("FantasticBoxCo-branding");
      order.finaliseOrder();
      expect(order.totalCost).toEqual(0.04);
    });

  });


 });
