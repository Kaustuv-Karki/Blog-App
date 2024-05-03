import express from "express";
import {
  deleteUser,
  forgotPassword,
  login,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
