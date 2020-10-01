const eventRouter = require("express").Router()
const Events = require("../models/Events")

//gets a list of events
eventRouter.get("/", async (_request, response) => {
    const events =  await Events.find({})
    response.status(200).json(events)
})

module.exports = eventRouter