const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

// routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// use body-parser middleware
app.use(express.json());

// importing db config
const dbURI = config.get("mongoURI");

// connect to Mongo
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDb connected ..."))
  .catch(error => console.log(error));

// use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

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
