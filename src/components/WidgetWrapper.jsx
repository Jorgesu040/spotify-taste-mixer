'use client'

import { useState, useEffect } from 'react'

export default function WidgetWrapper({ children, cols = 1, storageKey }) {
  const [currentCols, setCurrentCols] = useState(cols)

  // Load from localStorage on mount
  useEffect(() => {
    if (!storageKey) return
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      setCurrentCols(parseInt(stored))
    }
  }, [storageKey])

  const handleChangeCol = (newCols) => {
    setCurrentCols(newCols)
    if (storageKey) {
      localStorage.setItem(storageKey, newCols)
    }
  }

  const colsClass = {
    1: '',
    2: 'sm:col-span-2',
    3: 'lg:col-span-3'
  }[currentCols]

  return (
    <div className={`relative z-1 w-full h-full min-w-0 ${colsClass}`}>
      {/* Column size selector */}
      {storageKey && (
        <div className="absolute bottom-2 right-2 hidden md:flex gap-1 bg-spotify-gray-darker/80 rounded-full p-2 z-20">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleChangeCol(num)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentCols === num
                  ? 'bg-spotify-green text-black'
                  : 'bg-spotify-gray-mid text-spotify-gray-light hover:bg-spotify-gray-light/20'
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
      <div className="h-full min-w-0">
        {children}
      </div>
    </div>
  )
}
