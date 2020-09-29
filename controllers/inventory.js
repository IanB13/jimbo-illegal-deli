const inventoryRouter = require(`express`).Router();
const Inventory = require('../models/Inventory')

//gets all customers and returns a list
inventoryRouter.get('/', async (_request, response) => {
    const inventory =  await Inventory.find({})
    response.status(200).json(inventory)
 })


module.exports = inventoryRouter

