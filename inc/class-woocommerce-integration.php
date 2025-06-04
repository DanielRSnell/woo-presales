<?php
/**
 * WooCommerce integration for Cart Share & Quote
 */

class WC_Cart_Share_Quote_Integration {
    
    /**
     * Initialize WooCommerce integration
     */
    public function init() {
        // Ensure HPOS compatibility
        $this->ensureHPOSCompatibility();
        // Add cart page integration
        add_action('woocommerce_cart_actions', [$this, 'addCartActions']);
        
        // Add mini cart integration
        add_action('woocommerce_widget_shopping_cart_buttons', [$this, 'addMiniCartButtons'], 20);
        
        // Add checkout page integration
        add_action('woocommerce_checkout_before_customer_details', [$this, 'addCheckoutNotice']);
        
        // Add shortcodes
        add_shortcode('wc_cart_share_quote_buttons', [$this, 'renderShortcode']);
        add_shortcode('woo_presales', [$this, 'renderPresalesShortcode']);
        
        // Enqueue scripts on WooCommerce pages
        add_action('wp_enqueue_scripts', [$this, 'enqueueWooCommerceAssets']);
        
        // Add admin bar menu for logged in users
        add_action('admin_bar_menu', [$this, 'addAdminBarMenu'], 100);
    }
    
    /**
     * Add share/quote buttons to cart page
     */
    public function addCartActions() {
        if (WC()->cart->is_empty()) {
            return;
        }
        
        ?>
        <div class="wc-cart-share-quote-actions">
            <style>
                .wc-cart-share-quote-actions {
                    margin: 20px 0;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }
                .wc-cart-share-quote-actions h4 {
                    margin: 0 0 15px 0;
                    color: #333;
                }
                .wc-cart-share-quote-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .wc-cart-share-quote-button {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }
                .wc-cart-share-quote-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .wc-cart-share-quote-button.share {
                    background: #007cba;
                    color: white;
                }
                .wc-cart-share-quote-button.quote {
                    background: #00a32a;
                    color: white;
                }
                .wc-cart-share-quote-button.share:hover {
                    background: #005a87;
                    color: white;
                }
                .wc-cart-share-quote-button.quote:hover {
                    background: #007e1f;
                    color: white;
                }
                @media (max-width: 768px) {
                    .wc-cart-share-quote-buttons {
                        flex-direction: column;
                    }
                    .wc-cart-share-quote-button {
                        text-align: center;
                        justify-content: center;
                    }
                }
            </style>
            
            <h4><?php _e('Share Your Cart or Request a Quote', 'wc-cart-share-quote'); ?></h4>
            <p><?php _e('Share your cart with others or request a quote for bulk pricing.', 'wc-cart-share-quote'); ?></p>
            
            <div class="wc-cart-share-quote-buttons">
                <button type="button" class="wc-cart-share-quote-button share" onclick="event.preventDefault(); wcCartShareQuote.openShareModal();">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    <?php _e('Share Cart', 'wc-cart-share-quote'); ?>
                </button>
                
                <button type="button" class="wc-cart-share-quote-button quote" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                    <?php _e('Request Quote', 'wc-cart-share-quote'); ?>
                </button>
            </div>
        </div>
        
        <!-- React component will be mounted here -->
        <div id="wc-cart-share-quote-modals">
            <?php
            // Get current cart data
            $cart_data = [];
            if (WC()->cart && !WC()->cart->is_empty()) {
                $cart_contents = WC()->cart->get_cart();
                foreach ($cart_contents as $cart_item_key => $cart_item) {
                    $product = $cart_item['data'];
                    $cart_data[] = [
                        'product_id' => $cart_item['product_id'],
                        'variation_id' => $cart_item['variation_id'],
                        'quantity' => $cart_item['quantity'],
                        'product_name' => $product->get_name(),
                        'product_price' => $product->get_price(),
                        'line_total' => $cart_item['line_total'],
                        'cart_item_key' => $cart_item_key,
                    ];
                }
            }
            
            $cart_summary = [
                'items' => $cart_data,
                'total' => WC()->cart->get_cart_contents_total(),
                'tax_total' => WC()->cart->get_cart_contents_tax(),
                'shipping_total' => WC()->cart->get_shipping_total(),
                'total_with_tax' => WC()->cart->get_total(''),
                'items_count' => WC()->cart->get_cart_contents_count(),
                'is_empty' => WC()->cart->is_empty()
            ];
            ?>
            <wc-cart-share-quote-panel 
                rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                page-type="cart-actions"
                current-url="<?php echo esc_attr(wc_get_cart_url()); ?>"
                cart-data="<?php echo esc_attr(json_encode($cart_summary)); ?>"
            ></wc-cart-share-quote-panel>
        </div>
        <?php
    }
    
