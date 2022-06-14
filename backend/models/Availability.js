import pkg from "mongoose"
const { Schema, model, ObjectId } = pkg

// Example [
//     "Wed May 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Wed May 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 14 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
// ]

const timeSlot = new Schema({
    time: {
        type: String,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
})
const availabilitySchema = new Schema({
    day: {
        type: Date,
        required: false,
    },
    slots: {
        type: [timeSlot],
        required: true
    }

})

const Avaibility = model('avaibility', availabilitySchema)
export default Avaibility