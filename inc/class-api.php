<?php
/**
 * REST API functionality for WooCommerce Cart Share & Quote
 */

class WC_Cart_Share_Quote_API {
    
    private $user_endpoint;
    private $site_endpoint;
    private $cart_endpoint;
    private $settings_endpoint;
    
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
        require_once WC_CART_SHARE_QUOTE_DIR . 'api/class-user-endpoint.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'api/class-site-endpoint.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'api/class-cart-endpoint.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'api/class-settings-endpoint.php';
        
        $this->user_endpoint = new WC_Cart_Share_Quote_User_Endpoint();
        $this->site_endpoint = new WC_Cart_Share_Quote_Site_Endpoint();
        $this->cart_endpoint = new WC_Cart_Share_Quote_Cart_Endpoint();
        $this->settings_endpoint = new WC_Cart_Share_Quote_Settings_Endpoint();
    }
    
    /**
     * Initialize REST API endpoints
     */
    public function initRestApi() {
        // Register our endpoints
        $this->user_endpoint->register();
        $this->site_endpoint->register();
        $this->cart_endpoint->register();
        $this->settings_endpoint->register_routes();
        
        // Register a simple status endpoint
        register_rest_route('wc-cart-share-quote/v1', '/status', [
            'methods' => 'GET',
            'callback' => [$this, 'getStatus'],
            'permission_callback' => '__return_true'
        ]);
        
        // Register a debug endpoint that always works
        register_rest_route('wc-cart-share-quote/v1', '/debug', [
            'methods' => 'GET',
            'callback' => [$this, 'getDebug'],
            'permission_callback' => '__return_true'
        ]);
        
        // Register a simple test POST endpoint
        register_rest_route('wc-cart-share-quote/v1', '/test-post', [
            'methods' => 'POST',
            'callback' => [$this, 'testPost'],
            'permission_callback' => '__return_true'
        ]);
        
        // Register debug endpoint to check shared carts
        register_rest_route('wc-cart-share-quote/v1', '/debug-shared-carts', [
            'methods' => 'GET',
            'callback' => [$this, 'debugSharedCarts'],
            'permission_callback' => '__return_true'
        ]);
    }
    
    /**
     * API status endpoint (no auth required)
     */
    public function getStatus() {
        return rest_ensure_response([
            'success' => true,
            'message' => 'WooCommerce Cart Share & Quote API is working!',
            'version' => WC_CART_SHARE_QUOTE_VERSION,
            'endpoints' => [
                'user' => rest_url('wc-cart-share-quote/v1/user'),
                'site' => rest_url('wc-cart-share-quote/v1/site'),
                'cart' => rest_url('wc-cart-share-quote/v1/cart'),
                'status' => rest_url('wc-cart-share-quote/v1/status'),
                'debug' => rest_url('wc-cart-share-quote/v1/debug')
            ]
        ]);
    }
    
    /**
     * API debug endpoint (no auth required, always works)
     */
    public function getDebug() {
        return rest_ensure_response([
            'success' => true,
            'message' => 'Debug endpoint working!',
            'timestamp' => current_time('mysql'),
            'wp_version' => get_bloginfo('version'),
            'wc_active' => class_exists('WooCommerce'),
            'wc_version' => class_exists('WooCommerce') ? WC()->version : 'not available',
            'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
            'http_host' => $_SERVER['HTTP_HOST'] ?? 'unknown'
        ]);
    }
    
    /**
     * Test POST endpoint
     */
    public function testPost($request) {
        error_log('WC Cart Share Quote: Test POST endpoint called');
        
        $data = $request->get_json_params();
        error_log('WC Cart Share Quote: Received data: ' . print_r($data, true));
        
        return rest_ensure_response([
            'success' => true,
            'message' => 'Test POST endpoint working!',
            'received_data' => $data,
            'timestamp' => current_time('mysql')
        ]);
    }
    
    /**
     * Debug shared carts endpoint
     */
    public function debugSharedCarts($request) {
        $shared_carts = get_posts([
            'post_type' => 'shared_cart',
            'post_status' => 'publish',
            'posts_per_page' => 10,
            'meta_query' => []
        ]);
        
        $debug_info = [];
        foreach ($shared_carts as $cart) {
            $debug_info[] = [
                'id' => $cart->ID,
                'title' => $cart->post_title,
                'slug' => $cart->post_name,
                'permalink' => get_permalink($cart->ID),
                'post_status' => $cart->post_status,
                'cart_hash' => get_post_meta($cart->ID, '_cart_hash', true),
                'customer_name' => get_post_meta($cart->ID, '_customer_name', true),
                'expires_at' => get_post_meta($cart->ID, '_expires_at', true)
            ];
        }
        
        return rest_ensure_response([
            'success' => true,
            'shared_carts_count' => count($shared_carts),
            'shared_carts' => $debug_info,
            'post_type_exists' => post_type_exists('shared_cart'),
            'rewrite_rules' => get_option('rewrite_rules')
        ]);
    }
}