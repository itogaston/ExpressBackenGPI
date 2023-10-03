const express = require("express");
const color = require("colors")
const path = require('path');
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3002;

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectDB = require("./config/db");
connectDB();

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/api/verify', require("./routes/verifyRoutes"))
app.use('/api/projects', require("./routes/projectRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/sprints', require("./routes/sprintRoutes"));
app.use('/api/userstories', require("./routes/userStoryRoutes"))
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
