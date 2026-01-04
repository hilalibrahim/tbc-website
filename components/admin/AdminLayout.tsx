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
  { href: '/admin/team', label: 'Team/Employees', icon: '👨‍💼' },
  { href: '/admin/team/payroll', label: 'Payroll', icon: '💰' },
  { href: '/admin/team/leaves', label: 'Leaves', icon: '🏖️' },
  { href: '/admin/team/tasks', label: 'Tasks', icon: '✅' },
  { href: '/admin/services', label: 'Services', icon: '⚙️' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Sidebar should be open on desktop by default, closed on mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Toggle mobile menu
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-depth-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden text-foreground p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <span className="text-2xl">☰</span>
              </button>
              <Link href="/admin" className="text-xl sm:text-2xl font-heading text-foreground">
                Admin Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="text-sm sm:text-base text-secondary hover:text-foreground transition-colors"
              >
                View Site
              </Link>
              <button className="text-sm sm:text-base text-secondary hover:text-foreground transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <aside
          className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:!translate-x-0 fixed lg:static top-16 lg:top-0 left-0 z-50 lg:z-0 w-64 bg-white border-r border-border transition-transform duration-300 lg:transition-none overflow-y-auto h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-white shadow-depth-2'
                      : 'text-secondary hover:bg-gray-100 hover:text-foreground'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="font-heading text-sm sm:text-base">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}

