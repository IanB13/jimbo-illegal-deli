const testingRouter = require(`express`).Router()
const Customer = require('../models/Customer')
const Inventory = require('../models/Inventory')
const custJSON = require('../deli_customers.json')
const invJSON = require('../inventory.json')
const addCurrencyCodes = require('../services/addCurrencyCodes')

//TODO:MAYBE: figure out how to run concurently, promise.all?
//TODO: Status code
testingRouter.get('/reset', async (_request, response) => {
    await Inventory.deleteMany({})
    //modifications to invJSON, creating more data for ease of currency conversion 
    const updatedInv = await addCurrencyCodes(invJSON)
    await Inventory.insertMany(updatedInv)
    await Customer.deleteMany({})
    await Customer.insertMany(custJSON)
    response.status(200).send("reset database")
 })


module.exports = testingRouter