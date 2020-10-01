const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
require("dotenv")
const api = supertest(app)

const password = process.env.JIMBO_PASSWORD

//reset testing db
beforeEach( async () => {
    await api.get("/testing/reset")
})


test("Dall Aingell orders 1 helicopter, 5 AK47s and 3 cocaines", async () => {
    //ensure database has correct number of Ak47s in it before order
    const inventoryPreOrder = await api.get("/inventory").set("Authorization", password)
    const AK47PreOrder  = inventoryPreOrder.body.filter(x => x.item === "AK47")[0]
    expect(AK47PreOrder.details.amount).toBe(24)

    //do order, check updated currency code
    //any total value test without external api call would be flakey due to change
    const orderResponse = await api
        .put("/inventory/order")
        .set("Authorization", "IamDallNOTBojim") //test password
        .send(DallOrder)
        .expect(200)
    expect(1).toBe(1)
    expect(orderResponse.body.currency_code).toBe("CAD")

    //ensure database has correct number of Ak47s in it after order
    const inventoryPostOrder = await api.get("/inventory").set("Authorization", password)
    const AK47PostOrder = inventoryPostOrder.body.filter(x => x.item === "AK47")[0]
    expect(AK47PostOrder.details.amount).toBe(19)

    //checks that currency and prices are not modified in database
    expect(AK47PostOrder.details.currency_code).toBe("RUB")
    expect(AK47PostOrder.details.price).toBe(6598.81)
})


test("Virgilio Domelow orders 12 dolphins and 4 truffles", async () => {


})

test("Adding hand sanatizer to database item ", async () => {
    await api
        .post("/inventory")
        .set("Authorization", password)
        .send(inventoryItem)
        .expect(200)

    const inventory = await api.get("/inventory").set("Authorization", password)
    expect(inventory.body[20].item).toBe("hand_sanitizer")
    expect(inventory.body[20].details.currency_code).toBe("IDR")
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

const DallOrder = {
    "uid": "a00c9ddd-c983-4580-9385-5997243f15fd",
    "currency_code": "CAD",
    "order":{
        "AK47" : 5,
        "cocaine" : 3,
        "helicopter" :1
    }
}