describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order(Box);
    order.newOrder(0.1,0.2,0.3,1);
  });

  it("should be able to receive an order of a box", function() {
    expect(order.box.surfaceArea).toEqual(0.22);
  });

  it("should be able to receive an order of a specified quantity", function() {
    expect(order.quantity).toEqual(1);
  });

  describe("selecting cardboard grade", function() {

    it("should be able to select a cardboard grade of grade A", function() {
      order.selectGrade("A");
      expect(order.selections["Grade"]).toEqual("A");
    });

    it("should be able to select a cardboard grade of grade B", function() {
      order.selectGrade("B");
      expect(order.selections["Grade"]).toEqual("B");
    });

    it("should be able to select a cardboard grade of grade C", function() {
      order.selectGrade("C");
      expect(order.selections["Grade"]).toEqual("C");
    });

    it("should not allow grade C selected if box is more than 2M^2", function() {
      var order2 = new Order(Box);
      order2.newOrder(2,2,2,1);
      expect(function(){order2.selectGrade("C");}).toThrow("Must be less than 2M^2");
    });

  });

  describe("selecting print quality", function() {

    it("should be able to select 3 colour print quality", function() {
      order.selectQuality("3-color");
      expect(order.selections["Quality"]).toEqual("3-color");
    });

    it("should be able to select 2 colour print quality", function() {
      order.selectQuality("2-color");
      expect(order.selections["Quality"]).toEqual("2-color");
    });

    it("should be able to select Black only print quality", function() {
      order.selectQuality("black-only");
      expect(order.selections["Quality"]).toEqual("black-only");
    });

    it("should be able to select no printing", function() {
      order.selectQuality("no-printing");
      expect(order.selections["Quality"]).toEqual("no-printing");
    });

    it("should trigger discount if fantasticboxco branding is selected", function() {
      order.selectQuality("FantasticBoxCo-branding");
      expect(order.isDiscounted).toBe(true);
    });

  });

  describe("selecting optional extras", function() {

    beforeEach(function() {
      order.selectGrade("A");
    });

    it("should be able to add handles", function() {
      order.selectExtras("handles");
      expect(order.selections["Extras"]).toEqual(["handles"]);
    });

    it("should be able to add a reinforced bottom", function() {
      order.selectExtras("reinforced-bottom");
      expect(order.selections["Extras"]).toEqual(["reinforced-bottom"]);
    });

    it("should be able to add both extras", function() {
      order.selectExtras("handles");
      order.selectExtras("reinforced-bottom");
      expect(order.selections["Extras"]).toEqual(["handles","reinforced-bottom"]);
    });

    it("should be able to tell when optional extras have been added", function() {
      order.selectExtras("handles");
      expect(order.isOptionalExtras()).toBe(true);
    });

    it("should not be able to add reinforced bottom unless grade A cardboard is selected", function() {
      order.selectGrade("B");
      expect(function(){order.selectExtras("reinforced-bottom");}).toThrow("Only available for A Grade cardboard");
    });

  });

  describe("completing an order", function() {

    beforeEach(function() {
      order = new Order(Box);
      order.newOrder(1,2,3,2);
    });

    it("should correctly calculate the unit cost with no optional extras", function() {
      order.selectGrade("A");
      order.selectQuality("3-color");
      order.finaliseOrder();
      expect(order.unitCost).toEqual(8.80);
    });

    it("should correctly calculate the total cost with no optional extras", function() {
      order.selectGrade("A");
      order.selectQuality("3-color");
      order.finaliseOrder();
      expect(order.totalCost).toEqual(17.6);
    });

    it("should correctly calculate the total cost with optional extras", function() {
      order.selectGrade("A");
      order.selectQuality("3-color");
      order.selectExtras("handles");
      order.selectExtras("reinforced-bottom");
      order.finaliseOrder();
      expect(order.totalCost).toEqual(17.9);
    });

    it("should correctly calculate the total cost if there is a discount", function() {
      order.selectGrade("A");
      order.selectQuality("FantasticBoxCo-branding");
      order.selectExtras("handles");
      order.selectExtras("reinforced-bottom");
      order.finaliseOrder();
      console.log(order.unitCost);
      expect(order.totalCost).toEqual(8.64);
    });

  });

  it("should correctly convert the input name for display purposes", function() {
    expect(order.nameConverter("A")).toEqual("A Grade");
  });


 });
