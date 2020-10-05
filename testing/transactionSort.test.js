const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const config = require("../utils/config")
const api = supertest(app)
const transactionSort = require("../utils/customers/transactionSort")
const customers = require("../resources/deli_customers.json")

const password = config.JIMBO_PASSWORD

//reset testing db
beforeEach( async () => {
    await api.get("/testing/reset")
})

test("Sorting Transactions ", async () => {
    //Sorting customers directly from JSON
    customers.map(cust => {
        cust.last_transactions.map(trans => {
            trans.amount = + trans.amount
            trans.date =  Date.parse(trans.date)
        })
        cust.last_transactions.sort((a,b) => {
            return a.date - b.date
        })
    })

    await transactionSort()

    //getting data from mongoDB
    const mongoCustomers = await api.get("/customers").set("Authorization", password)
    for(let i = 0; i < customers.length ; i++){
        for(let j = 0; j < customers[i].last_transactions.length; j++){
            expect(mongoCustomers.body[i].last_transactions[j].amount).toBe(customers[i].last_transactions[j].amount)
        }
    }

})


afterAll( async () => {
    await mongoose.connection.close()
})