
const prisma = require("./../config/db");





exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
};

exports.getAllStores = async (req, res) => {
  const stores = await prisma.store.findMany({
    include: {
      owner: {
        select: { id: true, name: true, email: true },
      },
      ratings: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const formattedStores = stores.map((store) => ({
    id: store.id,
    name: store.name,
    address: store.address,
    owner: store.owner,
    totalRatings: store.ratings.length,
    averageRating:
      store.ratings.length > 0
        ? (
            store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          ).toFixed(1)
        : null,
  }));

  res.json(formattedStores);
};

exports.createStore = async (req, res) => {
  const { name, address, email, ownerId } = req.body;

  if (!name || !address || !email || !ownerId)
    return res.status(400).json({ error: "All fields required" });

  const numericOwnerId = parseInt(ownerId, 10);

  const owner = await prisma.user.findUnique({ where: { id: numericOwnerId } });

  if (!owner || owner.role !== "OWNER") {
    return res.status(400).json({ error: "Owner not found or invalid role" });
  }
   const existingStore = await prisma.store.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });

  if (existingStore) {
    return res.status(400).json({ error: "Store with this name or email already exists" });
  }

  const store = await prisma.store.create({
    data: {
      name,
      address,
      email,
      ownerId:numericOwnerId,
    },
  });

  res.status(201).json(store);
};


exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["USER", "OWNER", "ADMIN"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try{

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { role },
  });

  res.json({ message: `Updated role to ${role}`, user });
}catch(err){
  res.status(500).json({error:"Failed to update role"});
}
};


exports.getOwners = async (req, res) => {
  try {
    const owners = await prisma.user.findMany({
      where: { role: "OWNER" },
      select: { id: true, name: true, email: true }
    });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch owners" });
  }
};


// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await prisma.user.delete({
//       where: { id: parseInt(id) },
//     });
//     res.json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// };


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);

  try {
    // Optional: delete ratings by user
    await prisma.rating.deleteMany({
      where: { userId },
    });

    // Optional: delete stores owned by user
    await prisma.store.deleteMany({
      where: { ownerId: userId },
    });

    // Now delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user failed:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};


exports.deleteStore = async (req, res) => {
  const storeId = parseInt(req.params.id, 10);

  try {
    const existingStore = await prisma.store.findUnique({ where: { id: storeId } });

    if (!existingStore) {
      return res.status(404).json({ error: "Store not found" });
    }

    await prisma.store.delete({ where: { id: storeId } });

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (err) {
    console.error("Delete Store Error:", err);
    res.status(500).json({ error: "Failed to delete store" });
  }
};
