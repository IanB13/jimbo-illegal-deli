const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  item: String,
  details: {
    price: String,
    amount: String,
    last_purchased: Date,
    color: String,
    color_hex: String
  },
  supplier_details: {
    country: String,
    country_code: String,
    currency: String,
    contact: {
      phone: String,
      email: String
    }
  }
})


const Inventory = mongoose.model('inventory', inventorySchema , 'inventory')

module.exports = Inventory