const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = "$2a$10$hashedpasswordexample"; // Use actual bcrypt hash

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password,
          role: "OWNER",
          address: faker.location.streetAddress()
        },
      });

      await tx.store.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          address: faker.location.streetAddress(),
          ownerId: user.id,
        },
      });
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());