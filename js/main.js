/*==============================
    Is mobile
==============================*/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

var isBrowser = {
    Chrome: function(){
        if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ){
            return true;
        } else {
            return false;
        }
    },
    Firefox: function(){
        if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
            return true;
        } else {
            return false;
        }
    },
    Opera: function(){
        if( navigator.userAgent.toLowerCase().indexOf('Presto') > -1 ){
            return true;
        } else {
            return false;
        }
    },
    IE: function(){
        if( navigator.userAgent.toLowerCase().indexOf('MSIE') > -1 ){
            alert('ie');
            return true;
        } else {
            return false;
        }
    },
    Safari: function(){
        if( navigator.userAgent.toLowerCase().indexOf('safari') !== -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1){
            return true;
        } else {
            return false;
        }
    },
    any: function(){
        return (isBrowser.Chrome() || isBrowser.Firefox() || isBrowser.Opera() || isBrowser.IE() || isBrowser.Safari());
    }
}

/*==============================
    Main function
==============================*/
function backgroundImage() {
    var databackground = $('[data-background]');
    databackground.each(function() {
        if ($(this).attr('data-background')) {
            var bg = $(this).attr('data-background');
            $(this).css('background-image', 'url(' + bg + ')');
        }
    });
}

function scrollParallax() {
    $('.ac_bg--parallax').each(function() {
        if(isMobile.any()){
            $(this).css('background-attachment', 'scroll');
        } else{
            $(this).parallax("50%", 0.2);
        }
    });
}

function acHeaderResponsive() {
    var header = $('.ac-header'),
        dataMainBg = header.data('main-background'),
        windowWidth = window.innerWidth;

    var menuMobile = $('[class*="ac-header__menu-mobile-"]');

    header.each(function() {
        var el = $(this),
            haschild = $(this).find('.menu-item-has-children'),
            mediascreen = el.find('.ac-header__navigation').data('mobile-breakpoint');

        var numberMenu = $(this).find('.ac-header__mobile-btn').data('id-number');

        if(menuMobile.length == 0 && el.attr('data-bookmark') == undefined) {
            var posNavigation = true;
            if(el.find('.ac-header__left').children('.ac-header__navigation').length !== 0) {
                posNavigation = false;
                el.attr('data-bookmark', posNavigation);
            } else {
                posNavigation = true;
                el.attr('data-bookmark', posNavigation);
            }
        }

        if(windowWidth <= mediascreen) {
            if(numberMenu !== undefined && $(".ac-header__menu-mobile-" + numberMenu).length == 0) {
                $('body').prepend('<div class="ac-header__menu-mobile-' + numberMenu + '" data-number="' + numberMenu + '"></div>');

                // Add Back Button to sub-menu mobile
                var nav = el.find('.ac-header__navigation');
                nav.find('ul.sub-menu').prepend('<li class="nav-back"><a href="#"><i class="fa fa-angle-left"></i>Back</a>');

                // Move navigation to Menu Mobile
                nav.appendTo('.ac-header__menu-mobile-' + numberMenu);

                // Display Mobile Nav Button
                el.find('.ac-header__mobile-btn').addClass('show');

                // Event click Back Button from sub-menu mobile
                $('.nav-back').on('click', function(e){
                    e.preventDefault();
                    $(this).closest('.menu-item-has-children').removeClass('active');
                });

                haschild.children('a:first-child').on('click', function(e){
                    e.preventDefault();
                    $(this).parent().closest('.menu-item-has-children').addClass('active');
                });
            }
        }

        // Check resize height for js-header--overlay
        if(header.length == 1) {
            var headerHeight = header.outerHeight();

            if(header.hasClass('ac-header--2')) {
                header.css('background-color', dataMainBg);

                if(header.next('.js-header--fixed').length == 0) {
                    header.after('<div class="js-header--fixed" style="height:' + headerHeight + 'px;"></div>');
                } else {
                    header.next('.js-header--fixed').css('height', headerHeight);
                }
            } else {
                if(header.prev('.js-header--overlay').length !== 0) {
                    header.prev('.js-header--overlay').css('height', headerHeight);
                }
            }
        } else {
            if(el.hasClass('ac-header--2')) {
                el.css('background-color', dataMainBg);
            }
        }
    });

    if(menuMobile.length !== 0) {
        menuMobile.each(function(){
            var mediascreenResponsive = $(this).find('.ac-header__navigation').data('mobile-breakpoint');
            if(windowWidth > mediascreenResponsive){
                var number = $(this).data('number'),
                    pin = $(this);
                pin.find('.nav-back').remove();

                // Check each header
                header.each(function(){
                    var numberMenu = $(this).find('.ac-header__mobile-btn').data('id-number');

                    if(number == numberMenu){
                        // Find from menu-mobile
                        var nav = pin.find('.ac-header__navigation');
                        if($(this).data('bookmark') == true) {
                            nav.appendTo($(this).find('.ac-header__right'));
                        } else {
                            nav.appendTo($(this).find('.ac-header__left'));
                        }

                        pin.remove();
                        $(this).find('.ac-header__mobile-btn').removeClass('show');
                    }
                });
            }
        });
    }
}

