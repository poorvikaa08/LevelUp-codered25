'use client'

import Header from '@/components/dashboard/header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Header />

        <div className="flex-1 overflow-hidden bg-[#1A1C2E] font-mono text-purple-300">
          <main className="overflow-hidden">{children}</main>
        </div>
      </div>
  )
}