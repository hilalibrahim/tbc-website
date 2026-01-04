import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const teamMemberSchema = z.object({
  employeeId: z.string().optional(),
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  department: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  hireDate: z.string().optional(),
  employmentType: z.string().optional(),
  salary: z.number().optional(),
  salaryType: z.string().optional(),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
})

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const member = await prisma.teamMember.findUnique({
      where: { id },
      include: {
        payrolls: {
          orderBy: { createdAt: 'desc' },
          take: 12, // Last 12 months
        },
        leaves: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        assignments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

// PATCH update team member
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = teamMemberSchema.parse(body)

    const updateData: any = { ...data }
    if (data.hireDate) {
      updateData.hireDate = new Date(data.hireDate)
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(member)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.teamMember.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}

