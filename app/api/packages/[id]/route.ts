import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const packageSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().optional(),
  priceType: z.enum(['MONTHLY', 'ONE_TIME', 'CUSTOM', 'YEARLY']).optional(),
  startsFrom: z.boolean().optional(),
  features: z.array(z.any()).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  displayOrder: z.number().optional(),
  discount: z.number().optional(),
  originalPrice: z.number().optional(),
  imageUrl: z.string().optional(),
})

// GET single package
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const pkg = await prisma.package.findUnique({
      where: { id },
    })

    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Parse features JSON string for client
    let features = []
    if (typeof pkg.features === 'string') {
      try {
        features = pkg.features ? JSON.parse(pkg.features) : []
      } catch {
        features = []
      }
    } else {
      features = pkg.features || []
    }
    
    const packageWithParsedFeatures = {
      ...pkg,
      features,
    }

    return NextResponse.json(packageWithParsedFeatures)
  } catch (error) {
    console.error('Error fetching package:', error)
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    )
  }
}

// PATCH update package
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = packageSchema.parse(body)

    // Convert features array to JSON string for SQLite
    const updateData: any = { ...data }
    if (data.features !== undefined) {
      updateData.features = typeof data.features === 'string' 
        ? data.features 
        : JSON.stringify(data.features)
    }

    const pkg = await prisma.package.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(pkg)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating package:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE package
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.package.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}

