const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
