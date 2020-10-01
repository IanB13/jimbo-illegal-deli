const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)


//Testing customer endpoint security

//No password
test("No Auth /customers", async () => {
    const response = await api
        .get("/customers")
        .expect(401)
    expect(response.text).toBe("A password is required")
})

//Inccorrect password
test("Inccorect Auth /customers", async () => {
    const response = await api
        .get("/customers")
        .set("Authorization", "BojimIsAwsome")
        .expect(401)
    expect(response.text).toBe("F*CK OFF BOJIM")
})

//testing iventory endpoint security


afterAll(  () => {
    mongoose.connection.close()
})