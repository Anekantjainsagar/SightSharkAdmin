require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const login = require("./routes/login");
const connectToDb = require("./db/connect");

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", login);

app.listen(PORT, () => console.log("Server running on port " + PORT));
