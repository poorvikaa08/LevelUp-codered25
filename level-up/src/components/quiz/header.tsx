'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
        alert('You have exited fullscreen mode. Returning to the dashboard.');
        router.push('/dashboard/home'); // Adjust the route to your dashboard home page
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [router]);

  return (
    <header className="bg-[#0A0E1F] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-medium">Level-Up Test - 01</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            View Instructions
          </Button>
          <div className="text-white/80">|</div>
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
            onClick={handleFullscreen}
          >
            <span className="mr-2">
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </span>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
