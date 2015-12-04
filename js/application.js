$(document).ready(function() {
  $('#total-cost, #step-2, #step-3, #step-4, #optional-extras, #optional-extra-1').hide();
  order = new Order(Box);

  $('#dimensions').click(function() {
    var width = $('#width').val();
    var height = $('#height').val();
    var length = $('#length').val();
    var quantity = $('#quantity').val();
    order.newOrder(length, width, height, quantity);
    $('#step-2').show();
  });

  $('#grade').click(function() {
    var value = $("input:radio[name=cardboard-grade]:checked").val();
    order.selectGrade(value);
    $('#step-3').show();
  });

  $('#quality').click(function() {
    var value = $("input:radio[name=print-quality]:checked").val();
    order.selectQuality(value);
    $('#step-4').show();
  });

  $('#finish').click(function() {
    $.each($("input:checkbox[name=optional-extras]:checked"), function() {
      var value = $(this).val();
      order.selectExtras(value);
    });
    order.finaliseOrder();
    updateBreakDownText();
    $('#total-cost').show();
  });

  updateBreakDownText = function() {
    updateDimensionsText();
    updateSelectionsText();
    if(order.isOptionalExtras()){
      updateOptionalExtrasText();
    };
    $('#order-total-cost').text((order.totalCost).toFixed(2));
  };

  updateDimensionsText = function() {
    $('#box-quantity').text(order.quantity);
    $('#box-width').text(order.box.width);
    $('#box-height').text(order.box.height);
    $('#box-length').text(order.box.length);
  };

  updateSelectionsText = function() {
    $('#box-cardboard-grade').text(order.nameConverter(order.selections["Grade"]));
    $('#box-print-quality').text(order.nameConverter(order.selections["Quality"]));
  };

  updateOptionalExtrasText = function() {
    $('#optional-extras').show();
    for(var i = 0; i < order.selections["Extras"].length; i++) {
      $('#optional-extra-' + i).text(order.nameConverter(order.selections["Extras"][i]));
      $('#optional-extra-' + i).show();
    };
  };


});
