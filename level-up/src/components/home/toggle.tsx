'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-10 rounded-full p-1 transition-colors duration-200 ease-in-out"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      }}
    >
      <div
        className="absolute inset-0 w-full h-full rounded-full transition-opacity duration-200"
        style={{
          opacity: isDark ? 0 : 1,
          background: 'linear-gradient(to right, #ffd700, #ffec8b)',
        }}
      />
      <div
        className="absolute inset-0 w-full h-full rounded-full transition-opacity duration-200"
        style={{
          opacity: isDark ? 1 : 0,
          background: 'linear-gradient(to right, #2c3e50, #3498db)',
        }}
      />
      <div
        className={`relative w-8 h-8 rounded-full transform transition-transform duration-200 flex items-center justify-center ${
          isDark ? 'translate-x-10' : 'translate-x-0'
        }`}
        style={{
          backgroundColor: isDark ? '#3498db' : '#ffd700',
        }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-white" />
        )}
      </div>
    </button>
  )
}

