import { prisma } from './prisma'

/**
 * Generate unique invoice number
 * Format: INV-YYYY-XXXX (e.g., INV-2024-0001)
 */
export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `INV-${year}-`

  // Get the last invoice number for this year
  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      invoiceNumber: 'desc',
    },
  })

  let sequence = 1
  if (lastInvoice) {
    const lastSequence = parseInt(
      lastInvoice.invoiceNumber.replace(prefix, '')
    )
    sequence = lastSequence + 1
  }

  return `${prefix}${sequence.toString().padStart(4, '0')}`
}

/**
 * Calculate invoice totals
 */
export function calculateInvoiceTotals(
  items: Array<{ quantity: number; unitPrice: number }>,
  taxRate: number = 0,
  discount: number = 0
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  const discountAmount = (subtotal * discount) / 100
  const afterDiscount = subtotal - discountAmount
  const tax = (afterDiscount * taxRate) / 100
  const total = afterDiscount + tax

  return {
    subtotal,
    discount: discountAmount,
    tax,
    total,
  }
}

/**
 * Get due date (default: 30 days from issue date)
 */
export function getDueDate(days: number = 30): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

