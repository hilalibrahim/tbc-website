import Card from '@/components/Card'
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
      value: `$${stats.totalRevenue.toLocaleString()}`,
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
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-heading text-foreground">Dashboard</h1>
        <p className="mt-2 text-secondary">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="h-full p-6 hover:shadow-depth-4 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary mb-1">{stat.title}</p>
                  <p className="text-3xl font-heading text-foreground">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-2xl font-heading text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center justify-center p-4 border-2 border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all duration-300"
            >
              <span className="text-4xl mb-2">{action.icon}</span>
              <span className="text-sm font-heading text-foreground text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-heading text-foreground mb-4">Recent Leads</h2>
          <div className="space-y-3">
            <p className="text-secondary text-center py-8">No recent leads</p>
          </div>
          <Link
            href="/admin/leads"
            className="mt-4 block text-center text-accent hover:text-accent-hover font-heading"
          >
            View All Leads →
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-heading text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <p className="text-secondary text-center py-8">No recent orders</p>
          </div>
          <Link
            href="/admin/orders"
            className="mt-4 block text-center text-accent hover:text-accent-hover font-heading"
          >
            View All Orders →
          </Link>
        </Card>
      </div>
    </div>
  )
}

