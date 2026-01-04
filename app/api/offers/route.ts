import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const offerSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  discount: z.number().min(0).max(100),
  code: z.string().optional(),
  validFrom: z.string(),
  validUntil: z.string(),
  isActive: z.boolean().default(true),
  minPurchase: z.number().optional(),
  maxDiscount: z.number().optional(),
  usageLimit: z.number().optional(),
  packageIds: z.array(z.string()).optional(),
})

// GET all offers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')

    const offers = await prisma.offer.findMany({
      where: {
        ...(active === 'true' && { isActive: true }),
      },
      include: {
        packages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}

// POST create offer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = offerSchema.parse(body)

    const offer = await prisma.offer.create({
      data: {
        title: data.title,
        description: data.description,
        discount: data.discount,
        code: data.code,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
        isActive: data.isActive,
        minPurchase: data.minPurchase,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        packages: data.packageIds
          ? {
              connect: data.packageIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        packages: true,
      },
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating offer:', error)
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    )
  }
}

