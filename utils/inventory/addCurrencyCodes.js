const findCurrencyCode = require("../../services/countryAPI")

//utilises  https://restcountries.eu/rest/v2 to create
//currency_code and base_price, base_currency_code for inventory objects

const addCurrencyCodes = async (inventory) => {
    //creates dictonary of country codes to currency codes to reduce redundant api calls
    const dict = await createCountryCurrencyDict(inventory)
    //updates inventory with new data
    const updatedInventory = inventory.map(inv => {
        inv.details.currency_code = dict[inv.supplier_details.country_code]
        inv.supplier_details.base_price = inv.details.price
        inv.supplier_details.base_currency_code = dict[inv.supplier_details.country_code]
        return inv
    })
    return updatedInventory
}

// creates a dictonary mapping country codes to their most used currency code
const createCountryCurrencyDict = async (inventory) => {
    const countryCodes = getCountryCodes(inventory)

    const countryCurrencyArray = await Promise.all( countryCodes.map( async countryCode => {
        const currencyCode = await findCurrencyCode(countryCode)
        return({ countryCode,currencyCode })
    }))

    const countryDictonary = {}
    for(const pair of countryCurrencyArray){
        countryDictonary[pair.countryCode] = pair.currencyCode
    }
    return countryDictonary
}

//creates a unique list of country codes from inventory items
const getCountryCodes = (inventory) => {
    const allCountryCodes = inventory.map(inv => inv.supplier_details.country_code)
    const countrySet = new Set(allCountryCodes)
    const countryCodes =  Array.from(countrySet)
    return countryCodes
}

module.exports = addCurrencyCodes
