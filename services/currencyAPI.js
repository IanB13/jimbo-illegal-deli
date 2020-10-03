const axios = require("axios")
const config = require("../utils/config")
const memoedRates = require("../resources/currency.json")

//using memoed rates to save api calls when not in prod.
const getRates = async () => {
    if (config.NODE_ENV === "production") {
        const FIXER_API_KEY = config.FIXER_API_KEY
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`)
        return response.data.rates
    }

    else return(memoedRates)
}

module.exports = getRates