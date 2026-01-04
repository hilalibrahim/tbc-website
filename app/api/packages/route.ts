import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const packageSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  shortDescription: z.string().optional(),
  price: z.number().optional(),
  priceType: z.enum(['MONTHLY', 'ONE_TIME', 'CUSTOM', 'YEARLY']),
  features: z.array(z.any()),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  discount: z.number().optional(),
  originalPrice: z.number().optional(),
  imageUrl: z.string().optional(),
})

// GET all packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    const featured = searchParams.get('featured') === 'true'

    const packages = await prisma.package.findMany({
      where: {
        ...(activeOnly && { isActive: true }),
        ...(featured && { isFeatured: true }),
      },
      orderBy: {
        displayOrder: 'asc',
      },
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

// POST create package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = packageSchema.parse(body)

    const pkg = await prisma.package.create({
      data,
    })

    return NextResponse.json(pkg, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}

