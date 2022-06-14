import Booking from '../models/Booking.js'
import Availability from '../models/Availability.js'
import moment from 'moment'

// post_AddBooking,
// get_AllBookings,
// get_SingleBooking,
// delete_RemoveBooking,
// put_updateBooking,

// Public Access
export const post_AddBooking = async (req, res) => {
    console.log('POST: Add Booking')

    try {
        let newBody = {
            ...req.body
        }
        newBody["book_date"] = moment(req.body.book_date).toDate()

        // Updating Availability
        const allDates = await Availability.find()
        const formatDay = moment(req.body.book_date).format('YYYY-MM-DD')

        for (const date of allDates) {
            const formatDBDate = moment(date.day).format('YYYY-MM-DD')
            if (formatDBDate === formatDay) {
                const index = date.slots.findIndex((slot) => slot.time === req.body.time)
                if (date.slots[index].booked === true) {
                    return res.status(400).json({ message: 'Booked Already' })
                } else {
                    date.slots[index].booked = true
                    await Availability.findByIdAndUpdate(date._id, date)
                }

            }
        }

        const newBooking = await Booking.create({ ...newBody })

        return res.status(200).json(newBooking)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const get_AllBookings = async (req, res) => {
    console.log('GET: All Booking')
    try {
        const allBookings = await Booking.find()
        return res.status(200).json(allBookings)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const get_SingleBooking = async (req, res) => {
    console.log('GET: Single Booking')
    const { _id } = req.params
    try {
        const singleBooking = await Booking.findById(_id)
        return res.status(200).json(singleBooking)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
export const delete_RemoveBooking = async (req, res) => {
    console.log('DELETE: Delete Booking')
    const { _id } = req.params
    try {
        const booking = await Booking.findById(_id)

        const { book_date, time } = booking

        const yesterday = moment(Date.now()).subtract(1, 'd')
        const oldBooking = moment(book_date).isBefore(yesterday)

        let DateIsPresent = false
        let TimeSlotExist = false
        // Make Time Slot Available if Booking is Present
        if (!oldBooking) {
            const allDates = await Availability.find()
            const formatDate = moment(book_date).format('YYYY-MM-DD')

            for (const date of allDates) {
                const formatDBDate = moment(date.day).format('YYYY-MM-DD')

                if (formatDBDate === formatDate) {
                    DateIsPresent = true
                    for (const slot of date.slots) {
                        if (slot.time === time && slot.booked === true) {
                            TimeSlotExist = true
                            slot.booked = false
                            await Availability.findByIdAndUpdate(date._id, date)
                            await Booking.findByIdAndDelete(_id)
                        } else if (slot.time === time && slot.booked === false) {
                            TimeSlotExist = true
                            await Booking.findByIdAndDelete(_id)
                        }
                    }

                    if (!TimeSlotExist) {
                        await Booking.findByIdAndDelete(_id)
                    }
                }
            }

        } else {
            await Booking.findByIdAndDelete(_id)
        }

        if (!DateIsPresent) {
            await Booking.findByIdAndDelete(_id)
        }

        return res.status(200).json({
            message: "Successfully deleted.",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const put_updateBooking = async (req, res) => {
    console.log('PUT: Update Booking')
    const { _id } = req.params
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(_id, { ...req.body })
        return res.status(200).json(updatedBooking)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}









