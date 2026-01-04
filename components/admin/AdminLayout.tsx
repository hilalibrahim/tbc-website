'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/packages', label: 'Packages', icon: '📦' },
  { href: '/admin/custom-packages', label: 'Custom Packages', icon: '🎁' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/leads', label: 'Leads', icon: '👥' },
  { href: '/admin/orders', label: 'Orders', icon: '🛒' },
  { href: '/admin/invoices', label: 'Invoices', icon: '🧾' },
  { href: '/admin/offers', label: 'Offers', icon: '🎯' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { href: '/admin/team', label: 'Team', icon: '👨‍💼' },
  { href: '/admin/services', label: 'Services', icon: '⚙️' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-depth-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-foreground p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">☰</span>
              </button>
              <Link href="/admin" className="text-2xl font-heading text-foreground">
                Admin Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-secondary hover:text-foreground transition-colors"
              >
                View Site
              </Link>
              <button className="text-secondary hover:text-foreground transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-white border-r border-border transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-white shadow-depth-2'
                      : 'text-secondary hover:bg-gray-100 hover:text-foreground'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-heading">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

