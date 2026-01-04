import AdminLayout from '@/components/admin/AdminLayout'

export const metadata = {
  title: 'Admin Dashboard - TBC Marketing',
  description: 'Admin dashboard for managing website content',
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}

