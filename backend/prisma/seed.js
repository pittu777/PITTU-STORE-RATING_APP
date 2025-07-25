const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "hashedpassword", // hash properly if needed
      },
    });

    await prisma.store.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        ownerId: user.id,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
