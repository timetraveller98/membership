import { db } from "@/app/libs/db";
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const memberships = await db.membership.findMany()
    return NextResponse.json(memberships)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  const { membershipType } = await request.json()

  try {
    const membership = await db.membership.create({
      data: { membershipType },
    })
    return NextResponse.json(membership, { status: 201 })
  } catch (error) {
    return NextResponse.error()
  }
}
