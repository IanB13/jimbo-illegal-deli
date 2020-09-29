const testingRouter = require(`express`).Router()
const Customer = require('../models/Customer')
const Inventory = require('../models/Inventory')
const custJSON = require('../deli_customers.json')
const invJSON = require('../inventory.json')

//TODO:MAYBE: figure out how to run concurently, promise.all?
//TODO: Status code
testingRouter.get('/reset', async (_request, response) => {
    await Inventory.deleteMany({})
    await Inventory.insertMany(invJSON)
    await Customer.deleteMany({})
    await Customer.insertMany(custJSON)
    response.status(200).json({"hi":"world"})
 })


module.exports = testingRouter