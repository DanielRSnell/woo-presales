<?php
/**
 * Plugin Name: Woo Presales
 * Description: Allow customers to share their cart via URL or convert it to a quote for approval
 * Version: 1.0.0
 * Author: Texas Metal Works
 * License: GPL v2 or later
 * Text Domain: wc-cart-share-quote
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.5
 * Requires Plugins: woocommerce
 *
 * @package WC_Cart_Share_Quote
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WC_CART_SHARE_QUOTE_VERSION', '1.0.0');
define('WC_CART_SHARE_QUOTE_FILE', __FILE__);
define('WC_CART_SHARE_QUOTE_DIR', plugin_dir_path(__FILE__));
define('WC_CART_SHARE_QUOTE_URL', plugin_dir_url(__FILE__));
define('WC_CART_SHARE_QUOTE_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class WC_Cart_Share_Quote {
    
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
    private $woocommerce_integration;
    private $security;
    
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
        require_once WC_CART_SHARE_QUOTE_DIR . 'inc/class-admin.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'inc/class-assets.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'inc/class-api.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'inc/class-woocommerce-integration.php';
        require_once WC_CART_SHARE_QUOTE_DIR . 'inc/class-security.php';
    }
    
    /**
     * Initialize the plugin
     */
    private function init() {
        // Initialize modules
        $this->admin = new WC_Cart_Share_Quote_Admin();
        $this->assets = new WC_Cart_Share_Quote_Assets();
        $this->api = new WC_Cart_Share_Quote_API();
        $this->woocommerce_integration = new WC_Cart_Share_Quote_Integration();
        $this->security = new WC_Cart_Share_Quote_Security();
        
        // Hook into WordPress
        add_action('init', [$this, 'onInit']);
        
        // Initialize modules
        $this->admin->init();
        $this->assets->init();
        $this->api->init();
        $this->woocommerce_integration->init();
        $this->security->init();
        
        // Plugin lifecycle hooks
        register_activation_hook(__FILE__, [$this, 'onActivation']);
        register_deactivation_hook(__FILE__, [$this, 'onDeactivation']);
    }
    
    /**
     * Initialize plugin
     */
    public function onInit() {
        // Load text domain
        load_plugin_textdomain('wc-cart-share-quote', false, dirname(WC_CART_SHARE_QUOTE_BASENAME) . '/languages');
        
        // Register custom post types
        $this->registerPostTypes();
        
        // Setup URL rewrite rules
        $this->setupRewriteRules();
        
        // Force rewrite rules refresh if needed
        $this->maybeFlushRewriteRules();
        
        // Declare HPOS compatibility
        $this->declareHPOSCompatibility();
        
        // Setup template loading
        $this->setupTemplates();
        
        // Handle cart actions
        $this->setupCartActions();
        
        // Debug rewrite rules
        add_action('wp', [$this, 'debugQueryVars']);
        
        // Force flush rewrite rules on admin_init for debugging
        add_action('admin_init', [$this, 'debugFlushRewriteRules']);
    }
    
    /**
     * Register custom post types for shared carts and quotes
     */
    private function registerPostTypes() {
        // Shared Cart post type
        register_post_type('shared_cart', [
            'labels' => [
                'name' => __('Shared Carts', 'wc-cart-share-quote'),
                'singular_name' => __('Shared Cart', 'wc-cart-share-quote'),
                'menu_name' => __('Shared Carts', 'wc-cart-share-quote'),
                'add_new' => __('Add New Shared Cart', 'wc-cart-share-quote'),
                'add_new_item' => __('Add New Shared Cart', 'wc-cart-share-quote'),
                'edit_item' => __('Edit Shared Cart', 'wc-cart-share-quote'),
                'new_item' => __('New Shared Cart', 'wc-cart-share-quote'),
                'view_item' => __('View Shared Cart', 'wc-cart-share-quote'),
                'search_items' => __('Search Shared Carts', 'wc-cart-share-quote'),
                'not_found' => __('No shared carts found', 'wc-cart-share-quote'),
                'not_found_in_trash' => __('No shared carts found in trash', 'wc-cart-share-quote'),
            ],
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => 'woo-presales',
            'show_in_admin_bar' => false,
            'show_in_nav_menus' => false,
            'can_export' => true,
            'has_archive' => false,
            'hierarchical' => false,
            'menu_position' => 56,
            'menu_icon' => 'dashicons-share',
            'supports' => ['title'],
            'rewrite' => [
                'slug' => 'shared-cart',
                'with_front' => false
            ],
            'capability_type' => 'shop_order',
            'map_meta_cap' => true,
            'capabilities' => [
                'create_posts' => 'manage_woocommerce',
                'edit_posts' => 'manage_woocommerce', 
                'edit_others_posts' => 'manage_woocommerce',
                'publish_posts' => 'manage_woocommerce',
                'read_private_posts' => 'manage_woocommerce',
                'delete_posts' => 'manage_woocommerce',
                'delete_private_posts' => 'manage_woocommerce',
                'delete_published_posts' => 'manage_woocommerce',
                'delete_others_posts' => 'manage_woocommerce',
                'edit_private_posts' => 'manage_woocommerce',
                'edit_published_posts' => 'manage_woocommerce',
            ],
            'show_in_rest' => true,
            'rest_base' => 'shared-carts',
        ]);
        
        // Quote post type
        register_post_type('cart_quote', [
            'labels' => [
                'name' => __('Cart Quotes', 'wc-cart-share-quote'),
                'singular_name' => __('Cart Quote', 'wc-cart-share-quote'),
                'menu_name' => __('Cart Quotes', 'wc-cart-share-quote'),
                'add_new' => __('Add New Quote', 'wc-cart-share-quote'),
                'add_new_item' => __('Add New Quote', 'wc-cart-share-quote'),
                'edit_item' => __('Edit Quote', 'wc-cart-share-quote'),
                'new_item' => __('New Quote', 'wc-cart-share-quote'),
                'view_item' => __('View Quote', 'wc-cart-share-quote'),
                'search_items' => __('Search Quotes', 'wc-cart-share-quote'),
                'not_found' => __('No quotes found', 'wc-cart-share-quote'),
                'not_found_in_trash' => __('No quotes found in trash', 'wc-cart-share-quote'),
            ],
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => 'woo-presales',
            'show_in_admin_bar' => false,
            'show_in_nav_menus' => false,
            'can_export' => true,
            'has_archive' => false,
            'hierarchical' => false,
            'menu_position' => 57,
            'menu_icon' => 'dashicons-format-quote',
            'supports' => ['title'],
            'rewrite' => [
                'slug' => 'quote',
                'with_front' => false
            ],
            'capability_type' => 'shop_order',
            'map_meta_cap' => true,
            'capabilities' => [
                'create_posts' => 'manage_woocommerce',
                'edit_posts' => 'manage_woocommerce', 
                'edit_others_posts' => 'manage_woocommerce',
                'publish_posts' => 'manage_woocommerce',
                'read_private_posts' => 'manage_woocommerce',
                'delete_posts' => 'manage_woocommerce',
                'delete_private_posts' => 'manage_woocommerce',
                'delete_published_posts' => 'manage_woocommerce',
                'delete_others_posts' => 'manage_woocommerce',
                'edit_private_posts' => 'manage_woocommerce',
                'edit_published_posts' => 'manage_woocommerce',
            ],
            'show_in_rest' => true,
            'rest_base' => 'cart-quotes',
        ]);
        
        // Add meta box support
        add_action('add_meta_boxes', [$this, 'addMetaBoxes']);
        add_action('save_post', [$this, 'saveMetaBoxes']);
        
        // Enhance admin interface
        add_filter('manage_shared_cart_posts_columns', [$this, 'addSharedCartColumns']);
        add_action('manage_shared_cart_posts_custom_column', [$this, 'renderSharedCartColumns'], 10, 2);
        add_filter('manage_cart_quote_posts_columns', [$this, 'addQuoteColumns']);
        add_action('manage_cart_quote_posts_custom_column', [$this, 'renderQuoteColumns'], 10, 2);
        
        // Add sortable columns
        add_filter('manage_edit-shared_cart_sortable_columns', [$this, 'addSortableColumns']);
        add_filter('manage_edit-cart_quote_sortable_columns', [$this, 'addSortableColumns']);
        
        // Add filters for quotes
        add_action('restrict_manage_posts', [$this, 'addQuoteStatusFilter']);
        add_filter('parse_query', [$this, 'filterQuotesByStatus']);
    }
    
    /**
     * Add meta boxes for shared carts and quotes
     */
    public function addMetaBoxes() {
        // Shared cart meta boxes
        add_meta_box(
            'shared_cart_details',
            __('Cart Details', 'wc-cart-share-quote'),
            [$this, 'renderSharedCartMetaBox'],
            'shared_cart',
            'normal',
            'high'
        );
        
        add_meta_box(
            'shared_cart_customer',
            __('Customer Information', 'wc-cart-share-quote'),
            [$this, 'renderCustomerMetaBox'],
            'shared_cart',
            'side',
            'default'
        );
        
        // Quote meta boxes
        add_meta_box(
            'quote_details',
            __('Quote Details', 'wc-cart-share-quote'),
            [$this, 'renderQuoteMetaBox'],
            'cart_quote',
            'normal',
            'high'
        );
        
        add_meta_box(
            'quote_customer',
            __('Customer Information', 'wc-cart-share-quote'),
            [$this, 'renderCustomerMetaBox'],
            'cart_quote',
            'side',
            'default'
        );
    }
    
    /**
     * Render shared cart meta box
     */
    public function renderSharedCartMetaBox($post) {
        wp_nonce_field('shared_cart_meta_box', 'shared_cart_meta_box_nonce');
        
        $cart_data = get_post_meta($post->ID, '_cart_data', true);
        $cart_hash = get_post_meta($post->ID, '_cart_hash', true);
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        $access_count = get_post_meta($post->ID, '_access_count', true) ?: 0;
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="cart_hash"><?php _e('Cart Hash', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <input type="text" id="cart_hash" name="cart_hash" value="<?php echo esc_attr($cart_hash); ?>" class="regular-text" readonly />
                    <p class="description"><?php _e('Unique identifier for this shared cart', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="expires_at"><?php _e('Expires At', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <input type="datetime-local" id="expires_at" name="expires_at" value="<?php echo esc_attr($expires_at); ?>" />
                    <p class="description"><?php _e('When this shared cart link expires', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
            <tr>
                <th><?php _e('Access Count', 'wc-cart-share-quote'); ?></th>
                <td>
                    <strong><?php echo esc_html($access_count); ?></strong>
                    <p class="description"><?php _e('Number of times this cart has been accessed', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
        </table>
        
        <h4><?php _e('Cart Items', 'wc-cart-share-quote'); ?></h4>
        <div id="cart-items-display">
            <?php
            if ($cart_data && is_array($cart_data)) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead>';
                echo '<tbody>';
                
                foreach ($cart_data as $item) {
                    $product_id = $item['product_id'] ?? 0;
                    $product = wc_get_product($product_id);
                    $product_name = $product ? $product->get_name() : __('Product not found', 'wc-cart-share-quote');
                    $quantity = $item['quantity'] ?? 0;
                    $price = $product ? wc_price($product->get_price() * $quantity) : __('N/A', 'wc-cart-share-quote');
                    
                    echo '<tr>';
                    echo '<td>' . esc_html($product_name) . '</td>';
                    echo '<td>' . esc_html($quantity) . '</td>';
                    echo '<td>' . $price . '</td>';
                    echo '</tr>';
                }
                
                echo '</tbody></table>';
            } else {
                echo '<p>' . __('No cart items found.', 'wc-cart-share-quote') . '</p>';
            }
            ?>
        </div>
        <?php
    }
    
    /**
     * Render quote meta box
     */
    public function renderQuoteMetaBox($post) {
        wp_nonce_field('quote_meta_box', 'quote_meta_box_nonce');
        
        $cart_data = get_post_meta($post->ID, '_cart_data', true);
        $quote_status = get_post_meta($post->ID, '_quote_status', true) ?: 'pending';
        $quote_total = get_post_meta($post->ID, '_quote_total', true);
        $quote_notes = get_post_meta($post->ID, '_quote_notes', true);
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="quote_status"><?php _e('Quote Status', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <select id="quote_status" name="quote_status">
                        <option value="pending" <?php selected($quote_status, 'pending'); ?>><?php _e('Pending', 'wc-cart-share-quote'); ?></option>
                        <option value="approved" <?php selected($quote_status, 'approved'); ?>><?php _e('Approved', 'wc-cart-share-quote'); ?></option>
                        <option value="rejected" <?php selected($quote_status, 'rejected'); ?>><?php _e('Rejected', 'wc-cart-share-quote'); ?></option>
                        <option value="expired" <?php selected($quote_status, 'expired'); ?>><?php _e('Expired', 'wc-cart-share-quote'); ?></option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="quote_total"><?php _e('Quote Total', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <input type="number" id="quote_total" name="quote_total" value="<?php echo esc_attr($quote_total); ?>" step="0.01" min="0" />
                    <p class="description"><?php _e('Total amount for this quote', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="expires_at"><?php _e('Expires At', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <input type="datetime-local" id="expires_at" name="expires_at" value="<?php echo esc_attr($expires_at); ?>" />
                    <p class="description"><?php _e('When this quote expires', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="quote_notes"><?php _e('Quote Notes', 'wc-cart-share-quote'); ?></label></th>
                <td>
                    <textarea id="quote_notes" name="quote_notes" rows="4" cols="50"><?php echo esc_textarea($quote_notes); ?></textarea>
                    <p class="description"><?php _e('Internal notes about this quote', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
        </table>
        
        <h4><?php _e('Cart Items', 'wc-cart-share-quote'); ?></h4>
        <div id="cart-items-display">
            <?php
            if ($cart_data && is_array($cart_data)) {
                echo '<table class="wp-list-table widefat fixed striped">';
                echo '<thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead>';
                echo '<tbody>';
                
                foreach ($cart_data as $item) {
                    $product_id = $item['product_id'] ?? 0;
                    $product = wc_get_product($product_id);
                    $product_name = $product ? $product->get_name() : __('Product not found', 'wc-cart-share-quote');
                    $quantity = $item['quantity'] ?? 0;
                    $price = $product ? wc_price($product->get_price() * $quantity) : __('N/A', 'wc-cart-share-quote');
                    
                    echo '<tr>';
                    echo '<td>' . esc_html($product_name) . '</td>';
                    echo '<td>' . esc_html($quantity) . '</td>';
                    echo '<td>' . $price . '</td>';
                    echo '</tr>';
                }
                
                echo '</tbody></table>';
            } else {
                echo '<p>' . __('No cart items found.', 'wc-cart-share-quote') . '</p>';
            }
            ?>
        </div>
        <?php
    }
    
    /**
     * Render customer meta box
     */
    public function renderCustomerMetaBox($post) {
        $customer_email = get_post_meta($post->ID, '_customer_email', true);
        $customer_name = get_post_meta($post->ID, '_customer_name', true);
        $customer_phone = get_post_meta($post->ID, '_customer_phone', true);
        $customer_id = get_post_meta($post->ID, '_customer_id', true);
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="customer_name"><?php _e('Customer Name', 'wc-cart-share-quote'); ?></label></th>
                <td><input type="text" id="customer_name" name="customer_name" value="<?php echo esc_attr($customer_name); ?>" class="widefat" /></td>
            </tr>
            <tr>
                <th><label for="customer_email"><?php _e('Customer Email', 'wc-cart-share-quote'); ?></label></th>
                <td><input type="email" id="customer_email" name="customer_email" value="<?php echo esc_attr($customer_email); ?>" class="widefat" /></td>
            </tr>
            <tr>
                <th><label for="customer_phone"><?php _e('Customer Phone', 'wc-cart-share-quote'); ?></label></th>
                <td><input type="text" id="customer_phone" name="customer_phone" value="<?php echo esc_attr($customer_phone); ?>" class="widefat" /></td>
            </tr>
            <?php if ($customer_id): ?>
            <tr>
                <th><?php _e('Customer ID', 'wc-cart-share-quote'); ?></th>
                <td>
                    <strong><?php echo esc_html($customer_id); ?></strong>
                    <p class="description"><?php _e('WordPress user ID for this customer', 'wc-cart-share-quote'); ?></p>
                </td>
            </tr>
            <?php endif; ?>
        </table>
        <?php
    }
    
    /**
     * Save meta box data
     */
    public function saveMetaBoxes($post_id) {
        // Check if user has permission to edit
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        $post_type = get_post_type($post_id);
        
        // Save shared cart meta
        if ($post_type === 'shared_cart' && isset($_POST['shared_cart_meta_box_nonce']) && wp_verify_nonce($_POST['shared_cart_meta_box_nonce'], 'shared_cart_meta_box')) {
            if (isset($_POST['cart_hash'])) {
                update_post_meta($post_id, '_cart_hash', sanitize_text_field($_POST['cart_hash']));
            }
            if (isset($_POST['expires_at'])) {
                update_post_meta($post_id, '_expires_at', sanitize_text_field($_POST['expires_at']));
            }
        }
        
        // Save quote meta
        if ($post_type === 'cart_quote' && isset($_POST['quote_meta_box_nonce']) && wp_verify_nonce($_POST['quote_meta_box_nonce'], 'quote_meta_box')) {
            if (isset($_POST['quote_status'])) {
                update_post_meta($post_id, '_quote_status', sanitize_text_field($_POST['quote_status']));
            }
            if (isset($_POST['quote_total'])) {
                update_post_meta($post_id, '_quote_total', floatval($_POST['quote_total']));
            }
            if (isset($_POST['quote_notes'])) {
                update_post_meta($post_id, '_quote_notes', sanitize_textarea_field($_POST['quote_notes']));
            }
            if (isset($_POST['expires_at'])) {
                update_post_meta($post_id, '_expires_at', sanitize_text_field($_POST['expires_at']));
            }
        }
        
        // Save customer meta for both post types
        if (in_array($post_type, ['shared_cart', 'cart_quote'])) {
            if (isset($_POST['customer_name'])) {
                update_post_meta($post_id, '_customer_name', sanitize_text_field($_POST['customer_name']));
            }
            if (isset($_POST['customer_email'])) {
                update_post_meta($post_id, '_customer_email', sanitize_email($_POST['customer_email']));
            }
            if (isset($_POST['customer_phone'])) {
                update_post_meta($post_id, '_customer_phone', sanitize_text_field($_POST['customer_phone']));
            }
        }
    }
    
    /**
     * Setup URL rewrite rules for shared carts and quotes
     */
    private function setupRewriteRules() {
        // Add rewrite rules
        add_action('init', [$this, 'addRewriteRules']);
        
        // Handle template redirects
        add_action('template_redirect', [$this, 'handleTemplateRedirect']);
        
        // Add query vars
        add_filter('query_vars', [$this, 'addQueryVars']);
    }
    
    /**
     * Add rewrite rules for shared cart and quote URLs
     */
    public function addRewriteRules() {
        // Shared cart URL: /shared-cart/{hash}
        add_rewrite_rule(
            '^shared-cart/([a-zA-Z0-9]+)/?$',
            'index.php?wc_shared_cart_hash=$matches[1]',
            'top'
        );
        
        // Quote URL: /quote/{id} (numeric ID)
        add_rewrite_rule(
            '^quote/([0-9]+)/?$',
            'index.php?wc_quote_id=$matches[1]',
            'top'
        );
        
        // Quote URL: /quote/{slug} (post name/slug)
        add_rewrite_rule(
            '^quote/([^/]+)/?$',
            'index.php?wc_quote_slug=$matches[1]',
            'top'
        );
    }
    
    /**
     * Add custom query vars
     */
    public function addQueryVars($vars) {
        $vars[] = 'wc_shared_cart_hash';
        $vars[] = 'wc_quote_id';
        $vars[] = 'wc_quote_slug';
        return $vars;
    }
    
    /**
     * Handle template redirects for shared cart and quote pages
     */
    public function handleTemplateRedirect() {
        global $wp_query;
        
        $shared_cart_hash = get_query_var('wc_shared_cart_hash');
        $quote_id = get_query_var('wc_quote_id');
        $quote_slug = get_query_var('wc_quote_slug');
        
        if ($shared_cart_hash) {
            $this->renderSharedCartPage($shared_cart_hash);
            exit;
        }
        
        if ($quote_id) {
            $this->renderQuotePage($quote_id);
            exit;
        }
        
        if ($quote_slug) {
            $this->renderQuotePageBySlug($quote_slug);
            exit;
        }
    }
    
    /**
     * Render shared cart page
     */
    private function renderSharedCartPage($hash) {
        // Verify shared cart exists
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
            wp_die(__('Shared cart not found.', 'wc-cart-share-quote'), __('Not Found', 'wc-cart-share-quote'), ['response' => 404]);
        }
        
        $post = $posts[0];
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time()) {
            wp_die(__('This shared cart has expired.', 'wc-cart-share-quote'), __('Expired', 'wc-cart-share-quote'), ['response' => 410]);
        }
        
        // Load page template
        $this->loadPageTemplate('shared-cart', [
            'hash' => $hash,
            'title' => __('Shared Cart', 'wc-cart-share-quote')
        ]);
    }
    
    /**
     * Render quote page
     */
    private function renderQuotePage($quote_id) {
        $post = get_post($quote_id);
        
        if (!$post || $post->post_type !== 'cart_quote') {
            wp_die(__('Quote not found.', 'wc-cart-share-quote'), __('Not Found', 'wc-cart-share-quote'), ['response' => 404]);
        }
        
        $quote_status = get_post_meta($quote_id, '_quote_status', true);
        $expires_at = get_post_meta($quote_id, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time() && $quote_status !== 'expired') {
            update_post_meta($quote_id, '_quote_status', 'expired');
        }
        
        // Load page template
        $this->loadPageTemplate('quote', [
            'quote_id' => $quote_id,
            'title' => sprintf(__('Quote #%d', 'wc-cart-share-quote'), $quote_id)
        ]);
    }
    
    /**
     * Render quote page by slug
     */
    private function renderQuotePageBySlug($slug) {
        // Find quote post by slug
        $posts = get_posts([
            'post_type' => 'cart_quote',
            'name' => $slug,
            'posts_per_page' => 1,
            'post_status' => 'publish'
        ]);
        
        if (empty($posts)) {
            wp_die(__('Quote not found.', 'wc-cart-share-quote'), __('Not Found', 'wc-cart-share-quote'), ['response' => 404]);
        }
        
        $post = $posts[0];
        $quote_id = $post->ID;
        $quote_status = get_post_meta($quote_id, '_quote_status', true);
        $expires_at = get_post_meta($quote_id, '_expires_at', true);
        
        // Check if expired
        if ($expires_at && strtotime($expires_at) < time() && $quote_status !== 'expired') {
            update_post_meta($quote_id, '_quote_status', 'expired');
        }
        
        // Load page template
        $this->loadPageTemplate('quote', [
            'quote_id' => $quote_id,
            'title' => $post->post_title ?: sprintf(__('Quote #%d', 'wc-cart-share-quote'), $quote_id)
        ]);
    }
    
    /**
     * Load custom page template
     */
    private function loadPageTemplate($type, $data = []) {
        // Set up global $post object for theme compatibility
        global $post, $wp_query;
        
        $post = (object) [
            'ID' => 0,
            'post_title' => $data['title'] ?? '',
            'post_content' => '',
            'post_type' => 'page',
            'post_status' => 'publish',
            'comment_status' => 'closed',
            'ping_status' => 'closed',
            'post_name' => $type,
            'guid' => home_url('/' . $type . '/'),
            'menu_order' => 0,
            'post_date' => current_time('mysql'),
            'post_date_gmt' => current_time('mysql', 1),
            'post_author' => 0,
            'comment_count' => 0,
            'filter' => 'raw'
        ];
        
        $wp_query->is_page = true;
        $wp_query->is_singular = true;
        $wp_query->is_home = false;
        $wp_query->is_archive = false;
        $wp_query->is_category = false;
        $wp_query->queried_object = $post;
        $wp_query->queried_object_id = 0;
        
        // Enqueue scripts and styles
        wp_enqueue_script('wc-cart-share-quote-js');
        
        // Get theme header
        get_header();
        
        // Output page content
        ?>
        <div id="primary" class="content-area">
            <main id="main" class="site-main">
                <article class="page">
                    <header class="entry-header">
                        <h1 class="entry-title"><?php echo esc_html($data['title']); ?></h1>
                    </header>
                    
                    <div class="entry-content">
                        <div id="wc-cart-share-quote-app">
                            <!-- React app will mount here -->
                            <wc-cart-share-quote-panel 
                                rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                                page-type="<?php echo esc_attr($type); ?>"
                                <?php if ($type === 'shared-cart'): ?>
                                cart-hash="<?php echo esc_attr($data['hash']); ?>"
                                <?php elseif ($type === 'quote'): ?>
                                quote-id="<?php echo esc_attr($data['quote_id']); ?>"
                                <?php endif; ?>
                            ></wc-cart-share-quote-panel>
                        </div>
                    </div>
                </article>
            </main>
        </div>
        <?php
        
        // Get theme footer
        get_footer();
    }
    
    /**
     * Add custom columns for shared cart admin
     */
    public function addSharedCartColumns($columns) {
        $new_columns = [];
        $new_columns['cb'] = $columns['cb'];
        $new_columns['title'] = $columns['title'];
        $new_columns['cart_hash'] = __('Cart Hash', 'wc-cart-share-quote');
        $new_columns['customer'] = __('Customer', 'wc-cart-share-quote');
        $new_columns['items'] = __('Items', 'wc-cart-share-quote');
        $new_columns['total'] = __('Total', 'wc-cart-share-quote');
        $new_columns['access_count'] = __('Views', 'wc-cart-share-quote');
        $new_columns['expires'] = __('Expires', 'wc-cart-share-quote');
        $new_columns['date'] = $columns['date'];
        
        return $new_columns;
    }
    
    /**
     * Render custom columns for shared cart admin
     */
    public function renderSharedCartColumns($column, $post_id) {
        switch ($column) {
            case 'cart_hash':
                $hash = get_post_meta($post_id, '_cart_hash', true);
                if ($hash) {
                    echo '<code>' . esc_html($hash) . '</code><br>';
                    echo '<a href="' . esc_url(home_url("/shared-cart/{$hash}")) . '" target="_blank">View Link</a>';
                }
                break;
                
            case 'customer':
                $name = get_post_meta($post_id, '_customer_name', true);
                $email = get_post_meta($post_id, '_customer_email', true);
                if ($name || $email) {
                    echo esc_html($name ?: 'Anonymous') . '<br>';
                    if ($email) {
                        echo '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>';
                    }
                } else {
                    echo '<em>Anonymous</em>';
                }
                break;
                
            case 'items':
                $cart_data = get_post_meta($post_id, '_cart_data', true);
                if ($cart_data && is_array($cart_data)) {
                    echo count($cart_data) . ' items';
                } else {
                    echo '0 items';
                }
                break;
                
            case 'total':
                $cart_data = get_post_meta($post_id, '_cart_data', true);
                if ($cart_data && is_array($cart_data)) {
                    $total = 0;
                    foreach ($cart_data as $item) {
                        $product = wc_get_product($item['product_id']);
                        if ($product) {
                            $total += $product->get_price() * $item['quantity'];
                        }
                    }
                    echo wc_price($total);
                } else {
                    echo wc_price(0);
                }
                break;
                
            case 'access_count':
                $count = get_post_meta($post_id, '_access_count', true) ?: 0;
                echo esc_html($count);
                break;
                
            case 'expires':
                $expires = get_post_meta($post_id, '_expires_at', true);
                if ($expires) {
                    $expires_time = strtotime($expires);
                    $now = time();
                    if ($expires_time < $now) {
                        echo '<span style="color: red;">Expired</span><br>';
                    } else {
                        $diff = $expires_time - $now;
                        $days = floor($diff / (60 * 60 * 24));
                        if ($days > 0) {
                            echo $days . ' days left<br>';
                        } else {
                            $hours = floor($diff / (60 * 60));
                            echo $hours . ' hours left<br>';
                        }
                    }
                    echo '<small>' . date('M j, Y', $expires_time) . '</small>';
                } else {
                    echo '<em>No expiration</em>';
                }
                break;
        }
    }
    
    /**
     * Add custom columns for quote admin
     */
    public function addQuoteColumns($columns) {
        $new_columns = [];
        $new_columns['cb'] = $columns['cb'];
        $new_columns['title'] = $columns['title'];
        $new_columns['status'] = __('Status', 'wc-cart-share-quote');
        $new_columns['customer'] = __('Customer', 'wc-cart-share-quote');
        $new_columns['items'] = __('Items', 'wc-cart-share-quote');
        $new_columns['total'] = __('Quote Total', 'wc-cart-share-quote');
        $new_columns['expires'] = __('Expires', 'wc-cart-share-quote');
        $new_columns['date'] = $columns['date'];
        
        return $new_columns;
    }
    
    /**
     * Render custom columns for quote admin
     */
    public function renderQuoteColumns($column, $post_id) {
        switch ($column) {
            case 'status':
                $status = get_post_meta($post_id, '_quote_status', true) ?: 'pending';
                $colors = [
                    'pending' => '#ff9800',
                    'approved' => '#4caf50',
                    'rejected' => '#f44336',
                    'expired' => '#9e9e9e'
                ];
                $labels = [
                    'pending' => 'Pending',
                    'approved' => 'Approved',
                    'rejected' => 'Rejected',
                    'expired' => 'Expired'
                ];
                
                echo '<span style="display: inline-block; padding: 4px 8px; border-radius: 4px; background: ' . 
                     esc_attr($colors[$status] ?? '#9e9e9e') . '; color: white; font-size: 12px; font-weight: bold;">' . 
                     esc_html($labels[$status] ?? 'Unknown') . '</span>';
                break;
                
            case 'customer':
                $name = get_post_meta($post_id, '_customer_name', true);
                $email = get_post_meta($post_id, '_customer_email', true);
                echo esc_html($name) . '<br>';
                if ($email) {
                    echo '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>';
                }
                break;
                
            case 'items':
                $cart_data = get_post_meta($post_id, '_cart_data', true);
                if ($cart_data && is_array($cart_data)) {
                    echo count($cart_data) . ' items';
                } else {
                    echo '0 items';
                }
                break;
                
            case 'total':
                $total = get_post_meta($post_id, '_quote_total', true);
                if ($total) {
                    echo wc_price($total);
                } else {
                    echo '<em>Not set</em>';
                }
                break;
                
            case 'expires':
                $expires = get_post_meta($post_id, '_expires_at', true);
                if ($expires) {
                    $expires_time = strtotime($expires);
                    $now = time();
                    if ($expires_time < $now) {
                        echo '<span style="color: red;">Expired</span><br>';
                    } else {
                        $diff = $expires_time - $now;
                        $days = floor($diff / (60 * 60 * 24));
                        if ($days > 0) {
                            echo $days . ' days left<br>';
                        } else {
                            $hours = floor($diff / (60 * 60));
                            echo $hours . ' hours left<br>';
                        }
                    }
                    echo '<small>' . date('M j, Y', $expires_time) . '</small>';
                } else {
                    echo '<em>No expiration</em>';
                }
                break;
        }
    }
    
    /**
     * Add sortable columns
     */
    public function addSortableColumns($columns) {
        $columns['expires'] = 'expires';
        $columns['access_count'] = 'access_count';
        $columns['total'] = 'total';
        $columns['status'] = 'status';
        return $columns;
    }
    
    /**
     * Add quote status filter
     */
    public function addQuoteStatusFilter() {
        global $typenow;
        
        if ($typenow === 'cart_quote') {
            $current_status = isset($_GET['quote_status']) ? $_GET['quote_status'] : '';
            
            echo '<select name="quote_status">';
            echo '<option value="">All Statuses</option>';
            echo '<option value="pending"' . selected($current_status, 'pending', false) . '>Pending</option>';
            echo '<option value="approved"' . selected($current_status, 'approved', false) . '>Approved</option>';
            echo '<option value="rejected"' . selected($current_status, 'rejected', false) . '>Rejected</option>';
            echo '<option value="expired"' . selected($current_status, 'expired', false) . '>Expired</option>';
            echo '</select>';
        }
    }
    
    /**
     * Filter quotes by status
     */
    public function filterQuotesByStatus($query) {
        global $pagenow;
        
        if (is_admin() && $pagenow === 'edit.php' && 
            isset($_GET['post_type']) && $_GET['post_type'] === 'cart_quote' &&
            isset($_GET['quote_status']) && $_GET['quote_status'] !== '') {
            
            $query->query_vars['meta_key'] = '_quote_status';
            $query->query_vars['meta_value'] = $_GET['quote_status'];
        }
    }
    
    /**
     * Setup template loading for custom post types
     */
    private function setupTemplates() {
        add_filter('template_include', [$this, 'loadCustomTemplate']);
        add_filter('single_template', [$this, 'loadSingleTemplate']);
        add_filter('page_template', [$this, 'loadPageTemplateOverride']);
    }
    
    /**
     * Setup cart actions handling
     */
    private function setupCartActions() {
        add_action('init', [$this, 'handleCartActions']);
        add_action('wp_loaded', [$this, 'handleCartActionsLate']);
        add_action('woocommerce_before_cart', [$this, 'displayCartMessages']);
    }
    
    /**
     * Load custom templates for our post types
     */
    public function loadCustomTemplate($template) {
        global $post, $wp_query;
        
        error_log('WC Cart Share Quote: Template loading - Post type: ' . ($post ? $post->post_type : 'none'));
        error_log('WC Cart Share Quote: Template loading - Is 404: ' . ($wp_query->is_404() ? 'yes' : 'no'));
        error_log('WC Cart Share Quote: Template loading - Queried object: ' . print_r(get_queried_object(), true));
        
        if ($post && $post->post_type === 'shared_cart') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-shared_cart.php';
            error_log('WC Cart Share Quote: Looking for shared cart template at: ' . $custom_template);
            error_log('WC Cart Share Quote: Template exists: ' . (file_exists($custom_template) ? 'yes' : 'no'));
            
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using custom shared cart template');
                return $custom_template;
            }
        }
        
        if ($post && $post->post_type === 'cart_quote') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-cart_quote.php';
            error_log('WC Cart Share Quote: Looking for quote template at: ' . $custom_template);
            error_log('WC Cart Share Quote: Template exists: ' . (file_exists($custom_template) ? 'yes' : 'no'));
            
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using custom quote template');
                return $custom_template;
            }
        }
        
        error_log('WC Cart Share Quote: Using default template: ' . $template);
        return $template;
    }
    
    /**
     * Load single template for shared cart posts
     */
    public function loadSingleTemplate($template) {
        global $post;
        
        if ($post && $post->post_type === 'shared_cart') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-shared_cart.php';
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using single template override for shared_cart');
                return $custom_template;
            }
        }
        
        if ($post && $post->post_type === 'cart_quote') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-cart_quote.php';
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using single template override for cart_quote');
                return $custom_template;
            }
        }
        
        return $template;
    }
    
    /**
     * Load page template override for shared cart posts
     */
    public function loadPageTemplateOverride($template) {
        global $post;
        
        if ($post && $post->post_type === 'shared_cart') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-shared_cart.php';
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using page template override for shared_cart');
                return $custom_template;
            }
        }
        
        if ($post && $post->post_type === 'cart_quote') {
            $custom_template = WC_CART_SHARE_QUOTE_DIR . 'templates/single-cart_quote.php';
            if (file_exists($custom_template)) {
                error_log('WC Cart Share Quote: Using page template override for cart_quote');
                return $custom_template;
            }
        }
        
        return $template;
    }
    
    /**
     * Handle add shared cart to cart action
     */
    public function handleCartActions() {
        if (isset($_POST['action']) && $_POST['action'] === 'add_shared_cart_to_cart') {
            $this->addSharedCartToCart();
        }
        
        if (isset($_POST['action']) && $_POST['action'] === 'checkout_with_quote') {
            $this->checkoutWithQuote();
        }
    }
    
    /**
     * Handle cart actions that need WooCommerce loaded
     */
    public function handleCartActionsLate() {
        // Handle quote checkout via URL parameters
        if (isset($_GET['wc_quote_checkout']) && isset($_GET['quote_nonce'])) {
            $this->handleQuoteCheckoutUrl();
        }
        
        // Handle shared cart checkout via URL parameters
        if (isset($_GET['wc_shared_cart_checkout']) && isset($_GET['shared_cart_nonce'])) {
            $this->handleSharedCartCheckoutUrl();
        }
    }
    
    /**
     * Handle quote checkout via URL
     */
    private function handleQuoteCheckoutUrl() {
        error_log('WC Cart Share Quote: Quote checkout URL handler called');
        
        $quote_id = intval($_GET['wc_quote_checkout']);
        $nonce = sanitize_text_field($_GET['quote_nonce']);
        
        error_log('WC Cart Share Quote: Quote ID: ' . $quote_id . ', Nonce: ' . $nonce);
        
        // Verify nonce
        if (!wp_verify_nonce($nonce, 'quote_checkout_' . $quote_id)) {
            error_log('WC Cart Share Quote: Nonce verification failed');
            wp_die('Security check failed');
        }
        
        error_log('WC Cart Share Quote: Nonce verified successfully');
        
        $post = get_post($quote_id);
        if (!$post || $post->post_type !== 'cart_quote') {
            wp_redirect(add_query_arg('cart_error', 'invalid_quote', wc_get_cart_url()));
            exit;
        }
        
        // Get quote data
        $cart_data = get_post_meta($quote_id, '_cart_data', true);
        
        if (!$cart_data) {
            wp_redirect(add_query_arg('cart_error', 'invalid_quote', wc_get_cart_url()));
            exit;
        }
        
        // Initialize WooCommerce cart
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_count = 0;
        $errors = [];
        
        // Add all items from quote to cart using proper WooCommerce methods
        foreach ($cart_data as $item) {
            $product_id = $item['product_id'];
            $quantity = $item['quantity'];
            $variation_id = $item['variation_id'] ?? 0;
            
            // Get product to check if it's purchasable
            $product = wc_get_product($variation_id ?: $product_id);
            if (!$product || !$product->is_purchasable()) {
                $errors[] = sprintf('Product "%s" is not available', $product ? $product->get_name() : 'Unknown');
                continue;
            }
            
            // Prepare variation attributes for variable products
            $variation_data = [];
            if ($variation_id && $product->is_type('variation')) {
                $variation_data = $product->get_variation_attributes();
            }
            
            // Add to cart
            $cart_item_key = WC()->cart->add_to_cart(
                $product_id,
                $quantity,
                $variation_id,
                $variation_data
            );
            
            if ($cart_item_key) {
                $added_count++;
            } else {
                $errors[] = sprintf('Could not add "%s" to cart', $product->get_name());
            }
        }
        
        // Redirect to cart with success/error messages
        $redirect_url = wc_get_cart_url();
        
        if ($added_count > 0) {
            $redirect_url = add_query_arg('quote_success', $quote_id, $redirect_url);
        }
        
        if (!empty($errors)) {
            $redirect_url = add_query_arg('cart_errors', urlencode(implode('|', $errors)), $redirect_url);
        }
        
        wp_redirect($redirect_url);
        exit;
    }
    
    /**
     * Handle shared cart checkout via URL
     */
    private function handleSharedCartCheckoutUrl() {
        error_log('WC Cart Share Quote: Shared cart checkout URL handler called');
        
        $shared_cart_id = intval($_GET['wc_shared_cart_checkout']);
        $nonce = sanitize_text_field($_GET['shared_cart_nonce']);
        $selected_items = isset($_GET['selected_items']) ? sanitize_text_field($_GET['selected_items']) : '';
        
        error_log('WC Cart Share Quote: Shared Cart ID: ' . $shared_cart_id . ', Nonce: ' . $nonce . ', Selected: ' . $selected_items);
        
        // Verify nonce
        if (!wp_verify_nonce($nonce, 'shared_cart_checkout_' . $shared_cart_id)) {
            error_log('WC Cart Share Quote: Nonce verification failed');
            wp_die('Security check failed');
        }
        
        error_log('WC Cart Share Quote: Nonce verified successfully');
        
        $post = get_post($shared_cart_id);
        if (!$post || $post->post_type !== 'shared_cart') {
            wp_redirect(add_query_arg('cart_error', 'invalid_shared_cart', wc_get_cart_url()));
            exit;
        }
        
        // Get shared cart data
        $cart_data = get_post_meta($shared_cart_id, '_cart_data', true);
        
        if (!$cart_data) {
            wp_redirect(add_query_arg('cart_error', 'invalid_shared_cart', wc_get_cart_url()));
            exit;
        }
        
        // Parse selected items
        $selected_indices = [];
        if (!empty($selected_items)) {
            $selected_indices = array_map('intval', explode(',', $selected_items));
        } else {
            // If no items selected, add all items
            $selected_indices = array_keys($cart_data);
        }
        
        // Initialize WooCommerce cart
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_count = 0;
        $errors = [];
        
        // Add selected items from shared cart to current cart
        foreach ($selected_indices as $index) {
            if (!isset($cart_data[$index])) {
                continue;
            }
            
            $item = $cart_data[$index];
            $product_id = $item['product_id'];
            $quantity = $item['quantity'];
            $variation_id = $item['variation_id'] ?? 0;
            
            // Get product to check if it's purchasable
            $product = wc_get_product($variation_id ?: $product_id);
            if (!$product || !$product->is_purchasable()) {
                $errors[] = sprintf('Product "%s" is not available', $product ? $product->get_name() : 'Unknown');
                continue;
            }
            
            // Prepare variation attributes for variable products
            $variation_data = [];
            if ($variation_id && $product->is_type('variation')) {
                $variation_data = $product->get_variation_attributes();
            }
            
            // Add to cart
            $cart_item_key = WC()->cart->add_to_cart(
                $product_id,
                $quantity,
                $variation_id,
                $variation_data
            );
            
            if ($cart_item_key) {
                $added_count++;
            } else {
                $errors[] = sprintf('Could not add "%s" to cart', $product->get_name());
            }
        }
        
        // Redirect to cart with success/error messages
        $redirect_url = wc_get_cart_url();
        
        if ($added_count > 0) {
            $redirect_url = add_query_arg('shared_cart_success', $shared_cart_id, $redirect_url);
        }
        
        if (!empty($errors)) {
            $redirect_url = add_query_arg('cart_errors', urlencode(implode('|', $errors)), $redirect_url);
        }
        
        wp_redirect($redirect_url);
        exit;
    }
    
    /**
     * Add selected items from shared cart to current cart
     */
    private function addSharedCartToCart() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['shared_cart_nonce'], 'add_shared_cart_to_cart')) {
            wp_die('Security check failed');
        }
        
        $shared_cart_id = intval($_POST['shared_cart_id']);
        $selected_items = $_POST['selected_items'] ?? [];
        
        if (empty($selected_items)) {
            wp_redirect(add_query_arg('cart_error', 'no_items', wp_get_referer()));
            exit;
        }
        
        // Get cart data
        $cart_data = get_post_meta($shared_cart_id, '_cart_data', true);
        
        if (!$cart_data) {
            wp_redirect(add_query_arg('cart_error', 'invalid_cart', wp_get_referer()));
            exit;
        }
        
        // Initialize WooCommerce cart
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_count = 0;
        $errors = [];
        
        foreach ($selected_items as $index) {
            $index = intval($index);
            if (!isset($cart_data[$index])) continue;
            
            $item = $cart_data[$index];
            $product_id = $item['product_id'];
            $quantity = $item['quantity'];
            $variation_id = $item['variation_id'] ?? 0;
            
            // Check if product exists and is purchasable
            $product = wc_get_product($product_id);
            if (!$product || !$product->is_purchasable()) {
                $errors[] = sprintf('Product "%s" is not available', $product ? $product->get_name() : 'Unknown');
                continue;
            }
            
            // Add to cart
            $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity, $variation_id);
            
            if ($cart_item_key) {
                $added_count++;
            } else {
                $errors[] = sprintf('Could not add "%s" to cart', $product->get_name());
            }
        }
        
        // Redirect to cart with success/error messages
        $redirect_url = wc_get_cart_url();
        
        if ($added_count > 0) {
            $redirect_url = add_query_arg('cart_success', $added_count, $redirect_url);
        }
        
        if (!empty($errors)) {
            $redirect_url = add_query_arg('cart_errors', urlencode(implode('|', $errors)), $redirect_url);
        }
        
        wp_redirect($redirect_url);
        exit;
    }
    
    /**
     * Checkout with quote - add all quote items to cart
     */
    private function checkoutWithQuote() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['quote_checkout_nonce'], 'checkout_with_quote')) {
            wp_die('Security check failed');
        }
        
        $quote_id = intval($_POST['quote_id']);
        
        if (!$quote_id) {
            wp_redirect(add_query_arg('cart_error', 'invalid_quote', wp_get_referer()));
            exit;
        }
        
        // Get quote data
        $cart_data = get_post_meta($quote_id, '_cart_data', true);
        
        if (!$cart_data) {
            wp_redirect(add_query_arg('cart_error', 'invalid_quote', wp_get_referer()));
            exit;
        }
        
        // Initialize WooCommerce cart
        if (is_null(WC()->cart)) {
            WC()->initialize_cart();
        }
        
        $added_count = 0;
        $errors = [];
        
        // Add all items from quote to cart
        foreach ($cart_data as $item) {
            $product_id = $item['product_id'];
            $quantity = $item['quantity'];
            $variation_id = $item['variation_id'] ?? 0;
            
            // Check if product exists and is purchasable
            $product = wc_get_product($product_id);
            if (!$product || !$product->is_purchasable()) {
                $errors[] = sprintf('Product "%s" is not available', $product ? $product->get_name() : 'Unknown');
                continue;
            }
            
            // Add to cart
            $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity, $variation_id);
            
            if ($cart_item_key) {
                $added_count++;
            } else {
                $errors[] = sprintf('Could not add "%s" to cart', $product->get_name());
            }
        }
        
        // Redirect to cart with success/error messages
        $redirect_url = wc_get_cart_url();
        
        if ($added_count > 0) {
            $redirect_url = add_query_arg('quote_success', $quote_id, $redirect_url);
        }
        
        if (!empty($errors)) {
            $redirect_url = add_query_arg('cart_errors', urlencode(implode('|', $errors)), $redirect_url);
        }
        
        wp_redirect($redirect_url);
        exit;
    }
    
    /**
     * Display cart success/error messages
     */
    public function displayCartMessages() {
        if (isset($_GET['cart_success'])) {
            $count = intval($_GET['cart_success']);
            wc_add_notice(sprintf(
                _n('%d item added to cart from shared cart!', '%d items added to cart from shared cart!', $count, 'wc-cart-share-quote'),
                $count
            ), 'success');
        }
        
        if (isset($_GET['quote_success'])) {
            $quote_id = intval($_GET['quote_success']);
            wc_add_notice(sprintf(
                __('All items from Quote #%d have been added to your cart!', 'wc-cart-share-quote'),
                $quote_id
            ), 'success');
        }
        
        if (isset($_GET['cart_errors'])) {
            $errors = explode('|', urldecode($_GET['cart_errors']));
            foreach ($errors as $error) {
                wc_add_notice($error, 'error');
            }
        }
        
        if (isset($_GET['cart_error'])) {
            switch ($_GET['cart_error']) {
                case 'no_items':
                    wc_add_notice(__('Please select at least one item to add to cart.', 'wc-cart-share-quote'), 'error');
                    break;
                case 'invalid_cart':
                    wc_add_notice(__('Invalid shared cart link.', 'wc-cart-share-quote'), 'error');
                    break;
                case 'invalid_quote':
                    wc_add_notice(__('Invalid quote link.', 'wc-cart-share-quote'), 'error');
                    break;
            }
        }
    }
    
    /**
     * Debug query vars
     */
    public function debugQueryVars() {
        global $wp_query, $post;
        
        if (is_404()) {
            error_log('WC Cart Share Quote: 404 page detected');
            error_log('WC Cart Share Quote: Request URI: ' . $_SERVER['REQUEST_URI']);
            error_log('WC Cart Share Quote: Query vars: ' . print_r($wp_query->query_vars, true));
            error_log('WC Cart Share Quote: Queried object: ' . print_r(get_queried_object(), true));
        }
        
        if ($post && $post->post_type === 'shared_cart') {
            error_log('WC Cart Share Quote: Found shared_cart post: ' . $post->ID);
        }
    }
    
    /**
     * Check if we need to flush rewrite rules
     */
    private function maybeFlushRewriteRules() {
        $version = get_option('wc_cart_share_quote_rewrite_version', '0');
        
        if (version_compare($version, WC_CART_SHARE_QUOTE_VERSION, '<')) {
            flush_rewrite_rules(true);
            update_option('wc_cart_share_quote_rewrite_version', WC_CART_SHARE_QUOTE_VERSION);
            error_log('WC Cart Share Quote: Rewrite rules flushed for version ' . WC_CART_SHARE_QUOTE_VERSION);
        }
    }
    
    /**
     * Force flush rewrite rules (for debugging)
     */
    public function forceFlushRewriteRules() {
        $this->registerPostTypes();
        flush_rewrite_rules(true);
        error_log('WC Cart Share Quote: Rewrite rules flushed');
    }
    
    /**
     * Debug flush rewrite rules on admin
     */
    public function debugFlushRewriteRules() {
        // Only flush once per session to avoid performance issues
        if (!get_transient('wc_cart_share_quote_debug_flush')) {
            $this->forceFlushRewriteRules();
            set_transient('wc_cart_share_quote_debug_flush', true, 300); // 5 minutes
            error_log('WC Cart Share Quote: Debug rewrite rules flushed');
        }
    }
    
    /**
     * Plugin activation
     */
    public function onActivation() {
        // Register post types first
        $this->registerPostTypes();
        
        // Flush rewrite rules for REST API and custom post types
        flush_rewrite_rules(true);
        
        // Declare HPOS compatibility
        $this->declareHPOSCompatibility();
    }
    
    /**
     * Declare High-Performance Order Storage (HPOS) compatibility
     */
    private function declareHPOSCompatibility() {
        if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        }
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
function wc_cart_share_quote() {
    return WC_Cart_Share_Quote::getInstance();
}

// Check if WooCommerce is active
function wc_cart_share_quote_check_woocommerce() {
    if (!class_exists('WooCommerce')) {
        add_action('admin_notices', function() {
            echo '<div class="notice notice-error"><p>';
            echo __('WooCommerce Cart Share & Quote requires WooCommerce to be installed and active.', 'wc-cart-share-quote');
            echo '</p></div>';
        });
        return false;
    }
    return true;
}

// Declare HPOS (High-Performance Order Storage) compatibility early
// This MUST be called before WooCommerce initializes to avoid compatibility warnings
add_action('before_woocommerce_init', function() {
    if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
});

// Start the plugin only if WooCommerce is active
add_action('plugins_loaded', function() {
    if (wc_cart_share_quote_check_woocommerce()) {
        wc_cart_share_quote();
    }
});