const Customer = require("../../models/Customer")
const ObjectID = require("mongodb").ObjectID

//sorts customer transactions by date
const transactionSort = async () => {
    console.log("sort")
    const ordersToSort = await Customer.aggregate([{ $project:{ last_transactions:1 } }])
    await Promise.all(ordersToSort.map(async order => {
        const transactions = order.last_transactions
        transactions.sort((a,b) => a.date - b.date )
        await Customer.updateOne({ _id:ObjectID(order._id) }, { last_transactions: transactions })
    }))
    console.log("sorted orders")
}

module.exports = transactionSort