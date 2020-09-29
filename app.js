const express = require("express");
const app = express();
const customerRouter = require('./controllers/customers')


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

module.exports = app