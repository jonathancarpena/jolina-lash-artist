import dotenv from "dotenv"
dotenv.config()


// Models
import Admin from './models/Admin.js'
import Availability from './models/Availability.js'
import Booking from './models/Booking.js'
import Service from "./models/Service.js"

// Sample Data
import adminData from './data/sample/admin.js'
import availabilityData from './data/sample/availability.js'
import bookingData from './data/sample/bookings.js'
import serviceData from './data/sample/services.js'

// Utils
import { generateHashPassword } from './lib/utils.js'

// MongoDB Connect
import connectDB from './config/db.js'



connectDB()


async function createAdmin() {
    let updatedInfo = { ...adminData }
    updatedInfo.password = await generateHashPassword(updatedInfo.password)
    return updatedInfo
}


async function createBookings() {
    const populatedBookings = []
    const services = await Service.find()

    for (const booking of bookingData) {
        let populatedBooking = { ...booking }
        const service = services[Math.floor(Math.random() * services.length)];

        const serviceSchema = {
            _id: service._id,
            name: service.name,
            type: service.type,
            category: service.category,
            price: service.price,
            duration: { ...service.duration }
        }
        populatedBooking['service'] = serviceSchema
        populatedBookings.push(populatedBooking)
    }

    return populatedBookings

}


// Deletes Everything in Database
// Inputs default Data
const importData = async () => {

    try {
        // Deletes Everything
        console.log('CLEARING DB')
        await Admin.deleteMany({})
        await Availability.deleteMany({})
        await Booking.deleteMany({})
        await Service.deleteMany({})

        // Inserts default data
        console.log("CREATING ADMIN")
        const admin = await createAdmin()
        await Admin.insertMany([admin])

        console.log('INPUTTING AVAILABILITY')
        await Availability.insertMany([...availabilityData])

        console.log("INPUTTING SERVICES")
        await Service.insertMany([...serviceData])

        console.log("INPUTTING BOOKINGS")
        const bookings = await createBookings()
        await Booking.insertMany([...bookings])


        console.log('Data Import Success')
        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}


importData()
