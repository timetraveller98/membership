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
  const id = request.url.split("/").pop();
  const { firstName, lastName, email, contact, status, membershipId } = await request.json();
  try {
    if (!email || !firstName || !lastName || !contact || !status || !membershipId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 404 }
      );
    }

    const contactRegex = /^\d{10}$/;
    if(!contactRegex.test(contact)){
      {
        return NextResponse.json(
          { message: "Invalid contact format" },
          { status: 410 }
        );
      }
    }
    const existingEmail = await db.customer.findUnique({
      where: { email },
    });


    if (existingEmail && existingEmail.id !== id) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }
    const customer = await db.customer.update({
      where: { id: id as string },
      data: { firstName, lastName, email, contact, status, membershipId },
    });

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
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
