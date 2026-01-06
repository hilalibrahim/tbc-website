import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const leadUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
})

// GET single lead
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(lead)
  } catch (error: any) {
    console.error('Error fetching lead:', error)
    
    let errorMessage = 'Failed to fetch lead'
    if (error?.code === 'P2002') {
      errorMessage = 'Database constraint violation'
    } else if (error?.code === 'P1001') {
      errorMessage = 'Database connection error. Please check your database connection.'
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// PATCH update lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = leadUpdateSchema.parse(body)

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...data,
        ...(data.phone === '' && { phone: null }),
        ...(data.company === '' && { company: null }),
        ...(data.service === '' && { service: null }),
        ...(data.message === '' && { message: null }),
        ...(data.source === '' && { source: null }),
        ...(data.notes === '' && { notes: null }),
        ...(data.assignedTo === '' && { assignedTo: null }),
      },
    })

    return NextResponse.json(lead)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    
    console.error('Error updating lead:', error)
    
    let errorMessage = 'Failed to update lead'
    if (error?.code === 'P2025') {
      errorMessage = 'Lead not found'
    } else if (error?.code === 'P2002') {
      errorMessage = 'Database constraint violation'
    } else if (error?.code === 'P1001') {
      errorMessage = 'Database connection error. Please check your database connection.'
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.lead.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting lead:', error)
    
    let errorMessage = 'Failed to delete lead'
    if (error?.code === 'P2025') {
      errorMessage = 'Lead not found'
    } else if (error?.code === 'P1001') {
      errorMessage = 'Database connection error. Please check your database connection.'
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

