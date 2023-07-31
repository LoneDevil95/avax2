const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/newIndex.html"));
})

const server = app.listen(5500,function(){
    console.log("port is started at localhost 5500");
});
const portNumber = server.address().port;
