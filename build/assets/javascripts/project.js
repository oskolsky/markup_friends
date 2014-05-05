//****************************************************************************************************
//
// .. READY
//
//****************************************************************************************************
$(function() {

    //
    // .. OWL Carousel init
    //
    $('.owl-carousel').each(function() {
        var $owl = $(this);

        $owl.owlCarousel({
            autoWidth: true,
            items: 4,
            loop: false,
            margin: 20,
            merge: true,
            navigation: true,
            navText: false,
            info: setShadow
        });

        function setShadow(i) {
            i.currentPosition == 0 ? $owl.removeClass('__shadow-left') : $owl.addClass('__shadow-left');
            i.currentPosition == (i.allItems - i.items) ? $owl.removeClass('__shadow-right') : $owl.addClass('__shadow-right');
        }

    });

    //
    // .. Content carousel init
    //
    $('.content-carousel').each(function() {
        var 
            _this = this,
            $owl = $(this).find('.content-carousel_slider');

        $owl.owlCarousel({
            items: 1,
            loop: false,
            navigation: true,
            navText: false,
            info: setCounter
        });

        function setCounter(i) {
            $(_this).find('.content-carousel_counter').html((i.currentPosition + 1) + ' из ' + i.allItems);
        }
    });



    //****************************************************************************************************
    //
    // .. SCROLL
    //
    //****************************************************************************************************
    $(window).scroll(function() {});



    //****************************************************************************************************
    //
    // .. RESIZE
    //
    //****************************************************************************************************
    $(window).smartresize(function() {});

});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {});