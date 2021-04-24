require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRoute = require("./route/contactRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", contactRoute);

// creating static assets for heroku tp build our file folder
if (process.env.NODE_ENV === "production") {
  //    create folder
  // express.static delivers static files(html,css). When we want to use build we want to serve this files in the build folder
  app.use(express.static("client/build"));
  // if client makes request we want to send idex.html frist, which in  reality is all the react app
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server listening on port ${port}`));
