const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        console.log(user);
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const expiresIn = 60*60*1000;
    // const expiresIn = 5*1000;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({user: { id: user.id, name: user.name, email: user.email }, token, expiresAt:new Date().getTime()+expiresIn});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logout = async (req, res) => {
  try {
      res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};
