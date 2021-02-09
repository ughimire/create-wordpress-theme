<?php

/**
 * {{theme_name}} functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package {{class_name}}
 * @since 1.0.0
 */
${{theme_prefix}}_theme = wp_get_theme('{{text_domain}}');

define('{{theme_constant}}_THEME_VERSION', ${{theme_prefix}}_theme->get('Version'));
define('{{theme_constant}}_THEME_SETTINGS', '{{theme_prefix}}');
define('{{theme_constant}}_THEME_OPTION_PANEL', '{{theme_prefix}}_theme_option_panel');
define('{{theme_constant}}_THEME_DIR', trailingslashit(get_template_directory()));
define('{{theme_constant}}_THEME_URI', trailingslashit(esc_url(get_template_directory_uri())));
// Theme Core file init

require_once {{theme_constant}}_THEME_DIR . 'core/class-{{text_domain}}-core.php';

function {{class_name}}()
{
	return {{class_name}}_Core::get_instance();

}

{{class_name}}();

