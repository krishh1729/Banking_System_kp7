// create server instance and config server , but dont start it

// how many types of api s

console.log("Loading express...")

const express = require("express")

const cookieParser = require("cookie-parser");

const authRouter = require ("./routes/auth.routes") ;




const app = express() ;

app.use(express.json());

app.use(cookieParser())

app.use("/api/auth",authRouter);

module.exports=app