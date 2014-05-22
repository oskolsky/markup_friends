(function($){
	$.fn.quantifier = function (options) {
		var defaults = {
			
		};
		var opts = $.extend(defaults, options);
		
		return this.each(function () {
			var $that = $(this);
			$(this).wrap('<div class="holder-qnt"/>');
			$plus = $('<a class="qnt_bt_more" title="Больше"/>').click(function(){
				var v = parseInt($that.val());
				$that.val( (v != NaN) ? v + 1 : 1);
				$that.trigger('change');
			});
			$minus = $('<a class="qnt_bt_less" title="Меньше"/>').click(function(){
				var v = parseInt($that.val());
				v = ( (v != NaN) ? v : 1);
				if (v > 1){
					$that.val(v - 1);
				}else{
					$that.val(1);
				}
				$that.trigger('change');				
			});

			$(this).before($minus);
			$(this).after($plus);

		});
  };
  $.fn.remover = function (options) {
		var defaults = {
			
		};
		var opts = $.extend(defaults, options);
		
		return this.each(function () {
			var $that = $(this);
			if ($(this).siblings('td.buying-name').length != 0) {
			$del = $('.qnt_bt_del', this).click(function(e){
				e.preventDefault();
				var $parent = $(this).parents('tr').find('td');
				$parent.animate({'opacity':0}, 800, function(){
					$parent.remove();
				});
			});
			$(this).append($del);
			}
		});
  };  
})(jQuery);