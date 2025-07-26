



// // middleware/auth.authorizeOwner.js
// module.exports = function authorizeOwner(req, res, next) {
//   if (req.user.role !== "OWNER") {
//     return res.status(403).json({ error: "Access denied. Owner only." });
//   }
//   next();
// };


module.exports = function authorizeOwner(req, res, next) {
  console.log("req.user in authorizeOwner:", req.user); // 🔍 Add this line

  if (!req.user || req.user.role !== "OWNER") {
    return res.status(403).json({ error: "Access denied. Owner only." });
  }
  next();
};
