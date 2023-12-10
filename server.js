const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes=require("./routes/UserRoutes.js")
 

const { db } = require("./config.js/db.js");
 const app = express();
 app.use(express.json());

 app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // <-- location of the react app were connecting to
      credentials: true,
    })
  );

  app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", userRoutes);

 
app.listen(5000, ()=> console.log('Server running at port 5000'));