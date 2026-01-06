'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import { 
  LayoutDashboard, 
  Package, 
  Briefcase, 
  Users, 
  ShoppingCart, 
  FileText, 
  Target, 
  Star, 
  UserCircle, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Settings, 
  FileEdit, 
  BarChart3,
  LogOut,
  Eye,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/admin/packages', label: 'Packages', icon: <Package className="w-5 h-5" /> },
  { href: '/admin/custom-packages', label: 'Custom Packages', icon: <Briefcase className="w-5 h-5" /> },
  { href: '/admin/projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
  { href: '/admin/leads', label: 'Leads', icon: <Users className="w-5 h-5" /> },
  { href: '/admin/orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { href: '/admin/invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" /> },
  { href: '/admin/offers', label: 'Offers', icon: <Target className="w-5 h-5" /> },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <Star className="w-5 h-5" /> },
  { href: '/admin/team', label: 'Team', icon: <Users className="w-5 h-5" /> },
  { href: '/admin/team/payroll', label: 'Payroll', icon: <CreditCard className="w-5 h-5" /> },
  { href: '/admin/team/leaves', label: 'Leaves', icon: <Calendar className="w-5 h-5" /> },
  { href: '/admin/team/tasks', label: 'Tasks', icon: <CheckCircle className="w-5 h-5" /> },
  { href: '/admin/services', label: 'Services', icon: <Settings className="w-5 h-5" /> },
  { href: '/admin/blog', label: 'Blog', icon: <FileEdit className="w-5 h-5" /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A]">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b border-[#BFBFBF]/10 sticky top-0 z-50">
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-[#BFBFBF]/20 bg-[#0A0A0A]/50 text-[#BFBFBF] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
              
              <Link href="/admin" className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                  <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#D9D9D9]" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-[#D9D9D9]">Admin Dashboard</span>
                  <div className="text-[10px] sm:text-xs text-[#8C8C8C]">The Big Connection</div>
                </div>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
              <Link
                href="/"
                className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border border-[#BFBFBF]/20 text-[#BFBFBF] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30 transition-all duration-300"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">View Site</span>
              </Link>
              
              <button className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border border-[#BFBFBF]/20 text-[#BFBFBF] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30 transition-all duration-300">
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Logout</span>
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

        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-14 sm:top-16 left-0 z-40 w-64 sm:w-72 lg:w-80 bg-gradient-to-b from-[#0A0A0A] to-[#151515] border-r border-[#BFBFBF]/10 transition-transform duration-300 lg:transition-none overflow-y-auto h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] lg:h-screen`}
        >
          {/* Sidebar Header */}
          <div className="p-4 sm:p-5 lg:p-6 border-b border-[#BFBFBF]/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-[#8C8C8C] uppercase">Navigation</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#D9D9D9]">Admin Panel</h2>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 sm:p-4 space-y-1 pb-20 sm:pb-24">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] border border-[#D9D9D9]/30 shadow-lg'
                      : 'text-[#8C8C8C] hover:text-[#D9D9D9] hover:bg-gradient-to-r hover:from-[#0A0A0A] hover:to-[#1A1A1A] hover:border hover:border-[#BFBFBF]/20'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                      isActive 
                        ? 'bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]' 
                        : 'bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]'
                    }`}>
                      <div className={`${isActive ? 'text-[#D9D9D9]' : 'text-[#BFBFBF]'}`}>
                        {item.icon}
                      </div>
                    </div>
                    <span className="font-medium text-xs sm:text-sm truncate">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-300 ${
                    isActive ? 'text-[#D9D9D9]' : 'text-transparent group-hover:text-[#BFBFBF]'
                  }`} />
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="sticky bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 border-t border-[#BFBFBF]/10 bg-gradient-to-b from-[#0A0A0A] to-[#151515]">
            <div className="text-center">
              <div className="text-[10px] sm:text-xs text-[#8C8C8C] mb-2">Admin Status</div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-[#BFBFBF]">Connected</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          {/* Stats Bar */}
          <div className="p-3 sm:p-4 lg:p-6 border-b border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#151515]">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {[
                { label: 'Active Projects', value: '12', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
                { label: 'Pending Orders', value: '5', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
                { label: 'New Leads', value: '23', color: 'from-[#8C8C8C] to-[#737373]' },
                { label: 'Team Online', value: '8', color: 'from-[#737373] to-[#D9D9D9]' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-[#8C8C8C]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Container */}
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="rounded-xl sm:rounded-2xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] p-4 sm:p-5 lg:p-6">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}