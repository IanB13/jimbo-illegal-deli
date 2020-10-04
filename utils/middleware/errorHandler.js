const errorHandler = (error, _request, response, next) => {
    console.error(error.message)

    /*     console.log(error)
    console.log("error name is:")
    console.log(error.name)
 */
    if (error.name === "Error") {
        return response.status(400).send({ error: error.message })
    }
    else if(error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = errorHandler