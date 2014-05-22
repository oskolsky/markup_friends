;(function(){
$.fn.customRadioCheckbox = function(options) {
  var defaults = {
 	 parent: false
  }; 
  var opts = $.extend(defaults, options);
		
  return this.each(function() {
 
    var $this = $(this);
    //var $span = $('<span/>');
 	var $label = $(this).next('label');
    $label.addClass('custom-'+ ($this.is(':checkbox') ? 'check' : 'radio'));
    $this.is(':checked') && $label.addClass('checked'); // init
    //$span.insertAfter($this);
 
    $label.attr('onclick', ''); // Fix clicking label in iOS
    // hide by shifting left
    $this.css({ position: 'absolute', left: '-9999px' });
 
    // Events
    $this.bind({
      change: function() {
        if ($this.is(':radio')) {
			if (opts.parent)
			  $this.parents(opts.parent).find('.custom-radio').removeClass('checked');
			else
	          $this.parent().find('.custom-radio').removeClass('checked');
        }
        $label.toggleClass('checked', $this.is(':checked'));
      },
      focus: function() { $label.addClass('focus'); },
      blur: function() { $label.removeClass('focus'); }
    });
  });
};
}());