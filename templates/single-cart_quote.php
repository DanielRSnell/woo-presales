<?php
/**
 * Template for displaying quote posts
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header();

$post_id = get_the_ID();
$cart_data = get_post_meta($post_id, '_cart_data', true);
$quote_id = get_post_meta($post_id, '_quote_id', true) ?: $post_id;
$customer_name = get_post_meta($post_id, '_customer_name', true);
$customer_email = get_post_meta($post_id, '_customer_email', true);
$customer_phone = get_post_meta($post_id, '_customer_phone', true);
$message = get_post_meta($post_id, '_message', true);
$expires_at = get_post_meta($post_id, '_expires_at', true);
$quote_total = get_post_meta($post_id, '_quote_total', true);
$created_at = get_post_meta($post_id, '_created_at', true);

// Get store information
$store_options = get_option('wc_cart_share_quote_options', []);
$store_name = $store_options['store_name'] ?? get_bloginfo('name');
$store_address = $store_options['store_address'] ?? '';
$store_phone = $store_options['store_phone'] ?? '';
$store_email = $store_options['store_email'] ?? get_option('admin_email');
$store_website = $store_options['store_website'] ?? home_url();

// Check if expired
$is_expired = $expires_at && strtotime($expires_at) < time();

?>

<div class="wc-quote-container" style="max-width: 900px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    
    <header class="quote-header" style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e1e5e9;">
        <!-- Quote Information -->
        <div class="quote-info" style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; overflow: hidden;">
            <div class="quote-header" style="background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e1e5e9;">
                <h3 style="margin: 0; color: #1a1a1a;">Quote</h3>
            </div>
            <div class="quote-details" style="padding: 20px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div>
                        <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Quote ID</strong>
                        <p style="margin: 5px 0 0 0; color: #1a1a1a; font-weight: 600;">#<?php echo esc_html($quote_id); ?></p>
                    </div>
                    
                    <?php if ($created_at): ?>
                        <div>
                            <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Created</strong>
                            <p style="margin: 5px 0 0 0; color: #1a1a1a;"><?php echo esc_html(date('F j, Y g:i A', strtotime($created_at))); ?></p>
                        </div>
                    <?php endif; ?>
                    
                    <div>
                        <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Store Name</strong>
                        <p style="margin: 5px 0 0 0; color: #1a1a1a;"><?php echo esc_html($store_name); ?></p>
                    </div>
                    
                    <div>
                        <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Website</strong>
                        <p style="margin: 5px 0 0 0; color: #1a1a1a;">
                            <a href="<?php echo esc_url($store_website); ?>" target="_blank" style="color: #007cba; text-decoration: none;">
                                <?php echo esc_html(parse_url($store_website, PHP_URL_HOST) ?: $store_website); ?>
                            </a>
                        </p>
                    </div>
                    
                    <div>
                        <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Email</strong>
                        <p style="margin: 5px 0 0 0; color: #1a1a1a;">
                            <a href="mailto:<?php echo esc_attr($store_email); ?>" style="color: #007cba; text-decoration: none;">
                                <?php echo esc_html($store_email); ?>
                            </a>
                        </p>
                    </div>
                    
                    <?php if ($store_phone): ?>
                        <div>
                            <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Phone</strong>
                            <p style="margin: 5px 0 0 0; color: #1a1a1a;">
                                <a href="tel:<?php echo esc_attr($store_phone); ?>" style="color: #007cba; text-decoration: none;">
                                    <?php echo esc_html($store_phone); ?>
                                </a>
                            </p>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ($store_address): ?>
                        <div>
                            <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Address</strong>
                            <p style="margin: 5px 0 0 0; color: #1a1a1a; line-height: 1.5;"><?php echo nl2br(esc_html($store_address)); ?></p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </header>

    <?php if ($is_expired): ?>
        
        <div class="expired-notice" style="background: #fef7f0; border: 1px solid #fdd8b5; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <h3 style="color: #d93025; margin: 0 0 10px 0;">Quote Expired</h3>
            <p style="color: #b3501a; margin: 0;">This quote is no longer valid. Please request a new quote.</p>
        </div>
        
    <?php elseif ($cart_data && !empty($cart_data)): ?>
        
        <!-- Customer Information -->
        <?php if ($customer_name || $customer_email || $customer_phone || $message): ?>
            <div class="quote-customer-info" style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; overflow: hidden;">
                <div class="customer-header" style="background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e1e5e9;">
                    <h3 style="margin: 0; color: #1a1a1a;">Customer Information</h3>
                </div>
                <div class="customer-details" style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <?php if ($customer_name): ?>
                            <div>
                                <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Name</strong>
                                <p style="margin: 5px 0 0 0; color: #1a1a1a;"><?php echo esc_html($customer_name); ?></p>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($customer_email): ?>
                            <div>
                                <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Email</strong>
                                <p style="margin: 5px 0 0 0; color: #1a1a1a;">
                                    <a href="mailto:<?php echo esc_attr($customer_email); ?>" style="color: #007cba; text-decoration: none;">
                                        <?php echo esc_html($customer_email); ?>
                                    </a>
                                </p>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($customer_phone): ?>
                            <div>
                                <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Phone</strong>
                                <p style="margin: 5px 0 0 0; color: #1a1a1a;">
                                    <a href="tel:<?php echo esc_attr($customer_phone); ?>" style="color: #007cba; text-decoration: none;">
                                        <?php echo esc_html($customer_phone); ?>
                                    </a>
                                </p>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <?php if ($message): ?>
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
                            <strong style="color: #666; font-size: 0.9rem; text-transform: uppercase;">Message</strong>
                            <p style="margin: 10px 0 0 0; color: #1a1a1a; line-height: 1.6; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <?php echo nl2br(esc_html($message)); ?>
                            </p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>

        <?php
        // Generate WooCommerce add-to-cart URL for all quote items
        // Using WordPress action hooks for proper cart handling
        $add_to_cart_url = add_query_arg([
            'wc_quote_checkout' => $post_id,
            'quote_nonce' => wp_create_nonce('quote_checkout_' . $post_id)
        ], wc_get_cart_url());
        ?>
        
        <!-- Quote Items -->
            
            <div class="quote-items" style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 30px;">
                
                <div class="quote-items-header" style="background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e1e5e9;">
                    <h3 style="margin: 0; color: #1a1a1a;">Quote Items (<?php echo count($cart_data); ?>)</h3>
                </div>
                
                <div class="quote-items-list">
                    <?php 
                    $total_price = 0;
                    foreach ($cart_data as $index => $item): 
                        $product = wc_get_product($item['product_id']);
                        if (!$product) continue;
                        
                        $item_total = $product->get_price() * $item['quantity'];
                        $total_price += $item_total;
                    ?>
                        <div class="quote-item" style="padding: 20px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 15px;" data-product-id="<?php echo esc_attr($item['product_id']); ?>">
                            
                            <?php if ($product->get_image()): ?>
                                <div class="item-image" style="flex-shrink: 0;">
                                    <?php echo $product->get_image('thumbnail', ['style' => 'width: 60px; height: 60px; object-fit: cover; border-radius: 8px;']); ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="item-details" style="flex: 1;">
                                <h4 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 1.1rem;">
                                    <a href="<?php echo esc_url($product->get_permalink()); ?>" style="color: #007cba; text-decoration: none;">
                                        <?php echo esc_html($product->get_name()); ?>
                                    </a>
                                </h4>
                                
                                <?php if ($product->get_short_description()): ?>
                                    <p style="margin: 0 0 8px 0; color: #666; font-size: 0.9rem; line-height: 1.4;">
                                        <?php echo wp_trim_words($product->get_short_description(), 15); ?>
                                    </p>
                                <?php endif; ?>
                                
                                <div class="item-meta" style="display: flex; gap: 15px; font-size: 0.9rem; color: #666;">
                                    <span><strong>Quantity:</strong> <?php echo esc_html($item['quantity']); ?></span>
                                    <span><strong>Unit Price:</strong> <?php echo wc_price($product->get_price()); ?></span>
                                    <span><strong>Total:</strong> <?php echo wc_price($item_total); ?></span>
                                </div>
                            </div>
                            
                            <div class="item-actions" style="flex-shrink: 0;">
                                <?php if ($product->is_in_stock()): ?>
                                    <div class="stock-status" style="background: #e8f5e8; color: #2d7d32; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; text-align: center;">
                                        ✓ In Stock
                                    </div>
                                <?php else: ?>
                                    <div class="stock-status" style="background: #fef7f0; color: #d93025; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; text-align: center;">
                                        Out of Stock
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="quote-total" style="background: #f8f9fa; padding: 20px; text-align: right;">
                    <p style="margin: 0; font-size: 1.3rem; color: #1a1a1a;">
                        <strong>Quote Total: <?php echo wc_price($quote_total ?: $total_price); ?></strong>
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #666;">
                        *Final total may vary based on taxes, shipping, and available discounts
                    </p>
                </div>
                
            </div>
            
            <div class="quote-actions" style="text-align: center; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #1a1a1a;">Ready to proceed with this quote?</h3>
                <p style="margin: 0 0 25px 0; color: #666; font-size: 1rem;">
                    All items from this quote will be added to your cart so you can complete your purchase.
                </p>
                
                <a href="<?php echo esc_url($add_to_cart_url); ?>" 
                   class="checkout-with-quote-btn" 
                   style="display: inline-block; text-decoration: none; background: linear-gradient(135deg, #00a32a 0%, #007e1f 100%); color: white; border: none; padding: 18px 36px; border-radius: 8px; font-size: 1.2rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(0,163,42,0.3); transition: all 0.2s ease; min-width: 250px;"
                   onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,163,42,0.4)'"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,163,42,0.3)'">
                    Checkout with This Quote
                </a>
                
                <p style="margin: 20px 0 0 0; color: #666; font-size: 0.9rem;">
                    Questions about this quote? Contact us at 
                    <?php if ($customer_email): ?>
                        <a href="mailto:<?php echo esc_attr(get_option('admin_email')); ?>?subject=Quote%20#<?php echo esc_attr($quote_id); ?>" style="color: #007cba;">
                            <?php echo esc_html(get_option('admin_email')); ?>
                        </a>
                    <?php else: ?>
                        <a href="mailto:<?php echo esc_attr(get_option('admin_email')); ?>" style="color: #007cba;">
                            <?php echo esc_html(get_option('admin_email')); ?>
                        </a>
                    <?php endif; ?>
                </p>
            </div>
        
    <?php else: ?>
        
        <div class="empty-quote" style="text-align: center; padding: 60px 20px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #666; margin: 0 0 10px 0;">No Items Found</h3>
            <p style="color: #888; margin: 0;">This quote appears to be empty or invalid.</p>
        </div>
        
    <?php endif; ?>
    
    <div class="quote-footer" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e1e5e9;">
        <p style="color: #666; font-size: 0.9rem; margin: 0;">
            Need a quote for your own items? <a href="<?php echo esc_url(wc_get_cart_url()); ?>" style="color: #007cba;">Visit our shop</a>
        </p>
    </div>
    
</div>

<?php get_footer(); ?>