const express = require("express")
const app = express()
const customerRouter = require("./controllers/customers")
const inventoryRouter = require("./controllers/inventory")
const eventRouter = require("./controllers/events")
const testingRouter = require("./controllers/testing")
const middleware = require("./utils/middleware")


//Cron job to sort customer orders by date
const orderSort = require("./utils/orderSort")
const cron = require("node-cron")
cron.schedule("0 1 * * 3", orderSort) //For 1:00 am every Wednesday

//for swagger
const subpath = express()

app.use("/v1", subpath)
app.use(express.static("dist"))

app.get("/",  (_request, response) => {
    response.sendFile(__dirname + "/dist/index.html")
})
// end of swagger

//mongoose config
const mongoose = require("mongoose")
require("dotenv").config()
let uri = process.env.MONGODB_URI
if (process.env.NODE_ENV === "test") {
    uri = process.env.TEST_MONGODB_URI
}
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(() => {
    console.log(`connected at ${uri}`)
}
).catch( error => {
    console.log(error)
})

app.use(express.json())
//do not use in testing enviroment
if(!(process.env.NODE_ENV === "test" )){
    app.use(middleware.requestLogging)
}
app.use(middleware.passwordCheck)
app.use("/customers",customerRouter)
app.use("/inventory",inventoryRouter)
app.use("/events",eventRouter)
//do for use in production enviroment
if(!(process.env.NODE_ENV === "production" )){
    app.use("/testing",testingRouter)
}
app.use(middleware.unknownEndpoint)

module.exports = app