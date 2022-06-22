
$(document).ready(function () {
    $(this).scrollTop(0);
    var lastScrollTop = 0;
    var delta = 1;
    var header = $("#header header");
    var offsetHeight = $(".navbar-default .scroll-menu").outerHeight();
    var cookieHeight = $(".cookies-msg").length ? $(".cookies-msg").outerHeight(true) : 0;
    var headerHeight = header.height();
    var stickyHeader = headerHeight - offsetHeight;
    var windowHeight = $(window).height();
    var menuHeight = windowHeight - stickyHeader;
    $('body').css("padding-top", headerHeight + cookieHeight);
    header.css("position", "fixed");
    header.css("top", cookieHeight);
    $('.search-box').css("top", headerHeight + cookieHeight)
    // code for making the dropdown of find store visible
    $('#findstore').parent().closest('div').removeClass("stOverflowAuto");
    var searchScroll = true;
    /*cookie specific code */

    /* cookie changes ends here */
    var recalculateValues = function () {
        header = $("#header header");
        offsetHeight = $(".navbar-default .scroll-menu").outerHeight();
        headerHeight = header.height();
        windowHeight = $(window).height();
        menuHeight = windowHeight - stickyHeader;
        cookieHeight = $(".cookies-msg").length ? $(".cookies-msg").outerHeight(true) : 0;
        topValueforHeader = cookieHeight;
        topValueforSticky = headerHeight + cookieHeight;
        topValueOnScrollforHeader = topValueforHeader - offsetHeight;
        topValueOnScrollforSticky = topValueforSticky - offsetHeight;
        var finalTopValue;
        $(".cookies-msg").css("top", 0);
        header.css("top", topValueforHeader);
        header.css("position", "fixed");
        $('body').css("padding-top", topValueforSticky);
        if ($('.collapsible-nav-option[aria-expanded="true"]').length) {
            if ($("#header header").hasClass('stickyLogo')) {
                finalTopValue = topValueOnScrollforSticky;
            } else {
                finalTopValue = topValueforSticky;
            }
            $('.search-box-wrapper').css("top", finalTopValue);
            $('.facets-filter-stickyMobile').css("top", finalTopValue);
		}
		$('.search-box').css("top",topValueforSticky);
    }

    if ($("body").hasClass("pace-done")) {
        $(window).resize()
    }
    $('.search-box-wrapper').css("top", "auto");

    $('.srch-icon-div').click(function () {
        if ($('.collapsible-nav-option').attr('aria-expanded') == "true") {
            $('body').css('overflow', 'auto');
        } else {
            $('body').css('overflow', 'hidden');
        }
    });

    $(window).on('resize', function () {
        recalculateValues();
    });

    function hasScrolled() {
      var st = $(this).scrollTop();
      topValueforHeader=cookieHeight;
      // Make sure they scroll more than delta
//      if (Math.abs(lastScrollTop - st) <= delta)
//          return;
      recalculateValues();
      $("#header header").removeClass("headerExp")
      if (st > lastScrollTop && st > headerHeight) {
          header.addClass('position');
          header.css("top", topValueOnScrollforHeader);
          header.addClass("stickyLogo");
          $(".checkout").addClass('position');
          header.css("top", topValueOnScrollforHeader);
          $('.search-box').css("top", topValueOnScrollforSticky - 3);
          $('.search-box').addClass('search-scroll');
          if ($(window).width() > 1014) {
              $('#accordion').hide();
          }
          $('.logo .navbar-brand').addClass('margin');
          $('.facets-filter-stickyMobile').css("top", topValueOnScrollforSticky);
      }
      else if (st < lastScrollTop) {
           if(st + $(window).height() < $(document).height()) {
          header.removeClass("stickyLogo");
          $("header").removeClass('position');
               /* added */
          header.css("top", topValueforHeader);
               /* added ends */
          $(".checkout").removeClass('position');
          $('.search-box').css("top", topValueforSticky);
          $('.search-box-wrapper').css("top", "auto");
          $('.logo .navbar-brand').removeClass('margin');
          $('.search-box').removeClass('search-scroll');
          $('#accordion').show();
          $('.facets-filter-stickyMobile').css("top", topValueforSticky );
           }
      }
      lastScrollTop = st;
    }

    $(window).scroll(function () {
        didScroll = true;
        var st = $(this).scrollTop();
        $(".brand-selector-container").removeClass("in");
        $(".brands-selector").attr("aria-expanded", "false"); // hiding header brand selector on scroll

        $(".currency-selector-container").removeClass("in");
        $(".currency-selector").attr("aria-expanded", "false"); // hiding header currency selector on scroll
        hasScrolled();
    });
    //end

    $("#minicart").on('hidden.bs.modal', function () {
        alert('The modal is now hidden.');
    });

    $('.select, #addToCartBtn').click(function () {
        $('.scroll-menu').show();
        $('.divider').show();
        $('#accordion').show();
        $("#header header").addClass("headerExp")
    });
    // close search bar on click of links

    $(".suggestion-content a").click(function () {
        $("#searchBox").removeClass('in');
        $(".search a").attr("aria-expanded", "false");
        $(".search a").addClass('collapsed');
        $('body').css('overflow', 'auto');
        if ($("#layoutContainers").hasClass("overlay")) {
            $("#layoutContainers").removeClass("overlay");
            $("footer").removeClass("overlay");
        }
    });

    $(".image-category a,.category-name a,header .sub-menu ul li a,.panel-heading a.hidden-xs").click(function () {
        if (!event.ctrlKey && !($(this).attr('target') == '_blank')) {
            window.location = $(this).attr("href");
        }
    });


    $("button.navbar-toggle,.center-option .panel-heading a").click(function () {
        $("#searchBox").removeClass('in');
        $(".search a").attr("aria-expanded", "false");
        $(".search a").addClass('collapsed');
        $("#content").removeClass('scrollDisabled');
        setTimeout(function () {
            if ($("#menu").height() > menuHeight) {
                if ($(this).scrollTop() > offsetHeight) {
                    $("#menu").css("height", menuHeight);
                    $("#menu").addClass('overflowY');
                } else {
                    if ($(".cookies-msg").length) {
                        var Totalheight = (menuHeight - offsetHeight) - $(".cookies-msg").outerHeight();
                    } else {
                        var Totalheight = menuHeight - offsetHeight;
                    }
                    $("#menu").css("height", Totalheight);
                    $("#menu").addClass('overflowY');
                }

            }
            if ($(window).width() >= 768 && $(window).width() <= 1024) {
               if($(".sub-menu").hasClass('in')){
                   $("#menu").addClass('sub-catogory-expand-overlay');
                } else{
                    $("#menu").removeClass('sub-catogory-expand-overlay');
                }
            }

        }, 1000);
    });

    //retain color for link
    $(".sub-menu").mouseover(function () {
        $(this).prev().addClass("activeLink");
    });
    $(".sub-menu").mouseout(function () {
        $(this).prev().removeClass("activeLink");
    });

    $(".navbar-header button.navbar-toggle").click(function () {
        if ($(this).hasClass("collapsed")) {
            if (!$("#layoutContainers").hasClass("overlay")) {
                $("#layoutContainers").addClass("overlay");
                $("footer").addClass("overlay");
                $('body').css('overflow', 'hidden');
                $('body').css('position', 'fixed');
            }
        } else {
            if ($("#layoutContainers").hasClass("overlay")) {
                $("#layoutContainers").removeClass("overlay");
                $("footer").removeClass("overlay");
                $('body').css('overflow', 'auto');
                $("body").css({"position": ""});
            }
        }
        $('#content').removeClass('scrollDisabled');
    });

    $(".srch-icon-div button.navbar-toggle").click(function () {
        setTimeout(function () {
            if ($(".srch-icon-div button.navbar-toggle").hasClass("collapsed")) {
                if ($("#layoutContainers").hasClass("overlay")) {
                    $("#layoutContainers").removeClass("overlay");
                    $("footer").removeClass("overlay");
                }
                $('body').css('overflow', 'auto');
                $("body").css({"position": ""});
                $(".header-overlay").hide();
            } else {
                if (!$("#layoutContainers").hasClass("overlay")) {
                    $("#layoutContainers").addClass("overlay");
                    $("footer").addClass("overlay");
                }
//                $('body').css('overflow', 'hidden');
//                $('body').css('position', 'fixed');
                $(".header-overlay").show();
            }
            $('#content').removeClass('scrollDisabled');
        }, 300);
    });


    $(".search a.closeSearch").click(function () {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            if ($(".closeSearch").hasClass('collapsed')) {
                searchScroll = false;
            } else
                searchScroll = true;
        }
        $(".sub-menu,#menu").removeClass('in');
        $("button.navbar-toggle,.center-option .panel-heading a").attr("aria-expanded", "false");
        $("button.navbar-toggle").addClass('collapsed');
        if ($(".closeSearch").hasClass("collapsed")) {
            if (!$("#layoutContainers").hasClass("overlay")) {
                $("#layoutContainers").addClass("overlay");
                $("footer").addClass("overlay");
//                $('body').css('overflow', 'hidden');
//                $('body').css('position', 'fixed');
            }
        } else {
            if ($("#layoutContainers").hasClass("overlay")) {
                $("#layoutContainers").removeClass("overlay");
                $("footer").removeClass("overlay");
                $('body').css('overflow', 'auto');
                $("body").css({"position": ""});
            }
        }

    });

    $(".no-btn-search a,.no-btn-search").click(function () {
        if ($("#searchBox").hasClass("in")) {
            $("#searchBox").removeClass('in');
            $(".search a").attr("aria-expanded", "false");
            $(".search a").addClass('collapsed');
            $('body').css('overflow', 'auto');
            if ($("#layoutContainers").hasClass("overlay")) {
                $("#layoutContainers").removeClass("overlay");
                $("footer").removeClass("overlay");
            }
        }
    });

    $(".brands-selector").click(function () {
        $("#menu").removeClass("in"); // closing burger menu on click of band selector
        $("#menu").attr("aria-expanded", "false");
        $(".srch-icon-div button.navbar-toggle").attr("aria-expanded", "false");
        $(".currency-selector-container").removeClass("in");
        $(".currency-selector").attr("aria-expanded", "false");
        closeSearchArea();
    }); //accordian effect on brand and currency selector

    $(".currency-selector").click(function () {
        $(".brand-selector-container").removeClass("in");
        $(".brands-selector").attr("aria-expanded", "false");
        closeSearchArea();
    }); //accordian effect on brand and currency selector

    //enabling mega menu when clicked on currency selector
    $(".navbar-default .navbar-header").click(function () {
        if (!($("#tanishqSearch").hasClass('collapsed'))) {
            //$(".megaMenuOverlay").hide();
            $(".main-option .sub-menu>div").removeClass("searchMargin");
        }
        if((!($(".brands-selector").hasClass('collapsed'))||($(".currency-selector").hasClass('collapsed')))) {
      	    $("#tanishqSearch").addClass('collapsed')
        }
    });
	$(".navbar-default .tanishq-logo,.navbar-default .search").click(function () {
		if (!($("#tanishqSearch").hasClass('collapsed'))) {
            //$(".megaMenuOverlay").hide();
            $(".main-option .sub-menu>div").removeClass("searchMargin");
        }
	});


    var closeSearchArea = function () {

        if ($('#searchBox').attr('aria-expanded') === "true") {
            $('#searchBox').attr('aria-expanded', 'false');
            $('#searchBox').removeClass('in');
            $('.closeSearch').attr('aria-expanded', 'false');
        }
        $(".header-overlay").hide();
        $('#content').removeClass('scrollDisabled');
        $('body').css('overflow', 'auto');

    }

    if ($(window).width() > 1014) {
        $('#accordion').find(".panel").mouseleave(function () {
            $('#accordion').find(".panel").not(this).find(".panel-heading a").css("color", "#181818");
            $(this).find(".list-unstyled li").each(function (e) {
                $(this).hide();
            });
            $(".header-overlay").hide();
        });

        $('#accordion').find(".panel").mouseover(function () {
            $('#accordion').find(".panel").not(this).find(".panel-heading a").css("color", "#8c8c8c");
            $(this).find(".list-unstyled li").each(function (e) {
                // $(this).delay(50 * e).fadeIn(1e3)
                $(this).show();
            });
            $(".header-overlay").show();
			var length =  document.getElementsByTagName("select").length;
			for(var i =0;i<length;i++){
				if(!document.getElementsByTagName("select")[i].disabled){
					document.getElementsByTagName("select")[i].disabled = true;
					document.getElementsByTagName("select")[i].disabled = false;
				}

			}
        });

        //retain underline for link on hovering on L2 category
        $(".sub-menu").mouseover(function () {
            $(this).prev().addClass("activeLink");
        });
        $(".sub-menu").mouseout(function () {
            $(this).prev().removeClass("activeLink");
        });
    }

    //close currency/brand-selector on click outside
    var closePanel = function (selectorDiv, selectorLink) {
        if (selectorDiv.hasClass('in')) {
            selectorLink.attr("aria-expanded", "false");
            if (!selectorLink.hasClass("visible-xs")) {
                //selectorLink.css("color","#a8a8a8");
            }
            selectorDiv.attr("aria-expanded", "false");
            selectorDiv.removeClass('in');

        }
    }

    var hrefValue = [];

    function isIpad () {
    	var ua = navigator.userAgent;
      return /iPad/i.test(ua);
    }

    function forTabletTouch() {
        if (typeof window.ontouchstart !== 'undefined' && $(window).width() > 1023 && $(window).width() <= 1280 && hrefValue.length === 0 && window.innerHeight < window.innerWidth && !isIpad()) {
            var i = 0;
            $('.panel .sublevel').each(function () {
                i++;
                hrefValue[i] = $(this).attr('href');
                $(this).attr('href', 'javascript:void(0)');
            });
        }
    }
    forTabletTouch();
    $(window).on("resize", forTabletTouch);
    $(document).on('click', '.panel a.sublevel', function (event) {
        if (typeof window.ontouchstart !== 'undefined' && $(window).width() > 1023 && $(window).width() <= 1280 && window.innerHeight < window.innerWidth && !isIpad()) {
            if (!$(this).parent().hasClass('firstClick')) {
                $('.panel a.sublevel').each(function () {
                    $(this).parent().removeClass('firstClick');
                });
                $(this).parent().addClass('firstClick');
                $('.panel-backdrop').show();

            } else {
                var i = 0;
                $('.panel a.sublevel').each(function () {
                    i++;
                    $(this).attr('href', hrefValue[i]);
                });
                $(this).parent().removeClass('firstClick');
                $('.panel-backdrop').hide();
            }
        }
    });

    $(document).click(function (event) {
        if ($(event.target).closest('.container-fluid').attr('id') != 'currencySelector') {
            closePanel($("#currencySelector"), $("a.currency-selector"));
        }
        if ($(event.target).closest('.container-fluid').attr('id') != 'brandSelector') {
            closePanel($("#brandSelector"), $("a.brands-selector"));
        }
        if (!($(event.target).hasClass('sublevel')) && !($(event.target).parents().hasClass('sub-menu'))) {
            var i = 0;
            $('.panel a.sublevel').each(function () {
                i++;
                $(this).attr('href', hrefValue[i]);
            });
            $('.panel a.sublevel').parent().removeClass('firstClick');
            $('.panel-backdrop').hide();
            hrefValue = [];
            forTabletTouch();
        }
    });

});

var header, offsetHeight, headerHeight, stickyHeader, cookieHeight;
function cookieInfoHide() {
            var newHeaderHeight;
            var totalHeaderHeight = $('#header header').height();
            $('.search-box').css("top", totalHeaderHeight);
            $('body').css("padding-top", totalHeaderHeight);
            $('.is_stuck').css("top", totalHeaderHeight);
            $(".cookies-msg").remove();
            $('#header header').css("top", "0px");
            var navbarHeight = $(".navbar-brand").outerHeight();
            $('.minicart-zoom .modal-dialog').css("top", navbarHeight);
        }