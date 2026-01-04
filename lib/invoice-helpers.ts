import { prisma } from './prisma'
import { generateInvoiceNumber, getDueDate } from './invoice-utils'

export async function createInvoiceFromOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      lead: true,
      package: true,
    },
  })

  if (!order) {
    throw new Error('Order not found')
  }

  // Check if invoice already exists
  const existingInvoice = await prisma.invoice.findFirst({
    where: { orderId },
  })

  if (existingInvoice) {
    return existingInvoice
  }

  // Create invoice items
  const items = []
  
  if (order.package) {
    items.push({
      description: order.package.name,
      quantity: 1,
      unitPrice: order.amount,
      total: order.amount,
    })
  }

  // Calculate totals
  const subtotal = order.amount
  const discount = order.discount || 0
  const tax = 0 // Add tax calculation if needed
  const total = subtotal - discount + tax

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: await generateInvoiceNumber(),
      orderId: order.id,
      leadId: order.leadId,
      issueDate: new Date(),
      dueDate: getDueDate(30),
      subtotal,
      discount,
      tax,
      total,
      currency: 'USD',
      status: 'DRAFT',
      items: {
        create: items,
      },
    },
    include: {
      lead: true,
      items: true,
    },
  })

  return invoice
}

