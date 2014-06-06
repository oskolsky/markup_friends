$(function() {

    $('[data-load]').click(function() {
    
        var _this = this;
        var feed  = $(_this).data('feed');
        
        $feed = typeof feed == 'undefined' ? $(_this).closest('.section').find('.feed') : $(_this).siblings(feed);

        $(_this).find('span').hide();
        $(_this).find('.fa').css({display: 'inline-block'});

        if (!FeedLoader.inProgress) {
            
            FeedLoader.startAnimation(_this);

            $.ajax({
                url: $(_this).data('load'),
                data: {},
                success: function(response) {
                    var $response = $(response);
                    FeedLoader.stopAnimation(function() {
                        if ($response.length > 0) {
                            $feed.append($response).imagesLoaded( function() {
                                $response.find('.product').resizeToMaxHeight();
                                $(_this).find('span').show();
                                $(_this).find('.fa').hide();

                                //
                                // .. Sticky
                                // .. https://github.com/leafo/sticky-kit
                                //
                                $('#sidebar').trigger('sticky_kit:recalc');
                                $('#header').trigger('sticky_kit:recalc');
                            });
                        } else {
                            $(_this).remove();
                        }
                    });
                },
                error: function() {
                    FeedLoader.stopAnimation(function() {
                        alert('Error load materials');
                    });
                }
            });
        }

        return false;
    });

});

var FeedLoader = {

    inProgress: false,
    callback: null,

    startAnimation: function(el) {
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.scheduleAnimation(el);
    },

    scheduleAnimation: function(el) {
        var _this = this;
        $(el).find('.fa').animate({borderSpacing: 360}, {
            step: function(now, fx) {
                $(this).css('-webkit-transform','rotate(' + now + 'deg)');
                $(this).css('-moz-transform','rotate(' + now + 'deg)');
                $(this).css('-ms-transform','rotate(' + now + 'deg)');
                $(this).css('-o-transform','rotate(' + now + 'deg)');
                $(this).css('transform','rotate(' + now + 'deg)');
            },
            duration: 300,
            complete: function() {
                $(this).css('border-spacing', 0);
                if (_this.inProgress) {
                    _this.scheduleAnimation();
                }
                if (_this.callback) {
                    _this.callback();
                    _this.callback = null;
                }
            }
        }, 'linear');
    },

    stopAnimation: function(callback) {
        this.inProgress = false;
        this.callback = callback;
    }

};