function acHeaderActive() {
    var header = $('.ac-header'),
        pageWrap = $('.ac_page-wrapper');

    // Open Menu Mobile
    $('.ac-header__mobile-btn').on('click', function(e){
        var menuBtn = $(this).data('id-number');
        var menuMobile = $('[class*="ac-header__menu-mobile-"]');

        if($(this).hasClass('mobile-active')){
            $(this).removeClass('mobile-active');
        } else {
            $('.ac-header__mobile-btn').removeClass('mobile-active');
            $(this).addClass('mobile-active');
        }

        menuMobile.each(function(){
            var menuNumber = $(this).data('number');
            if(menuBtn == menuNumber){
                $(this).toggleClass('ac-header__menu-mobile--active');
            } else {
                $(this).removeClass('ac-header__menu-mobile--active');
            }

            if($('body').find('.ac-header__menu-mobile--active').length !== 0){
                pageWrap.addClass('ac-header_mobile--toggle');
                setTimeout(function(){
                    $('html, body').addClass('overflow-hidden');
                }, 290);
            } else {
                pageWrap.removeClass('ac-header_mobile--toggle');
                setTimeout(function(){
                    $('html, body').removeClass('overflow-hidden');
                }, 290);
            }

            // Check if .ac-header outside pageWrap
            if(pageWrap.find('.ac-header').length == 0) {
                $('.ac-header').toggleClass('ac-header_mobile--toggle');

                // Click page-wrap to remove menu
                pageWrap.on('click', function(){
                    $(this).removeClass('ac-header_mobile--toggle');
                    $('.ac-header').removeClass('ac-header_mobile--toggle');
                    $('[class*="ac-header__menu-mobile-"]').removeClass('ac-header__menu-mobile--active');
                    $('.ac-header__mobile-btn').removeClass('mobile-active');
                    $('html, body').removeClass('overflow-hidden');
                });
            }
        });

        // e.stopPropagation();
    });

    // Search Active
    var searchBtn = header.find('.ac-header__search-btn'),
        searchForm = header.find('.ac-header__search-form');
    searchBtn.on('click', function(){
        $(this).toggleClass('active');
        $(this).closest(header).find(searchForm).toggleClass('search-active');
    });
    searchForm.find('.btn-close').on('click', function(){
        $(this).closest(searchForm).removeClass('search-active');
        $(this).closest(header).find(searchBtn).removeClass('active');
    });

    // Disable href '#' from navigation link
    $(".ac-header__navigation a").on("click", function(e){
        if($(this).attr('href') == '#'){
            e.preventDefault();
        }
    });
}

