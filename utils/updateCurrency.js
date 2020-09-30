/* updates inventory currency
code is needed, and is the currency code
id and name are optional, but only one can be provided
if an id or name id provided only the inventory item matching will be updated
otherwise all items will be updated
*/
const Inventory = require("../models/Inventory")
const { ObjectID } = require("mongodb")
const getRates = require("../services/currencyAPI")

//TODO: fix naming and add better comments
//TODO: CHECK IF VALID
//code must exist, id or name but not both
const updateCurrency = async (queryReq) => {
    const isInvalid = invalidCheck(queryReq)
    if(isInvalid){
        return isInvalid
    }
    const updateArray = await getUpdateArray(queryReq)
    const { code: newCurrencyCode, } = queryReq

    const rates = await getRates()
    const returnArray = []
    for(const obj of updateArray){
        const baseCurrencyCode = obj.supplier_details.base_currency_code
        const newRate = rates[newCurrencyCode]
        const oldRate = rates[baseCurrencyCode]
        const newPrice = obj.supplier_details.base_price * (newRate/oldRate)
        obj.details.currency_code = newCurrencyCode
        obj.details.price = Math.round(newPrice*100)/100
        await Inventory.updateOne(
            { _id: ObjectID(obj._id) },
            obj
        )
        returnArray.push(obj)
    }
    return returnArray
}

//checks the input is valid
const invalidCheck = (queryReq) => {
    const {  code, id, itemName } = queryReq
    if(!code){
        return({ "invalid":"currency code must be provided" })
    }
    else if(!!id & !!itemName){
        return({ "invalid":" only one of id or item can be provided" })
    }
    else{
        return false
    }
}


const getUpdateArray = async (queryReq) => {
    const {  code: newCurrencyCode, id, itemName } = queryReq
    console.log({ newCurrencyCode, id, itemName })
    let updateArray = []
    if(itemName || id ){
        if(itemName){
            const findObj = { item: itemName }
            const invObj = await Inventory.find(findObj)
            updateArray.push(invObj[0])
        }
        else{
            const mongoID = ObjectID(id)
            const invObj = await Inventory.findById(mongoID)
            updateArray.push(invObj)
        }
    }
    else{
        updateArray = await Inventory.find({})
    }

    return updateArray
}


module.exports = updateCurrency