<?php
/**
 * Admin functionality for Shadow Plugin
 */

class ShadowPlugin_Admin {
    
    /**
     * Initialize admin functionality
     */
    public function init() {
        add_action('admin_menu', [$this, 'addAdminMenu']);
    }
    
    /**
     * Add admin menu
     */
    public function addAdminMenu() {
        add_options_page(
            __('Shadow Plugin Settings', 'shadow-plugin'),
            __('Shadow Plugin', 'shadow-plugin'),
            'manage_options',
            'shadow-plugin-settings',
            [$this, 'renderAdminPage']
        );
    }
    
    /**
     * Render admin page with only REST nonce
     */
    public function renderAdminPage() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <div id="shadow-plugin-admin-root">
                <!-- Clean implementation: only pass REST nonce, fetch data via API -->
                <shadow-plugin-panel 
                    rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
                ></shadow-plugin-panel>
            </div>
        </div>
        <?php
    }
}