function easingClick(){
    var navLink = $('.ac-header__navigation > ul > li > a'),
        header = $('.ac-header');

    navLink.on('click', function(e){
        if($(this).attr('href') == '#'){
            e.preventDefault();
        } else {
            $('html, body').animate({
                scrollTop: $( $(this).attr('href') ).offset().top
            }, {
                duration: 'slow',
                easing: 'easeInOutCirc'
            });
            setTimeout(function(){
                $('.ac_page-wrapper').removeClass('ac-header_mobile--toggle');
                header.removeClass('ac-header_mobile--toggle');
                $('.ac-header__mobile-btn').removeClass('mobile-active');
                $('[class*="ac-header__menu-mobile-"]').removeClass('ac-header__menu-mobile--active');
                $('html, body').removeClass('overflow-hidden');
            }, 700);
            e.preventDefault();
        }
    });
}

function acHeaderScroll() {
    var header = $('.ac-header'),
        dataScrollingStyle = header.data('scrolling-style'),
        dataMainBg = header.data('main-background');

    if(header.length == 1) {
        // Scroll Style 2
        if(dataScrollingStyle == 'style2') {
            var firstSection = $('.ac_page-wrapper').find('.ac_section.ac_bg:first-child'),
                firstSectionHeight = firstSection.outerHeight();
            // console.log(firstSectionHeight);

            var scrollPos = 0;

            var opRange = 0;

            // Add js-header--overlay
            if(header.prev('.js-header--overlay').length == 0 && !header.hasClass('ac-header--2')) {
                header.before('<div class="js-header--overlay"></div>');
                header.prev('.js-header--overlay').css({
                    'background-color': dataMainBg,
                    'opacity': '0'
                });
            }

            $(window).scroll(function(event){
                var scrollCur = $(this).scrollTop();
                var headerHeight = header.outerHeight();

                if(scrollCur < scrollPos){
                    // console.log('up');
                    if(scrollCur == 0) {
                        header.removeClass('ac-header--scrolling');

                        // Make sure
                        header.prev('.js-header--overlay').css({
                            'height': headerHeight,
                            'opacity': '0'
                        });
                    } else if(scrollCur < (firstSectionHeight - headerHeight)) {
                        opRange = scrollCur/(firstSectionHeight - headerHeight);

                        header.prev('.js-header--overlay').css({
                            'height': firstSectionHeight - scrollCur,
                            'opacity': opRange
                        });
                    } else {
                        // console.log('scrolling up header from bottom to (firstSectionHeight - headerHeight)')
                        header.prev('.js-header--overlay').css({
                            'height': headerHeight
                        });
                    }
                } else {
                    // console.log('down');
                    header.addClass('ac-header--scrolling');
                    if(scrollCur < (firstSectionHeight - headerHeight) && scrollCur > headerHeight) {
                        opRange = scrollCur/(firstSectionHeight - headerHeight);

                        header.prev('.js-header--overlay').css({
                            'height': firstSectionHeight - scrollCur,
                            'opacity': opRange
                        });
                    } else if(scrollCur <= headerHeight) {
                        // console.log('scrolling down header from start to headerHeight');
                        // header.prev('.js-header--overlay').css({
                        //     'height': headerHeight,
                        //     'opacity': '0'
                        // });
                    } else {
                        // Make sure
                        header.prev('.js-header--overlay').css({
                            'height': headerHeight,
                            'opacity': '1'
                        });
                    }
                }

                scrollPos = scrollCur;
            });
        } else {
            // Scrolling Style Default
            var scrollPos = 0;

            $(window).scroll(function(event){
                var scrollCur = $(this).scrollTop();
                var headerHeight = header.outerHeight();

                if(scrollCur < scrollPos){
                    // console.log('up');
                    if(scrollCur == 0) {
                        header.removeClass('ac-header--scrolling ac-header--scrolling-unpin ac-header--scrolling-pin');
                        if(!header.hasClass('ac-header--2')) {
                            header.removeAttr('style');
                        }
                    } else if(scrollCur > 500){
                        header.removeClass('ac-header--scrolling-unpin').addClass('ac-header--scrolling ac-header--scrolling-pin');
                    }
                } else {
                    // console.log('down');
                    if(scrollCur > 500) {
                        header.removeClass('ac-header--scrolling-pin').addClass('ac-header--scrolling-unpin').css('background-color', dataMainBg);
                    }
                }

                scrollPos = scrollCur;
            });
        }
    }
}

