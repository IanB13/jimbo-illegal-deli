require("dotenv").config()

//mongoDb connection strings
const MONGODB_URI = process.env.MONGODB_URI
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
//node enviroment
const NODE_ENV = process.env.NODE_ENV
//api key for currency rates api, using https://fixer.io/
const FIXER_API_KEY = process.env.FIXER_API_KEY
//Jimbos password
const JIMBO_PASSWORD = process.env.JIMBO_PASSWORD
//password protected endpoint
const PASSWORD_PROTECTED =[
    "/customers",
    "/inventory/currency",
    "/inventory",
    "/customers/distance/helicopter",
    "/customers/distance/bike",
    "/events"
]
//Password protected endpoints with params
const PASSWORD_PROTECTED_PARAMS =[
    "/customers"
]
const PORT = process.env.PORT || 8080

module.exports = {
    MONGODB_URI,
    TEST_MONGODB_URI,
    NODE_ENV,
    FIXER_API_KEY,
    JIMBO_PASSWORD,
    PASSWORD_PROTECTED,
    PASSWORD_PROTECTED_PARAMS,
    PORT
}