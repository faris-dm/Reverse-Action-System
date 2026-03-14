const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Try to create a test user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "securepassword", // Remember to hash this in production!
      role: "BUYER",
      businessName: "Solo Tech",
    },
  });
  console.log("Created user:", user);

  // Fetch all users to verify
  const allUsers = await prisma.user.findMany();
  console.log("All users in DB:", allUsers);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
