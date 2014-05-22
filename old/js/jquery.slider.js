(function($){
	$.fn.contentSlider = function (options) {

	
	return this.each(function () {
		var el = this;					   
		var defaults = {
			'visibleItems' : 4
		};
	var opts = $.extend(defaults, options);						   
							   
	var itemCount = $(".scroll-content>li", this).length;
	var scrollPane = $('.scroll-pane', this);
	var scrollContent = $('.scroll-content', this);
	var fullWidth = 0;
	var itemWidth = 100;
			
	$('.scroll-content>li', this).each(function(i) {
		fullWidth = fullWidth + parseInt($(this).outerWidth(true));
		itemWidth = parseInt($(this).outerWidth(true));
		
	});
	scrollPane.css("width", opts.visibleItems * itemWidth);
	scrollContent.css("width", fullWidth + 'px');

		var scrollbar = $( ".scroll-bar", this ).slider({
			max: itemCount - opts.visibleItems,
			step:1,
			value: 0,
			start : function(event, ui) {
				start = ui.value;
			},
		 change: function( event, ui ) {
				scrollContent.stop().animate({"margin-left" : Math.round(-1 * ui.value * itemWidth) + 'px'}, 300);					
			}
		});
		
		var handleHelper = scrollbar.find( ".ui-slider-handle" )
		.mousedown(function() {
			scrollbar.width( handleHelper.width() );
		})
		.mouseup(function() {
			scrollbar.width( "100%" );
		})
		.append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
		.wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();

		scrollPane.css( "overflow", "hidden" );

		function sizeScrollbar() {
			var remainder = scrollContent.width() - scrollPane.width();
			var proportion = remainder / scrollContent.width();
			var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
			scrollbar.find( ".ui-slider-handle" ).css({
				width: handleSize,
				"margin-left": -handleSize / 2
			});
			handleHelper.width( "" ).width( scrollbar.width() - handleSize );
		}
		
		function resetValue() {
			var remainder = scrollPane.width() - scrollContent.width();
			var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
				parseInt( scrollContent.css( "margin-left" ) );
			var percentage = Math.round( leftVal / remainder * 100 );
			scrollbar.slider( "value", percentage );
		}

		function reflowContent() {
				var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
				var gap = scrollPane.width() - showing;
				if ( gap > 0 ) {
					scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
				}
		}
		
		function slideLeft(){	
			scrollbar.slider("value",scrollbar.slider("value") - scrollbar.slider("option","step"));
			$('.bt-scroll-right',el).removeClass('disabled');
			if (scrollbar.slider("value") == 0){$('.bt-scroll-left',el).addClass('disabled');};
			return false;
		}
		function slideRight(){				
				scrollbar.slider("value",scrollbar.slider("value") + scrollbar.slider("option","step"));	
				$('.bt-scroll-left',el).removeClass('disabled');
				if (scrollbar.slider("value") == scrollbar.slider('option', 'max')){$('.bt-scroll-right',el).addClass('disabled');};
				return false;
		}
								
		var stepLeft=jQuery('<a class="bt-scroll-left">◀</a>')
			.addClass('disabled')
			.hover(function(e){
				e.preventDefault();				
				var $this = $(this);
				scrolling = setInterval(function(){
					slideLeft();
				}, 1000)				 
			},
			function(){
				clearInterval(scrolling);
			}
		).click(function(e){
			e.preventDefault();
			clearInterval(scrolling);
			slideLeft();
		});
						

		var stepRight=jQuery('<a class="bt-scroll-right">▶</a>')
			.hover(function(e){
				e.preventDefault();
				var $this = $(this);
				scrolling = setInterval(function(){
					slideRight();
				}, 1000)				 
			},
			function(){
				clearInterval(scrolling);
			}			
		).click(function(e){
			e.preventDefault();
			clearInterval(scrolling);
			slideRight();
		});
		


		scrollPane.after(stepLeft);
		scrollPane.after(stepRight);

		
		$(window).resize(function() {
			resetValue();
			sizeScrollbar();
			reflowContent();
		});

		setTimeout( sizeScrollbar, 10 );//safari wants a timeout
	});
	};

})(jQuery);