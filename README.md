# WooCommerce Cart Share & Quote

A WooCommerce plugin that allows customers to share their cart via URL or convert it to a quote for approval.

## Features

- **Share Cart via URL**: Generate shareable links for cart contents with expiration dates
- **Quote Request System**: Convert carts to quote requests for bulk pricing/approval
- **React Shadow DOM UI**: Modern, isolated UI components that work with any theme
- **Admin Management**: Full admin interface to manage shared carts and quotes
- **WooCommerce Integration**: Seamless integration with cart and checkout pages
- **Security**: Rate limiting, nonce protection, and data validation
- **REST API**: Clean API endpoints for all cart/quote operations

## Requirements

- WordPress 5.0+
- WooCommerce 5.0+ (Compatible with WooCommerce 8.5+)
- PHP 7.4+
- **HPOS Compatible**: Fully compatible with WooCommerce High-Performance Order Storage

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through WordPress admin
3. Make sure WooCommerce is installed and active
4. Plugin will automatically add share/quote buttons to cart pages

## How It Works

### For Customers

**Sharing Carts:**
1. Add items to WooCommerce cart
2. Click "Share Cart" button on cart page
3. Optionally provide contact details and expiration time
4. Get a shareable URL like: `yoursite.com/shared-cart/abc123def456`
5. Anyone with the link can view items and add them to their cart

**Requesting Quotes:**
1. Add items to cart
2. Click "Request Quote" button
3. Fill in contact information and message
4. Submit quote request for admin review
5. Get quote URL like: `yoursite.com/quote/123`

### For Store Administrators

**Managing Shared Carts:**
- View all shared carts in WooCommerce > Shared Carts
- See customer info, items, totals, and access counts
- Monitor expiration dates and access analytics

**Managing Quotes:**
- Review quote requests in WooCommerce > Cart Quotes
- Approve/reject quotes with custom pricing
- Filter by status (pending, approved, rejected, expired)
- Email notifications and admin bar notifications

## Plugin Structure

```
├── shadow-plugin.php                    # Main plugin file
├── inc/                                 # PHP classes
│   ├── class-admin.php                 # Admin interface
│   ├── class-assets.php                # Asset management
│   ├── class-api.php                   # REST API coordinator
│   ├── class-woocommerce-integration.php  # WooCommerce hooks
│   └── class-security.php              # Security & rate limiting
├── api/                                # API endpoints
│   ├── class-user-endpoint.php        # User data
│   ├── class-site-endpoint.php        # Site data
│   └── class-cart-endpoint.php        # Cart operations
├── src/                                # React source
│   ├── main.jsx                       # Entry point
│   ├── ShadowApp.jsx                  # Main React app
│   ├── ShadowStyles.jsx               # Design system
│   └── components/                    # React components
│       ├── SharedCartView.jsx         # Shared cart page
│       ├── QuoteView.jsx              # Quote page
│       └── CartActionsModal.jsx       # Cart share/quote modals
└── dist/                              # Built assets
```

## Database Schema

### Custom Post Types

**shared_cart:**
- `_cart_data` - Serialized cart items array
- `_cart_hash` - Unique 12-character identifier
- `_customer_name` - Customer name (optional)
- `_customer_email` - Customer email (optional)
- `_customer_phone` - Customer phone (optional)
- `_customer_id` - WordPress user ID (if logged in)
- `_expires_at` - Expiration datetime
- `_access_count` - Number of times accessed
- `_created_at` - Creation timestamp

**cart_quote:**
- `_cart_data` - Serialized cart items array
- `_quote_status` - Status: pending, approved, rejected, expired
- `_quote_total` - Admin-set quote total amount
- `_quote_notes` - Internal admin notes
- `_customer_name` - Customer name (required)
- `_customer_email` - Customer email (required)
- `_customer_phone` - Customer phone (optional)
- `_customer_id` - WordPress user ID (if logged in)
- `_expires_at` - Quote expiration datetime
- `_created_at` - Creation timestamp

## API Endpoints

Base URL: `/wp-json/wc-cart-share-quote/v1/`

**Cart Operations:**
- `GET /cart` - Get current cart contents
- `POST /cart/share` - Create shareable cart URL
- `POST /cart/quote` - Create quote request
- `GET /shared-cart/{hash}` - Get shared cart by hash
- `POST /shared-cart/{hash}/add` - Add shared cart to current cart
- `GET /quote/{id}` - Get quote details
- `POST /quote/{id}/accept` - Accept approved quote

**Security Features:**
- Nonce-based authentication
- Rate limiting (5 shares/3 quotes per 5 minutes)
- Input validation and sanitization
- Cart data structure validation
- Automatic cleanup of expired data

## Shortcodes

```php
// Share/quote buttons with default styling
[wc_cart_share_quote_buttons]

// Only share button
[wc_cart_share_quote_buttons show_quote="false"]

// Link style instead of buttons
[wc_cart_share_quote_buttons style="links"]

// Mini style for sidebars
[wc_cart_share_quote_buttons style="mini"]
```

## Development

**Setup:**
```bash
npm install
npm run dev    # Development with hot reload
npm run build  # Production build
```

**Adding Features:**
1. Backend: Create PHP classes in `inc/` or `api/`
2. Frontend: Add React components in `src/components/`
3. Integration: Hook into WooCommerce via `class-woocommerce-integration.php`

## Security & Compatibility

- **HPOS Compatible**: Fully compatible with WooCommerce High-Performance Order Storage (HPOS)
- **Rate Limiting**: API endpoints have configurable rate limits
- **Data Validation**: All cart data validated for security
- **Nonce Protection**: WordPress nonces on all operations
- **Input Sanitization**: All user input properly sanitized
- **Automatic Cleanup**: Expired data automatically removed
- **Access Control**: Quotes protected by capability checks
- **WooCommerce Standards**: Follows WooCommerce coding and security standards

## Hooks & Filters

```php
// Validate cart data before saving
add_filter('wc_cart_share_quote_validate_cart_data', 'my_cart_validator');

// Sanitize customer data
add_filter('wc_cart_share_quote_sanitize_customer_data', 'my_data_sanitizer');

// Customize share email template
add_filter('wc_cart_share_quote_share_email_template', 'my_email_template');
```

## Styling

The plugin uses Shadow DOM for complete style isolation. All styles are in `src/ShadowStyles.jsx` using CSS-in-JS with a comprehensive design system based on Raycast UI.

## Browser Support

- Chrome 63+ (Web Components, Shadow DOM)
- Firefox 63+
- Safari 13.1+
- Edge 79+

## Troubleshooting

### HPOS Compatibility Issues

If you see "This plugin is incompatible with HPOS" error:

1. **Deactivate and reactivate the plugin** - This ensures the compatibility declaration is properly registered
2. **Check WooCommerce version** - Requires WooCommerce 7.1+ for HPOS compatibility features
3. **Verify no plugin conflicts** - Some plugins may interfere with HPOS declarations

### Testing HPOS Compatibility

The plugin includes a test file for verifying HPOS compatibility:

1. Activate the plugin
2. Navigate to WordPress Admin
3. Look for HPOS compatibility notices
4. Optional: Include `hpos-compatibility-test.php` temporarily for detailed testing

### Common Issues

- **Cart sharing not working**: Ensure WooCommerce cart is properly initialized
- **Quote emails not sending**: Check WordPress mail configuration
- **Admin interface not showing**: Verify user has `manage_woocommerce` capability

## License

GPL v2 or later

## Support

For issues and feature requests, please use the GitHub issue tracker.