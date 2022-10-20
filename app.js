const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true} ))


app.get("/",function(req,res){
  res.sendFile(__dirname+ "/index.html")
})

app.post("/", function(req,res){

  const query = req.body.cityName
  const apiKey= "018d1502b57437c7b4c25cd732018670"
  const units = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ units+" ";

  https.get(url, function (response){
    console.log(response)

    response.on("data",function(data){
      const weather = JSON.parse(data);
      const temp = weather.main.temp;
      const icon = weather.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
      const description = weather.weather[0].description
      console.log(description);
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees celsius</h1>")
      res.write("The weather in"+ query+" is currently " + description )
      res.write("<img src="+image+">")
      res.send()
    })
  })
})



app.listen(3000, function(){
  console.log("Server is running")
})
