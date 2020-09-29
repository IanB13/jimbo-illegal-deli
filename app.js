const express = require("express");
const app = express();
const customerRouter = require('./controllers/customers')


app.use('/api/customers',customerRouter)

module.exports = app