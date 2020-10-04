const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const inventorySchema = new mongoose.Schema({
    item: {
        type: String,
        unique: true,
        required: [true, "item is required"]
    },
    details: {
        price: {
            type: Number,
            required: [true, "price is required"]
        },
        currency_code: String, //programmatically added
        amount:{
            type: Number,
            required: [true, "number of items are required"]
        },
        last_purchased: Date,
        color: String,
        color_hex: String
    },
    supplier_details: {
        country: String,
        country_code: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 3
        },
        currency: String,
        base_price: Number, // programmatically added
        base_currency_code: String, // programmatically added
        contact: {
            phone: String,
            email: String
        }
    }
})

inventorySchema.plugin(uniqueValidator)

const Inventory = mongoose.model("inventory", inventorySchema , "inventory")

module.exports = Inventory