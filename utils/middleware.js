const bcrypt  = require("bcrypt")
const Customer = require("../models/Customer")
const config = require("../utils/config")

const passwordCheck = async (request, response, next) => {
    const password = request.header("Authorization")
    const jimboPassword = config.JIMBO_PASSWORD
    //checks if a response is made
    let responseSent = false
    //checks for customer passwords when accessing inventory
    if(request.path === "/inventory/order"){
        if(!request.body.uid){
            responseSent = true
            response.status(401).send("A uid is required")
        }
        const uid = request.body.uid
        if(!password){
            responseSent = true
            response.status(401).send("A password is required")
        }
        const check = await userPasswordCheck(uid,password)
        if(!check){
            responseSent = true
            response.status(401).send("F*CK OFF BOJIM")
        }
    }
    //checks for JImbos password when accessing admin routes
    else if(passwordRoute(request.path)){
        if(!password){
            responseSent = true
            response.status(401).send("A password is required")
        }
        else if( password !== jimboPassword){
            responseSent = true
            response.status(401).send("F*CK OFF BOJIM")
        }
    }
    if(!responseSent){
        next()
    }
}

const requestLogging =  (request, _response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

//helper function for password check
//checks if the path requires a password to access
const passwordRoute = (path) => {
    const passwordRoutes = config.PASSWORD_PROTECTED
    //checks for direct matches
    if(passwordRoutes.includes(path)){
        return(true)
    }
    //checks routes with params
    const paramRoutes = config.PASSWORD_PROTECTED_PARAMS
    for(const route of paramRoutes){
        if(route === path.slice(0,route.length)){
            return true
        }
    }

    return false
}

//helper function for password check
const userPasswordCheck = async (uid,password) => {
    const customer = await Customer.findOne({ uid })
    if(customer){
        return await bcrypt.compare(password,customer.password)
    }
    else{
        return false
    }
}

module.exports = { passwordCheck , requestLogging , unknownEndpoint }