const bcrypt = require("bcrypt")
//auto generates user passwords
//Not anything close to a best practice
const addPasswords = async (customers) => {

    const passwordCustomers = await Promise.all(customers.map(async customer => {
        const password = `Iam${customer.fist_name}NOTBojim`
        const passwordHash = await bcrypt.hash(password, 10)
        customer.password = passwordHash
        return customer
    }))

    return passwordCustomers
}

module.exports = addPasswords