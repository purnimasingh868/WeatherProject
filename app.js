// jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));




app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=2042d0c3bed7dc5ff0cdc56ea21c90ee&units=metric";

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      console.log(temp);

      res.send("The temperature in " + query + " is " + temp+  "degree celcius ");
    });
  });




});



app.listen(3000, function() {
  console.log("server is running on port 3000");
});
