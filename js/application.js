$(document).ready(function() {
  console.log('working');
  $('#total-cost, #step-2, #step-3, #step-4').hide();
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
    order.makeSelection(value);
    $('#step-3').show();
  });

  $('#quality').click(function() {
    var value = $("input:radio[name=print-quality]:checked").val();
    order.makeSelection(value);
    $('#step-4').show();
  });

  $('#finish').click(function() {
    $.each($("input:checkbox[name=optional-extras]:checked"), function() {
      var value = $(this).val();
      order.makeSelection(value);
    });
    order.finaliseOrder();
    $('#box-quantity').text(order.quantity);
    $('#box-width').text(order.box.width);
    $('#box-height').text(order.box.height);
    $('#box-length').text(order.box.length);
    $('#order-total-cost').text((order.totalCost).toFixed(2));
    $('#total-cost').show();
  });


});
