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
const usersController = require("./controllers/usersController")
app.use("/api/users", usersController);
const carsController = require("./controllers/carsController")
app.use("/api/cars", carsController);



//* ROUTES

app.get("/", (req, res) => {
    res.json("Hello onlyCars fans :-)");
})


//* LISTEN

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
