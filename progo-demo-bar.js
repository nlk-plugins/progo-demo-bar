jQuery(function($) {
	$('#pdb-colorscheme').change(function() {
		var c = $('#progo-colorscheme-css');
		var s = c.attr('href');
		s = s.substr(0,s.lastIndexOf('/')) + '/style'+$(this).val() + '.css';
		c.attr('href',s);
		if( $('#pagetop .textslide').size() > 0 ) {
			if ( $(this).val() == 'GreenBrown' ) {
				$('#pagetop .textslide.Light').removeClass('Light').addClass('Dark');
			} else {
				$('#pagetop .textslide.Dark').removeClass('Dark').addClass('Light');
			}
		}
	});
	
	$('#pdbc').click(function() {
		if ( $(this).hasClass('off') ) {
			$(this).parent().animate({backgroundPosition: '0 0'});
			$('html').animate({paddingTop: '60px'});
			$(this).removeClass('off').animate({top: '16px'}).prev().slideDown();
		} else {
			$(this).addClass('off').animate({top: 0}).prev().slideUp();
			$('html').animate({paddingTop: 0});
			$(this).parent().animate({backgroundPosition: '0 -60px'});
		}
		return false;
	});
});