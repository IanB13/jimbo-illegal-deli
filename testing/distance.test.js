const helicopterDistance = require("../utils/distance").helicopter
const mongoose = require("mongoose")
const Customer = require("../models/Customer")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
console.log(api)

test("medium helicopter distance test", async () => {
    const customer = await Customer.find({ last_name: "Aingell" })
    const queryObj = {
        longitude: 113.984298,
        latitude: 26.195271,
        id: customer[0]._id
    }
    const result = await helicopterDistance(queryObj)
    expect( (result.meters)/1000).toBeCloseTo(21560/1000 , 0) //within the same amount of km

})

afterAll(() => {
    mongoose.connection.close()
})