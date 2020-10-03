const testingRouter = require("express").Router()
const Customer = require("../models/Customer")
const Inventory = require("../models/Inventory")
const Events = require("../models/Events")
const custJSON = require("../resources/deli_customers.json")
const invJSON = require("../resources/inventory.json")
const addCurrencyCodes = require("../utils/inventory/addCurrencyCodes")
const addPasswords = require("../utils/customers/addPasswords")


testingRouter.get("/reset", async (_request, response) => {
    await Inventory.deleteMany({})
    //modifications to invJSON, creating more data for ease of currency conversion
    const updatedInv = await addCurrencyCodes(invJSON)
    await Inventory.insertMany(updatedInv)
    await Customer.deleteMany({})
    const customers = await addPasswords(custJSON)
    await Customer.insertMany(customers)
    await Events.deleteMany({})
    response.status(200).send("reset database")
})


module.exports = testingRouter