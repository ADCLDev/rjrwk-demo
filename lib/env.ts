import { z } from 'zod'

// Helper function to ensure URL format
const validateURL = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const envSchema = z.object({
  // Database URLs
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  DIRECT_URL: z.string().min(1, "Direct URL is required"),
  POSTGRES_PRISMA_URL: z.string().min(1, "Prisma URL is required"),
  POSTGRES_URL_NON_POOLING: z.string().min(1, "Non-pooling URL is required"),

  // Auth Configuration
  NEXTAUTH_URL: z.string().refine(validateURL, {
    message: "Must be a valid URL",
  }),
  NEXTAUTH_SECRET: z.string().min(1, "NextAuth secret is required"),

  // Email Configuration
  RESEND_API_KEY: z.string().regex(/^re_/, "Invalid Resend API key format"),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().refine(validateURL, {
    message: "Must be a valid URL",
  }),
  NEXT_PUBLIC_API_URL: z.string().refine(validateURL, {
    message: "Must be a valid URL",
  }),
})

function validateEnv() {
  // Only validate non-empty values in development
  if (process.env.NODE_ENV === 'development') {
    const parsed = envSchema.safeParse({
      // Database URLs
      DATABASE_URL: process.env.DATABASE_URL || "",
      DIRECT_URL: process.env.DIRECT_URL || "",
      POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL || "",
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING || "",

      // Auth Configuration
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "development-secret",

      // Email Configuration
      RESEND_API_KEY: process.env.RESEND_API_KEY || "re_development",

      // Application URLs
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    })

    if (!parsed.success) {
      console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsed.error.format(), null, 2)
      )
      throw new Error("Invalid environment variables")
    }

    return parsed.data
  }

  // Strict validation in production
  const parsed = envSchema.safeParse({
    // Database URLs
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,

    // Auth Configuration
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    // Email Configuration
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // Application URLs
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  })

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(parsed.error.format(), null, 2)
    )
    throw new Error("Invalid environment variables")
  }

  return parsed.data
}

export const env = validateEnv()

// Type augmentation for better type safety
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}