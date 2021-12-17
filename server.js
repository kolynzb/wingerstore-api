const express = require("express");
require("dotenv").config();
const startServer = require("./Config/startServer");
const cors = require("cors");
const authRoute = require("./Routes/auth");
const usersRoute = require("./Routes/users");
const app = express();

//middleware
app.use(express.json());
app.use(cors);

//routes

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);

startServer(app);
