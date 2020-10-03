const Inventory = require("../../models/Inventory")
const addCurrencyCodes = require("./addCurrencyCodes")

//adds an item to the inventory
const createInventory = async (item) => {
    //TODO: Add data checking

    //adds currency codes
    const currencyItemArray = await addCurrencyCodes([item])
    const currencyItem = currencyItemArray[0]

    //Adds date if not included
    if(!currencyItem.details.last_purchased){
        currencyItem.details.last_purchased = Date.now()
    }
    await Inventory.create(currencyItem)
    return currencyItem
}

module.exports = createInventory