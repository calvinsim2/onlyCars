const mongoose = require("mongoose");


const usersSchema = mongoose.Schema({
    username: {type: String, required: true, trim: true},
    displayname: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    display_picture: {type: String, default: "/Portrait_Placeholder.png"},
    cars_for_rent: [ {type: mongoose.Schema.Types.ObjectId, ref:"Cars"} ],
    rented_cars: [ {type: mongoose.Schema.Types.ObjectId, ref:"Cars"} ],
    is_admin: {type: Boolean, required: true, default: false},
    location: Object,
    reviews: [ {type: mongoose.Schema.Types.ObjectId, ref:"Cars"} ]
})

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;