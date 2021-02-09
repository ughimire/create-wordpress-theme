<?php

final class {{class_name}}_Core
{
	private static $instance = null;

	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self;
		}

		return self::$instance;

	}

	public function __construct()
	{
		$this->hooks();
		$this->includes();

	}

	public function hooks()
	{
		add_action('after_setup_theme', array($this, 'setup'));
		add_action('after_setup_theme', array($this, 'content_width'), 0);
		add_filter('excerpt_more', array($this, 'excerpt_more'));
		add_filter('excerpt_length', array($this, 'excerpt_length'));

	}


	function setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on {{class_name}}, use a find and replace
		 * to change '{{text_domain}}' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('{{text_domain}}', {{theme_constant}}_THEME_DIR . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(array(
			'primary' => esc_html__('Primary', '{{text_domain}}'),
			'top-bar-nav' => __('Top Bar Navigation', '{{text_domain}}'),
		));

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support('html5', array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
		));

		// Set up the WordPress core custom background feature.
		add_theme_support('custom-background', apply_filters('{{theme_prefix}}_custom_background_args', array(
			'default-color' => 'f1f1f1',
			'default-image' => '',
		)));

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support('custom-logo', array(
			'height' => 100,
			'width' => 260,
			'flex-width' => true,
			'flex-height' => true,
		));

		// Add Support for post-formats
		add_theme_support('post-formats', array(
			'quote', 'link'
		));
		add_theme_support('custom-header', apply_filters('{{theme_prefix}}_custom_header_args', array(
			'default-image' => '',
			'default-text-color' => '333333',
			'width' => 1000,
			'height' => 250,
			'flex-height' => true,
			'flex-width' => true,
			'wp-head-callback' => '{{theme_prefix}}_header_style',
			'video' => true,
		)));
		add_theme_support('align-wide');

	}

	/**
	 * Set the content width in pixels, based on the theme's design and stylesheet.
	 *
	 * Priority 0 to make it available to lower priority callbacks.
	 *
	 * @global int $content_width
	 */
	function content_width()
	{
		$GLOBALS['content_width'] = apply_filters('{{theme_prefix}}_content_width', 1110);
	}


	function excerpt_more($more)
	{

		if (!is_admin()) {
			return '&hellip; ';
		}
		return $more;
	}


	function excerpt_length($length)
	{
		if (!is_admin()) {
			return 30;
		}
		return $length;
	}

	public function includes()
	{

		/**
		 * Implement the Custom Header feature.
		 */
		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-assets.php';

		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-template-helper.php';
		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-loops.php';
		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-hooks.php';

		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-customizer.php';
		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-compatibility.php';

		/**
		 * Functions which enhance the theme by hooking into WordPress.
		 */
		require {{theme_constant}}_THEME_DIR . '/core/option-functions.php';
		require {{theme_constant}}_THEME_DIR . '/core/template-functions.php';

		/**
		 * Customizer additions.
		 */
		require {{theme_constant}}_THEME_DIR . '/core/functions.php';
		require {{theme_constant}}_THEME_DIR . '/core/dynamic-style.php';

		require {{theme_constant}}_THEME_DIR . '/core/class-{{text_domain}}-widgets.php';
		require {{theme_constant}}_THEME_DIR . '/core/theme-update/class-{{text_domain}}-theme-update.php';


		if (is_admin()) {
			// Meta boxes.
			require {{theme_constant}}_THEME_DIR . '/core/meta-boxes/class-{{text_domain}}-meta-box-page-settings.php';
			require {{theme_constant}}_THEME_DIR . '/core/meta-boxes/class-{{text_domain}}-meta-box.php';

			// Info
			require_once {{theme_constant}}_THEME_DIR . '/core/info/class-{{text_domain}}-theme-information.php';

			// TGMPA

			require_once {{theme_constant}}_THEME_DIR . 'core/tgmpa/class-tgm-plugin-activation.php';
			require_once {{theme_constant}}_THEME_DIR . 'core/tgmpa/tgmpa-{{text_domain}}.php';
		}


	}


}