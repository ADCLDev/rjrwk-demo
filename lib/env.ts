import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

const parsed = envSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  )
  throw new Error("Invalid environment variables")
}

export const env = parsed.data