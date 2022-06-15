// importing required modules
const express = require("express");
const cors = require('cors');
const fs = require("fs");

// initializing the app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// importing routes form .routes
const routes = require("./routes/routes.js")(app, fs);


//default port and listening
const port = parseInt(process.env.PORT, 10) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
