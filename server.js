const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.use("/", (req, res) => res.send("Welcome to My Express App"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
