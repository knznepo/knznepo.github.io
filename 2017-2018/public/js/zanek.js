(function($) {
	//
	// Hero Header Parallax
	//
	$('body').scroll(function() {

		$('#home-header').css(
			'background-position' , 'center ' +  '-' + $(this).scrollTop() / 2 + 'px'
		);

	});
	
  $('input, button, textarea').removeAttr('disabled');
  
	//
	// One Page
	//

	var onePage = function() {
		var winHeight = $(window).height();
		$('.one-page').css('min-height', winHeight);
	}

	onePage();

	$(window).resize(function() { onePage() });

	//
	// Smooth scroll
	//

	$('#main-nav a').on('click', function() {
		
		var target = $(this.hash);
    		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
 	
 		if (target.length) {
  		$('html,body').animate({
    			scrollTop: target.offset().top
  		}, 1000);
  	}	 
	});
	
})(jQuery);