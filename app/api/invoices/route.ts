import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateInvoiceNumber, getDueDate, calculateInvoiceTotals } from '@/lib/invoice-utils'
import { z } from 'zod'

const invoiceSchema = z.object({
  orderId: z.string().optional(),
  leadId: z.string(),
  issueDate: z.string().optional(),
  dueDays: z.number().default(30),
  items: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().min(0.01),
      unitPrice: z.number().min(0),
    })
  ),
  taxRate: z.number().default(0),
  discount: z.number().default(0),
  notes: z.string().optional(),
  terms: z.string().optional(),
  currency: z.string().default('USD'),
})

// GET all invoices (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const invoices = await prisma.invoice.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(leadId && { leadId }),
      },
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
        order: {
          include: {
            package: {
              select: {
                name: true,
              },
            },
          },
        },
        items: true,
        payments: true,
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

// POST create invoice
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const body = await request.json()
    const data = invoiceSchema.parse(body)

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber()

    // Calculate totals
    const totals = calculateInvoiceTotals(
      data.items,
      data.taxRate,
      data.discount
    )

    // Create invoice items
    const invoiceItems = data.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    }))

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        orderId: data.orderId,
        leadId: data.leadId,
        issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
        dueDate: getDueDate(data.dueDays),
        subtotal: totals.subtotal,
        tax: totals.tax,
        discount: totals.discount,
        total: totals.total,
        currency: data.currency,
        notes: data.notes,
        terms: data.terms,
        status: 'DRAFT',
        items: {
          create: invoiceItems,
        },
      },
      include: {
        lead: true,
        items: true,
        order: true,
      },
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}

