const Inventory = require("../../models/Inventory")
const { ObjectID } = require("mongodb")
const getRates = require("../../services/currencyAPI")

/* code must exist, id or name but not both
updates inventory item or items currency
only updates if update is passed so code can be used for orders
without modifying db */
const updateCurrency = async (queryReq, update) => {
    const isInvalid = invalidCheck(queryReq)
    if(isInvalid){
        return isInvalid
    }
    const invToUpdate = await getUpdateArray(queryReq)
    const { code: newCurrencyCode, } = queryReq

    const rates = await getRates()

    const updatedInv = invToUpdate.map(obj => {
        const baseCurrencyCode = obj.supplier_details.base_currency_code
        const newRate = rates[newCurrencyCode]
        const oldRate = rates[baseCurrencyCode]
        const newPrice = obj.supplier_details.base_price * (newRate/oldRate)
        obj.details.currency_code = newCurrencyCode
        obj.details.price = Math.round(newPrice*100)/100
        return obj
    })

    //makes changes to db
    if(update){
        Promise.all( updatedInv.map( async (obj) => {
            await Inventory.updateOne(
                { _id: ObjectID(obj._id) },
                obj
            )
        }))

    }
    return updatedInv
}

//checks the input is valid
const invalidCheck = (queryReq) => {
    const {  code, id, item } = queryReq
    if(!code){
        return({ "invalid":"currency code must be provided" })
    }
    else if(!!id & !!item){
        return({ "invalid":" only one of id or item can be provided" })
    }
    else{
        return false
    }
}

//created an array of objects that require updating
const getUpdateArray = async (queryReq) => {
    const {  id, item } = queryReq

    let updateArray = []
    if(item || id ){
        if(item){
            const findObj = { item }
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