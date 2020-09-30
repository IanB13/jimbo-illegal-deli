const axios = require("axios")

//TODO: add error code
const findCurrencyCode = async (countryCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    return response.data.currencies[0].code //first in array is most common currency
}

module.export = findCurrencyCode