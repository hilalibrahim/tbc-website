import jsPDF from 'jspdf'

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface Payment {
  amount: number
  paymentMethod: string
  paidAt: Date | null
  status: string
}

interface Invoice {
  invoiceNumber: string
  issueDate: Date
  dueDate: Date
  paidDate: Date | null
  status: string
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  notes: string | null
  terms: string | null
  lead: {
    name: string
    email: string
    company: string | null
    phone: string | null
  }
  items: InvoiceItem[]
  payments: Payment[]
}

export async function generateInvoicePDF(invoice: Invoice): Promise<Buffer> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPosition = margin

  // Header
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE', pageWidth - margin, yPosition, { align: 'right' })
  yPosition += 10

  // Invoice Number and Date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, pageWidth - margin, yPosition, {
    align: 'right',
  })
  yPosition += 5
  doc.text(
    `Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}`,
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  )
  yPosition += 5
  doc.text(
    `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`,
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  )
  yPosition += 15

  // Company Info (You can customize this)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('TBC Marketing', margin, yPosition)
  yPosition += 5
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Digital Marketing Solutions', margin, yPosition)
  yPosition += 5
  doc.text('Email: info@tbc.com', margin, yPosition)
  yPosition += 5
  doc.text('Phone: +1 (555) 123-4567', margin, yPosition)
  yPosition += 15

  // Bill To
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To:', margin, yPosition)
  yPosition += 5
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(invoice.lead.name, margin, yPosition)
  yPosition += 5
  if (invoice.lead.company) {
    doc.text(invoice.lead.company, margin, yPosition)
    yPosition += 5
  }
  doc.text(invoice.lead.email, margin, yPosition)
  yPosition += 5
  if (invoice.lead.phone) {
    doc.text(invoice.lead.phone, margin, yPosition)
    yPosition += 5
  }
  yPosition += 10

  // Items Table Header
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Description', margin, yPosition)
  doc.text('Qty', margin + 100, yPosition)
  doc.text('Unit Price', margin + 120, yPosition)
  doc.text('Total', pageWidth - margin, yPosition, { align: 'right' })
  yPosition += 5

  // Draw line
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 5

  // Invoice Items
  doc.setFont('helvetica', 'normal')
  invoice.items.forEach((item) => {
    if (yPosition > 250) {
      // New page if needed
      doc.addPage()
      yPosition = margin
    }

    doc.text(item.description, margin, yPosition)
    doc.text(item.quantity.toString(), margin + 100, yPosition)
    doc.text(
      `₹${item.unitPrice.toFixed(2)}`,
      margin + 120,
      yPosition
    )
    doc.text(
      `₹${item.total.toFixed(2)}`,
      pageWidth - margin,
      yPosition,
      { align: 'right' }
    )
    yPosition += 7
  })

  yPosition += 5

  // Totals
  const totalsX = pageWidth - margin - 50
  doc.setFont('helvetica', 'normal')
  doc.text('Subtotal:', totalsX, yPosition, { align: 'right' })
  doc.text(
    `₹${invoice.subtotal.toFixed(2)}`,
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  )
  yPosition += 5

  if (invoice.discount > 0) {
    doc.text('Discount:', totalsX, yPosition, { align: 'right' })
    doc.text(
      `-₹${invoice.discount.toFixed(2)}`,
      pageWidth - margin,
      yPosition,
      { align: 'right' }
    )
    yPosition += 5
  }

  if (invoice.tax > 0) {
    doc.text('Tax:', totalsX, yPosition, { align: 'right' })
    doc.text(
      `₹${invoice.tax.toFixed(2)}`,
      pageWidth - margin,
      yPosition,
      { align: 'right' }
    )
    yPosition += 5
  }

  // Total
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Total:', totalsX, yPosition, { align: 'right' })
  doc.text(
    `₹${invoice.total.toFixed(2)}`,
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  )
  yPosition += 10

  // Payments
  if (invoice.payments && invoice.payments.length > 0) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Payments:', margin, yPosition)
    yPosition += 5
    doc.setFont('helvetica', 'normal')

    invoice.payments.forEach((payment) => {
      if (payment.status === 'COMPLETED') {
        doc.text(
          `${payment.paymentMethod}: ₹${payment.amount.toFixed(2)}`,
          margin + 10,
          yPosition
        )
        yPosition += 5
      }
    })
    yPosition += 5
  }

  // Status
  doc.setFont('helvetica', 'bold')
  doc.text(`Status: ${invoice.status}`, margin, yPosition)
  yPosition += 10

  // Notes
  if (invoice.notes) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Notes:', margin, yPosition)
    yPosition += 5
    const splitNotes = doc.splitTextToSize(invoice.notes, pageWidth - 2 * margin)
    doc.text(splitNotes, margin, yPosition)
    yPosition += splitNotes.length * 5 + 5
  }

  // Terms
  if (invoice.terms) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Terms & Conditions:', margin, yPosition)
    yPosition += 5
    const splitTerms = doc.splitTextToSize(
      invoice.terms,
      pageWidth - 2 * margin
    )
    doc.text(splitTerms, margin, yPosition)
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text(
    'Thank you for your business!',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  )

  // Convert to buffer
  const pdfOutput = doc.output('arraybuffer')
  return Buffer.from(pdfOutput)
}

