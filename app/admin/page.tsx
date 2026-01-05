import Link from 'next/link'

async function getStats() {
  // TODO: Replace with actual API calls
  return {
    totalLeads: 0,
    newLeads: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    activeProjects: 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      change: '+12%',
      icon: '👥',
      href: '/admin/leads',
      color: 'bg-blue-500',
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      change: '+5',
      icon: '🆕',
      href: '/admin/leads?status=NEW',
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: '+8%',
      icon: '🛒',
      href: '/admin/orders',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      change: '+15%',
      icon: '💰',
      href: '/admin/invoices',
      color: 'bg-yellow-500',
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices,
      change: '-2',
      icon: '🧾',
      href: '/admin/invoices?status=DRAFT',
      color: 'bg-orange-500',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      change: '+3',
      icon: '💼',
      href: '/admin/projects',
      color: 'bg-indigo-500',
    },
  ]

  const quickActions = [
    { label: 'Create Package', href: '/admin/packages/new', icon: '📦' },
    { label: 'Add Project', href: '/admin/projects/new', icon: '💼' },
    { label: 'Create Invoice', href: '/admin/invoices/new', icon: '🧾' },
    { label: 'Add Offer', href: '/admin/offers/new', icon: '🎯' },
    { label: 'Add Testimonial', href: '/admin/testimonials/new', icon: '⭐' },
    { label: 'New Blog Post', href: '/admin/blog/new', icon: '📝' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
          <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Admin Dashboard</span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D9D9D9]"></div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
            Dashboard
          </span>
        </h1>
        <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <div className="group relative h-full p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 hover:border-[#D9D9D9]/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8C8C8C] mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-sm text-[#BFBFBF] mt-1">{stat.change}</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10 flex items-center justify-center text-3xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
        <h2 className="text-2xl font-bold text-[#D9D9D9] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group flex flex-col items-center justify-center p-4 border border-[#BFBFBF]/10 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#151515] hover:border-[#D9D9D9]/30 hover:bg-gradient-to-br hover:from-[#151515] hover:to-[#1A1A1A] transition-all duration-300"
            >
              <span className="text-4xl mb-2">{action.icon}</span>
              <span className="text-sm font-semibold text-[#BFBFBF] group-hover:text-[#D9D9D9] text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
          <h2 className="text-2xl font-bold text-[#D9D9D9] mb-4">Recent Leads</h2>
          <div className="space-y-3">
            <p className="text-[#8C8C8C] text-center py-8">No recent leads</p>
          </div>
          <Link
            href="/admin/leads"
            className="mt-4 block text-center text-[#BFBFBF] hover:text-[#D9D9D9] font-semibold transition-colors"
          >
            View All Leads →
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
          <h2 className="text-2xl font-bold text-[#D9D9D9] mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <p className="text-[#8C8C8C] text-center py-8">No recent orders</p>
          </div>
          <Link
            href="/admin/orders"
            className="mt-4 block text-center text-[#BFBFBF] hover:text-[#D9D9D9] font-semibold transition-colors"
          >
            View All Orders →
          </Link>
        </div>
      </div>
    </div>
  )
}

