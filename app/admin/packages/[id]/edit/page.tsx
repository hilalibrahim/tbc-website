'use client'

import { useParams } from 'next/navigation'
import PackageForm from '@/components/admin/PackageForm'

export default function EditPackagePage() {
  const params = useParams()
  const packageId = params.id as string

  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Edit Package</h1>
      <PackageForm packageId={packageId} />
    </div>
  )
}

