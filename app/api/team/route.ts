import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
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
      data,
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

