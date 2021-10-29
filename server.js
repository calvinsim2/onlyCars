require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
    console.log("connected to mongo");
});



//* MIDDLEWARE

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello onlyCars fans :-)");
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
