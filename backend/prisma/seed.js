// const { PrismaClient } = require('@prisma/client');
// const { faker } = require('@faker-js/faker');

// const prisma = new PrismaClient();

// async function main() {
//   // Clear existing data (optional)
//   await prisma.rating.deleteMany();
//   await prisma.store.deleteMany();
//   await prisma.user.deleteMany();

//   for (let i = 0; i < 10; i++) {
//     const name = faker.person.fullName();
//     const email = faker.internet.email();
//     const password = "$2a$10$hashedpasswordexample"; // Use actual bcrypt hash

//     await prisma.$transaction(async (tx) => {
//       const user = await tx.user.create({
//         data: {
//           name,
//           email,
//           password,
//           role: "OWNER",
//           address: faker.location.streetAddress()
//         },
//       });

//       await tx.store.create({
//         data: {
//           name: faker.company.name(),
//           email: faker.internet.email(),
//           address: faker.location.streetAddress(),
//           ownerId: user.id,
//         },
//       });
//     });
//   }

//   console.log("Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error("Seeding error:", e);
//     process.exit(1);
//   })
//   .finally(() => prisma.$disconnect());




const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Reliable image sources with fallbacks
const DEFAULT_STORE_IMAGE = 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';

const getRandomStoreImage = () => {
  const options = [
    `https://source.unsplash.com/random/600x400/?store,shop,business,${Math.random()}`,
    `https://picsum.photos/600/400?random=${Math.random()}`,
    DEFAULT_STORE_IMAGE
  ];
  return options[Math.floor(Math.random() * options.length)];
};

async function main() {
  console.log('Starting seed...');

  // Update existing stores with missing images
  const updateResult = await prisma.store.updateMany({
    where: { image: null },
    data: { image: getRandomStoreImage() }
  });
  console.log(`Updated ${updateResult.count} stores with images`);

  // Create new demo stores
  for (let i = 0; i < 5; i++) {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: "$2a$10$hashedpasswordexample",
          role: "OWNER",
          address: faker.location.streetAddress()
        },
      });

      await tx.store.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          address: faker.location.streetAddress(),
          image: getRandomStoreImage(),
          ownerId: user.id,
        },
      });
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());