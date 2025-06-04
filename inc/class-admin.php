<?php
/**
 * Admin functionality for WooCommerce Cart Share & Quote
 */

class WC_Cart_Share_Quote_Admin {
    
    /**
     * Initialize admin functionality
     */
    public function init() {
        add_action('admin_menu', [$this, 'addAdminMenu']);
        add_action('admin_init', [$this, 'registerSettings']);
    }
    
    /**
     * Add admin menu
     */
    public function addAdminMenu() {
        // Add parent menu page
        add_menu_page(
            __('Woo Presales', 'wc-cart-share-quote'),
            __('Woo Presales', 'wc-cart-share-quote'),
            'manage_woocommerce',
            'woo-presales',
            [$this, 'renderDashboard'],
            'dashicons-share',
            25 // Position after WooCommerce
        );
        
        // Add Dashboard submenu (redirects to main page)
        add_submenu_page(
            'woo-presales',
            __('Dashboard', 'wc-cart-share-quote'),
            __('Dashboard', 'wc-cart-share-quote'),
            'manage_woocommerce',
            'woo-presales',
            [$this, 'renderDashboard']
        );
        
        // Add Settings submenu
        add_submenu_page(
            'woo-presales',
            __('Presales Settings', 'wc-cart-share-quote'),
            __('Settings', 'wc-cart-share-quote'),
            'manage_woocommerce',
            'woo-presales-settings',
            [$this, 'renderReactSettingsPage']
        );
    }
    
    /**
     * Register settings
     */
    public function registerSettings() {
        // Register settings
        register_setting('wc_cart_share_quote_settings', 'wc_cart_share_quote_options', [$this, 'sanitizeSettings']);
        
        // Add settings section
        add_settings_section(
            'wc_cart_share_quote_store_info',
            __('Store Information', 'wc-cart-share-quote'),
            [$this, 'storeInfoSectionCallback'],
            'wc-cart-share-quote-settings'
        );
        
        // Store name field
        add_settings_field(
            'store_name',
            __('Store Name', 'wc-cart-share-quote'),
            [$this, 'storeNameField'],
            'wc-cart-share-quote-settings',
            'wc_cart_share_quote_store_info'
        );
        
        // Store address field
        add_settings_field(
            'store_address',
            __('Store Address', 'wc-cart-share-quote'),
            [$this, 'storeAddressField'],
            'wc-cart-share-quote-settings',
            'wc_cart_share_quote_store_info'
        );
        
        // Store phone field
        add_settings_field(
            'store_phone',
            __('Store Phone', 'wc-cart-share-quote'),
            [$this, 'storePhoneField'],
            'wc-cart-share-quote-settings',
            'wc_cart_share_quote_store_info'
        );
        
        // Store email field
        add_settings_field(
            'store_email',
            __('Store Email', 'wc-cart-share-quote'),
            [$this, 'storeEmailField'],
            'wc-cart-share-quote-settings',
            'wc_cart_share_quote_store_info'
        );
        
        // Store website field
        add_settings_field(
            'store_website',
            __('Store Website', 'wc-cart-share-quote'),
            [$this, 'storeWebsiteField'],
            'wc-cart-share-quote-settings',
            'wc_cart_share_quote_store_info'
        );
    }
    
    /**
     * Sanitize settings
     */
    public function sanitizeSettings($input) {
        $sanitized = [];
        
        if (isset($input['store_name'])) {
            $sanitized['store_name'] = sanitize_text_field($input['store_name']);
        }
        
        if (isset($input['store_address'])) {
            $sanitized['store_address'] = sanitize_textarea_field($input['store_address']);
        }
        
        if (isset($input['store_phone'])) {
            $sanitized['store_phone'] = sanitize_text_field($input['store_phone']);
        }
        
        if (isset($input['store_email'])) {
            $sanitized['store_email'] = sanitize_email($input['store_email']);
        }
        
        if (isset($input['store_website'])) {
            $sanitized['store_website'] = esc_url_raw($input['store_website']);
        }
        
        return $sanitized;
    }
    
