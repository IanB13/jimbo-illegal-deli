const testingRouter = require("express").Router()
const Customer = require("../models/Customer")
const Inventory = require("../models/Inventory")
const Events = require("../models/Events")
const custJSON = require("../deli_customers.json")
const invJSON = require("../inventory.json")
const addCurrencyCodes = require("../utils/addCurrencyCodes")
const addPasswords = require("../utils/addPasswords")

//TODO:MAYBE: figure out how to run concurently, promise.all?
//TODO: Status codes
//TODO: make it so it only runs in testing enviroment
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