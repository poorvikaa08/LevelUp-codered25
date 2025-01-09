'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ChevronDown } from 'lucide-react'
import { ThemeToggle } from '@/components/home/toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">

      {/* Navigation */}
      <nav className="container mx-auto px-4 py-8 pb-10">
        <div className="flex justify-end space-x-6 text-white">
          <NavigationMenu>
            <NavigationMenuList className='gap-6'>
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">
                  STUDY MATERIAL 
                </NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">
                  EXAMS 
                </NavigationMenuTrigger>
              </NavigationMenuItem> */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">
                  PRODUCTS 
                </NavigationMenuTrigger>
              </NavigationMenuItem> */}
              <NavigationMenuItem className="bg-transparent text-white hover:bg-white/10 text-sm ">
                <a href='/aboutus'>
                  ABOUT US
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem className="bg-transparent text-white hover:bg-white/10 text-sm">
                <a href='/login'>
                  LOGIN
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />

        </div>
      </nav>


      {/* Main Content */}
      <main className="container mx-auto px-4  pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="w-64">
              <Image
                src="/placeholder.svg?height=80&width=256"
                alt="Embibe Logo"
                width={256}
                height={80}
                className="w-full"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-white text-3xl md:text-4xl font-medium tracking-wide">
                FOR SCHOOL,
                <br />
                COMPETITIVE EXAMS
                <br />
                AND BEYOND
              </h2>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <h1 className="text-white text-5xl md:text-7xl font-light tracking-wide leading-tight">
              ONE LIFE
              <br />
              GO ACHIEVE
            </h1>
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-6 text-lg font-medium"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        {/* <div className="text-center py-24">
          <div className="space-y-4">
            <h3 className="text-white text-5xl md:text-6xl font-bold">
              19,575,453
            </h3>
            <p className="text-white text-xl md:text-2xl tracking-wide">
              LEARNING OUTCOMES DELIVERED
            </p>
          </div>
        </div> */}

        <div className="py-12"></div>

        {/* Bottom Heading */}
        <div className="pb-12">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
            THE MOST POWERFUL EDUCATION
            <br />
            PLATFORM EVER INVENTED
          </h2>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 bg-blue-600 rounded-full p-3 cursor-pointer hover:bg-blue-700 transition-colors">
        <div className="text-white text-sm">Ask a Doubt</div>
      </div>
    </div>
  )
}

