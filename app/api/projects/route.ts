import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  category: z.string(),
  clientName: z.string().optional(),
  clientLogo: z.string().optional(),
  results: z.array(z.any()),
  services: z.array(z.string()),
  images: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  caseStudy: z.string().optional(),
  isPublished: z.boolean().default(false),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')

    const projects = await prisma.project.findMany({
      where: {
        ...(category && category !== 'all' && { category }),
        ...(published === 'true' && { isPublished: true }),
        ...(featured === 'true' && { featured: true }),
      },
      orderBy: {
        displayOrder: 'asc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = projectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

