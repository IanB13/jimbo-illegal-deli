const Inventory = require("../models/Inventory")
const Customer = require("../models/Customer")
const Event = require("../models/Events")
const updateCurrency = require("../utils/updateCurrency")

const orderProcessing = async (request) => {
    const { order , currency_code, uid } = request

    //TODO: db calls, need new function
    //switches db to updated Currency => prolly not a best practice
    if(currency_code){
        await updateCurrency({ code:currency_code })
    }
    else{
        await updateCurrency({ code: "USD" }) //assumes USD if not currency_code provided
    }

    const ordersArray = []
    //update Inventory items
    for(const entry of Object.entries(order)){
        const item = entry[0]
        const quantity = entry[1]
        const invItem = await Inventory.findOne({ item: item })
        //allows negative items, for "BackOrder"
        invItem.details.amount -= quantity
        await Inventory.updateOne({ item: item }, invItem)
        ordersArray.push(invItem)

    }
    const totalCost = ordersArray.reduce((acc,cur) => {
        acc+=cur.details.price
        return acc
    },0)

    const code = currency_code?currency_code:"USD"
    const date = Date.now()

    const transactionObj = {
        date,
        amount: totalCost,
        currency_code: code
    }
    await Customer.updateOne(
        { uid } ,
        { $push: { last_transactions: transactionObj } })

    await Event.create({
        uid,
        date,
        order: {
            amount: totalCost,
            currency_code: code,
            items: order
        }

    })

    return transactionObj
}

module.exports = orderProcessing