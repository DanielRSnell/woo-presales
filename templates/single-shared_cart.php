<?php
/**
 * Template for displaying shared cart posts
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header();

$post_id = get_the_ID();
$cart_data = get_post_meta($post_id, '_cart_data', true);
$cart_hash = get_post_meta($post_id, '_cart_hash', true);
$customer_name = get_post_meta($post_id, '_customer_name', true);
$customer_email = get_post_meta($post_id, '_customer_email', true);
$expires_at = get_post_meta($post_id, '_expires_at', true);
$access_count = get_post_meta($post_id, '_access_count', true);

// Update access count
update_post_meta($post_id, '_access_count', $access_count + 1);

// Check if expired
$is_expired = $expires_at && strtotime($expires_at) < time();

?>

<div class="wc-shared-cart-container" style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    
    <header class="shared-cart-header" style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e1e5e9;">
        <h1 style="color: #1a1a1a; font-size: 2.5rem; margin-bottom: 10px;">Shared Cart</h1>
        <?php if ($customer_name): ?>
            <p style="color: #666; font-size: 1.1rem; margin: 0;">Shared by <strong><?php echo esc_html($customer_name); ?></strong></p>
        <?php endif; ?>
        <?php if ($expires_at): ?>
            <p style="color: #888; font-size: 0.9rem; margin: 10px 0 0 0;">
                <?php if ($is_expired): ?>
                    <span style="color: #d93025;">⚠️ This shared cart has expired</span>
                <?php else: ?>
                    Valid until <?php echo esc_html(date('F j, Y g:i A', strtotime($expires_at))); ?>
                <?php endif; ?>
            </p>
        <?php endif; ?>
    </header>

    <?php if ($is_expired): ?>
        
        <div class="expired-notice" style="background: #fef7f0; border: 1px solid #fdd8b5; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <h3 style="color: #d93025; margin: 0 0 10px 0;">Cart Link Expired</h3>
            <p style="color: #b3501a; margin: 0;">This shared cart is no longer available. Please ask the sender for a new link.</p>
        </div>
        
    <?php elseif ($cart_data && !empty($cart_data)): ?>
        
        <?php
        // Generate WooCommerce add-to-cart URL for selected shared cart items
        // Similar to quote template, using WordPress action hooks for proper cart handling
        $base_add_to_cart_url = add_query_arg([
            'wc_shared_cart_checkout' => $post_id,
            'shared_cart_nonce' => wp_create_nonce('shared_cart_checkout_' . $post_id)
        ], wc_get_cart_url());
        ?>
            
            <div class="cart-items" style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 30px;">
                
                <div class="cart-items-header" style="background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e1e5e9;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin: 0; color: #1a1a1a;">Cart Items (<?php echo count($cart_data); ?>)</h3>
                        <div>
                            <button type="button" onclick="selectAllItems()" style="background: #007cba; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-right: 10px; cursor: pointer; font-size: 14px;">Select All</button>
                            <button type="button" onclick="deselectAllItems()" style="background: #666; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">Deselect All</button>
                        </div>
                    </div>
                </div>
                
                <div class="cart-items-list">
                    <?php 
                    $total_price = 0;
                    foreach ($cart_data as $index => $item): 
                        $product = wc_get_product($item['product_id']);
                        if (!$product) continue;
                        
                        $item_total = $product->get_price() * $item['quantity'];
                        $total_price += $item_total;
                    ?>
                        <div class="cart-item" style="padding: 20px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 15px;" data-product-id="<?php echo esc_attr($item['product_id']); ?>">
                            
                            <input type="checkbox" 
                                   name="selected_items[]" 
                                   value="<?php echo esc_attr($index); ?>"
                                   checked
                                   class="item-checkbox"
                                   style="width: 18px; height: 18px; margin: 0;">
                            
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
                                    <span><strong>Price:</strong> <?php echo wc_price($product->get_price()); ?></span>
                                    <span><strong>Total:</strong> <?php echo wc_price($item_total); ?></span>
                                </div>
                            </div>
                            
                            <?php if (!$product->is_in_stock()): ?>
                                <div class="stock-status" style="background: #fef7f0; color: #d93025; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">
                                    Out of Stock
                                </div>
                            <?php endif; ?>
                            
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="cart-total" style="background: #f8f9fa; padding: 20px; text-align: right;">
                    <p style="margin: 0; font-size: 1.2rem; color: #1a1a1a;">
                        <strong>Estimated Total: <span id="estimated-total"><?php echo wc_price($total_price); ?></span></strong>
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #666;">
                        *Final total may vary based on taxes, shipping, and available discounts
                    </p>
                </div>
                
            </div>
            
            <div class="cart-actions" style="text-align: center;">
                <h3 style="margin: 0 0 15px 0; color: #1a1a1a;">Ready to add selected items to your cart?</h3>
                <p style="margin: 0 0 25px 0; color: #666; font-size: 1rem;">
                    Selected items will be added to your cart so you can review and complete your purchase.
                </p>
                
                <a href="#" 
                   id="add-selected-to-cart-btn"
                   class="add-to-cart-btn" 
                   style="display: inline-block; text-decoration: none; background: linear-gradient(135deg, #007cba 0%, #005a87 100%); color: white; border: none; padding: 18px 36px; border-radius: 8px; font-size: 1.2rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(0,124,186,0.3); transition: all 0.2s ease; min-width: 250px;"
                   onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,124,186,0.4)'"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,124,186,0.3)'">
                    Add Selected to My Cart
                </a>
                
                <p style="margin: 20px 0 0 0; color: #666; font-size: 0.9rem;">
                    Only selected items will be added to your cart for checkout.
                </p>
            </div>
        
    <?php else: ?>
        
        <div class="empty-cart" style="text-align: center; padding: 60px 20px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #666; margin: 0 0 10px 0;">No Items Found</h3>
            <p style="color: #888; margin: 0;">This shared cart appears to be empty or invalid.</p>
        </div>
        
    <?php endif; ?>
    
    <div class="shared-cart-footer" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e1e5e9;">
        <p style="color: #666; font-size: 0.9rem; margin: 0;">
            Want to share your own cart? <a href="<?php echo esc_url(wc_get_cart_url()); ?>" style="color: #007cba;">Visit our shop</a>
        </p>
    </div>
    
</div>

<script>
// Cart data for JavaScript access
const cartData = <?php echo json_encode($cart_data); ?>;
const baseAddToCartUrl = <?php echo json_encode($base_add_to_cart_url); ?>;

function selectAllItems() {
    document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = true);
    updateEstimatedTotal();
    updateAddToCartUrl();
}

function deselectAllItems() {
    document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
    updateEstimatedTotal();
    updateAddToCartUrl();
}

function updateEstimatedTotal() {
    const checkboxes = document.querySelectorAll('.item-checkbox:checked');
    let total = 0;
    
    checkboxes.forEach(cb => {
        const index = parseInt(cb.value);
        if (cartData[index]) {
            // Calculate item total - this is a simplified calculation
            // In a real implementation, you'd want the exact product price
            const itemData = cartData[index];
            // For now, we'll use a placeholder calculation
            // You might want to store prices in data attributes for accuracy
            const itemRow = cb.closest('.cart-item');
            const totalText = itemRow.querySelector('.item-meta span:last-child');
            if (totalText) {
                const totalMatch = totalText.textContent.match(/[\d,]+\.?\d*/);
                if (totalMatch) {
                    total += parseFloat(totalMatch[0].replace(',', ''));
                }
            }
        }
    });
    
    const totalElement = document.getElementById('estimated-total');
    if (totalElement) {
        // Simple formatting - in production you'd use WooCommerce's price formatting
        totalElement.textContent = '$' + total.toFixed(2);
    }
}

