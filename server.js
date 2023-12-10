const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const { db } = require("./config.js/db.js");
const UserRoutes= require("./routes/UserRoutes.js");
 const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", UserRoutes);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));