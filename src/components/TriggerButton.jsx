import React from 'react';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';

export function TriggerButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 999999997,
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '12px 16px',
        color: 'var(--text-primary)',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: `
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.3),
          0 4px 8px rgba(0, 0, 0, 0.2)
        `,
        transition: 'all 0.2s ease',
        outline: 'none'
      }}
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'var(--surface-hover)',
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <Command size={16} />
      <span>Open Command Palette</span>
    </motion.button>
  );
}