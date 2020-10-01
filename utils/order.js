const Inventory = require("../models/Inventory")

const orderProcessing = async (request) => {
    const { order } = request
    const ordersArray = []
    for(const item of Object.entries(order)){
        const invItem = await Inventory.find({ item: item[0] })
        //allows negative items, for "BackOrder"
        invItem[0].details.amount -= item[1]
        await Inventory.updateOne({ item: item[0] }, invItem[0])
        ordersArray.push(invItem[0])
    }
    return ordersArray
}

module.exports = orderProcessing