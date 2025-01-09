'use client'

import { Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header className="bg-[#0E0D5A] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-medium">Level-Up Test - 01</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            View Instructions
          </Button>
          <div className="text-white/80">|</div>
          {/* <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            View Paper
          </Button> */}
          {/* <div className="t ext-white/80">|</div> */}
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
            onClick={handleFullscreen}
          >
            <span className="mr-2">Enter Fullscreen</span>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

