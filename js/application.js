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


});
