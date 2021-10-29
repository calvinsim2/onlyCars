const seedUsers = [
    {
    username: "admin",
    displayname: "The Administrator.",
    password: "melonlord",
    cars_for_rent: [ ],
    rented_cars: [ ],
    is_admin: true,
    location: {
        country: "Singapore",
    },
    reviews: [ ]
    },
    {
        username: "peasant",
        displayname: "peasant",
        password: "test",
        cars_for_rent: [ ],
        rented_cars: [ ],
        is_admin: false,
        location: {
            country: "Singapore",
        },
        reviews: [ ]
        },
]

module.exports = seedUsers;