const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyUser = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded.userId,
      email: decoded.email,
    });

    if (!user) {
      throw new Error();
    }

    // Attach the user object to the request for further processing
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized to access this resource" });
  }
};

module.exports = verifyUser;
