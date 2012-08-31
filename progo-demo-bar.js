function pdbReBG(v) {
	jQuery('#pagetop .slide').each(function() {
		var bgi = jQuery(this).data('pdbg');
		if ( v == "3" ) {
			jQuery(this).css('background-image', '');
			var im = jQuery('<img />');
			im.attr('src', bgi + '-480x270.jpg');
			im.appendTo(jQuery(this));
		} else {
			bgi = 'url("'+ bgi;
			jQuery(this).css('background-image', bgi + '.jpg")').children('img').remove();
		}
		
		if ( v=="1" || v=="2" ) {
			jQuery(this).find('.content').hide();
		} else {
			jQuery(this).find('.content').show();
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
		if ( $('#bg').size() > 0 ) {
			$('#bg').css('background-image', 'url(http://demo.progo.com/businesspro/wp-content/themes/businesspro/images/colors/'+ $(this).val() + '/bg.jpg)');
			var bgrep = 'repeat';
			var bgc = '#FFF';
			if ( ( $(this).val() == 'BrownBlue' ) || ( $(this).val() == 'GreenWhite' ) ) {
				bgrep += '-x';
				if ( $(this).val() == 'BrownBlue' ) {
					bgc = '#CDDEE5';
				}
			}
			$('#bg').css({'background-repeat': bgrep, 'background-color': bgc});
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
		var pdbsz = ['','-480x270'];
		$('#pagetop .slide').each(function() {
			var bgi = $(this).css('background-image');
			var hta = bgi.indexOf('http:');
			var da = bgi.indexOf('.jpg');
			bgi = bgi.substr(hta, da-hta );
			$(this).data('pdbg',bgi);
			for (z in pdbsz) {
				pdbpl += '<img src="'+ bgi + pdbsz[z] +'.jpg" />';
			}
		});
		pdbpl += '</div>';
		$('body').append(pdbpl);
		$('#pdb-layout').change(function() {
			var v = $(this).val();
			$('#pagetop .slide:not(.on)').css('left','1000px');
			$('#pagetop').attr('class', 'slides grid_12 Layout'+ v +' sliding');
			if ( v == "1" || v == "2" ) {
				$('.pbpform').appendTo('#homeslides');
			} else {
				$('.pbpform').prependTo('.secondary');
			}
			pdbReBG(v);
		}).val("2").trigger('change');
	}
});