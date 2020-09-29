const inventoryRouter = require(`express`).Router();
const Inventory = require('../models/Inventory')

//gets all customers and returns a list
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

module.exports = inventoryRouter

