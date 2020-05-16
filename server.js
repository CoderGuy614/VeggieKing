const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/confirmation", require("./routes/api/confirmation"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
