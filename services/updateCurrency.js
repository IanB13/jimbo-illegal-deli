/* updates inventory currency 
code is needed, and is the currency code
id and name are optional, but only one can be provided 
if an id or name id provided only the inventory item matching will be updated
otherwise all items will be updated
*/
const Inventory = require('../models/Inventory')
require('dotenv').config();
const ObjectId = require('mongodb').ObjectID
const axios = require('axios');
const { ObjectID } = require('mongodb');

//TODO: RENAME, finish update all version
//TODO: fix naming and add better comments
const updateCurrency = async ({ newRate, id, itemName }) => {
    console.log({ newRate, id, itemName })
    //TODO: CHECK IF VALID
    //code must exist, id or name but not both
    const api_key = process.env.FIXER_API_KEY
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${api_key}`)
    //Free key stuck in EUR, forces me to do basic math
    
    const rates = response.data.rates
    console.log( rates)
    console.log("new rate is" , rates[newRate])
    const actualNewRate = rates[newRate]
    
    if(itemName || id ){
       let updateObject = undefined
        if(itemName){
            const findObj = {item: itemName}
            const awitingObjext = await Inventory.find(findObj)
            updateObject = awitingObjext[0]
        }
        else{
            const mongoID = ObjectID(id)
            updateObject = await Inventory.findById(mongoID)
        }

        console.log(updateObject)
        const baseCurrencyCode = updateObject.supplier_details.base_currency_code
        console.log(baseCurrencyCode)
       const oldRate = rates[baseCurrencyCode]

        const newPrice = updateObject.details.price * (actualNewRate/oldRate)

        updateObject.details.currency_code = newRate
        updateObject.details.price = newPrice
        console.log(newPrice,newRate)
        
        await Inventory.updateOne(
            {_id:ObjectID(updateObject._id)},
            updateObject
            )
    }
    else{


    }

}


module.exports = updateCurrency