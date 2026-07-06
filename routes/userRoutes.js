const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const auth = require("../middleware/auth");
const profile = require("../controllers/profile");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createUserF,
  getUsersF,
  getUserF,
  updateUserF,
  deleteUserF,
} = require("../controllers/fileController");
const { userValidation } = require("../middleware/validation");
const validateRequestion = require("../middleware/validationRequestion");
const register = require("../controllers/register");
const login = require("../controllers/login");
router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);
router.post(
  "/create",
  upload.single("image"),
  userValidation,
  validateRequestion,
  createUser,
);
router.post("/createF", createUserF);
router.get("/getallF", getUsersF);
router.get("/getF/:id", getUserF);
router.put("/updateF/:id",updateUserF)
router.delete("/deleteF/:id",deleteUserF)
router.get("/getall", getUsers);

router.get("/getbyid/:id", getUser);

router.put("/:id", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