function updateAddToCartUrl() {
    const checkboxes = document.querySelectorAll('.item-checkbox:checked');
    const selectedItems = Array.from(checkboxes).map(cb => cb.value);
    
    // Create URL with selected items
    let url = baseAddToCartUrl;
    if (selectedItems.length > 0) {
        url += '&selected_items=' + encodeURIComponent(selectedItems.join(','));
    }
    
    const addToCartBtn = document.getElementById('add-selected-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.href = url;
    }
}

// Update button state and URL based on selections
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const addToCartBtn = document.getElementById('add-selected-to-cart-btn');
    
    function updateButtonState() {
        const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
        
        if (addToCartBtn) {
            if (anyChecked) {
                addToCartBtn.style.opacity = '1';
                addToCartBtn.style.cursor = 'pointer';
                addToCartBtn.style.pointerEvents = 'auto';
                addToCartBtn.onclick = null; // Allow default link behavior
            } else {
                addToCartBtn.style.opacity = '0.5';
                addToCartBtn.style.cursor = 'not-allowed';
                addToCartBtn.style.pointerEvents = 'auto';
                addToCartBtn.onclick = function(e) {
                    e.preventDefault();
                    alert('Please select at least one item to add to cart.');
                    return false;
                };
            }
        }
    }
    
    function onSelectionChange() {
        updateButtonState();
        updateEstimatedTotal();
        updateAddToCartUrl();
    }
    
    checkboxes.forEach(cb => cb.addEventListener('change', onSelectionChange));
    
    // Initialize on page load
    onSelectionChange();
});
</script>

<?php get_footer(); ?>