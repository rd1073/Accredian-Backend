const express = require("express");

const { getUsers, Register, Login, Logout } =require("../controllers/UserController.js");
//const { verifyToken } =require( "../config.js/VerifyToken.js");
//const { refreshToken } =require( "../config.js/RefreshToken.js");
 
const router = express.Router();
//const authMiddleware = require('../config.js/authMiddleware.js');
const { Users } = require('../config.js/UserModel.js');
const protect=require("../config.js/protect.js");
{/*router.route("/user").get(authMiddleware, async (req, res) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
*/}

 

router.route("/register").post(Register);
 
router.route("/login")
.post(Login);

//router.route("/token").get(refreshToken);

router.route("/logout")
.delete(Logout);

module.exports=router;