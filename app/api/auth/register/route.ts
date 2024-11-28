// app/api/auth/register/route.ts
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"
import * as z from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = registerSchema.parse(json)

    const exists = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    })

    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      )
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')
    
    const user = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: body.name,
          email: body.email.toLowerCase(),
          password: await bcrypt.hash(body.password, 10),
          role: "USER",
        },
      })

      await tx.verificationToken.create({
        data: {
          token: verificationToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          userId: user.id,
        },
      })

      return user
    })

    await sendEmail({
      to: user.email,
      template: "verification",
      data: {
        verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`
      }
    })

    const { password: _, ...result } = user

    return NextResponse.json(
      { user: result, message: "Verification email sent" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}