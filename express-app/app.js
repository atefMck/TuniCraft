const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./src/routes/User');
const authRouter = require('./src/routes/Auth');

// Setting Environment
require('dotenv').config();
const {
  PORT = 8080,
} = process.env

// Configuring main app
const app = express();
const db = require("./src/models");
db.sequelize.sync();
var corsOptions = {
  origin: ["http://localhost:3000", "http://55.55.55.5:3000"]
};

// Applying middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use('/api/user', userRouter);
app.use('/', authRouter);

// Launching app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
