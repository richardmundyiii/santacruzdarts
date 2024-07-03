const express = require("express");
const path = require("path");
const logger = require("morgan");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 3001;

app.use("/api/events", require("./routes/api/Events"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express App running on port ${port}`);
});
