const inventoryRouter = require("express").Router()
const Inventory = require("../models/Inventory")
const updateCurrency = require("../utils/inventory/updateCurrency")
const orderProcessing = require("../utils/inventory/orderProcessing")
const addItem = require("../utils/inventory/addItem")


//updates inventory for orders
inventoryRouter.put("/order", async (request,response) => {
    const order = await orderProcessing(request.body)
    response.status(200).json(order)
})


/* updates inventory price by currency code
requires currency currency code
id and name are optional, but only one can be provided
if an id or item name is provided only the inventory item matching will be updated
otherwise all items will be updated
*/
inventoryRouter.put("/currency", async (request, response) => {
    const status = await updateCurrency(request.body, true)
    if(request.invalid){
        response.status(400).json(status)
    }
    response.status(200).json(status)
})

//adds inventory item
inventoryRouter.post("/",  async (request, response) => {
    const status = await addItem(request.body)
    response.status(200).json(status)
})

//gets all inventory
inventoryRouter.get("/", async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
})

module.exports = inventoryRouter