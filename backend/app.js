const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const { dirname }= require('path')

const bodyParser = require('body-parser');


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,parameterLimit:100000, limit: '500mb' }));


const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRouter");



// const __dirname = dirname(fileURLToPath(import.meta.url))

// app.use(express.static(path.resolve(__dirname, './images')))
app.use(express.static('images'))
app.use("/api/user", userRouter);
app.use("/api/employee",  employeeRouter);


app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running on port 5000")
);
