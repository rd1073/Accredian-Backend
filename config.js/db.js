const { Sequelize } =require("sequelize");
 
const db = new Sequelize('auth', 'root', '', {
    host: "127.0.0.1",
    password:"Golobull123#",
    dialect: "mysql",
    database: "Auth",
});
 
module.exports = { db };
