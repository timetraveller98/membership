import { db } from "@/app/libs/db";
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  const { firstName, lastName, email, contact, status, membershipId } = await request.json()

  try {
     // Validate required fields
     if (!email || !firstName || !lastName || !contact || !status || !membershipId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

     // Check if email already exists
     const existingEmail = await db.customer.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const customer = await db.customer.create({
      data: { firstName, lastName, email, contact, status, membershipId },
    })
    return NextResponse.json({customer, message: 'Added successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// GET METHOD


export async function GET() {
  try {
    const customers = await db.customer.findMany({
      include: { membership: true },
    })
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.error()
  }
}
