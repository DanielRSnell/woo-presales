<?php
/**
 * Plugin Name: Shadow Plugin Boilerplate
 * Description: A WordPress plugin boilerplate with React Shadow DOM architecture and Raycast design system
 * Version: 1.0.0
 * Author: Daniel Snell @Umbral.ai
 * License: GPL v2 or later
 * Text Domain: shadow-plugin
 * Domain Path: /languages
 *
 * @package ShadowPlugin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SHADOW_PLUGIN_VERSION', '1.0.0');
define('SHADOW_PLUGIN_FILE', __FILE__);
define('SHADOW_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SHADOW_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SHADOW_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class ShadowPlugin {
    
    /**
     * Single instance of the class
     */
    private static $instance = null;
    
    /**
     * Plugin modules
     */
    private $admin;
    private $assets;
    private $api;
    
    /**
     * Get single instance
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->loadDependencies();
        $this->init();
    }
    
    /**
     * Load required dependencies
     */
    private function loadDependencies() {
        require_once SHADOW_PLUGIN_DIR . 'inc/class-admin.php';
        require_once SHADOW_PLUGIN_DIR . 'inc/class-assets.php';
        require_once SHADOW_PLUGIN_DIR . 'inc/class-api.php';
    }
    
    /**
     * Initialize the plugin
     */
    private function init() {
        // Initialize modules
        $this->admin = new ShadowPlugin_Admin();
        $this->assets = new ShadowPlugin_Assets();
        $this->api = new ShadowPlugin_API();
        
        // Hook into WordPress
        add_action('init', [$this, 'onInit']);
        
        // Initialize modules
        $this->admin->init();
        $this->assets->init();
        $this->api->init();
        
        // Plugin lifecycle hooks
        register_activation_hook(__FILE__, [$this, 'onActivation']);
        register_deactivation_hook(__FILE__, [$this, 'onDeactivation']);
    }
    
    /**
     * Initialize plugin
     */
    public function onInit() {
        // Load text domain
        load_plugin_textdomain('shadow-plugin', false, dirname(SHADOW_PLUGIN_BASENAME) . '/languages');
    }
    
    /**
     * Plugin activation
     */
    public function onActivation() {
        // Flush rewrite rules for REST API
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function onDeactivation() {
        // Clean up
        flush_rewrite_rules();
    }
}

// Initialize the plugin
function shadowPlugin() {
    return ShadowPlugin::getInstance();
}

// Start the plugin
shadowPlugin();