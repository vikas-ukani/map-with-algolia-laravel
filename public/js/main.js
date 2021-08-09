jQuery(document).ready(function($){

	addIEclasses();

	setTimeout(function() {

		$('.loader').hide();

	}, 1000);


	/* Ranger */

	if($.fn.ionRangeSlider) {
		$(".ranger").ionRangeSlider({
			type: "double",
			min: 0,
			max: 20000,
			from: 0
		});
	}

	/* Custom scrollbar */
	if($.fn.mCustomScrollbar) {
		(function($){
			$(window).on("load",function(){
				if ($(window).width() > 991) {
					$(".custom-scroll").mCustomScrollbar({
						theme:"minimal-dark",
						mouseWheelPixels: 100,
					});
				}
			});
		})(jQuery);
	}

	/* Select value Dropdown */

	$(".dropdown-menu a").click(function(){
		$(this).parents(".filter-breadcrum .dropdown").find('.dropdown-toggle span').text($(this).text());
	});

	/* Add Icon Calander */
	$(".datepicker").click(function(){
		$(".datepicker .prev").text('').append("<i class='icon icon-small-chevron-right'></i>");
		$(".datepicker .next").text('').append("<i class='icon icon-small-chevron-left'></i>");
	});

	$(".datepicker .prev").text('').append("<i class='icon icon-small-chevron-right'></i>");
	$(".datepicker .next").text('').append("<i class='icon icon-small-chevron-left'></i>");

	/* Dashboard toggle */
	$('.navbar-toggler').on('click', function () {
		$(this).toggleClass("collapsed");
		$('.menu').toggleClass('open');
	});

	/* Filter */

	if ($(window).width() < 991) {
		if($(".section-filter").hasClass("d-lg-flex")) {
			$(".filter-wrap").hide();

			$(".footer-search a .icon-search").click(function(){
				$(".filter-wrap").show().addClass('show');
				$('body').css('overflow','hidden');
				$('.header').addClass('is-fixed');
				$(".footer-search a.search").addClass('disabled');
			});

			$(".filter-wrap .close-filter").click(function(){
				$(".filter-wrap").hide().removeClass('show');
				$('body').css('overflow','auto');
				$('.header').removeClass('is-fixed');
				$(".footer-search a.search").removeClass('disabled');
			});
		}

		$(".open-money").click(function(){
			$(".detail-sticky-top").show().addClass('show');
			$(".detail-sticky-right").addClass('show');
			$(this).addClass('disabled');
		});

		$(".close-filter").click(function(){
			$(".detail-sticky-top").hide().removeClass('show');
			$(".detail-sticky-right").removeClass('show');
			$(".open-money").removeClass('disabled');
		});

		$(".open-enquire").click(function(){
			$(".detail-enquire").show();
		});

		$(".close-enquire").click(function(){
			$(".detail-enquire").hide();
		});
		
	}
});

$(window).on("load",function(){
	/* Slider */
	if ($.fn.slick) {
		$(".mile-carousel").slick({
			autoplay: false,
			dots: true,
			adaptiveHeight: false,
			slidesToShow: 3,
			prevArrow: "<i class='icon icon-chevron-small-right'></i>",
			nextArrow: "<i class='icon icon-chevron-small-left'></i>",
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});

		$(".earn-carousel").slick({
			autoplay: false,
			dots: true,
			adaptiveHeight: false,
			slidesToShow: 5,
			prevArrow: "<i class='icon icon-chevron-small-right'></i>",
			nextArrow: "<i class='icon icon-chevron-small-left'></i>",
			responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});

		$(".space-carousel").slick({
			autoplay: false,
			lazyLoad:'ondemand',
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 3,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});

		$(".spaceinner-carousel").slick({
			autoplay: false,
			lazyLoad:'ondemand',
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 1,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
		});

		$(".deadlight-carousel").slick({
			// lazyLoad:'ondemand',
			autoplay: false,
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 1,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-chevron-small-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-chevron-small-left'></i></div>",
		});

		$(".brand-carousel").slick({
			autoplay: false,
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: false,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-chevron-small-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-chevron-small-left'></i></div>",
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
			]
		});

		$(".space-city-carousel").slick({
			autoplay: false,
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
			responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
			]
		});

		$(".space-mall-carousel").slick({
			autoplay: false,
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: true,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
			]
		});

		$(".related-carousel").slick({
			autoplay: false,
			dots: false,
			adaptiveHeight: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}]
		});

		$(".space-carousel-asociation").slick({
			autoplay: false,
			lazyLoad:'ondemand',
			dots: true,
			adaptiveHeight: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
			nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});
	}

	sliderHeight(true);
});

/* Equal Size */
(function () {
	equalHeight(false);
	sliderHeight(false);
})();

window.onresize = function(){
	equalHeight(true);
	sliderHeight(true);
}

function equalHeight(resize) {
	var elements = document.getElementsByClassName("equalHeight"),
	allHeights = [],
	i = 0;
	if(resize === true){
		for(i = 0; i < elements.length; i++){
			elements[i].style.height = 'auto';
		}
	}
	for(i = 0; i < elements.length; i++){
		var elementHeight = elements[i].clientHeight;
		allHeights.push(elementHeight);
	}
	for(i = 0; i < elements.length; i++){
		elements[i].style.height = Math.max.apply( Math, allHeights) + 'px';
		if(resize === false){
			elements[i].className = elements[i].className + " show";
		}
	}
}

function sliderHeight(resize) {
	if($(".section-deadlight .deadlight-carousel")) {
		var homeSlider = $(".section-deadlight .bg-dark").innerHeight();
		$(".slick-list.draggable").css("height", homeSlider);
	}
}

/* detect IE */

function addIEclasses() {
	var ua = window.navigator.userAgent;
	var b = "";
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
    // IE 10 or older => return version number
    b = "msie ie" + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    $("head").append($("<link rel='stylesheet' href='../css/ie.css' type='text/css' media='screen' />"));
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    b = "trident ie"+parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    $("head").append($("<link rel='stylesheet' href='../css/ie.css' type='text/css' media='screen' />"));
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    b = "edge ie"+parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

	// other browser
	if(b!="") {
		$('body').addClass(b);
	}
}
