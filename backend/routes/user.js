const express = require("express");
const {
  authController,
  loginController,
  updateUserProfile,
  registerController,
} = require("../controller/user.js");
const authMiddleware = require("../middleware/authMiddleware");

router = express.Router();

router.post("/register", registerController);
router.get("/get-user", authMiddleware, authController);
router.post("/login", loginController);
router.put("/update", authMiddleware, updateUserProfile);

module.exports = router;
