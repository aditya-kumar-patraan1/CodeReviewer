const express = require('express');
const myRouter = require('./Routings/Routes');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use("/",myRouter);

app.get("/home",(req,res)=>{
    console.log("Home page request running..");
    res.status(200).send({
        status : 1,
        "msg" : "home page request activated"
    });
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("App is running....");
})