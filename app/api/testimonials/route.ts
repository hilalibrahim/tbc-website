import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  company: z.string().optional(),
  role: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  imageUrl: z.string().optional(),
  projectId: z.string().optional(),
  isPublished: z.boolean().default(true),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
})

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')

    const testimonials = await prisma.testimonial.findMany({
      where: {
        ...(published === 'true' && { isPublished: true }),
        ...(featured === 'true' && { featured: true }),
      },
      include: {
        project: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        displayOrder: 'asc',
      },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST create testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = testimonialSchema.parse(body)

    const testimonial = await prisma.testimonial.create({
      data,
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

