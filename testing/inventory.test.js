const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

//reset testing db
beforeEach( async () => {
    await api.get("/testing/reset")
})

test("database reset ", async () => {
    const inventory = await api.get("/inventory")
    expect(inventory.body.length).toBe(20)
})

test("")

afterAll(() => {
    mongoose.connection.close()
})