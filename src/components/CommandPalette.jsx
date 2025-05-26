import React from 'react';
import { motion } from 'framer-motion';
import { SearchInput } from './SearchInput';
import { CommandItem } from './CommandItem';

export function CommandPalette({ 
  query, 
  setQuery, 
  filteredCommands, 
  onCommandClick,
  onClose 
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999999998,
          cursor: 'pointer'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      
      {/* Command Palette Container */}
      <motion.div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          zIndex: 999999999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '15vh',
          paddingLeft: '16px',
          paddingRight: '16px',
          pointerEvents: 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Command Palette */}
        <motion.div
          style={{
            width: '100%',
            maxWidth: '640px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.05),
              0 32px 80px rgba(0, 0, 0, 0.6),
              0 16px 32px rgba(0, 0, 0, 0.4)
            `,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            pointerEvents: 'auto',
            fontFamily: 'var(--font-sans)'
          }}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            damping: 30, 
            stiffness: 300,
            duration: 0.4
          }}
        >
          {/* Search Header */}
          <SearchInput 
            query={query}
            setQuery={setQuery}
          />

          {/* Results List */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <CommandItem
                  key={command.id}
                  command={command}
                  index={index}
                  onClick={onCommandClick}
                />
              ))
            ) : (
              <div style={{
                padding: '32px 24px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '14px'
              }}>
                No results found for "{query}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>
              🚀 Shadow Plugin Boilerplate Demo
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              color: 'var(--text-tertiary)'
            }}>
              <span>Press</span>
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
              <span>to toggle</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}