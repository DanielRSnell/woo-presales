import React from 'react';

export function SearchInput({ query, setQuery }) {
  return (
    <div style={{
      padding: '20px 24px 16px 24px',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute',
          left: '16px',
          color: 'var(--text-secondary)',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Shadow Plugin features..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            height: '48px',
            padding: '0 16px 0 52px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '1.4',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </div>
  );
}