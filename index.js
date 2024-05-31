const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "./client")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.use("/api/Ice_Cream", require("./Ice_Cream"));

app.listen(8080, () => {
  console.log("App is running at port 8080.");
});