function acHeaderScrollResize() {
    var header = $('.ac-header'),
        dataScrollingStyle = header.data('scrolling-style'),
        dataMainBg = header.data('main-background');

    if(header.length == 1) {
        // Scroll Style 2
        if(dataScrollingStyle == 'style2') {
            var firstSection = header.next('.ac_page-wrapper').find('.ac_section.ac_bg:first-child'),
                firstSectionHeight = firstSection.outerHeight();

            var scrollPos = 0;

            var opRange = 0;

            $(window).scroll(function(event){
                var scrollCur = $(this).scrollTop();
                var headerHeight = header.outerHeight();

                if(scrollCur < scrollPos){
                    // console.log('up');
                    if(scrollCur == 0) {
                        header.removeClass('ac-header--scrolling');

                        // Make sure
                        header.prev('.js-header--overlay').css({
                            'height': '0',
                            'opacity': '0'
                        });
                    } else if(scrollCur < (firstSectionHeight - headerHeight)) {
                        opRange = scrollCur/(firstSectionHeight - headerHeight);

                        header.prev('.js-header--overlay').css({
                            'height': firstSectionHeight - scrollCur,
                            'opacity': opRange
                        });
                    } else {
                        header.prev('.js-header--overlay').css({
                            'height': headerHeight
                        });
                    }
                } else {
                    // console.log('down');
                    header.addClass('ac-header--scrolling');
                    if(scrollCur < (firstSectionHeight - headerHeight) && scrollCur > headerHeight) {
                        opRange = scrollCur/(firstSectionHeight - headerHeight);

                        header.prev('.js-header--overlay').css({
                            'height': firstSectionHeight - scrollCur,
                            'opacity': opRange
                        });
                    } else {
                        if(scrollCur >= (firstSectionHeight - headerHeight)) {
                            // Make sure
                            header.prev('.js-header--overlay').css({
                                'height': headerHeight,
                                'opacity': '1'
                            });
                        }
                    }
                }

                scrollPos = scrollCur;
            });
        }
    }
}

function popupVideo() {
    $('.mfp-iframe').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                    // Or null - full URL will be returned
                    // Or a function that should return %id%, for example:
                    // id: function(url) { return 'parsed id'; }

                    src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                },
            },
            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }
    });
}

function popupPortfolio() {
    $('.ac-popup-link').each(function(){
        var link = $(this).attr('href');

        $(this).magnificPopup({
          items: {
              src: link,
              type: 'inline',
          },
          closeOnBgClick: false
        });
    });
}

function fixGradient() {
    var iconbox = $('.ac-iconbox'),
        iconbox_mini = $('.ac-iconbox-mini'),
        counter = $('.ac-counter');

    if(isBrowser.Chrome() == true) {
        iconbox.addClass('gradient');
        iconbox_mini.addClass('gradient');
        counter.addClass('gradient');
    } else {
        iconbox.removeClass('gradient');
        iconbox_mini.removeClass('gradient');
        counter.removeClass('gradient');
    }
}

function acCounter() {
    var counter = $('.ac-counter');

    counter.each(function(){
        var el = $(this).find('.ac-counter__number'),
            dataFrom = el.data('from');
        el.text(dataFrom);

        var waypoint = new Waypoint({
            element: el,
            handler: function(direction) {
                el.countTo({
                    speed: '1500',
                    refreshInterval: 50
                });
                this.destroy();
            },
            offset: function(){
                return Waypoint.viewportHeight() - el.outerHeight() - 100;
            }
        });
    });
}

