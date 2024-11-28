// app/api/auth/verify/route.ts
import prisma  from "@/lib/prisma"
import { NextResponse } from "next/server"
import * as z from "zod"

const verifySchema = z.object({
  token: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = verifySchema.parse(json)

    // Find verification record
    const verification = await prisma.verificationToken.findUnique({
      where: {
        token: body.token,
      },
      include: {
        user: true,
      },
    })

    if (!verification) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      )
    }

    // Check if token is expired (24 hours)
    if (new Date() > new Date(verification.expires)) {
      return NextResponse.json(
        { message: "Verification token has expired" },
        { status: 400 }
      )
    }

    // Update user
    await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete verification token
    await prisma.verificationToken.delete({
      where: {
        id: verification.id,
      },
    })

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}