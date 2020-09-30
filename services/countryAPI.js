const axios = require("axios")

//uses country api, uses country code to find currency code
//TODO: add error code
const findCurrencyCode = async (countryCode) => {
    console.log("inside find currency code")
    console.log(countryCode)
    const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    console.log(response.data.currencies[0].code)
    return response.data.currencies[0].code //first in array is most common currency
}

module.exports = findCurrencyCode