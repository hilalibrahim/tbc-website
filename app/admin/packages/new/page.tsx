import PackageForm from '@/components/admin/PackageForm'

export const metadata = {
  title: 'Create Package - Admin Dashboard',
  description: 'Create a new service package',
}

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-[#BFBFBF]">Create New Package</h1>
      <PackageForm />
    </div>
  )
}

