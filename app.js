const express = require("express")
const app = express()
const customerRouter = require("./controllers/customers")
const inventoryRouter = require("./controllers/inventory")
const eventRouter = require("./controllers/events")
const testingRouter = require("./controllers/testing")
const middleware = require("./utils/middleware")
const config = require("./utils/config")
const mongoose = require("mongoose")

//Cron job to sort customer orders by date
const orderSort = require("./utils/customers/orderSort")
const cron = require("node-cron")
cron.schedule("0 1 * * 3", orderSort) //For 1:00 am every Wednesday

//for swagger api documentation
//using subpath to avoid conflict
const subpath = express()

app.use("/v1", subpath)
app.use(express.static("dist"))

app.get("/",  (_request, response) => {
    response.sendFile(__dirname + "/dist/index.html")
})
// end of swagger

//mongoose config
let uri = config.MONGODB_URI
if (config.NODE_ENV === "test") {
    uri = config.TEST_MONGODB_URI
}
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(() => {
    console.log(`connected at ${uri}`)
}
).catch( error => {
    console.error(error)
})

app.use(express.json())
//not for use in testing enviroment
if(!(config.NODE_ENV === "test" )){
    app.use(middleware.requestLogging)
}
app.use(middleware.passwordCheck)
app.use("/customers",customerRouter)
app.use("/inventory",inventoryRouter)
app.use("/events",eventRouter)
//not for use in production enviroment
if(!(config.NODE_ENV === "production" )){
    app.use("/testing",testingRouter)
}
app.use(middleware.unknownEndpoint)

module.exports = app