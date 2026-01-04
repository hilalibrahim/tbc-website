import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
})

// POST create lead (from contact form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: 'NEW',
      },
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to lead

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

// GET all leads (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const leads = await prisma.lead.findMany({
      where: {
        ...(status && { status: status as any }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

