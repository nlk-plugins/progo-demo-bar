function pdbReBG(v) {
	jQuery('#pagetop .slide').each(function() {
		var bgi = 'url("'+ jQuery(this).data('pdbg');
		switch(v) {
			case "1":
			case "2":
				jQuery(this).css('background-image', bgi + '.jpg")');
				break;
			case "3":
				jQuery(this).css('background-image', bgi + '-305x322.jpg")');
				break;
			case "4":
				jQuery(this).css('background-image', bgi + '-646x322.jpg")');
				break;
		}
	});
}

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
	
	if ( $('#pdb-layout').size() > 0 ) {
		var pdbpl = '<div style="display:none">';
		var pdbsz = ['','-305x322','-646x322'];
		$('#pagetop .slide').each(function() {
			var bgi = $(this).css('background-image');
			bgi = bgi.substr(5, bgi.length - 11);
			$(this).data('pdbg',bgi);
			for (z in pdbsz) {
				pdbpl += '<img src="'+ bgi + pdbsz[z] +'.jpg" />';
			}
		});
		pdbpl += '</div>';
		$('body').append(pdbpl);
		$('#pdb-layout').change(function() {
			var v = $(this).val();
			$('#pagetop .shadow').remove();
			$('#pagetop .slide:not(.on)').css('left','960px');
			if ( v == "1" || v == "2" ) {
				$('#pagetop').attr('class', 'slides grid_8 Layout'+ v +' sliding');
				$('.hform').insertBefore('#main');
				$('#pagetop').append('<div class="shadow" />');
				progo_sw = '646px';
			} else {
				$('#pagetop').attr('class', 'slides grid_12 Layout'+ v +' sliding');
				$('.hform').prependTo('.secondary');
				$('#pagetop .slide').append('<div class="shadow" />');
				progo_sw = '952px';
			}
			pdbReBG(v);
		});
	}
});