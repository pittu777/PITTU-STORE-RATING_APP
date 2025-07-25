
const prisma = require("./../config/db");

exports.createOrUpdateRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  if (!storeId || !rating) {
    return res.status(400).json({ error: "Store ID and rating are required" });
  }

  try {
    // Check if user already rated this store
    const existing = await prisma.rating.findFirst({
      where: { storeId, userId },
    });

    let result;
    if (existing) {
      result = await prisma.rating.update({
        where: { id: existing.id },
        data: { rating, updatedAt: new Date() },
      });
    } else {
      result = await prisma.rating.create({
        data: {
          storeId,
          userId,
          rating,
        },
      });
    }

    res.status(200).json({ message: "Rating saved", rating: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};