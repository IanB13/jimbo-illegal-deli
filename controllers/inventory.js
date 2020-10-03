const inventoryRouter = require("express").Router()
const Inventory = require("../models/Inventory")
const updateCurrency = require("../utils/inventory/updateCurrency")
const orderProcessing = require("../utils/inventory/order")
const createInvItem = require("../utils/inventory/addItem")


//updates inventory for orders
inventoryRouter.put("/order", async (request,response) => {
    const order = await orderProcessing(request.body)
    response.status(200).json(order)
})


//updates currency data in db
inventoryRouter.put("/currency", async (request, response) => {
    const status = await updateCurrency(request.body, true)
    if(request.invalid){
        response.status(400).json(status)
    }
    response.status(200).json(status)
})

//adds inventory item
inventoryRouter.post("/",  async (request, response) => {
    const status = await createInvItem(request.body)
    response.status(200).json(status)
})

//gets all inventory
inventoryRouter.get("/", async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
})

module.exports = inventoryRouter