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
var subpath = express()

app.use("/v1", subpath)
app.use(express.static("dist"))

var swagger = require("swagger-node-express").createNew(subpath)

swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})

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
app.use(middleware.passwordCheck)
//do not use in testing enviroment
if(!(process.env.NODE_ENV === "test" )){
    app.use(middleware.requestLogging)
}
app.use("/customers",customerRouter)
app.use("/inventory",inventoryRouter)
app.use("/events",eventRouter)
//do for use in production enviroment
if(!(process.env.NODE_ENV === "production" )){
    app.use("/testing",testingRouter)
}
app.use(middleware.unknownEndpoint)

module.exports = app