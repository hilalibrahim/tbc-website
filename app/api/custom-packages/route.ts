import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const customPackageSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  basePackageId: z.string().optional(),
  services: z.array(z.any()),
  totalPrice: z.number().min(0),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'QUOTED']).default('PENDING'),
  leadId: z.string().optional(),
  notes: z.string().optional(),
})

// GET all custom packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const customPackages = await prisma.customPackage.findMany({
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
          },
        },
        basePackage: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(customPackages)
  } catch (error) {
    console.error('Error fetching custom packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch custom packages' },
      { status: 500 }
    )
  }
}

// POST create custom package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = customPackageSchema.parse(body)

    const customPackage = await prisma.customPackage.create({
      data,
      include: {
        lead: true,
        basePackage: true,
      },
    })

    return NextResponse.json(customPackage, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating custom package:', error)
    return NextResponse.json(
      { error: 'Failed to create custom package' },
      { status: 500 }
    )
  }
}

