const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const apiKey = "7c869711cd3d0dc02e875bb96595a48c";
const app = express();
const port = 3000;
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
  const id = await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=7c869711cd3d0dc02e875bb96595a48c&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    )
    .then((res) => res)
    .catch((e) => console.log(e));

  const findid=(id.data.results[0].id);
  //   console.log(searchTerm);

  // const movieid = getid.results[0].id;
  //     console.log(movieid);
  //   } catch (e) {
  //     console.log("something went wrong");
  //   }

    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${findid}/recommendations?api_key=7c869711cd3d0dc02e875bb96595a48c&language=en-US&page=1`
    );
    console.log(result.data);
  res.send(result.data);
});
app.listen(port, () => {
  console.log("app is running");
});
