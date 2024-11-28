import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // Test connection
    await prisma.$connect()
    console.log("✓ Database connected")

    // List users
    const users = await prisma.user.findMany()
    console.log("\nUsers in database:", users.length)
    console.log(JSON.stringify(users, null, 2))

  } catch (e) {
    console.error("Database error:", e)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()