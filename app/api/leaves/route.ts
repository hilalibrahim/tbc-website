import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const leaveSchema = z.object({
  employeeId: z.string(),
  type: z.string(), // SICK, VACATION, PERSONAL, MATERNITY, PATERNITY
  startDate: z.string(),
  endDate: z.string(),
  days: z.number().min(1),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).default('PENDING'),
  reason: z.string().optional(),
  approvedBy: z.string().optional(),
})

// GET all leaves
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const status = searchParams.get('status')

    const leaves = await prisma.leave.findMany({
      where: {
        ...(employeeId && { employeeId }),
        ...(status && { status }),
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            employeeId: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(leaves)
  } catch (error) {
    console.error('Error fetching leaves:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaves' },
      { status: 500 }
    )
  }
}

// POST create leave
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = leaveSchema.parse(body)

    const leave = await prisma.leave.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
      include: {
        employee: true,
      },
    })

    return NextResponse.json(leave, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating leave:', error)
    return NextResponse.json(
      { error: 'Failed to create leave' },
      { status: 500 }
    )
  }
}

