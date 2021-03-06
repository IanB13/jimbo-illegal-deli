const express = require("express")
const app = express()
require("express-async-errors")
const customerRouter = require("./controllers/customers")
const inventoryRouter = require("./controllers/inventory")
const eventRouter = require("./controllers/events")
const testingRouter = require("./controllers/testing")
const middleware = require("./utils/middleware/")
const config = require("./utils/config")
const mongoose = require("mongoose")

//Cron job to sort customer orders by date
const transactionSort = require("./utils/customers/transactionSort")
const cron = require("node-cron")
cron.schedule("0 1 * * 3", transactionSort) //For 1:00 am every Wednesday

//for swagger api documentation
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
app.use(middleware.errorHandler)

module.exports = app