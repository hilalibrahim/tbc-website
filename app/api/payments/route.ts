import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const paymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().min(0.01),
  paymentMethod: z.string(),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
})

// POST create payment
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const body = await request.json()
    const data = paymentSchema.parse(body)

    // Get invoice to check total
    const invoice = await prisma.invoice.findUnique({
      where: { id: data.invoiceId },
      include: {
        payments: true,
      },
    })

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Calculate total paid
    const totalPaid = invoice.payments.reduce(
      (sum, p) => sum + (p.status === 'COMPLETED' ? p.amount : 0),
      0
    )

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        notes: data.notes,
        status: 'PENDING',
      },
    })

    // Update invoice status if fully paid
    const newTotalPaid = totalPaid + data.amount
    if (newTotalPaid >= invoice.total) {
      await prisma.invoice.update({
        where: { id: data.invoiceId },
        data: {
          status: 'PAID',
          paidDate: new Date(),
        },
      })
    }

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}

// GET all payments
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const { searchParams } = new URL(request.url)
    const invoiceId = searchParams.get('invoiceId')

    const payments = await prisma.payment.findMany({
      where: {
        ...(invoiceId && { invoiceId }),
      },
      include: {
        invoice: {
          select: {
            invoiceNumber: true,
            total: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

// PATCH update payment status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, status } = body

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        ...(status === 'COMPLETED' && { paidAt: new Date() }),
      },
    })

    // Update invoice status if payment completed
    if (status === 'COMPLETED') {
      const invoice = await prisma.invoice.findUnique({
        where: { id: payment.invoiceId },
        include: {
          payments: true,
        },
      })

      if (invoice) {
        const totalPaid = invoice.payments.reduce(
          (sum, p) => sum + (p.status === 'COMPLETED' ? p.amount : 0),
          0
        )

        if (totalPaid >= invoice.total) {
          await prisma.invoice.update({
            where: { id: invoice.id },
            data: {
              status: 'PAID',
              paidDate: new Date(),
            },
          })
        } else if (invoice.status === 'DRAFT') {
          await prisma.invoice.update({
            where: { id: invoice.id },
            data: {
              status: 'SENT',
            },
          })
        }
      }
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    )
  }
}

