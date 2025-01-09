"use client"

import { Bell, Menu, Search, X } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation'
import { JSX } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/dashboard/home", label: "Home", },
    { href: "/dashboard/learn", label: "Learn", },
    { href: "/practice", label: "", },
    { href: "/test", label: "Test" },
  ]

  const pathname = usePathname()

  return (

    <header className="bg-[#1A1C2E] px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex ">
            <Image
              src="/assests/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="text-white"
            />
          </div>
          {/* <span className="text-xl font-bold text-white">LEVEL UP</span> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href; // Determine active state
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`${isActive
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="h-10 w-[280px] rounded-md bg-white pl-10 pr-4 text-sm outline-none"
            />
          </div> */}

          <div className="relative">
            <Bell className="h-6 w-6 text-white" />
            {/* <div className="absolute right-0 top-0 flex h-5 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#ffdb81] text-xs font-medium text-black">
              196
            </div> */}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-6 w-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#0A0E1F] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Search */}
                <div className="p-4 border-b border-gray-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search"
                      className="h-10 w-full rounded-md bg-white pl-10 pr-4 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                  <ul className="flex flex-col gap-4">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className={`block py-2 text-lg ${isActive
                                ? "text-white font-medium"
                                : "text-gray-400 hover:text-white"
                              }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

