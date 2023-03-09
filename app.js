const express = require("express");
const https = require("node:https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "9051b5b4d06f820134a1d38b40c1fb39";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appKey +
    "&units =" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(weatherDescription);
      res.write(
        "<p><h2>The weather currently is " + weatherDescription + "</h2></p>"
      );
      res.write(
        "<h1>The temperature in "+query+" is " + temp + " degree celcius.</h1>"
      );
      res.write("<img src=" + imageURl + ">");
      res.send();
    });
  });
});

// const query = "London";
// const appKey = "9051b5b4d06f820134a1d38b40c1fb39";
// const unit = "metric";
// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   query +
//   "&appid=" +
//   appKey +
//   "&units =" +
//   unit;
// https.get(url, function (response) {
//   console.log(response.statusCode);

//   response.on("data", function (data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description;
//     const icon = weatherData.weather[0].icon;
//     const imageURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//     console.log(temp);
//     console.log(weatherDescription);
//     res.write(
//       "<p><h2>The weather currently is " + weatherDescription + "</h2></p>"
//     );
//     res.write(
//       "<h1>The temperature in London is " + temp + " degree celcius.</h1>"
//     );
//     res.write("<img src=" + imageURl + ">");
//     res.send();
//   });
// });

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
