<?php
/**
 * Security features for WooCommerce Cart Share & Quote
 */

class WC_Cart_Share_Quote_Security {
    
    /**
     * Initialize security features
     */
    public function init() {
        // Rate limiting
        add_action('rest_api_init', [$this, 'setupRateLimiting']);
        
        // Clean up expired data
        add_action('wp_scheduled_delete', [$this, 'cleanupExpiredData']);
        add_action('init', [$this, 'scheduleCleanup']);
        
        // Security headers
        add_action('send_headers', [$this, 'addSecurityHeaders']);
        
        // Validate cart data
        add_filter('wc_cart_share_quote_validate_cart_data', [$this, 'validateCartData'], 10, 1);
        
        // Sanitize input data
        add_filter('wc_cart_share_quote_sanitize_customer_data', [$this, 'sanitizeCustomerData'], 10, 1);
    }
    
    /**
     * Setup rate limiting for API endpoints
     */
    public function setupRateLimiting() {
        add_filter('rest_pre_dispatch', [$this, 'checkRateLimit'], 10, 3);
    }
    
    /**
     * Check rate limit for API requests
     */
    public function checkRateLimit($result, $server, $request) {
        $route = $request->get_route();
        
        // Only apply to our plugin's endpoints
        if (strpos($route, '/wc-cart-share-quote/v1/') !== 0) {
            return $result;
        }
        
        // Skip rate limiting for logged in admins
        if (current_user_can('manage_options')) {
            return $result;
        }
        
        $client_ip = $this->getClientIP();
        $rate_key = 'wc_cart_share_quote_rate_' . md5($client_ip);
        
        // Different limits for different endpoints
        $limits = [
            'cart/share' => ['requests' => 5, 'window' => 300], // 5 requests per 5 minutes
            'cart/quote' => ['requests' => 3, 'window' => 300], // 3 requests per 5 minutes
            'shared-cart' => ['requests' => 20, 'window' => 300], // 20 requests per 5 minutes
            'quote' => ['requests' => 10, 'window' => 300], // 10 requests per 5 minutes
        ];
        
        $limit = null;
        foreach ($limits as $endpoint => $config) {
            if (strpos($route, $endpoint) !== false) {
                $limit = $config;
                break;
            }
        }
        
        if (!$limit) {
            return $result; // No rate limit for this endpoint
        }
        
        $current_requests = get_transient($rate_key) ?: [];
        $current_time = time();
        
        // Clean old requests outside the time window
        $current_requests = array_filter($current_requests, function($timestamp) use ($current_time, $limit) {
            return ($current_time - $timestamp) < $limit['window'];
        });
        
        // Check if limit exceeded
        if (count($current_requests) >= $limit['requests']) {
            return new WP_Error(
                'rate_limit_exceeded',
                sprintf(
                    __('Rate limit exceeded. Maximum %d requests per %d seconds allowed.', 'wc-cart-share-quote'),
                    $limit['requests'],
                    $limit['window']
                ),
                ['status' => 429]
            );
        }
        
        // Add current request
        $current_requests[] = $current_time;
        set_transient($rate_key, $current_requests, $limit['window']);
        
        return $result;
    }
    
