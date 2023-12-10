const express = require("express");

const { getUsers, Register, Login, Logout } =require("../controllers/UserController.js");
const { verifyToken } =require( "../config.js/VerifyToken.js");
const { refreshToken } =require( "../config.js/RefreshToken.js");
 
const router = express.Router();
 
router.route("/user").get(verifyToken, getUsers)
router.route("/users").post(Register);
 
router.route("/login")
.post(Login);

router.route("/token")
.get(refreshToken);

router.route("/logout")
.delete(Logout);

module.exports=router;