var express = require("express");
var path = require("path");
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var port = process.env.PORT || 8080;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+"/index.html"));
});

app.get("/:time", function(req, res){
    var unix = Date.parse(req.params.time);
    if(!unix){
        unix = parseInt(req.params.time);
        if(!unix){
            res.send(JSON.stringify({"unix":null, "natural":null}));
        }
        else{
            unix *= 1000;
        }
    }
    var date = new Date(unix);
    var ret = {};
    ret.unix = unix/1000;
    ret.natural = monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
    res.send(JSON.stringify(ret));
});

app.listen(port, function(){
    console.log("listening on "+port);
});