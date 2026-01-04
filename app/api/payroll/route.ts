import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const payrollSchema = z.object({
  employeeId: z.string(),
  period: z.string(), // e.g., "2024-01"
  baseSalary: z.number().min(0),
  bonuses: z.number().default(0),
  deductions: z.number().default(0),
  tax: z.number().default(0),
  netPay: z.number().min(0),
  status: z.enum(['PENDING', 'PROCESSED', 'PAID']).default('PENDING'),
  paymentDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
})

// GET all payrolls
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const period = searchParams.get('period')
    const status = searchParams.get('status')

    const payrolls = await prisma.payroll.findMany({
      where: {
        ...(employeeId && { employeeId }),
        ...(period && { period }),
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

    return NextResponse.json(payrolls)
  } catch (error) {
    console.error('Error fetching payrolls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payrolls' },
      { status: 500 }
    )
  }
}

// POST create payroll
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = payrollSchema.parse(body)

    const payroll = await prisma.payroll.create({
      data: {
        ...data,
        paymentDate: data.paymentDate ? new Date(data.paymentDate) : null,
      },
      include: {
        employee: true,
      },
    })

    return NextResponse.json(payroll, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating payroll:', error)
    return NextResponse.json(
      { error: 'Failed to create payroll' },
      { status: 500 }
    )
  }
}

