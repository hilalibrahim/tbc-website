import InvoiceForm from '@/components/admin/InvoiceForm'

export const metadata = {
  title: 'Create Invoice - Admin Dashboard',
  description: 'Create a new invoice',
}

export default function NewInvoicePage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-heading text-foreground">Create New Invoice</h1>
      <InvoiceForm />
    </div>
  )
}

