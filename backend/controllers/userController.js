const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  create: async (req, res) => {
    try {
      console.log("This is recived from Create user");
      const { name, password } = req.body;
      if (!name || !password) {
        res.status(400);
        throw new Error("All fileds are mantatory");
      }
      //check for user already registers or not
      const avalableUser = await User.findOne({ name });
      if (avalableUser) {
        res.status(400);
        throw new Error("Name already been registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        password: hashedPassword,
      });

      console.log(`User created success ${user}`);

      const token = jwt.sign(
        {
          user: {
            name: user.name,

            id: user.id,
          },
        },
        process.env.JWT_SECRET_KEY
      );

      if (user) {
        console.log("registered user", user);
        res.status(201).json({
          id: user.id,
          name: user.name,

          token: token,
        });
      } else {
        res.status(400);
        throw new Error("User data is not valid");
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating user", error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { name, password } = req.body;
      console.log("Recived from login user");
      if (!name || !password) {
        res.status(400);
        throw new Error("All fileds are mantatory");
      }
      const user = await User.findOne({ name });
      if (!user) {
        res.status(401);
        throw new Error("No user found");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user: {
              name: user.name,
              id: user.id,
            },
          },
          process.env.JWT_SECRET_KEY
        );
        res.json({
          id: user.id,
          name: user.name,
          token: token,
        });
      } else {
        res.status(401);
        throw new Error("Password is incorrect");
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching users", error: error.message });
    }
  },
  
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json({ msg: "OK", data: users });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching users", error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (user) {
        res.json({ msg: "User found", data: user });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching user", error: error.message });
    }
  },
  updateById: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { name, email, password },
        { new: true }
      );
      if (updatedUser) {
        res.json({ msg: "User updated", data: updatedUser });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating user", error: error.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (deletedUser) {
        res.json({ msg: "User deleted", data: deletedUser });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting user", error: error.message });
    }
  },
};

module.exports = userController;
