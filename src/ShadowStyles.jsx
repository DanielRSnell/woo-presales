import React from 'react';

const SHADOW_STYLES = `
/* Shadow Plugin Design System - CSS Variables */
:host {
  /* Background Colors */
  --surface: rgba(24, 24, 27, 0.95);
  --surface-hover: rgba(39, 39, 42, 0.95);
  --surface-bg: rgba(9, 9, 11, 0.95);
  
  /* Text Colors */
  --text-primary: rgba(255, 255, 255, 0.98);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  
  /* Border & Accent */
  --border: rgba(63, 63, 70, 0.8);
  --accent: #ff6363;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: -apple-system, BlinkMacSystemFont, "SF Mono", Monaco, "Cascadia Code", monospace;
}

/* Essential Shadow DOM normalization */
* {
  box-sizing: border-box;
}

/* Smooth scrollbars for command list */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--surface-hover);
}
`;

export function ShadowStyles() {
  return (
    <style id="shadow-plugin-styles" dangerouslySetInnerHTML={{ __html: SHADOW_STYLES }} />
  );
}