    /**
     * Add buttons to mini cart widget
     */
    public function addMiniCartButtons() {
        if (WC()->cart->is_empty()) {
            return;
        }
        
        ?>
        <div class="wc-mini-cart-share-quote">
            <style>
                .wc-mini-cart-share-quote {
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid #ddd;
                }
                .wc-mini-cart-share-quote-buttons {
                    display: flex;
                    gap: 5px;
                }
                .wc-mini-cart-share-quote-button {
                    flex: 1;
                    padding: 8px 12px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: center;
                    transition: all 0.2s ease;
                }
                .wc-mini-cart-share-quote-button.share {
                    background: #007cba;
                    color: white;
                }
                .wc-mini-cart-share-quote-button.quote {
                    background: #00a32a;
                    color: white;
                }
            </style>
            
            <div class="wc-mini-cart-share-quote-buttons">
                <button type="button" class="wc-mini-cart-share-quote-button share" onclick="event.preventDefault(); wcCartShareQuote.openShareModal();">
                    <?php _e('Share', 'wc-cart-share-quote'); ?>
                </button>
                <button type="button" class="wc-mini-cart-share-quote-button quote" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();">
                    <?php _e('Quote', 'wc-cart-share-quote'); ?>
                </button>
            </div>
        </div>
        <?php
    }
    
    /**
     * Add notice to checkout page about quote option
     */
    public function addCheckoutNotice() {
        if (WC()->cart->is_empty()) {
            return;
        }
        
        ?>
        <div class="wc-checkout-share-quote-notice">
            <style>
                .wc-checkout-share-quote-notice {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: #e3f2fd;
                    border-left: 4px solid #2196f3;
                    border-radius: 4px;
                }
                .wc-checkout-share-quote-notice p {
                    margin: 0 0 10px 0;
                    color: #1565c0;
                }
                .wc-checkout-share-quote-notice a {
                    color: #1565c0;
                    text-decoration: underline;
                    cursor: pointer;
                }
            </style>
            
            <p>
                <strong><?php _e('Need a quote instead?', 'wc-cart-share-quote'); ?></strong>
                <?php _e('If you need bulk pricing or have special requirements,', 'wc-cart-share-quote'); ?>
                <a href="#" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();"><?php _e('request a quote here', 'wc-cart-share-quote'); ?></a>.
            </p>
        </div>
        <?php
    }
    
    /**
     * Render shortcode for share/quote buttons
     */
    public function renderShortcode($atts) {
        $atts = shortcode_atts([
            'style' => 'buttons', // 'buttons', 'links', 'mini'
            'show_share' => 'true',
            'show_quote' => 'true',
        ], $atts);
        
        if (WC()->cart->is_empty()) {
            return '<p>' . __('Your cart is empty.', 'wc-cart-share-quote') . '</p>';
        }
        
        $show_share = $atts['show_share'] === 'true';
        $show_quote = $atts['show_quote'] === 'true';
        
        ob_start();
        ?>
        <div class="wc-cart-share-quote-shortcode" data-style="<?php echo esc_attr($atts['style']); ?>">
            <?php if ($atts['style'] === 'buttons'): ?>
                <div class="wc-cart-share-quote-buttons">
                    <?php if ($show_share): ?>
                        <button type="button" class="wc-cart-share-quote-button share" onclick="event.preventDefault(); wcCartShareQuote.openShareModal();">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            <?php _e('Share Cart', 'wc-cart-share-quote'); ?>
                        </button>
                    <?php endif; ?>
                    
                    <?php if ($show_quote): ?>
                        <button type="button" class="wc-cart-share-quote-button quote" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                            <?php _e('Request Quote', 'wc-cart-share-quote'); ?>
                        </button>
                    <?php endif; ?>
                </div>
            <?php elseif ($atts['style'] === 'links'): ?>
                <div class="wc-cart-share-quote-links">
                    <?php if ($show_share): ?>
                        <a href="#" onclick="event.preventDefault(); wcCartShareQuote.openShareModal();">
                            <?php _e('Share this cart', 'wc-cart-share-quote'); ?>
                        </a>
                    <?php endif; ?>
                    
                    <?php if ($show_share && $show_quote): ?>
                        <span> | </span>
                    <?php endif; ?>
                    
                    <?php if ($show_quote): ?>
                        <a href="#" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();">
                            <?php _e('Request a quote', 'wc-cart-share-quote'); ?>
                        </a>
                    <?php endif; ?>
                </div>
            <?php else: // mini style ?>
                <div class="wc-cart-share-quote-mini">
                    <?php if ($show_share): ?>
                        <button type="button" onclick="event.preventDefault(); wcCartShareQuote.openShareModal();">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            <?php _e('Share', 'wc-cart-share-quote'); ?>
                        </button>
                    <?php endif; ?>
                    
                    <?php if ($show_quote): ?>
                        <button type="button" onclick="event.preventDefault(); wcCartShareQuote.openQuoteModal();">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                            <?php _e('Quote', 'wc-cart-share-quote'); ?>
                        </button>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
        <?php
        
        return ob_get_clean();
    }
    
