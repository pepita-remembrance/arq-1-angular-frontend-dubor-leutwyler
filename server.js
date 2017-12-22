var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
