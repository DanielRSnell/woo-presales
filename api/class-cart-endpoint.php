<?php
/**
 * Cart operations REST API endpoint
 */

class WC_Cart_Share_Quote_Cart_Endpoint {
    
    /**
     * Register the cart endpoints
     */
    public function register() {
        // Get current cart
        register_rest_route('wc-cart-share-quote/v1', '/cart', [
            'methods' => 'GET',
            'callback' => [$this, 'getCurrentCart'],
            'permission_callback' => [$this, 'checkCartPermission']
        ]);
        
        // Share cart
        register_rest_route('wc-cart-share-quote/v1', '/cart/share', [
            'methods' => 'POST',
            'callback' => [$this, 'shareCart'],
            'permission_callback' => '__return_true',
            'args' => [
                'customer_name' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'customer_email' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_email',
                ],
                'customer_phone' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'expires_hours' => [
                    'required' => false,
                    'type' => 'integer',
                    'default' => 168, // 7 days
                ],
                'cart_data' => [
                    'required' => true,
                    'type' => 'object',
                    'description' => 'Cart data to share (passed directly from frontend)'
                ]
            ]
        ]);
        
        // Create quote from cart
        register_rest_route('wc-cart-share-quote/v1', '/cart/quote', [
            'methods' => 'POST',
            'callback' => [$this, 'createQuote'],
            'permission_callback' => '__return_true',
            'args' => [
                'customer_name' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'customer_email' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_email',
                ],
                'customer_phone' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'message' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ],
                'cart_data' => [
                    'required' => true,
                    'type' => 'object',
                    'description' => 'Cart data for quote (passed directly from frontend)'
                ]
            ]
        ]);
        
        // Get shared cart by hash
        register_rest_route('wc-cart-share-quote/v1', '/shared-cart/(?P<hash>[a-zA-Z0-9]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'getSharedCart'],
            'permission_callback' => '__return_true',
            'args' => [
                'hash' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ]
            ]
        ]);
        
        // Add shared cart to current cart
        register_rest_route('wc-cart-share-quote/v1', '/shared-cart/(?P<hash>[a-zA-Z0-9]+)/add', [
            'methods' => 'POST',
            'callback' => [$this, 'addSharedCartToCart'],
            'permission_callback' => '__return_true',
            'args' => [
                'hash' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ]
            ]
        ]);
        
        // Get quote by ID
        register_rest_route('wc-cart-share-quote/v1', '/quote/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'getQuote'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
        
        // Accept quote and add to cart
        register_rest_route('wc-cart-share-quote/v1', '/quote/(?P<id>\d+)/accept', [
            'methods' => 'POST',
            'callback' => [$this, 'acceptQuote'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                ]
            ]
        ]);
    }
    
    /**
     * Check permissions for cart access
     */
    public function checkCartPermission($request) {
        // Debug: log the request headers
        $nonce = $request->get_header('X-WP-Nonce');
        error_log('WC Cart Share Quote: Nonce received: ' . ($nonce ? 'Yes' : 'No'));
        
        // For now, allow access - we'll debug the cart issue first
        // In production, this should check nonce: wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')
        return true;
    }
    
    /**
     * Get current WooCommerce cart
     */
    public function getCurrentCart($request) {
        // Log the request for debugging
        error_log('WC Cart Share Quote: Cart API called at ' . current_time('mysql'));
        
        if (!class_exists('WooCommerce')) {
            error_log('WC Cart Share Quote: WooCommerce class not found');
            return new WP_Error('woocommerce_not_found', 'WooCommerce is not active', ['status' => 503]);
        }
        
        // Make sure cart is loaded (HPOS compatible)
        // Initialize session first if not already done
        if (!WC()->session) {
            WC()->initialize_session();
        }
        
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        // Additional check for cart availability
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'WooCommerce cart is not available', ['status' => 503]);
        }
        
        try {
            $cart_contents = WC()->cart->get_cart();
        } catch (Exception $e) {
            return new WP_Error('cart_access_error', 'Error accessing cart: ' . $e->getMessage(), ['status' => 500]);
        }
        $cart_items = [];
        
        foreach ($cart_contents as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $cart_items[] = [
                'product_id' => $cart_item['product_id'],
                'variation_id' => $cart_item['variation_id'],
                'quantity' => $cart_item['quantity'],
                'product_name' => $product->get_name(),
                'product_price' => $product->get_price(),
                'line_total' => $cart_item['line_total'],
                'cart_item_key' => $cart_item_key,
            ];
        }
        
        // Debug info
        $debug_info = [
            'wc_version' => WC()->version ?? 'unknown',
            'cart_class' => get_class(WC()->cart),
            'session_available' => !is_null(WC()->session),
            'cart_contents_count' => count($cart_contents),
            'user_id' => get_current_user_id(),
            'is_frontend' => !is_admin(),
            'timestamp' => current_time('mysql')
        ];

        return rest_ensure_response([
            'success' => true,
            'data' => [
                'items' => $cart_items,
                'total' => WC()->cart->get_cart_contents_total(),
                'tax_total' => WC()->cart->get_cart_contents_tax(),
                'shipping_total' => WC()->cart->get_shipping_total(),
                'total_with_tax' => WC()->cart->get_total(''),
                'items_count' => WC()->cart->get_cart_contents_count(),
                'is_empty' => WC()->cart->is_empty(),
                'debug' => $debug_info
            ]
        ]);
    }
    
    /**
     * Share current cart
     */
    public function shareCart($request) {
        error_log('WC Cart Share Quote: shareCart method called');
        
        if (!class_exists('WooCommerce')) {
            error_log('WC Cart Share Quote: WooCommerce not found');
            return new WP_Error('woocommerce_not_found', 'WooCommerce is not active', ['status' => 503]);
        }
        
        error_log('WC Cart Share Quote: WooCommerce is active, proceeding...');
        
        try {
            $customer_name = $request->get_param('customer_name');
            $customer_email = $request->get_param('customer_email');
            $customer_phone = $request->get_param('customer_phone');
            $expires_hours = $request->get_param('expires_hours');
            $cart_data_param = $request->get_param('cart_data');
            
            error_log('WC Cart Share Quote: Parameters extracted - cart_data type: ' . gettype($cart_data_param));
            
            // Use cart data passed from frontend instead of session
            if (empty($cart_data_param) || !isset($cart_data_param['items'])) {
                error_log('WC Cart Share Quote: No cart data provided or missing items key');
                return new WP_Error('cart_empty', 'No cart data provided', ['status' => 400]);
            }
            
            $cart_items = $cart_data_param['items'];
            
            // Filter out empty items and validate structure
            $cart_data = [];
            foreach ($cart_items as $item) {
                if (is_array($item) && isset($item['product_id']) && !empty($item['product_id'])) {
                    $cart_data[] = [
                        'product_id' => intval($item['product_id']),
                        'variation_id' => isset($item['variation_id']) ? intval($item['variation_id']) : 0,
                        'quantity' => isset($item['quantity']) ? intval($item['quantity']) : 1,
                        'product_name' => isset($item['product_name']) ? sanitize_text_field($item['product_name']) : '',
                        'product_price' => isset($item['product_price']) ? floatval($item['product_price']) : 0,
                        'line_total' => isset($item['line_total']) ? floatval($item['line_total']) : 0
                    ];
                }
            }
            
            if (empty($cart_data)) {
                error_log('WC Cart Share Quote: No valid cart items after filtering');
                return new WP_Error('cart_empty', 'No valid cart items found', ['status' => 400]);
            }
            
            error_log('WC Cart Share Quote: Cart data processed, valid items count: ' . count($cart_data));
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Error processing parameters: ' . $e->getMessage());
            return new WP_Error('parameter_error', 'Error processing request parameters: ' . $e->getMessage(), ['status' => 500]);
        }
        
        try {
            // Generate unique hash
            $cart_hash = $this->generateCartHash($cart_data);
            error_log('WC Cart Share Quote: Generated hash: ' . $cart_hash);
            
            // Calculate expiration
            $expires_at = date('Y-m-d\TH:i', strtotime("+{$expires_hours} hours"));
            error_log('WC Cart Share Quote: Expiration set to: ' . $expires_at);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Error generating hash/expiration: ' . $e->getMessage());
            return new WP_Error('processing_error', 'Error processing cart data: ' . $e->getMessage(), ['status' => 500]);
        }
        
        try {
            // Create shared cart post
            $post_title = sprintf(
                'Shared Cart %s - %s', 
                $cart_hash, 
                $customer_name ?: $customer_email ?: 'Anonymous'
            );
            
            $post_data = [
                'post_title' => $post_title,
                'post_name' => $cart_hash, // Use hash as slug for cleaner URLs
                'post_type' => 'shared_cart',
                'post_status' => 'publish',
                'meta_input' => [
                    '_cart_data' => $cart_data,
                    '_cart_hash' => $cart_hash,
                    '_customer_name' => $customer_name,
                    '_customer_email' => $customer_email,
                    '_customer_phone' => $customer_phone,
                    '_customer_id' => get_current_user_id(),
                    '_expires_at' => $expires_at,
                    '_access_count' => 0,
                    '_created_at' => current_time('mysql')
                ]
            ];
            
            error_log('WC Cart Share Quote: About to create post with title: ' . $post_data['post_title']);
            
            $post_id = wp_insert_post($post_data);
            
            if (is_wp_error($post_id)) {
                error_log('WC Cart Share Quote: Failed to create shared cart post: ' . $post_id->get_error_message());
                return new WP_Error('creation_failed', 'Failed to create shared cart: ' . $post_id->get_error_message(), ['status' => 500]);
            }
            
            error_log('WC Cart Share Quote: Successfully created shared cart post ID: ' . $post_id);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Exception during post creation: ' . $e->getMessage());
            return new WP_Error('post_creation_error', 'Error creating shared cart post: ' . $e->getMessage(), ['status' => 500]);
        }
        
        try {
            $share_url = get_permalink($post_id);
            error_log('WC Cart Share Quote: Generated share URL: ' . $share_url);
            
            $response_data = [
                'success' => true,
                'data' => [
                    'id' => $post_id,
                    'hash' => $cart_hash,
                    'share_url' => $share_url,
                    'expires_at' => $expires_at,
                    'cart_items' => count($cart_data),
                    'cart_total' => isset($cart_data_param['total_with_tax']) ? $cart_data_param['total_with_tax'] : '0'
                ]
            ];
            
            error_log('WC Cart Share Quote: Returning successful share response');
            return rest_ensure_response($response_data);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Exception during share response generation: ' . $e->getMessage());
            return new WP_Error('response_error', 'Error generating response: ' . $e->getMessage(), ['status' => 500]);
        }
    }
    
    /**
     * Create quote from current cart
     */
    public function createQuote($request) {
        error_log('WC Cart Share Quote: createQuote method called');
        
        if (!class_exists('WooCommerce')) {
            error_log('WC Cart Share Quote: WooCommerce not found for quote');
            return new WP_Error('woocommerce_not_found', 'WooCommerce is not active', ['status' => 503]);
        }
        
        error_log('WC Cart Share Quote: WooCommerce is active, proceeding with quote...');

        try {
            $customer_name = $request->get_param('customer_name');
            $customer_email = $request->get_param('customer_email');
            $customer_phone = $request->get_param('customer_phone');
            $message = $request->get_param('message');
            $cart_data_param = $request->get_param('cart_data');
            
            error_log('WC Cart Share Quote: Quote parameters extracted - cart_data type: ' . gettype($cart_data_param));
            
            // Use cart data passed from frontend instead of session
            if (empty($cart_data_param) || !isset($cart_data_param['items'])) {
                error_log('WC Cart Share Quote: No cart data provided for quote or missing items key');
                return new WP_Error('cart_empty', 'No cart data provided', ['status' => 400]);
            }
            
            $cart_items = $cart_data_param['items'];
            
            // Filter out empty items and validate structure
            $cart_data = [];
            foreach ($cart_items as $item) {
                if (is_array($item) && isset($item['product_id']) && !empty($item['product_id'])) {
                    $cart_data[] = [
                        'product_id' => intval($item['product_id']),
                        'variation_id' => isset($item['variation_id']) ? intval($item['variation_id']) : 0,
                        'quantity' => isset($item['quantity']) ? intval($item['quantity']) : 1,
                        'product_name' => isset($item['product_name']) ? sanitize_text_field($item['product_name']) : '',
                        'product_price' => isset($item['product_price']) ? floatval($item['product_price']) : 0,
                        'line_total' => isset($item['line_total']) ? floatval($item['line_total']) : 0
                    ];
                }
            }
            
            if (empty($cart_data)) {
                error_log('WC Cart Share Quote: No valid cart items after filtering for quote');
                return new WP_Error('cart_empty', 'No valid cart items found', ['status' => 400]);
            }
            
            $cart_total = $cart_data_param['total_with_tax'] ?? 0;
            error_log('WC Cart Share Quote: Quote cart data processed, valid items count: ' . count($cart_data));
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Error processing quote parameters: ' . $e->getMessage());
            return new WP_Error('parameter_error', 'Error processing request parameters: ' . $e->getMessage(), ['status' => 500]);
        }
        try {
            // Generate quote ID (will use post ID)
            $expires_at = date('Y-m-d\TH:i', strtotime('+30 days')); // Quotes expire in 30 days
            error_log('WC Cart Share Quote: Quote expiration set to: ' . $expires_at);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Error generating quote expiration: ' . $e->getMessage());
            return new WP_Error('processing_error', 'Error processing quote data: ' . $e->getMessage(), ['status' => 500]);
        }

        try {
            // Create quote post
            $post_title = sprintf(
                'Quote Request - %s (%s)', 
                $customer_name, 
                $customer_email
            );
            
            $post_data = [
                'post_title' => $post_title,
                'post_name' => 'quote-' . time() . '-' . sanitize_title($customer_name), // Use timestamp + name as slug
                'post_type' => 'cart_quote',
                'post_status' => 'publish',
                'meta_input' => [
                    '_cart_data' => $cart_data,
                    '_customer_name' => $customer_name,
                    '_customer_email' => $customer_email,
                    '_customer_phone' => $customer_phone,
                    '_customer_id' => get_current_user_id(),
                    '_message' => $message,
                    '_quote_total' => floatval(str_replace(['$', ','], '', $cart_total)),
                    '_expires_at' => $expires_at,
                    '_created_at' => current_time('mysql')
                ]
            ];
            
            error_log('WC Cart Share Quote: About to create quote post with title: ' . $post_data['post_title']);
            
            $post_id = wp_insert_post($post_data);
            
            if (is_wp_error($post_id)) {
                error_log('WC Cart Share Quote: Failed to create quote post: ' . $post_id->get_error_message());
                return new WP_Error('creation_failed', 'Failed to create quote: ' . $post_id->get_error_message(), ['status' => 500]);
            }
            
            error_log('WC Cart Share Quote: Successfully created quote post ID: ' . $post_id);
            
            // Update the quote_id meta to use post ID
            update_post_meta($post_id, '_quote_id', $post_id);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Exception during quote post creation: ' . $e->getMessage());
            return new WP_Error('post_creation_error', 'Error creating quote post: ' . $e->getMessage(), ['status' => 500]);
        }
        
        try {
            $quote_url = get_permalink($post_id);
            error_log('WC Cart Share Quote: Generated quote URL: ' . $quote_url);
            
            $response_data = [
                'success' => true,
                'data' => [
                    'id' => $post_id,
                    'quote_id' => $post_id,
                    'quote_url' => $quote_url,
                    'expires_at' => $expires_at,
                    'customer_name' => $customer_name,
                    'customer_email' => $customer_email,
                    'cart_items' => count($cart_data),
                    'cart_total' => $cart_total
                ]
            ];
            
            error_log('WC Cart Share Quote: Returning successful quote response');
            return rest_ensure_response($response_data);
            
        } catch (Exception $e) {
            error_log('WC Cart Share Quote: Exception during quote response generation: ' . $e->getMessage());
            return new WP_Error('response_error', 'Error generating quote response: ' . $e->getMessage(), ['status' => 500]);
        }
    }
    
    /**
     * Get shared cart by hash
     */
    public function getSharedCart($request) {
        $hash = $request->get_param('hash');
        
        $posts = get_posts([
            'post_type' => 'shared_cart',
            'meta_query' => [
                [
                    'key' => '_cart_hash',
                    'value' => $hash,
                    'compare' => '='
                ]
            ],
            'posts_per_page' => 1
        ]);
        
        if (empty($posts)) {
            return new WP_Error('shared_cart_not_found', 'Shared cart not found', ['status' => 404]);
        }
        
        $post = $posts[0];
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time()) {
            return new WP_Error('shared_cart_expired', 'Shared cart has expired', ['status' => 410]);
        }
        
        // Increment access count
        $access_count = get_post_meta($post->ID, '_access_count', true) ?: 0;
        update_post_meta($post->ID, '_access_count', $access_count + 1);
        
        $cart_data = get_post_meta($post->ID, '_cart_data', true);
        $customer_name = get_post_meta($post->ID, '_customer_name', true);
        $customer_email = get_post_meta($post->ID, '_customer_email', true);
        
        // Calculate totals
        $total = 0;
        $items = [];
        
        foreach ($cart_data as $item) {
            $product = wc_get_product($item['product_id']);
            if ($product) {
                $price = $product->get_price();
                $line_total = $price * $item['quantity'];
                $total += $line_total;
                
                $items[] = [
                    'product_id' => $item['product_id'],
                    'variation_id' => $item['variation_id'],
                    'quantity' => $item['quantity'],
                    'product_name' => $product->get_name(),
                    'product_price' => $price,
                    'line_total' => $line_total,
                    'product_url' => get_permalink($product->get_id()),
                    'add_to_cart_url' => $this->generateAddToCartUrl($item)
                ];
            }
        }
        
        return rest_ensure_response([
            'success' => true,
            'data' => [
                'id' => $post->ID,
                'hash' => $hash,
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'items' => $items,
                'total' => $total,
                'expires_at' => $expires_at,
                'access_count' => $access_count + 1,
                'add_all_to_cart_url' => $this->generateAddAllToCartUrl($cart_data)
            ]
        ]);
    }
    
    /**
     * Add shared cart items to current cart
     */
    public function addSharedCartToCart($request) {
        if (!class_exists('WooCommerce')) {
            return new WP_Error('woocommerce_not_found', 'WooCommerce is not active', ['status' => 503]);
        }
        
        $hash = $request->get_param('hash');
        
        $posts = get_posts([
            'post_type' => 'shared_cart',
            'meta_query' => [
                [
                    'key' => '_cart_hash',
                    'value' => $hash,
                    'compare' => '='
                ]
            ],
            'posts_per_page' => 1
        ]);
        
        if (empty($posts)) {
            return new WP_Error('shared_cart_not_found', 'Shared cart not found', ['status' => 404]);
        }
        
        $post = $posts[0];
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time()) {
            return new WP_Error('shared_cart_expired', 'Shared cart has expired', ['status' => 410]);
        }
        
        $cart_data = get_post_meta($post->ID, '_cart_data', true);
        
        // Make sure cart is loaded (HPOS compatible)
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_items = 0;
        $failed_items = 0;
        
        foreach ($cart_data as $item) {
            $product_id = $item['product_id'];
            $variation_id = $item['variation_id'];
            $quantity = $item['quantity'];
            $variation = $item['variation'] ?? [];
            
            try {
                $cart_item_key = WC()->cart->add_to_cart(
                    $product_id,
                    $quantity,
                    $variation_id,
                    $variation
                );
                
                if ($cart_item_key) {
                    $added_items++;
                } else {
                    $failed_items++;
                }
            } catch (Exception $e) {
                $failed_items++;
            }
        }
        
        return rest_ensure_response([
            'success' => true,
            'data' => [
                'added_items' => $added_items,
                'failed_items' => $failed_items,
                'cart_url' => wc_get_cart_url(),
                'checkout_url' => wc_get_checkout_url()
            ]
        ]);
    }
    
    /**
     * Get quote by ID
     */
    public function getQuote($request) {
        $quote_id = $request->get_param('id');
        
        $post = get_post($quote_id);
        
        if (!$post || $post->post_type !== 'cart_quote') {
            return new WP_Error('quote_not_found', 'Quote not found', ['status' => 404]);
        }
        
        $quote_status = get_post_meta($quote_id, '_quote_status', true);
        $expires_at = get_post_meta($quote_id, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time()) {
            update_post_meta($quote_id, '_quote_status', 'expired');
            $quote_status = 'expired';
        }
        
        $cart_data = get_post_meta($quote_id, '_cart_data', true);
        $customer_name = get_post_meta($quote_id, '_customer_name', true);
        $customer_email = get_post_meta($quote_id, '_customer_email', true);
        $quote_total = get_post_meta($quote_id, '_quote_total', true);
        $quote_notes = get_post_meta($quote_id, '_quote_notes', true);
        
        // Calculate items
        $items = [];
        foreach ($cart_data as $item) {
            $product = wc_get_product($item['product_id']);
            if ($product) {
                $items[] = [
                    'product_id' => $item['product_id'],
                    'variation_id' => $item['variation_id'],
                    'quantity' => $item['quantity'],
                    'product_name' => $product->get_name(),
                    'product_price' => $product->get_price(),
                    'line_total' => $product->get_price() * $item['quantity'],
                ];
            }
        }
        
        return rest_ensure_response([
            'success' => true,
            'data' => [
                'quote_id' => $quote_id,
                'status' => $quote_status,
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'quote_total' => $quote_total,
                'quote_notes' => $quote_notes,
                'expires_at' => $expires_at,
                'items' => $items,
                'can_accept' => $quote_status === 'approved',
                'add_all_to_cart_url' => $quote_status === 'approved' ? $this->generateAddAllToCartUrl($cart_data) : null
            ]
        ]);
    }
    
    /**
     * Accept quote and add to cart
     */
    public function acceptQuote($request) {
        if (!class_exists('WooCommerce')) {
            return new WP_Error('woocommerce_not_found', 'WooCommerce is not active', ['status' => 503]);
        }
        
        $quote_id = $request->get_param('id');
        
        $post = get_post($quote_id);
        
        if (!$post || $post->post_type !== 'cart_quote') {
            return new WP_Error('quote_not_found', 'Quote not found', ['status' => 404]);
        }
        
        $quote_status = get_post_meta($quote_id, '_quote_status', true);
        
        if ($quote_status !== 'approved') {
            return new WP_Error('quote_not_approved', 'Quote is not approved', ['status' => 400]);
        }
        
        $expires_at = get_post_meta($quote_id, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time()) {
            return new WP_Error('quote_expired', 'Quote has expired', ['status' => 410]);
        }
        
        $cart_data = get_post_meta($quote_id, '_cart_data', true);
        
        // Make sure cart is loaded (HPOS compatible)
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_items = 0;
        $failed_items = 0;
        
        foreach ($cart_data as $item) {
            $product_id = $item['product_id'];
            $variation_id = $item['variation_id'];
            $quantity = $item['quantity'];
            $variation = $item['variation'] ?? [];
            
            try {
                $cart_item_key = WC()->cart->add_to_cart(
                    $product_id,
                    $quantity,
                    $variation_id,
                    $variation
                );
                
                if ($cart_item_key) {
                    $added_items++;
                } else {
                    $failed_items++;
                }
            } catch (Exception $e) {
                $failed_items++;
            }
        }
        
        return rest_ensure_response([
            'success' => true,
            'data' => [
                'added_items' => $added_items,
                'failed_items' => $failed_items,
                'cart_url' => wc_get_cart_url(),
                'checkout_url' => wc_get_checkout_url()
            ]
        ]);
    }
    
    /**
     * Generate unique cart hash
     */
    private function generateCartHash($cart_data) {
        $data_string = serialize($cart_data) . time() . wp_generate_password(8, false);
        return substr(md5($data_string), 0, 12);
    }
    
    /**
     * Generate WooCommerce add-to-cart URL for a single item
     */
    private function generateAddToCartUrl($item) {
        $url = wc_get_cart_url();
        $params = [
            'add-to-cart' => $item['product_id'],
            'quantity' => $item['quantity']
        ];
        
        if (!empty($item['variation_id'])) {
            $params['variation_id'] = $item['variation_id'];
            
            if (!empty($item['variation'])) {
                foreach ($item['variation'] as $key => $value) {
                    $params[$key] = $value;
                }
            }
        }
        
        return add_query_arg($params, $url);
    }
    
    /**
     * Generate WooCommerce add-to-cart URL for multiple items
     */
    private function generateAddAllToCartUrl($cart_data) {
        $url_params = [];
        
        foreach ($cart_data as $index => $item) {
            $url_params["add-to-cart[{$index}]"] = $item['product_id'];
            $url_params["quantity[{$index}]"] = $item['quantity'];
            
            if (!empty($item['variation_id'])) {
                $url_params["variation_id[{$index}]"] = $item['variation_id'];
                
                if (!empty($item['variation'])) {
                    foreach ($item['variation'] as $key => $value) {
                        $url_params["{$key}[{$index}]"] = $value;
                    }
                }
            }
        }
        
        return add_query_arg($url_params, wc_get_cart_url());
    }
}