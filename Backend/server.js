const express = require('express');
const { connection } = require('./config/db');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());
// app.use(morgan('dev'));
require('dotenv').config();

app.use('/api/v1/auth' ,authRoute);

app.get("/", (req, res) => {
  return res.send("home page");
});

app.listen(7000, async () => {
  try {
    await connection;
    console.log("connected to db ");
  } catch (err) {
    console.log("err");
  }
});
