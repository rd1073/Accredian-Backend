const {Users}=require( "../config.js/UserModel");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../config.js/token");
 
 const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
} 
 
 const Register = async(req, res) => {
    const { username, email, password } = req.body;
    
     const hashPassword = await bcrypt.hash(password, 10);
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
const Login = async(req, res) => {
    try {
         console.log("Request Body:", req.body);

  
       
        const user = await Users.findAll({
            where:{
                email:req.body.email
            },
        });

        // Check if user with the specified email exists
    if (user.length === 0) {
        return res.status(404).json({ msg: "Email not found" });
      }
  
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = generateToken(userId);
        res.json({
            userId: userId,
            username: username,
            email: email,
            accessToken: accessToken
          });
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Email not found"});
    }
}
 
const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


module.exports={getUsers, Register, Login, Logout};