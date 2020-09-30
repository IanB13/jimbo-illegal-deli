const inventoryRouter = require("express").Router()
const Inventory = require("../models/Inventory")
const updateCurrency = require("../utils/updateCurrency")
const orderProcessing = require("../utils/order")
const createInvItem = require("../utils/createInvItem")

//updates orders
inventoryRouter.put("/order", async (request,response) => {
    console.log(request.body)
    const order = await orderProcessing(request.body)
    response.status(200).json(order)
})


//updates currency data
inventoryRouter.put("/currency", async (request, response) => {
    const status = await updateCurrency(request.body)
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

//gets all inventory and returns a list
inventoryRouter.get("/", async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
})




module.exports = inventoryRouter

