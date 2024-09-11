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
    // Validate required fields
    if (!membershipType ) {
     return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
   }

    // Check if membershipType already exists
    const existingmembershipType = await db.membership.findUnique({
     where: { membershipType },
   });

   if (existingmembershipType) {
     return NextResponse.json({ message: 'Already exists' }, { status: 409 });
   }
    const membership = await db.membership.create({
      data: { membershipType },
    })
    return NextResponse.json({membership, message: 'Added successfully' }, { status: 201 })
  } catch (error) {
    
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
