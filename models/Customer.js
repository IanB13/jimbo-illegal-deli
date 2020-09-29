const mongoose = require('mongoose')

//no id as using mongoDB ID
const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address:{
    country: String,
    city: String,
    street: {
      street_name: String,
      street_suffix: String,
      street_number: String
    },
    coordinates: {
      longitude: Number,
      latitude: Number
    }
  },
  email: String,
  gender: String,
  uid: String,
  last_transactions:[{date:Date,amount:Number}]
  })


const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer