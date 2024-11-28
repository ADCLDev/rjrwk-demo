// app/api/auth/forgot-password/route.ts
import prisma  from "@/lib/prisma"
import { NextResponse } from "next/server"
import * as z from "zod"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"

const requestSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const { email } = requestSchema.parse(await req.json())
    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset link has been sent" }, { status: 200 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    await prisma.verificationToken.create({
      data: {
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        userId: user.id,
      },
    })

    await sendEmail({
      to: email,
      template: 'reset-password',
      data: {
        resetUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`,
      },
    })

    return NextResponse.json({ message: "If an account exists, a reset link has been sent" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to process request" }, { status: 500 })
  }
}

