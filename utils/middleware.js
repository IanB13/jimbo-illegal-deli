const bcrypt  = require("bcrypt")
const Customer = require("../models/Customer")
require("dotenv")

const passwordCheck = async (request, response, next) => {
    const password = request.header("Authorization")
    const jimboPassword = process.env.JIMBO_PASSWORD

    //checks for customer passwords when accessing inventory
    if(request.path === "/inventory/order"){
        if(!request.body.uid){
            response.status(401).send("A uid is required")
        }
        const uid = request.body.uid
        if(!password){
            response.status(401).send("A password is required")
        }
        const check = await userPasswordCheck(uid,password)
        if(!check){
            response.status(401).send("F*CK OFF BOJIM")
        }
    }
    //checks for JImbos password when accessing admin routes
    else if(passwordRoute(request.path)){
        if(!password){
            response.status(401).send("A password is required")
        }
        else if( password !== jimboPassword){
            response.status(401).send("F*CK OFF BOJIM")
        }
    }
    next()
}

const requestLogging =  (request, _response, next) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}



module.exports = { passwordCheck , requestLogging }

//checks if the path requires a password to access
const passwordRoute = (path) => {
    const passwordRoutes = [
        "/customers",
        "/inventory/currency",
        "/inventory",
        "/customers/distance/helicopter",
        "/customers/distance/bike",
        "/customers"
    ]
    //checks for direct matches
    if(passwordRoutes.includes(path)){
        return(true)
    }
}


const userPasswordCheck = async (uid,password) => {
    const customer = await Customer.findOne({ uid })
    if(customer){
        return await bcrypt.compare(password,customer.password)
    }
    else{
        return false
    }
}