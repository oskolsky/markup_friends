(function($) {

  //****************************************************************************************************
  //
  // .. STICKY FOOTER
  //
  //****************************************************************************************************
  $.fn.stickyFooter = function() {
    if (this.length > 0) {
      var
        $page = $('#page'),
        $main = $('#main'),
        $footer = this,
        footerHeight = $footer.outerHeight();
     
      $page.css({'position': 'relative', 'min-height': '100%'});
      $main.css({'padding-bottom': footerHeight + 'px'});
      $footer.css({'position': 'absolute', 'right': '0', 'bottom': '0', 'left': '0', 'z-index': '999'});
     
      return this;
    }
  };



  //****************************************************************************************************
  //
  // .. RESIZE TO MAX-WIDTH/HEIGHT
  // .. $(el).resizeToMaxWidth();
  //
  //****************************************************************************************************
  $.fn.maxWidth = function() {
    var max = 0;
    this.each(function() { max = Math.max(max, $(this).outerWidth()); });
    return max;
  };

  $.fn.maxHeight = function() {
    var max = 0;
    this.each(function() { max = Math.max(max, $(this).outerHeight()); });
    return max;
  };

  $.fn.resizeToMaxWidth = function() { this.css({width: this.maxWidth() + 'px'}); return this; };
  $.fn.resizeToMaxHeight = function() { this.css({height: this.maxHeight() + 'px'}); return this; };



  //****************************************************************************************************
  //
  // .. GET ARRAY OF HEIGHTS
  // .. var heightsMap = $(el).heightsMap();
  //
  //****************************************************************************************************
  $.fn.heightsMap = function() {
    return this.map(function() {
      var _this = this;
      return {el: _this, height: $(_this).outerHeight()};
    });
  };

})(jQuery);