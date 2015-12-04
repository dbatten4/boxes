$(document).ready(function() {
  $('#total-cost, #step-2, #step-3, #step-4, #optional-extras, #optional-extra-1, #step-extras-handles, #step-extras-reinforced').hide();
  order = new Order(Box);

  $('#dimensions').click(function() {
    var width = parseFloat($('#width').val());
    var height = parseFloat($('#height').val());
    var length = parseFloat($('#length').val());
    var quantity = parseFloat($('#quantity').val());
    order.newOrder(length, width, height, quantity);
    $('#step-box-width').text(width + 'm');
    $('#step-box-height').text(height + 'm');
    $('#step-box-length').text(length + 'm');
    $('#step-box-quantity').text(quantity);
    $('.step-1').removeClass('is-active');
    $('.step-2').addClass('is-active');
    $('#step-2').show();
  });

  $('#grade').click(function() {
    var value = $('input:radio[name=cardboard-grade]:checked').val();
    order.selectGrade(value);
    $('#step-cardboard-grade').text(value);
    $('.step-2').removeClass('is-active');
    $('.step-3').addClass('is-active');
    $('#step-3').show();
  });

  $('#quality').click(function() {
    var value = $('input:radio[name=print-quality]:checked').val();
    order.selectQuality(value);
    $('#step-print-quality').text(order.nameConverter(value));
    $('.step-3').removeClass('is-active');
    $('.step-4').addClass('is-active');
    $('#step-4').show();
  });

  $('#finish').click(function() {
    $('.step-4').removeClass('is-active');
    $('.step-total-cost').addClass('is-active');
    $.each($('input:checkbox[name=optional-extras]:checked'), function() {
      var value = $(this).val();
      order.selectExtras(value);
      if(value === 'handles') {
        $('#step-extras-handles').show();
      };
      if(value === 'reinforced-bottom') {
        $('#step-extras-reinforced').show();
      };
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
    $('#box-cardboard-grade').text(order.nameConverter(order.selections['Grade']));
    $('#box-print-quality').text(order.nameConverter(order.selections['Quality']));
  };

  updateOptionalExtrasText = function() {
    $('#optional-extras').show();
    for(var i = 0; i < order.selections['Extras'].length; i++) {
      $('#optional-extra-' + i).text(order.nameConverter(order.selections['Extras'][i]));
      $('#optional-extra-' + i).show();
    };
  };


});
