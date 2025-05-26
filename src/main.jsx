import React from 'react';
import r2wc from '@r2wc/react-to-web-component';
import { ShadowApp } from './ShadowApp';

// Create the web component with props support using correct API
const ShadowPluginElement = r2wc(ShadowApp, {
  shadow: 'open',
  props: {
    // Only pass REST nonce - fetch everything else via API
    restNonce: 'string'
  }
});

// Register the web component
customElements.define('shadow-plugin-panel', ShadowPluginElement);

// Export for global access
window.ShadowPlugin = {
  ShadowApp,
  init: () => {
    console.log('Shadow Plugin Boilerplate initialized');
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  window.ShadowPlugin.init();
});