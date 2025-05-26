import React from 'react';
import { motion } from 'framer-motion';

export function CommandItem({ command, index, onClick }) {
  return (
    <motion.div
      style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'transparent',
        transition: 'background-color 0.15s ease',
        position: 'relative'
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      whileHover={{ 
        backgroundColor: 'var(--surface-hover)',
        transition: { duration: 0.1 }
      }}
      onClick={() => onClick?.(command)}
    >
      <div style={{
        fontSize: '22px',
        lineHeight: '1',
        flexShrink: 0
      }}>
        {command.icon}
      </div>
      <div style={{ 
        flex: 1, 
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          lineHeight: '1.3',
          wordBreak: 'break-word'
        }}>
          {command.title}
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.4',
          wordBreak: 'break-word'
        }}>
          {command.description}
        </div>
      </div>
    </motion.div>
  );
}