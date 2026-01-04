import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const leaveSchema = z.object({
  type: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  days: z.number().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  reason: z.string().optional(),
  approvedBy: z.string().optional(),
})

// GET single leave
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leave = await prisma.leave.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    })

    if (!leave) {
      return NextResponse.json(
        { error: 'Leave not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(leave)
  } catch (error) {
    console.error('Error fetching leave:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leave' },
      { status: 500 }
    )
  }
}

// PATCH update leave
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = leaveSchema.parse(body)

    const updateData: any = { ...data }
    if (data.startDate) updateData.startDate = new Date(data.startDate)
    if (data.endDate) updateData.endDate = new Date(data.endDate)

    const leave = await prisma.leave.update({
      where: { id },
      data: updateData,
      include: {
        employee: true,
      },
    })

    return NextResponse.json(leave)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating leave:', error)
    return NextResponse.json(
      { error: 'Failed to update leave' },
      { status: 500 }
    )
  }
}

// DELETE leave
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.leave.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Leave deleted successfully' })
  } catch (error) {
    console.error('Error deleting leave:', error)
    return NextResponse.json(
      { error: 'Failed to delete leave' },
      { status: 500 }
    )
  }
}

