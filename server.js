var express = require("express");
var path = require("path");
var port = process.env.PORT || 8080;
var app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "build")));

// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

var server = app.listen(port, function () {
  console.log("listening on port ", server.address().port);
});
