const Customer = require("../../models/Customer")
const { ObjectID } = require("mongodb")

const helicopterDistance = async (query) => {
    const { latitude, longitude, id } = query
    const locationCords = { latitude,longitude }
    //uses mongo ObjectId to use findById
    const mongoID = ObjectID(id)
    const customer = await Customer.findById(mongoID)
    //find distance
    const distanceMeter = haversineDist(locationCords,customer.address.coordinates)
    const distanceMiles = Math.round(distanceMeter/1609.34) //converting to miles
    const distance ={
        meters : distanceMeter,
        miles : distanceMiles
    }

    return distance
}




//haversineDist
//function that gets distance between two points on globe
//from: http://www.movable-type.co.uk/scripts/latlong.html

const haversineDist = (coordinates1, coordinates2) => {
    const lng1 = coordinates1.longitude, lat1 = coordinates1.latitude
    const lng2 = coordinates2.longitude, lat2 = coordinates2.latitude
    const R = 6371e3 // radius of the earth in meters
    const φ1 = lat1 * Math.PI / 180 // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lng2 - lng1) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c // in metres
    return Math.round(d)
}

module.exports = { helicopter: helicopterDistance }