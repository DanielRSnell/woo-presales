<?php
/**
 * REST API functionality for Shadow Plugin
 */

class ShadowPlugin_API {
    
    private $user_endpoint;
    private $site_endpoint;
    
    /**
     * Initialize API functionality
     */
    public function init() {
        add_action('rest_api_init', [$this, 'initRestApi']);
        $this->loadEndpoints();
    }
    
    /**
     * Load API endpoint classes
     */
    private function loadEndpoints() {
        require_once SHADOW_PLUGIN_DIR . 'api/class-user-endpoint.php';
        require_once SHADOW_PLUGIN_DIR . 'api/class-site-endpoint.php';
        
        $this->user_endpoint = new ShadowPlugin_User_Endpoint();
        $this->site_endpoint = new ShadowPlugin_Site_Endpoint();
    }
    
    /**
     * Initialize REST API endpoints
     */
    public function initRestApi() {
        // Register our endpoints
        $this->user_endpoint->register();
        $this->site_endpoint->register();
        
        // Register a simple status endpoint
        register_rest_route('shadow-plugin/v1', '/status', [
            'methods' => 'GET',
            'callback' => [$this, 'getStatus'],
            'permission_callback' => '__return_true'
        ]);
    }
    
    /**
     * API status endpoint (no auth required)
     */
    public function getStatus() {
        return rest_ensure_response([
            'success' => true,
            'message' => 'Shadow Plugin API is working!',
            'version' => SHADOW_PLUGIN_VERSION,
            'endpoints' => [
                'user' => rest_url('shadow-plugin/v1/user'),
                'site' => rest_url('shadow-plugin/v1/site'),
                'status' => rest_url('shadow-plugin/v1/status')
            ]
        ]);
    }
}