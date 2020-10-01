require("dotenv")

const passwordCheck =  (request, response, next) => {
    const password = request.header("Authorization")
    const jimboPassword = process.env.JIMBO_PASSWORD

    //checks for customer passwords when accessing inventory
    if(request.path === "/inventory/order"){
        console.log("check password here?")
        response.status(401).send("for checking user passwords")
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
