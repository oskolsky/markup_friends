(function($){
	$.fn.defaultInputs = function (options) {
		var defaults = {
			initial:'Введите текст'
		};
		var opts = $.extend(defaults, options);
		
		return this.each(function () {
			$(this).val(opts.initial);
			$(this).click(function(){
					if ($(this).val() == opts.initial) {
						$(this).val('').css({'color':'#000'});
					}
				})
				.blur(function() {
					if ($(this).val() == '') {
						$(this).val(opts.initial).css({'color':'#999'});
					}
				});
		});
  };
})(jQuery);