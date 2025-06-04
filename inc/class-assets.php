<?php
/**
 * Asset management for WooCommerce Cart Share & Quote
 */

class WC_Cart_Share_Quote_Assets {
    
    /**
     * Initialize asset functionality
     */
    public function init() {
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
        
        // Add web component to footers
        add_action('wp_footer', [$this, 'renderWebComponent']);
        add_action('admin_footer', [$this, 'renderWebComponent']);
        
        // Add CSS variables to frontend
        add_action('wp_head', [$this, 'renderCSSVariables']);
        add_action('admin_head', [$this, 'renderCSSVariables']);
    }
    
    /**
     * Enqueue frontend and admin assets
     */
    public function enqueueAssets() {
        // Only enqueue on admin pages or WooCommerce pages or our custom pages
        $should_enqueue = false;
        
        if (is_admin()) {
            $should_enqueue = true;
        } elseif (function_exists('is_woocommerce')) {
            // Frontend WooCommerce pages
            if (is_woocommerce() || is_cart() || is_checkout() || is_account_page()) {
                $should_enqueue = true;
            }
            // Our custom shared cart and quote pages
            if (get_query_var('wc_shared_cart_hash') || get_query_var('wc_quote_id')) {
                $should_enqueue = true;
            }
        }
        
        if (!$should_enqueue) {
            return;
        }
        
        // Enqueue the React build
        $js_file = WC_CART_SHARE_QUOTE_DIR . 'dist/js/wc-cart-share-quote.js';
        if (file_exists($js_file)) {
            wp_enqueue_script(
                'wc-cart-share-quote-js',
                WC_CART_SHARE_QUOTE_URL . 'dist/js/wc-cart-share-quote.js',
                [],
                filemtime($js_file),
                true
            );
        }
    }
    
    /**
     * Enqueue block editor specific assets
     */
    public function enqueueBlockEditorAssets() {
        $this->enqueueAssets();
    }
    
    /**
     * Render web component in footer with only REST nonce
     */
    public function renderWebComponent() {
        // Don't add if we're on the admin settings page (it's already there)
        if (is_admin() && isset($_GET['page']) && $_GET['page'] === 'wc-cart-share-quote-settings') {
            return;
        }
        
        // Only add the default command palette in admin areas, not on frontend
        if (!is_admin()) {
            return;
        }
        
        ?>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Initialize the plugin first
                if (window.WCCartShareQuote && typeof window.WCCartShareQuote.init === 'function') {
                    window.WCCartShareQuote.init();
                }
                
                // Then create the component if it doesn't exist
                if (!document.querySelector('wc-cart-share-quote-panel')) {
                    const panel = document.createElement('wc-cart-share-quote-panel');
                    
                    // Only pass the REST nonce - everything else fetched via API
                    panel.setAttribute('rest-nonce', '<?php echo esc_js(wp_create_nonce('wp_rest')); ?>');
                    
                    document.body.appendChild(panel);
                }
            });
        </script>
        <?php
    }
    
    /**
     * Render CSS variables for theme customization
     */
    public function renderCSSVariables() {
        $css_variables = get_option('woo_presales_css_variables', []);
        $settings = get_option('woo_presales_settings', []);
        
        // Get design settings
        $design = $settings['design'] ?? [];
        
        // Default CSS variables
        $default_variables = [
            '--woo-presales-primary-color' => $design['primary_color'] ?? '#007cba',
            '--woo-presales-secondary-color' => $design['secondary_color'] ?? '#00a32a',
            '--woo-presales-share-color' => $design['primary_color'] ?? '#007cba',
            '--woo-presales-quote-color' => $design['secondary_color'] ?? '#00a32a',
            '--woo-presales-link-color' => $design['primary_color'] ?? '#007cba',
            '--woo-presales-font-family' => $this->getFontFamily($design['font_family'] ?? 'system'),
            '--woo-presales-button-radius' => $this->getButtonRadius($design['button_style'] ?? 'rounded'),
            '--woo-presales-button-padding' => $this->getButtonPadding($design['button_size'] ?? 'medium'),
            '--woo-presales-button-font-size' => $this->getButtonFontSize($design['button_size'] ?? 'medium'),
            '--woo-presales-border-radius' => ($design['border_radius'] ?? 6) . 'px'
        ];
        
        // Merge with stored variables
        $variables = array_merge($default_variables, $css_variables);
        
        if (!empty($variables) || !empty($design['custom_css'])) {
            echo '<style id="woo-presales-variables">';
            echo ':root {';
            foreach ($variables as $property => $value) {
                echo $property . ': ' . esc_attr($value) . ';';
            }
            echo '}';
            
            // Add custom CSS
            if (!empty($design['custom_css'])) {
                echo esc_html($design['custom_css']);
            }
            
            echo '</style>';
        }
    }
    
    /**
     * Get font family CSS value
     */
    private function getFontFamily($family) {
        $families = [
            'system' => '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'arial' => 'Arial, sans-serif',
            'helvetica' => 'Helvetica, Arial, sans-serif',
            'georgia' => 'Georgia, serif',
            'times' => '"Times New Roman", Times, serif'
        ];
        
        return $families[$family] ?? $families['system'];
    }
    
    /**
     * Get button radius based on style
     */
    private function getButtonRadius($style) {
        switch ($style) {
            case 'square':
                return '0px';
            case 'pill':
                return '50px';
            default:
                return '6px';
        }
    }
    
    /**
     * Get button padding based on size
     */
    private function getButtonPadding($size) {
        switch ($size) {
            case 'small':
                return '8px 16px';
            case 'large':
                return '16px 32px';
            default:
                return '12px 24px';
        }
    }
    
    /**
     * Get button font size based on size
     */
    private function getButtonFontSize($size) {
        switch ($size) {
            case 'small':
                return '12px';
            case 'large':
                return '16px';
            default:
                return '14px';
        }
    }
}