import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const teamMemberSchema = z.object({
  employeeId: z.string().optional(),
  name: z.string().min(1),
  role: z.string().min(1),
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
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
})

// GET all team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')

    const teamMembers = await prisma.teamMember.findMany({
      where: {
        ...(active === 'true' && { isActive: true }),
      },
      orderBy: {
        displayOrder: 'asc',
      },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// POST create team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = teamMemberSchema.parse(body)

    const teamMember = await prisma.teamMember.create({
      data: {
        employeeId: data.employeeId || undefined,
        name: data.name,
        role: data.role,
        department: data.department || undefined,
        bio: data.bio || undefined,
        imageUrl: data.imageUrl || undefined,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
        linkedin: data.linkedin || undefined,
        twitter: data.twitter || undefined,
        github: data.github || undefined,
        hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
        employmentType: data.employmentType || undefined,
        salary: data.salary || undefined,
        salaryType: data.salaryType || undefined,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    })

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}

