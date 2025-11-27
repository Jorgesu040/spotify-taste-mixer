'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'



export default function CursorBlob({ children, className = '' }) {

  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="pointer-events-none absolute w-50 h-50 bg-linear-to-r from-green-500 to-white rounded-full opacity-40 blur-3xl"
        style={{
          left: 0,
          top: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          scale: 1.2,
        }}
        animate={{
          scale: [0.8, 1.5, 0.8],
          rotate: [0, 12, -12, 0],
        }}
        transition={{
          scale: { duration: 10, repeat: Infinity, repeatType: 'mirror', easing: 'ease-in-out', repeatDelay: 1.2 },
          rotate: { duration: 5, repeat: Infinity, repeatType: 'mirror', easing: 'ease-in-out', repeatDelay: 1.2 },
        }}
      />

      {children}
    </div>
  )

}