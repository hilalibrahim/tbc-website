import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const payrollSchema = z.object({
  period: z.string().optional(),
  baseSalary: z.number().optional(),
  bonuses: z.number().optional(),
  deductions: z.number().optional(),
  tax: z.number().optional(),
  netPay: z.number().optional(),
  status: z.enum(['PENDING', 'PROCESSED', 'PAID']).optional(),
  paymentDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
})

// GET single payroll
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payroll = await prisma.payroll.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    })

    if (!payroll) {
      return NextResponse.json(
        { error: 'Payroll not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(payroll)
  } catch (error) {
    console.error('Error fetching payroll:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payroll' },
      { status: 500 }
    )
  }
}

// PATCH update payroll
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = payrollSchema.parse(body)

    const updateData: any = { ...data }
    if (data.paymentDate) {
      updateData.paymentDate = new Date(data.paymentDate)
    }

    const payroll = await prisma.payroll.update({
      where: { id },
      data: updateData,
      include: {
        employee: true,
      },
    })

    return NextResponse.json(payroll)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating payroll:', error)
    return NextResponse.json(
      { error: 'Failed to update payroll' },
      { status: 500 }
    )
  }
}

// DELETE payroll
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.payroll.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Payroll deleted successfully' })
  } catch (error) {
    console.error('Error deleting payroll:', error)
    return NextResponse.json(
      { error: 'Failed to delete payroll' },
      { status: 500 }
    )
  }
}

