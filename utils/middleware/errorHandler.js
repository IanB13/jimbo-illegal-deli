const errorHandler = (error, _request, response, next) => {
    console.error(error.message)

    if (error.name === "Error") {
        return response.status(400).send({ error: error.message })
    }
    else if(error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = errorHandler