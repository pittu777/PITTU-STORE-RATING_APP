
const prisma = require('./../config/db');

const getAllStores = async (req, res) => {
  const userId = req.user.id; // from JWT middleware

  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true,
      },
    });

    const response = await Promise.all(
      stores.map(async (store) => {
        const overallRating =
          store.ratings.reduce((acc, r) => acc + r.rating, 0) / (store.ratings.length || 1);

        const userRating = store.ratings.find((r) => r.userId === userId)?.rating || null;

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          overallRating: Number(overallRating.toFixed(1)),
          userRating,
        };
      })
    );

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch stores' });
  }
};
// const getMyStore = async (req, res) => {
//   const ownerId = req.user.id;

//   try {
//     const store = await prisma.store.findFirst({
//       where: { ownerId },
//       include: {
//         ratings: {
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!store) {
//       return res.status(404).json({ error: "No store found for this owner." });
//     }

//     const totalRatings = store.ratings.length;
//     const averageRating =
//       totalRatings > 0
//         ? (
//             store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
//           ).toFixed(1)
//         : null;

//     res.json({
//       store: {
//         id: store.id,
//         name: store.name,
//         address: store.address,
//         averageRating,
//         totalRatings,
//       },
//       ratings: store.ratings.map((r) => ({
//         user: r.user,
//         rating: r.rating,
//         createdAt: r.createdAt,
//       })),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
module.exports = {
  getAllStores,
  // getMyStore,
};