'use client'

import Header from '@/components/dashboard/header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('/assets/image.png')] bg-cover bg-center bg-no-repeat h-full w-full">
      <div className="h-screen ">
        <Header />

        <div className="flex-1">
          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  )
}