$(function() {

  // .. LOAD NEW MATERIALS
  $('.load-more').click(function() {
    var _this = this,
         feed = $(this).data('feed');

    $.ajax({
      url: '/data/' + $(_this).attr('rel') + '.html',
      data: {},
      success: function(response) {
        var $response = $(response);
        $response.length > 0 ? $('.' + feed).append( $response ) : $(_this).remove();
      
        $('.rateit-feedback:not(.active)').each(function(){
          var val = $(this).attr('aria-valuenow');
          $(this).rateit({ max: 5, step:1, value:val, min:0, resetable :false, readonly:true, starwidth:13});
        })
        
        $('.rateit-feedback.active').each(function(){
          var val = $(this).attr('aria-valuenow');
          var backing = $(this).prev('input');
          $(this).rateit({ max: 5, step:1, min:0, resetable:false, backingfld: backing, starwidth:13}).rateit("value", val);
        })  

      },
      error: function() {
        alert('Error load materials');
      }
    });

    return false;
  });

});