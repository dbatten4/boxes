$(document).ready(function() {
  console.log('working');
  order = new Order(Box);

  $('#dimensions').click(function() {
    var width = $('#width').val();
    var height = $('#height').val();
    var length = $('#length').val();
    var quantity = $('#quantity').val();
    order.newOrder(length, width, height, quantity);
  });

  $('#grade').click(function() {
    var value = $("input:radio[name=cardboard-grade]:checked").val();
    order.makeSelection(value);
  });

  $('#quality').click(function() {
    var value = $("input:radio[name=print-quality]:checked").val();
    order.makeSelection(value);
  });

  $('#finish').click(function() {
    $.each($("input:checkbox[name=optional-extras]:checked"), function() {
      var value = $(this).val();
      order.makeSelection(value);
    });
    order.finaliseOrder();
  });


});
