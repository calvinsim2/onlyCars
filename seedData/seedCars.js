const seedCars = [
    {
        brand: "Honda",
        model: "Test",
        original_owner: "617bba115821b9a8eb152626",
        rented_to_user: "617bba115821b9a8eb152627",
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
        original_owner: "617bba115821b9a8eb152627",
        rented_to_user: "617bba115821b9a8eb152626",
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