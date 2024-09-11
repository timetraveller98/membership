import { db } from "@/app/libs/db";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const id = request.url.split('/').pop()
  
  try {
    const customer = await db.customer.findUnique({
      where: { id: id as string },
      include: { membership: true },
    })
    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function PUT(request: Request) {
  const id = request.url.split('/').pop()
  const { firstName, lastName, email, contact, status, membershipId } = await request.json()

  try {
    const customer = await db.customer.update({
      where: { id: id as string },
      data: { firstName, lastName, email, contact, status, membershipId },
    })
    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function DELETE(request: Request) {
  const id = request.url.split('/').pop()

  try {
    await db.customer.delete({
      where: { id: id as string },
    })
    return NextResponse.json({}, { status: 204 })
  } catch (error) {
    return NextResponse.error()
  }
}