    /**
     * Enqueue assets on WooCommerce pages
     */
    public function enqueueWooCommerceAssets() {
        if (!function_exists('is_woocommerce')) {
            return;
        }
        
        // Only load on WooCommerce pages - the main assets class already enqueues everywhere
        // We just need to add our integration JavaScript
        if (is_woocommerce() || is_cart() || is_checkout() || is_account_page()) {
            // Add our integration JavaScript inline
            add_action('wp_footer', [$this, 'addWooCommerceIntegrationJS'], 20);
        }
    }
    
    /**
     * Add WooCommerce integration JavaScript
     */
    public function addWooCommerceIntegrationJS() {
        ?>
        <script>
            // Initialize plugin and add helper functions for WooCommerce integration
            document.addEventListener('DOMContentLoaded', function() {
                // Initialize the plugin first
                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.init === 'function') {
                    window.WCCartShareQuote.init();
                }
                
                // Global helper functions for cart integration
                window.wcCartShareQuote = {
                    openShareModal: function() {
                        if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openShareModal === 'function') {
                            window.WCCartShareQuote.openShareModal();
                        } else {
                            // Retry after a short delay
                            setTimeout(function() {
                                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openShareModal === 'function') {
                                    window.WCCartShareQuote.openShareModal();
                                } else {
                                    alert('<?php echo esc_js(__('Share functionality is loading. Please try again.', 'wc-cart-share-quote')); ?>');
                                }
                            }, 500);
                        }
                    },
                    openQuoteModal: function() {
                        if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openQuoteModal === 'function') {
                            window.WCCartShareQuote.openQuoteModal();
                        } else {
                            // Retry after a short delay
                            setTimeout(function() {
                                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openQuoteModal === 'function') {
                                    window.WCCartShareQuote.openQuoteModal();
                                } else {
                                    alert('<?php echo esc_js(__('Quote functionality is loading. Please try again.', 'wc-cart-share-quote')); ?>');
                                }
                            }, 500);
                        }
                    }
                };
            });
        </script>
        <?php
    }
    
    /**
     * Add admin bar menu for quick access
     */
    public function addAdminBarMenu($wp_admin_bar) {
        if (!current_user_can('manage_woocommerce')) {
            return;
        }
        
        // Count pending quotes
        $pending_quotes = get_posts([
            'post_type' => 'cart_quote',
            'meta_query' => [
                [
                    'key' => '_quote_status',
                    'value' => 'pending',
                    'compare' => '='
                ]
            ],
            'posts_per_page' => -1,
            'fields' => 'ids'
        ]);
        
        $pending_count = count($pending_quotes);
        
        $wp_admin_bar->add_node([
            'id' => 'wc-cart-share-quote',
            'title' => sprintf(
                __('Cart Quotes %s', 'wc-cart-share-quote'),
                $pending_count > 0 ? '<span class="ab-label awaiting-mod">' . $pending_count . '</span>' : ''
            ),
            'href' => admin_url('edit.php?post_type=cart_quote'),
        ]);
        
        $wp_admin_bar->add_node([
            'id' => 'wc-cart-share-quote-quotes',
            'parent' => 'wc-cart-share-quote',
            'title' => sprintf(__('Quotes (%d pending)', 'wc-cart-share-quote'), $pending_count),
            'href' => admin_url('edit.php?post_type=cart_quote&quote_status=pending'),
        ]);
        
        $wp_admin_bar->add_node([
            'id' => 'wc-cart-share-quote-shared-carts',
            'parent' => 'wc-cart-share-quote',
            'title' => __('Shared Carts', 'wc-cart-share-quote'),
            'href' => admin_url('edit.php?post_type=shared_cart'),
        ]);
    }
    
    /**
     * Ensure HPOS compatibility
     */
    private function ensureHPOSCompatibility() {
        // Check if HPOS is enabled
        if (class_exists('\Automattic\WooCommerce\Utilities\OrderUtil') && 
            \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled()) {
            
            // HPOS is enabled - we're compatible since we don't directly manipulate order data
            // Our plugin only works with cart data and custom post types
        }
    }
    
    /**
     * Check if cart is available and properly initialized (HPOS compatible)
     */
    private function ensureCartInitialized() {
        if (is_null(WC()->cart)) {
            if (function_exists('wc_load_cart')) {
                wc_load_cart();
            } else {
                WC()->initialize_cart();
            }
        }
        return !is_null(WC()->cart);
    }
    
    /**
     * Render the new woo_presales shortcode with web component
     */
    public function renderPresalesShortcode($atts) {
        $atts = shortcode_atts([
            'show_share' => 'true',
            'show_quote' => 'true',
            'style' => 'buttons', // 'buttons', 'links', 'mini'
            'text_share' => 'Share Cart',
            'text_quote' => 'Request Quote',
            'align' => 'left', // 'left', 'center', 'right'
        ], $atts);
        
        $show_share = $atts['show_share'] === 'true';
        $show_quote = $atts['show_quote'] === 'true';
        
        // Generate unique ID for this shortcode instance
        $instance_id = 'woo-presales-' . uniqid();
        
        // Get current cart data if available
        $cart_data = [];
        $cart_summary = [
            'items' => [],
            'total' => 0,
            'items_count' => 0,
            'is_empty' => true
        ];
        
        if (function_exists('WC') && WC()->cart && !WC()->cart->is_empty()) {
            $cart_contents = WC()->cart->get_cart();
            foreach ($cart_contents as $cart_item_key => $cart_item) {
                $product = $cart_item['data'];
                $cart_data[] = [
                    'product_id' => $cart_item['product_id'],
                    'variation_id' => $cart_item['variation_id'],
                    'quantity' => $cart_item['quantity'],
                    'product_name' => $product->get_name(),
                    'product_price' => $product->get_price(),
                    'line_total' => $cart_item['line_total'],
                    'cart_item_key' => $cart_item_key,
                ];
            }
            
            $cart_summary = [
                'items' => $cart_data,
                'total' => WC()->cart->get_cart_contents_total(),
                'tax_total' => WC()->cart->get_cart_contents_tax(),
                'shipping_total' => WC()->cart->get_shipping_total(),
                'total_with_tax' => WC()->cart->get_total(''),
                'items_count' => WC()->cart->get_cart_contents_count(),
                'is_empty' => false
            ];
        }
        
        ob_start();
        ?>
        <div class="woo-presales-shortcode" id="<?php echo esc_attr($instance_id); ?>" data-align="<?php echo esc_attr($atts['align']); ?>">
            <style>
                .woo-presales-shortcode[data-align="center"] { text-align: center; }
                .woo-presales-shortcode[data-align="right"] { text-align: right; }
                .woo-presales-shortcode[data-align="left"] { text-align: left; }
                
                .woo-presales-buttons {
                    display: inline-flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    align-items: center;
                }
                
                .woo-presales-button {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                    font-size: 14px;
                    background: var(--woo-presales-primary-color, #007cba);
                    color: white;
                }
                
                .woo-presales-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    text-decoration: none;
                    color: white;
                }
                
                .woo-presales-button.share {
                    background: var(--woo-presales-share-color, #007cba);
                }
                
                .woo-presales-button.quote {
                    background: var(--woo-presales-quote-color, #00a32a);
                }
                
                .woo-presales-button.disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    pointer-events: none;
                }
                
                .woo-presales-links {
                    display: inline-flex;
                    gap: 15px;
                    align-items: center;
                }
                
                .woo-presales-links a {
                    color: var(--woo-presales-link-color, #007cba);
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .woo-presales-links a:hover {
                    text-decoration: underline;
                }
                
                .woo-presales-mini {
                    display: inline-flex;
                    gap: 5px;
                }
                
                .woo-presales-mini button {
                    padding: 8px 16px;
                    font-size: 12px;
                    border-radius: 4px;
                }
                
                @media (max-width: 768px) {
                    .woo-presales-buttons {
                        flex-direction: column;
                        width: 100%;
                    }
                    .woo-presales-button {
                        text-align: center;
                        justify-content: center;
                        width: 100%;
                    }
                }
            </style>
            
            <?php if ($cart_summary['is_empty']): ?>
                <div class="woo-presales-empty" style="color: #666; font-style: italic;">
                    <?php _e('Your cart is empty. Add items to enable sharing and quotes.', 'wc-cart-share-quote'); ?>
                </div>
            <?php else: ?>
                
                <?php if ($atts['style'] === 'buttons'): ?>
                    <div class="woo-presales-buttons">
                        <?php if ($show_share): ?>
                            <button type="button" class="woo-presales-button share" onclick="wcPresalesShare('<?php echo esc_js($instance_id); ?>')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                <?php echo esc_html($atts['text_share']); ?>
                            </button>
                        <?php endif; ?>
                        
                        <?php if ($show_quote): ?>
                            <button type="button" class="woo-presales-button quote" onclick="wcPresalesQuote('<?php echo esc_js($instance_id); ?>')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                                <?php echo esc_html($atts['text_quote']); ?>
                            </button>
                        <?php endif; ?>
                    </div>
                    
                <?php elseif ($atts['style'] === 'links'): ?>
                    <div class="woo-presales-links">
                        <?php if ($show_share): ?>
                            <a href="#" onclick="event.preventDefault(); wcPresalesShare('<?php echo esc_js($instance_id); ?>');">
                                <?php echo esc_html($atts['text_share']); ?>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ($show_share && $show_quote): ?>
                            <span>|</span>
                        <?php endif; ?>
                        
                        <?php if ($show_quote): ?>
                            <a href="#" onclick="event.preventDefault(); wcPresalesQuote('<?php echo esc_js($instance_id); ?>');">
                                <?php echo esc_html($atts['text_quote']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                    
                <?php else: // mini style ?>
                    <div class="woo-presales-mini">
                        <?php if ($show_share): ?>
                            <button type="button" class="woo-presales-button share" onclick="wcPresalesShare('<?php echo esc_js($instance_id); ?>')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                <?php echo esc_html($atts['text_share']); ?>
                            </button>
                        <?php endif; ?>
                        
                        <?php if ($show_quote): ?>
                            <button type="button" class="woo-presales-button quote" onclick="wcPresalesQuote('<?php echo esc_js($instance_id); ?>')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                                <?php echo esc_html($atts['text_quote']); ?>
                            </button>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                
            <?php endif; ?>
            
            <!-- Web component container -->
            <div id="<?php echo esc_attr($instance_id); ?>-component" style="display: none;">
                <wc-cart-share-quote-panel 
                    rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                    page-type="shortcode"
                    current-url="<?php echo esc_attr(get_permalink()); ?>"
                    cart-data="<?php echo esc_attr(json_encode($cart_summary)); ?>"
                ></wc-cart-share-quote-panel>
            </div>
        </div>
        
        <script>
            // Global functions for shortcode interaction
            window.wcPresalesShare = function(instanceId) {
                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openShareModal === 'function') {
                    window.WCCartShareQuote.openShareModal();
                } else {
                    // Fallback: try to initialize first
                    setTimeout(() => {
                        if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openShareModal === 'function') {
                            window.WCCartShareQuote.openShareModal();
                        } else {
                            alert('<?php echo esc_js(__('Share functionality is loading. Please try again.', 'wc-cart-share-quote')); ?>');
                        }
                    }, 500);
                }
            };
            
            window.wcPresalesQuote = function(instanceId) {
                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openQuoteModal === 'function') {
                    window.WCCartShareQuote.openQuoteModal();
                } else {
                    // Fallback: try to initialize first
                    setTimeout(() => {
                        if (window.WCCartShareQuote && typeof window.WCCartShareQuote.openQuoteModal === 'function') {
                            window.WCCartShareQuote.openQuoteModal();
                        } else {
                            alert('<?php echo esc_js(__('Quote functionality is loading. Please try again.', 'wc-cart-share-quote')); ?>');
                        }
                    }, 500);
                }
            };
        </script>
        <?php
        
        return ob_get_clean();
    }
}