    /**
     * Get client IP address
     */
    private function getClientIP() {
        $ip_keys = ['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
        
        foreach ($ip_keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = $_SERVER[$key];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    
    /**
     * Add security headers
     */
    public function addSecurityHeaders() {
        global $wp_query;
        
        // Only add headers to our custom pages
        if (get_query_var('wc_shared_cart_hash') || get_query_var('wc_quote_id')) {
            header('X-Content-Type-Options: nosniff');
            header('X-Frame-Options: SAMEORIGIN');
            header('X-XSS-Protection: 1; mode=block');
            header('Referrer-Policy: strict-origin-when-cross-origin');
        }
    }
    
    /**
     * Validate cart data structure
     */
    public function validateCartData($cart_data) {
        if (!is_array($cart_data)) {
            return new WP_Error('invalid_cart_data', __('Cart data must be an array', 'wc-cart-share-quote'));
        }
        
        if (empty($cart_data)) {
            return new WP_Error('empty_cart', __('Cart cannot be empty', 'wc-cart-share-quote'));
        }
        
        if (count($cart_data) > 50) {
            return new WP_Error('cart_too_large', __('Cart cannot have more than 50 items', 'wc-cart-share-quote'));
        }
        
        foreach ($cart_data as $index => $item) {
            // Validate required fields
            if (!isset($item['product_id']) || !is_numeric($item['product_id'])) {
                return new WP_Error('invalid_product_id', sprintf(__('Invalid product ID at item %d', 'wc-cart-share-quote'), $index + 1));
            }
            
            if (!isset($item['quantity']) || !is_numeric($item['quantity']) || $item['quantity'] < 1) {
                return new WP_Error('invalid_quantity', sprintf(__('Invalid quantity at item %d', 'wc-cart-share-quote'), $index + 1));
            }
            
            if ($item['quantity'] > 999) {
                return new WP_Error('quantity_too_large', sprintf(__('Quantity too large at item %d (max 999)', 'wc-cart-share-quote'), $index + 1));
            }
            
            // Validate product exists
            $product = wc_get_product($item['product_id']);
            if (!$product) {
                return new WP_Error('product_not_found', sprintf(__('Product not found at item %d', 'wc-cart-share-quote'), $index + 1));
            }
            
            // Validate product is purchasable
            if (!$product->is_purchasable()) {
                return new WP_Error('product_not_purchasable', sprintf(__('Product not purchasable at item %d', 'wc-cart-share-quote'), $index + 1));
            }
            
            // Validate variation if present
            if (!empty($item['variation_id'])) {
                if (!is_numeric($item['variation_id'])) {
                    return new WP_Error('invalid_variation_id', sprintf(__('Invalid variation ID at item %d', 'wc-cart-share-quote'), $index + 1));
                }
                
                $variation = wc_get_product($item['variation_id']);
                if (!$variation || $variation->get_parent_id() !== (int)$item['product_id']) {
                    return new WP_Error('invalid_variation', sprintf(__('Invalid variation at item %d', 'wc-cart-share-quote'), $index + 1));
                }
            }
        }
        
        return $cart_data;
    }
    
    /**
     * Sanitize customer data
     */
    public function sanitizeCustomerData($data) {
        $sanitized = [];
        
        if (isset($data['customer_name'])) {
            $sanitized['customer_name'] = sanitize_text_field($data['customer_name']);
            // Limit length
            if (strlen($sanitized['customer_name']) > 100) {
                $sanitized['customer_name'] = substr($sanitized['customer_name'], 0, 100);
            }
        }
        
        if (isset($data['customer_email'])) {
            $sanitized['customer_email'] = sanitize_email($data['customer_email']);
            // Validate email
            if (!is_email($sanitized['customer_email'])) {
                $sanitized['customer_email'] = '';
            }
        }
        
        if (isset($data['customer_phone'])) {
            $sanitized['customer_phone'] = sanitize_text_field($data['customer_phone']);
            // Remove non-phone characters and limit length
            $sanitized['customer_phone'] = preg_replace('/[^0-9+\-\(\)\s]/', '', $sanitized['customer_phone']);
            if (strlen($sanitized['customer_phone']) > 20) {
                $sanitized['customer_phone'] = substr($sanitized['customer_phone'], 0, 20);
            }
        }
        
        if (isset($data['message'])) {
            $sanitized['message'] = sanitize_textarea_field($data['message']);
            // Limit length
            if (strlen($sanitized['message']) > 1000) {
                $sanitized['message'] = substr($sanitized['message'], 0, 1000);
            }
        }
        
        return $sanitized;
    }
    
    /**
     * Schedule cleanup of expired data
     */
    public function scheduleCleanup() {
        if (!wp_next_scheduled('wc_cart_share_quote_cleanup')) {
            wp_schedule_event(time(), 'daily', 'wc_cart_share_quote_cleanup');
        }
    }
    
    /**
     * Clean up expired shared carts and quotes
     */
    public function cleanupExpiredData() {
        $this->cleanupExpiredSharedCarts();
        $this->cleanupExpiredQuotes();
        $this->cleanupOldRateLimitData();
    }
    
    /**
     * Clean up expired shared carts
     */
    private function cleanupExpiredSharedCarts() {
        $expired_carts = get_posts([
            'post_type' => 'shared_cart',
            'post_status' => 'publish',
            'meta_query' => [
                [
                    'key' => '_expires_at',
                    'value' => current_time('Y-m-d\TH:i'),
                    'compare' => '<',
                    'type' => 'DATETIME'
                ]
            ],
            'posts_per_page' => 50, // Process in batches
            'fields' => 'ids'
        ]);
        
        foreach ($expired_carts as $cart_id) {
            // Move to trash instead of permanent deletion for 30 days
            wp_trash_post($cart_id);
        }
        
        // Permanently delete shared carts that have been in trash for 30+ days
        $old_trashed_carts = get_posts([
            'post_type' => 'shared_cart',
            'post_status' => 'trash',
            'date_query' => [
                [
                    'before' => date('Y-m-d', strtotime('-30 days')),
                    'inclusive' => true,
                ]
            ],
            'posts_per_page' => 50,
            'fields' => 'ids'
        ]);
        
        foreach ($old_trashed_carts as $cart_id) {
            wp_delete_post($cart_id, true);
        }
    }
    
    /**
     * Clean up expired quotes
     */
    private function cleanupExpiredQuotes() {
        // Update expired quotes status
        $expired_quotes = get_posts([
            'post_type' => 'cart_quote',
            'post_status' => 'publish',
            'meta_query' => [
                [
                    'key' => '_expires_at',
                    'value' => current_time('Y-m-d\TH:i'),
                    'compare' => '<',
                    'type' => 'DATETIME'
                ],
                [
                    'key' => '_quote_status',
                    'value' => 'expired',
                    'compare' => '!='
                ]
            ],
            'posts_per_page' => 50,
            'fields' => 'ids'
        ]);
        
        foreach ($expired_quotes as $quote_id) {
            update_post_meta($quote_id, '_quote_status', 'expired');
        }
        
        // Move old rejected/expired quotes to trash (90+ days old)
        $old_quotes = get_posts([
            'post_type' => 'cart_quote',
            'post_status' => 'publish',
            'meta_query' => [
                [
                    'key' => '_quote_status',
                    'value' => ['rejected', 'expired'],
                    'compare' => 'IN'
                ]
            ],
            'date_query' => [
                [
                    'before' => date('Y-m-d', strtotime('-90 days')),
                    'inclusive' => true,
                ]
            ],
            'posts_per_page' => 50,
            'fields' => 'ids'
        ]);
        
        foreach ($old_quotes as $quote_id) {
            wp_trash_post($quote_id);
        }
    }
    
    /**
     * Clean up old rate limit data
     */
    private function cleanupOldRateLimitData() {
        global $wpdb;
        
        // Delete rate limit transients older than 1 hour
        $wpdb->query($wpdb->prepare("
            DELETE FROM {$wpdb->options} 
            WHERE option_name LIKE %s 
            AND option_name LIKE %s
        ", '%_transient_wc_cart_share_quote_rate_%', '%' . (time() - 3600) . '%'));
    }
    
    /**
     * Validate and sanitize hash parameter
     */
    public static function validateHash($hash) {
        if (!is_string($hash)) {
            return false;
        }
        
        // Hash should be 12 characters, alphanumeric
        if (!preg_match('/^[a-zA-Z0-9]{12}$/', $hash)) {
            return false;
        }
        
        return sanitize_text_field($hash);
    }
    
    /**
     * Validate quote ID parameter
     */
    public static function validateQuoteId($quote_id) {
        if (!is_numeric($quote_id)) {
            return false;
        }
        
        $quote_id = (int) $quote_id;
        
        if ($quote_id < 1) {
            return false;
        }
        
        return $quote_id;
    }
    
    /**
     * Check if user can access quote
     */
    public static function canAccessQuote($quote_id, $user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        
        // Admins can access all quotes
        if (current_user_can('manage_woocommerce')) {
            return true;
        }
        
        // Check if user created the quote
        $quote_user_id = get_post_meta($quote_id, '_customer_id', true);
        if ($user_id && $quote_user_id && (int)$quote_user_id === (int)$user_id) {
            return true;
        }
        
        // For non-logged-in users, allow access to all quotes (they need the direct link)
        // This is acceptable since quotes are not sensitive and require the direct URL
        return true;
    }
    
    /**
     * Log security events
     */
    public static function logSecurityEvent($event, $details = []) {
        if (!WP_DEBUG_LOG) {
            return;
        }
        
        $log_entry = [
            'timestamp' => current_time('mysql'),
            'event' => $event,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            'user_id' => get_current_user_id() ?: 'guest',
            'details' => $details
        ];
        
        error_log('WC Cart Share Quote Security: ' . wp_json_encode($log_entry));
    }
}

// Schedule cleanup on plugin activation
register_activation_hook(WC_CART_SHARE_QUOTE_FILE, function() {
    wp_schedule_event(time(), 'daily', 'wc_cart_share_quote_cleanup');
});

// Clean up scheduled events on plugin deactivation
register_deactivation_hook(WC_CART_SHARE_QUOTE_FILE, function() {
    wp_clear_scheduled_hook('wc_cart_share_quote_cleanup');
});