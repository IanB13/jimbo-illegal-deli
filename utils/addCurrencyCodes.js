const axios = require("axios")

//utilises  https://restcountries.eu/rest/v2 to create
//currency_code and base_price, base_currency_code for inventory objects

const addCurrencyCodes = async (inventory) => {
    //creates dictonary of elements to reduce redundant api calls
    const dict = await createCountryCurrencyDict(inventory)
    //updates inventory with new data
    const updatedInventory = inventory.map(inv => {
        inv.details.currency_code = dict[inv.supplier_details.country_code]
        inv.supplier_details.base_price = inv.details.price
        inv.supplier_details.base_currency_code = dict[inv.supplier_details.country_code]
        return inv
    })
    console.log(updatedInventory)
    return updatedInventory
}


//TODO: add error code
//maybe refactor axios stuff into seperate module
const findCurrencyCode = async (countryCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    return response.data.currencies[0].code //first in array is most common currency
}

//creates a unique list of counrty codes
const getCountryCodes = (inventory) => {
    const countryCodes = inventory.map(inv => inv.supplier_details.country_code)
    const countrySet = new Set(countryCodes)
    const countryCodesList =  Array.from(countrySet)
    return countryCodesList
}

const createCountryCurrencyDict = async (inventory) => {
    const countryCodes = getCountryCodes(inventory)

    const countryCurrencyArray = await Promise.all( countryCodes.map( async countryCode => {
        try{
            const currencyCode = await findCurrencyCode(countryCode)
            return({ countryCode,currencyCode })
        }
        catch{
            console.error("HELLO ERROR")
        }
    }))

    const countryDictonary = {}
    for(const pair of countryCurrencyArray){
        countryDictonary[pair.countryCode] = pair.currencyCode
    }
    return countryDictonary
}

module.exports = addCurrencyCodes
