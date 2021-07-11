const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');
require('dotenv').config();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const apiKey =process.env.API_KEY;
const app = express();
app.use(cors());
const port = 4000;
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
// app.use(express.static('public'))
app.get("/", (req, res) => {
  // res.send("hi");
  res.render("index.ejs");
});

app.post("/", urlencodedParser, async (req, res) => {
  const { searchTerm } = req.body;
  try {
    var id = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`,
    });
    var id2 = id.data.results[0].id;

    var response = await axios({
      url: `https://api.themoviedb.org/3/movie/${id2}/recommendations?api_key=${process.env.API_KEY}&append_to_response=videos&language=en-US&page=1`,
      method: "GET",
    });
    var finalresult = response.data.results;
    
    const getlink = [];
      for(let i=0;i<finalresult.length;i++){
       const getvideourl =  await axios({
        url: `https://api.themoviedb.org/3/movie/${finalresult[i].id}/videos?api_key=${process.env.API_KEY}`,
        method: "GET",
      });
      getlink.push(getvideourl.data.results[0].key);

    }

    

    if (finalresult.entries({}).length === 0) {
      res.render("error");
    } else {
      res.render("showResult", { finalresult: finalresult ,getlink:getlink,genreId:genreId});
    }
  } catch (error) {
    console.error(error);
  }
});
app.listen(port, () => {
  console.log("app is running");
});

 genreId={"genres":[{"id":28,"name":"Action"},
{"id":12,"name":"Adventure"},
{"id":16,"name":"Animation"},
{"id":35,"name":"Comedy"},
{"id":80,"name":"Crime"},
{"id":99,"name":"Documentary"},
{"id":18,"name":"Drama"},
{"id":10751,"name":"Family"},
{"id":14,"name":"Fantasy"},
{"id":36,"name":"History"},
{"id":27,"name":"Horror"},
{"id":10402,"name":"Music"},
{"id":9648,"name":"Mystery"},
{"id":10749,"name":"Romance"},
{"id":878,"name":"Science Fiction"},
{"id":10770,"name":"TV Movie"},
{"id":53,"name":"Thriller"},
{"id":10752,"name":"War"},
{"id":37,"name":"Western"}]};