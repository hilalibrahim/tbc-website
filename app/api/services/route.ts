import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  icon: z.string().optional(),
  category: z.string().optional(),
  basePrice: z.number().optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
})

// GET all services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const category = searchParams.get('category')

    const services = await prisma.service.findMany({
      where: {
        ...(active === 'true' && { isActive: true }),
        ...(category && { category }),
      },
      orderBy: {
        displayOrder: 'asc',
      },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST create service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data,
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}

