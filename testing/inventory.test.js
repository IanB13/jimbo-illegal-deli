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

test("Adding item ", async () => {
    await api
        .post("/inventory")
        .send(inventoryItem)
        .expect(200)

    const inventory = await api.get("/inventory")
    expect(inventory.body[20].item).toBe("hand_sanitizer")
    expect(inventory.body[20].details.currency_code).toBe("IDR")
})

test("converting currency", async ()  => {
    await api
        .put("/inventory/currency")
        .send({ code:"USD" })
        .expect(200)

    const inventory = await api.get("/inventory")
    expect(inventory.body[3].details.currency_code).toBe("USD")
})

afterAll(() => {
    mongoose.connection.close()
})

const inventoryItem = {
    "details": {
        "price": 10.00,
        "amount": 500,
        "color": "Green",
        "color_hex": "#302"
    },
    "supplier_details": {
        "contact": { "phone": "771-667-3249", "email": "cchiversf@kickstarter.com" },
        "country": "Indonesia",
        "country_code": "ID",
        "currency": "Rupiah"
    },
    "item": "hand_sanitizer"
}