# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Build and watch for changes
npm run build:watch

# Preview built files
npm run preview
```

## Architecture Overview

This is a WordPress plugin boilerplate that uses React with Shadow DOM for complete style isolation. The architecture consists of:

### Core Components
- **`shadow-plugin.php`** - Main WordPress plugin file with PHP backend
- **`src/main.jsx`** - Entry point that creates the web component using @r2wc/react-to-web-component
- **`src/ShadowApp.jsx`** - Main React application component
- **`src/ShadowStyles.jsx`** - Complete Raycast design system (400+ lines of CSS-in-JS)

### Build System
- **Vite** builds React into `dist/js/shadow-plugin.js` as an IIFE bundle
- **Web Components** via @r2wc/react-to-web-component creates `<shadow-plugin-panel>` custom element
- **Shadow DOM** provides complete style isolation from WordPress themes

### Server-Side Integration
PHP data is passed to React components via web component attributes:

```php
<shadow-plugin-panel 
    user-role="<?php echo esc_attr($user_role); ?>"
    user-id="<?php echo esc_attr($user_id); ?>"
    settings='<?php echo esc_attr(json_encode($settings)); ?>'
    api-nonce="<?php echo esc_attr(wp_create_nonce('nonce')); ?>"
></shadow-plugin-panel>
```

React receives these as props automatically:
```jsx
export function ShadowApp(props = {}) {
  const { userRole, userId, settings, apiNonce } = props;
  // Use server data directly in React
}
```

### WordPress Integration
- **REST API** endpoints at `/wp-json/shadow-plugin/v1/`
- **Admin menu** integration at Settings > Shadow Plugin
- **Auto-initialization** via custom element registration
- **Keyboard shortcuts** (Cmd/Ctrl + `) for panel toggle

### Tech Stack
- React 18 with hooks and Framer Motion animations
- Radix UI components (Dialog, Tabs, Switch) pre-configured
- Complete Raycast design system with CSS variables
- WordPress REST API integration with nonce security
- Custom web component architecture for WordPress compatibility

## Key Files to Understand

- `shadow-plugin.php:89-115` - Asset enqueuing and server data localization
- `shadow-plugin.php:240-265` - Auto-creation of web component with server props
- `src/main.jsx:7-20` - Web component prop definition and registration
- `src/ShadowApp.jsx:10-20` - Server prop extraction and usage
- `vite.config.js:7-15` - IIFE build configuration for WordPress compatibility

The boilerplate demonstrates server-to-client data flow, Shadow DOM isolation, and modern React development within WordPress constraints.