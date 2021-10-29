const seedCars = [
    {
        brand: "Honda",
        model: "Test",
        original_owner: "617bad82445c58460f4cba1b",
        rented_to_user: "617bad82445c58460f4cba1c",
        rental_rate: 500.10,
        rented_days: 0,
        mileage: 100,
        horsepower: 100,
        manual: false,
        Electric: true,
        images: [ "inserturl" ],
        key_features: [ "pet-friendly" ],
    },
    {
        brand: "Mitsubishi",
        model: "Test2",
        original_owner: "617bad82445c58460f4cba1c",
        rented_to_user: "617bad82445c58460f4cba1b",
        rental_rate: 300.10,
        rented_days: 5,
        mileage: 100,
        horsepower: 100,
        manual: true,
        Electric: false,
        images: [ "inserturl" ],
        key_features: [ "NO PETS" ],
    },
]

module.exports = seedCars;