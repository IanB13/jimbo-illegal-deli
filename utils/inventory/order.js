const Inventory = require("../../models/Inventory")
const Customer = require("../../models/Customer")
const Event = require("../../models/Events")
const updateCurrency = require("../inventory/updateCurrency")

//proccesses order, updates inventory and returns total price and currency code
//assumes USD if currency_code not provided
const orderProcessing = async (request) => {

    const { order , currency_code, uid } = request

    //gets an array with modified currency
    let invModCur = null
    if(currency_code){
        invModCur =  await updateCurrency({ code:currency_code })
    }
    else{
        invModCur = await updateCurrency({ code: "USD" })
    }

    //updates inventory
    await Promise.all(Object.entries(order).map( async (entry) => {
        const item = entry[0]
        const quantity = entry[1]
        const invItem = await Inventory.findOne({ item: item })
        //allows negative items, for "BackOrder"
        invItem.details.amount -= quantity
        await Inventory.updateOne({ item: item }, invItem)
    }))

    //gets prices in requested currency
    const ordersArrayModCur = Object.entries(order).map( (entry) => {
        const item = entry[0]
        const invItemCur = invModCur.filter(x => x.item=== item)[0]
        return invItemCur
    })

    //gets total cost
    const totalCost = ordersArrayModCur.reduce((acc,cur) => {
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
    // updates customer last_transaction
    await Customer.updateOne(
        { uid } ,
        { $push: { last_transactions: transactionObj } })

    // creates an order event
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