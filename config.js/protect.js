const jwt = require("jsonwebtoken");
const { Users } = require("../config.js/UserModel");

const protect = async (req, res, next) => {
    try {
      let token;
  
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
  
        // Decodes token id
        const decoded = jwt.verify(token, "abcd");
  
        // Find the user by id and exclude the password field
        //const user = await Users.findById(decoded.id).select("-password");
  
        // Find the user by id using Sequelize
        const user = await Users.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ error: "Not authorized, user not found" });
        }
      } else {
        res.status(401).json({ error: "Not authorized, no token" });
      }
    } catch (error) {
      console.error("Protect middleware error:", error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  };
  
module.exports = protect;