    /**
     * Store info section callback
     */
    public function storeInfoSectionCallback() {
        echo '<p>' . __('Configure your store information to be displayed on quotes and shared carts.', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Store name field
     */
    public function storeNameField() {
        $options = get_option('wc_cart_share_quote_options', []);
        $value = $options['store_name'] ?? get_bloginfo('name');
        echo '<input type="text" name="wc_cart_share_quote_options[store_name]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . __('The name of your store (defaults to site title).', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Store address field
     */
    public function storeAddressField() {
        $options = get_option('wc_cart_share_quote_options', []);
        $value = $options['store_address'] ?? '';
        echo '<textarea name="wc_cart_share_quote_options[store_address]" rows="3" class="large-text">' . esc_textarea($value) . '</textarea>';
        echo '<p class="description">' . __('Your store\'s physical address.', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Store phone field
     */
    public function storePhoneField() {
        $options = get_option('wc_cart_share_quote_options', []);
        $value = $options['store_phone'] ?? '';
        echo '<input type="tel" name="wc_cart_share_quote_options[store_phone]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . __('Your store\'s contact phone number.', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Store email field
     */
    public function storeEmailField() {
        $options = get_option('wc_cart_share_quote_options', []);
        $value = $options['store_email'] ?? get_option('admin_email');
        echo '<input type="email" name="wc_cart_share_quote_options[store_email]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . __('Your store\'s contact email (defaults to admin email).', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Store website field
     */
    public function storeWebsiteField() {
        $options = get_option('wc_cart_share_quote_options', []);
        $value = $options['store_website'] ?? home_url();
        echo '<input type="url" name="wc_cart_share_quote_options[store_website]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">' . __('Your store\'s website URL (defaults to site URL).', 'wc-cart-share-quote') . '</p>';
    }
    
    /**
     * Render admin page with settings form
     */
    public function renderAdminPage() {
        if (isset($_GET['settings-updated']) && $_GET['settings-updated']) {
            add_settings_error('wc_cart_share_quote_messages', 'wc_cart_share_quote_message', __('Settings saved.'), 'updated');
        }
        
        settings_errors('wc_cart_share_quote_messages');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div class="notice notice-info">
                <p>
                    <strong>WooCommerce Cart Share & Quote</strong> automatically adds share/quote buttons to your cart pages.
                    Press <kbd>Cmd/Ctrl + K</kbd> to open the plugin status interface below.
                </p>
                <p>
                    View and manage shared carts and quotes in your 
                    <a href="<?php echo admin_url('edit.php?post_type=shared_cart'); ?>">WooCommerce menu</a>.
                </p>
            </div>
            
            <form action="options.php" method="post">
                <?php
                settings_fields('wc_cart_share_quote_settings');
                do_settings_sections('wc-cart-share-quote-settings');
                submit_button(__('Save Settings', 'wc-cart-share-quote'));
                ?>
            </form>
            
            <hr>
            
            <h2><?php _e('Plugin Status', 'wc-cart-share-quote'); ?></h2>
            
            <div id="wc-cart-share-quote-admin-root">
                <!-- Plugin status interface - Press Cmd/Ctrl + K to open -->
                <wc-cart-share-quote-panel 
                    rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                ></wc-cart-share-quote-panel>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render dashboard page
     */
    public function renderDashboard() {
        // Get some stats
        $shared_carts_count = wp_count_posts('shared_cart')->publish;
        $quotes_count = wp_count_posts('cart_quote')->publish;
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
        
        ?>
        <div class="wrap">
            <h1><?php _e('Woo Presales Dashboard', 'wc-cart-share-quote'); ?></h1>
            
            <div class="woo-presales-dashboard" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
                
                <!-- Stats Cards -->
                <div class="card" style="padding: 20px; background: white; border: 1px solid #ccd0d4; box-shadow: 0 1px 1px rgba(0,0,0,.04);">
                    <h3 style="margin-top: 0; color: #1d2327;">📊 Overview</h3>
                    <div style="display: grid; gap: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Shared Carts:</span>
                            <strong><?php echo esc_html($shared_carts_count); ?></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Total Quotes:</span>
                            <strong><?php echo esc_html($quotes_count); ?></strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Pending Quotes:</span>
                            <strong style="color: #d63638;"><?php echo esc_html($pending_count); ?></strong>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="card" style="padding: 20px; background: white; border: 1px solid #ccd0d4; box-shadow: 0 1px 1px rgba(0,0,0,.04);">
                    <h3 style="margin-top: 0; color: #1d2327;">⚡ Quick Actions</h3>
                    <div style="display: grid; gap: 10px;">
                        <a href="<?php echo admin_url('edit.php?post_type=cart_quote'); ?>" class="button button-primary">
                            View All Quotes
                        </a>
                        <a href="<?php echo admin_url('edit.php?post_type=shared_cart'); ?>" class="button button-secondary">
                            View Shared Carts
                        </a>
                        <a href="<?php echo admin_url('admin.php?page=woo-presales-settings'); ?>" class="button button-secondary">
                            Settings
                        </a>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="card" style="padding: 20px; background: white; border: 1px solid #ccd0d4; box-shadow: 0 1px 1px rgba(0,0,0,.04);">
                    <h3 style="margin-top: 0; color: #1d2327;">🕒 Recent Activity</h3>
                    <?php
                    $recent_posts = get_posts([
                        'post_type' => ['cart_quote', 'shared_cart'],
                        'posts_per_page' => 5,
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ]);
                    
                    if ($recent_posts): ?>
                        <ul style="margin: 0; padding: 0; list-style: none;">
                            <?php foreach ($recent_posts as $post): ?>
                                <li style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f1;">
                                    <a href="<?php echo get_edit_post_link($post->ID); ?>" style="text-decoration: none;">
                                        <strong><?php echo $post->post_type === 'cart_quote' ? '💬' : '🛒'; ?></strong>
                                        <?php echo esc_html($post->post_title ?: 'Untitled'); ?>
                                        <br>
                                        <small style="color: #646970;"><?php echo human_time_diff(strtotime($post->post_date)) . ' ago'; ?></small>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php else: ?>
                        <p style="color: #646970; font-style: italic;">No recent activity</p>
                    <?php endif; ?>
                </div>
                
            </div>
            
            <!-- Info Section -->
            <div class="card" style="padding: 20px; background: white; border: 1px solid #ccd0d4; box-shadow: 0 1px 1px rgba(0,0,0,.04); margin-top: 20px;">
                <h3 style="margin-top: 0; color: #1d2327;">🚀 Getting Started</h3>
                <p>Your WooCommerce Presales system is ready! Here's what you can do:</p>
                <ul>
                    <li><strong>Share Carts:</strong> Customers can share their cart with others via a secure link</li>
                    <li><strong>Request Quotes:</strong> Customers can request custom pricing for their cart items</li>
                    <li><strong>Customization:</strong> Use the <a href="<?php echo admin_url('admin.php?page=woo-presales-settings'); ?>">Settings page</a> to customize forms, colors, and store information</li>
                    <li><strong>Shortcodes:</strong> Use <code>[woo_presales]</code> to add share/quote buttons anywhere</li>
                </ul>
            </div>
            
        </div>
        <?php
    }
    
    /**
     * Render React settings page
     */
    public function renderReactSettingsPage() {
        ?>
        <div class="wrap">
            <h1><?php _e('Presales Settings', 'wc-cart-share-quote'); ?></h1>
            <div id="woo-presales-settings-root" style="margin-top: 20px;">
                <!-- React settings app will mount here -->
                <woo-presales-settings-panel 
                    rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                ></woo-presales-settings-panel>
            </div>
        </div>
        <?php
    }
}