const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
    item: String,
    details: {
        price: Number,
        currency_code: String, //TODO: must be added
        amount: Number,
        last_purchased: Date,
        color: String,
        color_hex: String
    },
    supplier_details: {
        country: String,
        country_code: String,
        currency: String,
        base_price: Number, // must be added
        base_currency_code: String, // must be added
        contact: {
            phone: String,
            email: String
        }
    }
})


const Inventory = mongoose.model("inventory", inventorySchema , "inventory")

module.exports = Inventory