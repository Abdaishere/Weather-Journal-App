projectData = {};

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 5000;
const apiRoot = "/cach";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get("/", (req, res) => {
  res.send(projectData);
});

app.use(apiRoot, router);

app.use(express.static("website"));
app.listen(port, () => {
  console.log(`Working http://localhost:${port}`);
});


app.post("/postData", addData);

function addData(req, res) {
  let data = req.body;
  console.log(data);
  
  projectData["temp"] = data.temp;
  projectData["date"] = data.date;
  projectData["feelings"] = data.feelings;
  res.send(projectData);
}

app.get("/getData", getData);

function getData(req, res) {
  res.send(projectData);
}