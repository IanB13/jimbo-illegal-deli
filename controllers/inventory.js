const inventoryRouter = require(`express`).Router();
const Inventory = require('../models/Inventory')
const updateCurrency = require('../services/updateCurrency')

//TODO: make put
inventoryRouter.get('/currency', async (request, response) => {
    console.log(request.query)
    const status = await updateCurrency(request.query)
    response.status(200).json(status)
 })

//gets all inventory and returns a list
inventoryRouter.get('/', async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
 })

 //TODO: better input handling
inventoryRouter.post('/',  async (request, response) => {
    const item = request.body
    console.log(item)
    await Inventory.create(item)
    response.json(item)
 })

//updates currency data


module.exports = inventoryRouter

