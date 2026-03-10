const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection - create a test user
    const testUser = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: "hashedpassword123",
        role: "supplier",
        businessName: "Test Company",
      },
    });
    console.log("✅ User created:", testUser);

    // Read all users
    const allUsers = await prisma.user.findMany();
    console.log("✅ All users:", allUsers);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
