const inventoryRouter = require("express").Router()
const Inventory = require("../models/Inventory")
const updateCurrency = require("../utils/updateCurrency")
const orderProcessing = require("../utils/order")

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

//TODO: better input handling
inventoryRouter.post("/add",  async (request, response) => {
    const item = request.body
    console.log(item)
    await Inventory.create(item)
    response.json(item)
})

//gets all inventory and returns a list
inventoryRouter.get("/", async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
})




module.exports = inventoryRouter

