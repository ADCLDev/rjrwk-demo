// app/api/auth/reset-password/confirm/route.ts
import  prisma  from "@/lib/prisma"
import { NextResponse } from "next/server"
import * as z from "zod"
import bcrypt from "bcryptjs"

const confirmSchema = z.object({
  token: z.string(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
})

export async function POST(req: Request) {
  try {
    const { token, password } = confirmSchema.parse(await req.json())
    
    const verification = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verification || verification.expires < new Date()) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verification.userId },
        data: { password: hashedPassword },
      }),
      prisma.verificationToken.delete({
        where: { id: verification.id },
      }),
    ])

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to reset password" }, { status: 500 })
  }
}