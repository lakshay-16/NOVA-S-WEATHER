const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.listen(3000,function()
{
  console.log("port working at 3000");
});

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{var c=req.body.city;
console.log(c);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+c+"&appid=773634ad7490ecfa3183c82823507fed&units=metric";

https.get(url,function(response)
{
  if(response.statusCode===200)
response.on("data",function(data)
{
  const wd=JSON.parse(data);
  console.log(wd);
  const temprature=wd.main.temp;
  const weather=wd.weather[0].description;
  const image=wd.weather[0].icon;
  const imageurl=" http://openweathermap.org/img/wn/"+image+"@2x.png";
res.render("result",{temp:temprature, Des:weather , img:imageurl})
})


else{
  res.sendFile(__dirname+"/fail.html");
}

})


})

app.post("/failure",function(req,res)
{
  res.redirect("/");
}
)
//api key=773634ad7490ecfa3183c82823507fed)
