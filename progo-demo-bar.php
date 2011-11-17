<?php
/*
Plugin Name: ProGo Demo Bar 
Plugin URI: http://www.progo.com/
Description: Adds bar that sticks to top of front end of site, allowing visitors to preview different Color Schemes and other Layout options.
Author: Alex Chousmith
Version: 0.2
Author URI: http://www.progo.com/
*/

function progo_demo_bar_action_links( $links, $file ) {
	if ( $file == plugin_basename( dirname(__FILE__) .'/admin-bar-hopper.php' ) ) {
		$links[] = '<a href="'. get_bloginfo('url') .'">'.__('View Site').'</a>';
	}

	return $links;
}
add_filter( 'plugin_action_links', 'progo_demo_bar_action_links', 10, 2 );

if ( ! function_exists( 'progo_demo_bar_scripts' ) ):
function progo_demo_bar_scripts() {
	if ( !is_admin() ) {
		$plugin_url = WP_PLUGIN_URL .'/progo-demo-bar/';
		wp_enqueue_script( 'jquerybackgroundposition', $plugin_url .'jquery.backgroundPosition.js', array('jquery'), '1.22', true );
		wp_enqueue_script( 'progo-demo-bar', $plugin_url .'progo-demo-bar.js', array('jquery','jquerybackgroundposition'), '0.1', true );
	}
}
endif;
add_action('wp_print_scripts', 'progo_demo_bar_scripts');

if ( ! function_exists( 'progo_demo_bar_style' ) ):
function progo_demo_bar_style() {
	if ( !is_admin() ) {
		wp_register_style( 'progo-demo-bar-css', WP_PLUGIN_URL .'/progo-demo-bar/progo-demo-bar.css' );
		wp_enqueue_style( 'progo-demo-bar-css' );
	}
}
endif;
add_action('progo_frontend_styles', 'progo_demo_bar_style');

if ( ! function_exists( 'progo_demo_bar_footer' ) ):
function progo_demo_bar_footer() {
	if ( !is_admin() ) {
		$ct = get_current_theme();
		if ( in_array($ct, array('Direct Response', 'Ecommerce', 'Small Business Pro') ) ) {
		echo '<div id="pdb" style="background-position: 0 0"><div class="in"><a href="http://www.progo.com" target="_blank" class="logo" title="High Performance WordPress Themes from ProGo Themes">High Performance WordPress Themes from ProGo Themes</a>';
		// color scheme
		$colorschemes = progo_colorschemes();
		$options = get_option('progo_options');
		$colorscheme = $options['colorscheme'];
		echo '<label for="pdb-colorscheme">Styles:</label><select id="pdb-colorscheme" name="pdb-colorscheme">';
		foreach ( $colorschemes as $c ) {
			echo '<option'. ( $colorscheme == $c ? ' selected="selected"' : '' ) .'>'. $c .'</option>';
		}
		echo '</select>';
		
		if ( $ct == 'Small Business Pro' ) {
			echo '<label for="pdb-layout">Layout:</label><select id="pdb-layout" name="pdb-layout">';
			for ( $i = 1; $i < 5; $i++ ) {
				echo '<option value="'. $i .'">Layout '. $i .'</option>';
			}
			echo '</select>';
		}
		
		$ptl = 'http://www.progo.com/products-page/themes/';
		switch ( $ct ) {
			case 'Direct Response':
				$ptl .= 'direct-response';
				break;
			case 'Ecommerce':
				$ptl .= 'ecommerce';
				break;
			case 'Small Business Pro':
				$ptl .= 'small-business-pro';
				break;
		}
		
		$ptbt = 'Buy the '. $ct .' WordPress Theme';
		echo '<a href="'. $ptl .'/" class="buy" title="'. $ptbt .'">'. $ptbt .'</a></div><a href="#" id="pdbc"></a></div>';
		}
	}
}
endif;
add_action('wp_footer', 'progo_demo_bar_footer');