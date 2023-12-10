const jwt = require('jsonwebtoken');
const { Users } = require('./UserModel');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'abcd');
    const user = await Users.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports =  authMiddleware ;
