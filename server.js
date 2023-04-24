const express = require("express");
var cors = require('cors');
//importing databse config connection
require("./config/dotenv");
const client = require("./config/database");

client.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Data logging initaled")
    }
});
const app = express(); //Initialization express

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    req.statusCode(200).send("server up and running");
})
app.listen(port, () => {
    console.log(`Server up and runnig at ${port}`);
})

