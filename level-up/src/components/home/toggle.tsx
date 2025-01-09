'use client'


import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/home/provider-toggle'


export function ThemeToggle() {
  // const [isDark, setIsDark] = useState(false)

  // useEffect(() => {
  //   // Check initial theme
  //   const isDarkMode = document.documentElement.classList.contains('dark')
  //   setIsDark(isDarkMode)
  // }, [])

  // const toggleTheme = () => {
  //   const newTheme = !isDark
  //   setIsDark(newTheme)
  //   document.documentElement.classList.toggle('dark')
  // }
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    // <button
    //   onClick={toggleTheme}
    //   className="relative w-20 h-10 rounded-full p-1 transition-colors duration-200 ease-in-out"
    //   style={{
    //     backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
    //   }}
    // >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-9 h-9 relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </ThemeProvider >

  )
}

