const customerRouter = require(`express`).Router()
const Customer = require('../models/Customer')

//gets all customers and returns a list
customerRouter.get('/', async (_request, response) => {
    const cutomers =  await Customer.find({})
    response.status(200).json(cutomers)
 })

/*finds customers by MongoId provided ID
 Chose to do this because easier, more stable to add, delete update
 also no duplicate IDs, more performant */
customerRouter.get('/:id',async (request, response) => {
    const id = request.params.id
    try {
        const customer = await Customer.findById(id)
        const { first_name, last_name, email } = customer._doc
        response.status(200).json({ first_name, last_name, email })
    }
    catch {
        response.status(404).send(`Customer with id ${id} not found`)
    }
})

module.exports = customerRouter