function acOwlSync() {
    var owlCmt = $('.ac-testimonial__comment'),
        owlPep = $('.ac-testimonial__people'),
        flag = false,
        duration = 300;

    if (owlCmt.length > 0){
        owlCmt.owlCarousel({
            autoplay: false,
            loop: false,
            nav: false,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            dots: false,
            responsive:{
                0:{
                    items: 1
                }
            },
        }).on('changed.owl.carousel', function(e) {
          if (!flag) {
            flag = true;
            owlPep.trigger('to.owl.carousel', [e.item.index, duration, true]);
            owlPep.find('.owl-item').removeClass('current');
            owlPep.find('.owl-item').eq(e.item.index).addClass('current');
            flag = false;
          }
        });
    }

    if (owlPep.length > 0){
        owlPep.owlCarousel({
            margin: 0,
            autoplay: true,
            autoplayTimeout: 10000,
            autoplayHoverPause: true,
            loop: false,
            nav: true,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            dots: false,
            responsive:{
                0:{
                    items: 1
                },
                481:{
                    items: 3
                }
            },
        }).on('click', '.owl-item', function(e) {
          owlCmt.trigger('to.owl.carousel', [$(this).index(), duration, true]);
          $(this).siblings().removeClass('current');
          $(this).addClass('current');
          e.preventDefault();
        }).on('changed.owl.carousel', function(e) {
          if (!flag) {
            flag = true;
            owlCmt.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
          }
        });
    }

    //////////////////
    // owlPep.find('.owl-item:first-child').addClass('current');

    // setTimeout(function(e){
    //     owlPep.find('.owl-item:first-child').next().trigger('click');
    //     console.log(owlPep.find('.owl-item.current').index());
    // }, 2000);

    // var count = 1;

    // setInterval(function(){
    //     if(count == 1) {
    //         console.log('variation 2');
    //          count = 2;

    //     } else if(count == 2) {
    //         console.log('variation 3');
    //          count = 3;

    //     } else if(count == 3) {
    //         console.log('variation 1');
    //         count = 1;
    //     }
    // }, 2000);

    // var count = 1;
    // setInterval(function(){
    //     if(count < owlPep.find('.owl-item').length) {
    //         console.log('test');
    //     }
    //     count++;
    // }, 2000);
}

function acOwlSlider() {
    var owl = $('.ac-owlslider');

    if (owl.length > 0) {
        owl.each(function() {
            var el = $(this),
                dataAuto = el.data('owl-auto'),
                dataLoop = el.data('owl-loop'),
                dataSpeed = el.data('owl-speed'),
                dataGap = el.data('owl-gap'),
                dataNav = el.data('owl-nav'),
                dataDots = el.data('owl-dots'),
                dataAnimateIn = el.data('owl-animate-in'),
                dataAnimateOut = el.data('owl-animate-out'),
                dataDefaultItem = el.data('owl-item'),
                dataItemXS = el.data('owl-item-xs'),
                dataItemSM = el.data('owl-item-sm'),
                dataItemMD =  el.data('owl-item-md'),
                dataItemLG =  el.data('owl-item-lg'),
                dataNavLeft = el.data('owl-nav-left'),
                dataNavRight = el.data('owl-nav-right');

            el.owlCarousel({
                animateIn: dataAnimateIn,
                animateOut: dataAnimateOut,
                margin: dataGap,
                autoplay: dataAuto,
                autoplayTimeout: dataSpeed,
                autoplayHoverPause: true,
                loop: dataLoop,
                nav: dataNav,
                mouseDrag: true,
                touchDrag: true,
                navText: [dataNavLeft, dataNavRight],
                dots: dataDots,
                items: dataDefaultItem,
                responsive: {
                    0: {
                        items: dataItemXS
                    },
                    480: {
                        items: dataItemSM
                    },
                    768: {
                        items: dataItemMD
                    },
                    992: {
                        items: dataItemLG
                    },
                    1200: {
                        items: dataDefaultItem
                    }
                }
            });
        });
    }
}

function isotopeIzi(){
    $('.ac-masonry__wrapper').each(function(){
        var el = $(this),
            masonryContainer = el.find('.ac-masonry__grid');

        masonryContainer.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });

        // FILTER
        var filters = el.closest('.ac_section').find('.ac-masonry__filters');

        filters.on('click', 'a', function(){
            var selector = $(this).attr('data-filter');
            filters.find('a').removeClass('current');
            $(this).addClass('current');
            masonryContainer.isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: '.grid-sizer'
                },
                filter: selector
            });

            return false;
        });
    });
}

