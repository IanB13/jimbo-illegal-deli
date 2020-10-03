const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)


//Testing customer endpoint security

//No password
test("No password /customers", async () => {
    const response = await api
        .get("/customers")
        .expect(401)
    expect(response.text).toBe("A password is required")
})

//Incorrect password
test("Incorect password /customers", async () => {
    const response = await api
        .get("/customers")
        .set("Authorization", "BojimIsAwsome")
        .expect(401)
    expect(response.text).toBe("F*CK OFF BOJIM")
})

//testing inventory endpoint security

//no password
test("No password /inventory", async () => {
    const response = await api
        .get("/inventory")
        .expect(401)
    expect(response.text).toBe("A password is required")
})

//Incorrect password
test("Incorect password /inventory", async () => {
    const response = await api
        .get("/inventory")
        .set("Authorization", "BojimIsAwsome")
        .expect(401)
    expect(response.text).toBe("F*CK OFF BOJIM")
})

afterAll(  async () => {
    await mongoose.connection.close()
})