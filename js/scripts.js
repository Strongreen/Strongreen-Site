$(window).on('load resize', function() {
	acHeaderResponsive();
	acYTPlayerResize();
});

$(window).on('resize', function(){
	acHeaderScrollResize();
});

$(window).on('load', function(){
	acHeaderScroll();
});

$(document).ready(function(){
	acHeaderActive();
	easingClick();
	popupVideo();
	popupPortfolio();
	fixGradient();
	acCounter();
	acYTPlayer();
	acOwlSync();
	acOwlSlider();
	isotopeIzi();
	acGmaps();
});