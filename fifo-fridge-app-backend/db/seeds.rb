# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
fridge_a = Fridge.create(name: "Fridge A", capacity: 50)
fridge_b = Fridge.create(name: "Fridge B", capacity: 13)
fridge_c = Fridge.create(name: "Fridge C", capacity: 28)

food_item_1a = fridge_a.food_items.create(name: "Banana", food_group: "fruit", expiration_date: "02/23/2020", quantity: 5)
food_item_2a = fridge_a.food_items.create(name: "Bacon (packaged)", food_group: "meat", expiration_date: "7/01/2020", quantity: 1)
food_item_3a = fridge_a.food_items.create(name: "Ketchup", food_group: "vegetable", expiration_date: "08/24/2020", quantity: 3)

food_item_1b = fridge_b.food_items.create(name: "Cod", food_group: "seafood", expiration_date: "06/25/2020", quantity: 2)
food_item_2b = fridge_b.food_items.create(name: "Lemons", food_group: "fruit", expiration_date: "08/01/2020", quantity: 5)
food_item_3b = fridge_b.food_items.create(name: "Milk", food_group: "dairy", expiration_date: "06/30/2020", quantity: 1)

food_item_1c = fridge_c.food_items.create(name: "Potatoes", food_group: "vegetable", expiration_date: "08/01/2020", quantity: 2)
food_item_2c = fridge_c.food_items.create(name: "Milk", food_group: "dairy", expiration_date: "02/02/2020", quantity: 5)
food_item_3c = fridge_c.food_items.create(name: "Avocado", food_group: "oils", expiration_date: "06/25/2020", quantity: 1)
