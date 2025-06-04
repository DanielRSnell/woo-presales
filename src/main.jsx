import React from 'react';
import r2wc from '@r2wc/react-to-web-component';
import { ShadowApp } from './ShadowApp';
import { SettingsApp } from './components/SettingsApp';

// Create the web component with props support using correct API
const WCCartShareQuoteElement = r2wc(ShadowApp, {
  shadow: 'open',
  props: {
    // REST nonce for API authentication
    restNonce: 'string',
    // Page type for different interfaces
    pageType: 'string',
    // Shared cart hash for shared cart pages
    cartHash: 'string',
    // Quote ID for quote pages
    quoteId: 'string',
    // Current URL for redirects
    currentUrl: 'string',
    // Pre-loaded cart data (JSON string)
    cartData: 'string'
  }
});

// Create settings component
const WooPresalesSettingsElement = r2wc(SettingsApp, {
  shadow: false, // No shadow DOM for admin settings
  props: {
    restNonce: 'string'
  }
});

// Register the web components
customElements.define('wc-cart-share-quote-panel', WCCartShareQuoteElement);
customElements.define('woo-presales-settings-panel', WooPresalesSettingsElement);

// Export for global access
window.WCCartShareQuote = {
  ShadowApp,
  init: function() {
    console.log('WooCommerce Cart Share & Quote initialized');
    return true;
  },
  openShareModal: function() {
    console.log('Share modal function called - no active instance');
  },
  openQuoteModal: function() {
    console.log('Quote modal function called - no active instance');
  }
};

// Note: Auto-initialization removed to prevent errors when script is loaded without components
// Init will be called manually when needed by WordPress integration