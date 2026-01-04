import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const orderSchema = z.object({
  leadId: z.string(),
  packageId: z.string().optional(),
  customPackageId: z.string().optional(),
  amount: z.number().min(0),
  discount: z.number().optional(),
  finalAmount: z.number().min(0),
  status: z.enum(['PENDING', 'PAID', 'CANCELLED', 'REFUNDED']).default('PENDING'),
  paymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
})

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const orders = await prisma.order.findMany({
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
        package: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = orderSchema.parse(body)

    const order = await prisma.order.create({
      data,
      include: {
        lead: true,
        package: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

