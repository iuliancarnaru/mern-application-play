const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");
const app = express();

// use body-parser middleware
app.use(bodyParser.json());

// importing db config
const dbURI = require("./config/keys").mongoURI;

// connect to Mongo
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDb connected ..."))
  .catch(error => console.log(error));

// use routes
app.use("/api/items", items);

// server static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
