import pkg from "mongoose"
import moment from "moment"
const { Schema, ObjectId, model } = pkg

// Example {
//     date_placed: moment(Date.now()),
//     book_date: moment(Date.now()).add(1, 'week'),
//     time: '8:00Pm'
//     customer: {
//         first_name: 'Maddy',
//         last_name: 'Bea',
//         email: 'meggymegs@email.com'
//         phone: 1234567890
//     },
//     completed: false,
// },


const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    }
})

const DurationSchema = new Schema({
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    }
})
const ServiceSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: DurationSchema,
        required: true
    }
})
const bookingSchema = new Schema({
    date_placed: {
        type: Date,
        required: false,
        default: moment(Date.now()).toDate()
    },
    book_date: {
        type: Date,
        required: true,
    },
    service: {
        type: ServiceSchema,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    customer: {
        type: CustomerSchema,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
})

const Booking = model('booking', bookingSchema)
export default Booking