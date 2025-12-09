"use client"

import React, { useEffect } from 'react';
import { motion } from 'motion/react'
import { X } from 'lucide-react'

export default function WidgetLimitPopup({ message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message || !onClose || duration <= 0) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [message, onClose, duration]);

  if (!message) return null;
  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.16 }}
      className="fixed right-5 bottom-5 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-[360px] flex items-center gap-3"
    >
      <div className="flex-1 text-sm leading-tight">{message}</div>
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}
