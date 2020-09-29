const express = require("express");
const app = express();
const customerRouter = require('./controllers/customers')
const inventoryRouter = require('./controllers/inventory')
const testingRouter = require('./controllers/testing')
const orderSort = require('./services/orderSort')

const cron = require('node-cron');
cron.schedule('* * 15 * *', orderSort); //For 3pm

//mongoose config
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(success =>{
  console.log(`connected at ${uri}`)
}
).catch( error =>{
  console.log(error)
})


app.use('/customers',customerRouter)
app.use('/inventory',inventoryRouter)
app.use('/testing',testingRouter)

module.exports = app