function acYTPlayer() {
    var player = $('.ytplayer-wrapper');

    player.each(function(){
        var el = $(this);

        el.find('.player').YTPlayer();

        el.find('.toggle-play').on('click', function(){
            var btn = $(this);

            if(btn.hasClass('play')) {
                el.find('.player').YTPPause();
                btn.removeClass('play').addClass('pause');
                btn.children('.fa').removeClass('fa-pause').addClass('fa-play');
            } else {
                el.find('.player').YTPPlay();
                btn.removeClass('pause').addClass('play pinned');
                btn.children('.fa').removeClass('fa-play').addClass('fa-pause');
            }
        });

        // el.find('.mb_YTPBar .buttonBar').on('click', function(e){
        //     e.stopPropagation();
        //     // console.log('true');
        // });

        el.on('dblclick', function(){
            el.find('.player').YTPFullscreen();
        });
    });
}

function acYTPlayerResize() {
    var player = $('.ytplayer-wrapper');

    player.each(function(){
        var el = $(this),
            checkpoint = el.data('checkpoint'),
            videoID = el.data('videoid'),
            windowWidth = window.innerWidth;

        if(el.length !== 0) {
            if(windowWidth < checkpoint) {
                if(el.siblings('.ytplayer-source').length == 0) {
                    el.before('<div class="ytplayer-wrapper ytplayer-source"><iframe src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe></div>');
                }
                el.addClass('hide');
            } else {
                if(el.siblings('.ytplayer-source').length !== 0) {
                    el.siblings('.ytplayer-source').remove();
                }
                el.removeClass('hide');
            }
        }
    });

    var player = $("#ytplayer-wrapper"),
        checkpoint = player.data('checkpoint'),
        videoID = player.data('videoid'),
        windowWidth = window.innerWidth;

    if(player.length !== 0) {
        if (windowWidth < checkpoint) {
            if(player.siblings('#ytplayer-source').length == 0) {
                player.before('<div id="ytplayer-source" class="ytplayer-wrapper"><iframe src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe></div>');
            }
            player.addClass('hide');
        } else {
            if(player.siblings('#ytplayer-source').length !== 0) {
                $('#ytplayer-source').remove();
            }
            player.removeClass('hide');
        }
    }
}

function acGmaps() {
    if($('#ac-gmaps').length){
        var gMarker = '../images/marker.png',
            gAddress = $('#ac-gmaps').data('default-address'),
            gZoom = $('#ac-gmaps').data('map-zoom');

        var map = new GMaps({
            div: '#ac-gmaps',
            lat: -12.043333,
            lng: -77.028333,
            draggable: true,
            scrollwheel: false
        });

        GMaps.geocode({
            address: gAddress,
            callback: function(results, status) {
                if(status == 'OK') {
                    var latlng = results[0].geometry.location;

                    map.setCenter(latlng.lat(), latlng.lng());

                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                        icon: {
                            url: gMarker
                        }
                    });

                    map.setZoom(gZoom);

                    // move center of map
                    map.panBy(-250, 0);
                }
            }
        });

        // Click to active and deactive scroll map
        $('#ac-gmaps').on('click', function(){
            var el = $(this);
            if(!el.hasClass('active')) {
                el.addClass('active');
            } else {
                el.removeClass('active');
            }
        });

        // Hide and show form
        var btnFloat = $('#ac-gmaps').closest('.ac_section').find('.ac-contact__float'),
            contactForm = $('#ac-gmaps').closest('.ac_section').find('.ac-contact__wrapper'),
            btnCloseForm = contactForm.find('.btn-close');

        btnCloseForm.on('click', function(){
            var el = $(this);
            if(contactForm.attr('style') == undefined) {
                contactForm.css('transform', 'translate(-100%, -50%)');
                btnFloat.addClass('pushed');
            }
        });

        btnFloat.on('click', function(){
            var el = $(this);
            contactForm.removeAttr('style');
            el.removeClass('pushed');
        });
    }
}

$(document).ready(function(){
    backgroundImage();
});

$(window).on('load resize', function() {
    scrollParallax();
});

$(window).on('load', function() {
    $('#preload').addClass('completed');
});