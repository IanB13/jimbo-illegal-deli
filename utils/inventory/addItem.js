const Inventory = require("../../models/Inventory")
const addCurrencyCodes = require("./addCurrencyCodes")

const createInventory = async (item) => {
    //TODO: Add data checking
    //TODO: Add auto Date

    //adds currency codes
    const currencyItemArray = await addCurrencyCodes([item])
    const currencyItem = currencyItemArray[0]
    await Inventory.create(currencyItem)
    return currencyItem
}

module.exports = createInventory