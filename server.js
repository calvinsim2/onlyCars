require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
    console.log("connected to mongo");
});

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

//* MIDDLEWARE

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.json());
const usersController = require("./controllers/usersController")
app.use("/api/users", usersController);
const carsController = require("./controllers/carsController")
app.use("/api/cars", carsController);
const carRentalEventsController = require("./controllers/carRentalEventsController")
app.use("/api/carRentalEvents", carRentalEventsController);
const reviewsController = require("./controllers/reviewsController")
app.use("/api/reviews", reviewsController);



//* ROUTES

app.get("/", (req, res) => {
    res.json("Hello onlyCars fans :-)");
})


//* LISTEN

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
