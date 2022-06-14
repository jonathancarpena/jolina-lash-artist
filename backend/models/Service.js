import pkg from "mongoose"
import moment from "moment"
const { Schema, model } = pkg

// Example {
//     name: Cutie,
//     type: Classic
//     category: full
//     price: 75,
//     duration: {
//          start: 60
//          end: 75
//      },
//      description: 'creates longer lengths...'
//      method: 'single extension applied...'
// }


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
        required: false,
        default: 'other'
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: DurationSchema,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    method: {
        type: String,
        required: false
    },
    img: {
        type: [String],
        default: ['', '', '']
    }
})

const Service = model('service', ServiceSchema)
export default Service