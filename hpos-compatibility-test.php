<?php
/**
 * HPOS Compatibility Test
 * 
 * This file can be used to test HPOS compatibility.
 * Include it temporarily in WordPress to verify the plugin is properly declaring compatibility.
 */

// Only run in admin
if (!is_admin()) {
    return;
}

add_action('admin_notices', function() {
    // Check if our plugin is declaring HPOS compatibility
    if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
        $plugin_file = plugin_dir_path(__FILE__) . 'shadow-plugin.php';
        
        // Check if our plugin is declared as compatible
        $compatible_plugins = \Automattic\WooCommerce\Utilities\FeaturesUtil::get_compatible_plugins_for_feature('custom_order_tables');
        
        $is_compatible = false;
        foreach ($compatible_plugins as $plugin) {
            if (strpos($plugin, 'shadow-plugin.php') !== false) {
                $is_compatible = true;
                break;
            }
        }
        
        if ($is_compatible) {
            echo '<div class="notice notice-success"><p>';
            echo '<strong>WooCommerce Cart Share & Quote:</strong> ✅ Successfully declared HPOS compatible!';
            echo '</p></div>';
        } else {
            echo '<div class="notice notice-warning"><p>';
            echo '<strong>WooCommerce Cart Share & Quote:</strong> ⚠ HPOS compatibility not detected. Make sure the plugin is activated and WooCommerce is loaded.';
            echo '</p></div>';
        }
        
        // Show HPOS status
        if (class_exists('\Automattic\WooCommerce\Utilities\OrderUtil')) {
            $hpos_enabled = \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled();
            echo '<div class="notice notice-info"><p>';
            echo '<strong>HPOS Status:</strong> ' . ($hpos_enabled ? '✅ Enabled' : '❌ Disabled');
            echo '</p></div>';
        }
    } else {
        echo '<div class="notice notice-error"><p>';
        echo '<strong>WooCommerce Cart Share & Quote:</strong> ❌ WooCommerce FeaturesUtil class not found. Make sure WooCommerce 7.1+ is installed.';
        echo '</p></div>';
    }
});

// Remove this test file after verification
add_action('admin_init', function() {
    if (isset($_GET['remove_hpos_test']) && current_user_can('manage_options')) {
        unlink(__FILE__);
        wp_redirect(admin_url('plugins.php'));
        exit;
    }
});

// Add a link to remove the test file
add_action('admin_notices', function() {
    echo '<div class="notice notice-info"><p>';
    echo '<strong>HPOS Test File:</strong> ';
    echo '<a href="' . esc_url(add_query_arg('remove_hpos_test', '1')) . '">Remove this test file</a> ';
    echo '(recommended after verifying compatibility)';
    echo '</p></div>';
}, 20);