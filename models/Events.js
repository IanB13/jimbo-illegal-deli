const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    uid: String,
    date: Date,
    order: {
        amount: Number,
        currency_code: String,
        items:{}
    }
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event