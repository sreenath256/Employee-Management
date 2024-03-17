const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getAll);

// Login user
router.post("/loginuser", userController.loginUser);

// POST a new user
router.post("/reguser", userController.create);

// UPDATE user by ID
router.put("/:id", userController.updateById);

// DELETE user by ID
router.delete("/:id", userController.deleteById);

module.exports = router;