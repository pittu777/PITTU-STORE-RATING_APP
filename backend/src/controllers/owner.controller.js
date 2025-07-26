

const prisma = require("./../config/db");

// const getMyStores = async (req, res) => {
//   const ownerId = req.user.id;

//   try {
//     const store = await prisma.store.findMany({
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
const getMyStores = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const stores = await prisma.store.findMany({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!stores.length) {
      return res.status(404).json({ error: "No store found for this owner." });
    }

    const result = stores.map((store) => {
      const totalRatings = store.ratings.length;
      const averageRating =
        totalRatings > 0
          ? (
              store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
            ).toFixed(1)
          : null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating,
        totalRatings,
        ratings: store.ratings.map((r) => ({
          user: r.user,
          rating: r.rating,
          createdAt: r.createdAt,
        })),
      };
    });

    res.json({ stores: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports={getMyStores};