<?php
/**
 * Asset management for Shadow Plugin
 */

class ShadowPlugin_Assets {
    
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
    }
    
    /**
     * Enqueue frontend and admin assets
     */
    public function enqueueAssets() {
        // Enqueue the React build
        $js_file = SHADOW_PLUGIN_DIR . 'dist/js/shadow-plugin.js';
        if (file_exists($js_file)) {
            wp_enqueue_script(
                'shadow-plugin-js',
                SHADOW_PLUGIN_URL . 'dist/js/shadow-plugin.js',
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
        if (is_admin() && isset($_GET['page']) && $_GET['page'] === 'shadow-plugin-settings') {
            return;
        }
        
        ?>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                if (!document.querySelector('shadow-plugin-panel')) {
                    const panel = document.createElement('shadow-plugin-panel');
                    
                    // Only pass the REST nonce - everything else fetched via API
                    panel.setAttribute('rest-nonce', '<?php echo esc_js(wp_create_nonce('wp_rest')); ?>');
                    
                    document.body.appendChild(panel);
                }
            });
        </script>
        <?php
    }
}