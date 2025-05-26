# Shadow Plugin Design System

This styleguide provides LLMs with quick reference for styling components in the Shadow Plugin boilerplate.

## 🎨 CSS Variables Reference

All styling uses CSS variables defined in `src/ShadowStyles.jsx`. Use these exact variable names in inline styles:

### Background Colors
```jsx
backgroundColor: 'var(--surface)'        // Main container backgrounds
backgroundColor: 'var(--surface-hover)'  // Interactive hover states  
backgroundColor: 'var(--surface-bg)'     // Page backgrounds, footers
```

### Text Colors
```jsx
color: 'var(--text-primary)'     // Headings, important text
color: 'var(--text-secondary)'   // Body text, descriptions
color: 'var(--text-tertiary)'    // Subtle text, placeholders
```

### Borders & Accents
```jsx
border: '1px solid var(--border)'  // All borders and dividers
color: 'var(--accent)'             // Accent color for highlights
```

### Typography
```jsx
fontFamily: 'var(--font-sans)'  // Primary font stack
fontFamily: 'var(--font-mono)'  // Monospace font for code/kbd
```

## 🔧 Common Patterns

### Card/Container Styling
```jsx
style={{
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '16px 24px'
}}
```

### Interactive Elements
```jsx
// Base state
backgroundColor: 'var(--surface)'

// Hover state (use with framer-motion whileHover)
whileHover={{ backgroundColor: 'var(--surface-hover)' }}
```

### Text Content
```jsx
// Primary text (headings, titles)
style={{ 
  color: 'var(--text-primary)',
  fontSize: '15px',
  fontWeight: '500'
}}

// Secondary text (descriptions, body)
style={{ 
  color: 'var(--text-secondary)',
  fontSize: '13px'
}}
```

### Keyboard Shortcuts Display
```jsx
<kbd style={{
  backgroundColor: 'var(--surface)',
  color: 'var(--text-secondary)',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: '600',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-mono)'
}}>
  ⌘K
</kbd>
```

## 🎯 Variable Values (for reference)

These are the actual values - use the variables above in code:

- `--surface`: `rgba(24, 24, 27, 0.95)` - Main dark surfaces
- `--surface-hover`: `rgba(39, 39, 42, 0.95)` - Lighter hover state
- `--surface-bg`: `rgba(9, 9, 11, 0.95)` - Darkest background
- `--text-primary`: `rgba(255, 255, 255, 0.98)` - High contrast white
- `--text-secondary`: `rgba(255, 255, 255, 0.7)` - Medium contrast
- `--text-tertiary`: `rgba(255, 255, 255, 0.5)` - Low contrast
- `--border`: `rgba(63, 63, 70, 0.8)` - Subtle border color
- `--accent`: `#ff6363` - Red accent color

## 📝 LLM Guidelines

### When Modifying Components:

1. **Always use CSS variables** instead of hard-coded colors
2. **Maintain the pattern** of inline styles for LLM-friendliness
3. **Follow semantic naming** - use `--text-primary` for important text
4. **Keep consistency** - all borders use `var(--border)`

### When Creating New Components:

```jsx
// ✅ Good - uses semantic variables
const NewComponent = () => (
  <div style={{
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)'
  }}>
    Content
  </div>
);

// ❌ Avoid - hard-coded values
const BadComponent = () => (
  <div style={{
    backgroundColor: 'rgba(24, 24, 27, 0.95)',
    color: 'rgba(255, 255, 255, 0.98)'
  }}>
    Content
  </div>
);
```

### When Theming:

To change the overall appearance, modify the CSS variables in `src/ShadowStyles.jsx`:

```css
:host {
  /* Light theme example */
  --surface: rgba(255, 255, 255, 0.95);
  --text-primary: rgba(0, 0, 0, 0.98);
  --border: rgba(0, 0, 0, 0.1);
}
```

## 🚀 Quick Component Examples

### Button
```jsx
<button style={{
  backgroundColor: 'var(--surface)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '8px 16px',
  fontFamily: 'var(--font-sans)'
}}>
  Click me
</button>
```

### Input Field
```jsx
<input style={{
  backgroundColor: 'transparent',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  padding: '8px 12px',
  fontSize: '14px'
}} />
```

### Panel/Modal
```jsx
<div style={{
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)'
}}>
  Panel content
</div>
```

This design system ensures consistency while maintaining LLM-friendly patterns for easy modification and extension.