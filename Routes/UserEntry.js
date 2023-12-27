const router = require("express").Router();
const { User, generateJwtToken } = require("../Model/User");
const bcrypt = require("bcrypt");

// Signup router
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Check if user has provided all required details
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    // Check if user already exist or not
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    // Hashing password
    const hashedPassword = await bcrypt.hash(password,10)

    // If user doesn't exist create new user
    const newUser = await User.create({
      name,
      email,
      password:hashedPassword,
      userType
    });

    // User for generating jwt token
    const user_for_token = {
      userId:newUser._id,
      name,
      userType
    }

    // Generate token 
    const token = generateJwtToken(user_for_token);

    // return response
    return res.status(200).json({ message: "Successfully registered", token });
  
} catch (error) {
    console.log("Signup error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Log in router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user has provided all required details
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // User for generating jwt token
    const user_for_token = {
      userId:user._id,
      name:user.name,
      userType:user.userType
    }

    // Generate token if credentials are valid
    const token = generateJwtToken(user_for_token);

    // Return response with token
    return res.status(200).json({ message: 'Successfully logged in', token });
  
} catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
