import Availability from '../models/Availability.js'
import moment from 'moment'

// get_AllDates,
// post_AddDate,
// put_updateAvailability,

// Admin Access
export const get_AllDates = async (req, res) => {
    console.log('GET: All Date')

    try {
        const allDates = await Availability.find()
        const yesterday = moment(Date.now()).subtract(1, 'd')

        const updatedDates = []
        for (const date of allDates) {
            const _ = moment(date.day)
            if (moment(date.day).isBefore(yesterday)) {
                await Availability.findByIdAndDelete(date._id)
            } else {
                updatedDates.push(date)
            }
        }

        function removeTodaysTimeSlots() {
            const today = moment(Date.now()).format('YYYY-MM-DD')
            const later = moment(Date.now()).add(1, 'hour')
            const currentTime = moment(later, 'h:mma')
            const copy = [...updatedDates]

            copy.forEach((item, idx) => {
                const formatDate = moment(item.day).format('YYYY-MM-DD')
                if (today === formatDate) {
                    const updateSlots = []
                    item.slots.forEach((slot) => {
                        const expired = moment(slot.time, 'h:mma').isBefore(currentTime)
                        if (!expired) {
                            updateSlots.push(slot)
                        }
                    })
                    item.slots = [...updateSlots]
                }
            })
            return copy
        }

        const fixedToday = removeTodaysTimeSlots()

        const lastUpdate = []
        for (const date of fixedToday) {
            if (date.slots.length === 0) {
                await Availability.findByIdAndDelete(date._id)
            } else {
                lastUpdate.push(date)
            }
        }


        return res.status(200).json(lastUpdate)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const post_AddDate = async (req, res) => {
    console.log('POST: Add Date')
    const { day, time } = req.body
    const formatDay = moment(day).format('YYYY-MM-DD')
    let dayExist = false
    try {
        const allDates = await Availability.find()
        for (const date of allDates) {
            const formatDBDate = moment(date.day).format('YYYY-MM-DD')
            if (formatDBDate === formatDay) {
                dayExist = true
                const timeSlotExist = date.slots.find((item) => item.time === time)
                if (!timeSlotExist) {
                    date.slots.push({ time: time, booked: false })
                    await Availability.findByIdAndUpdate(date._id, date)
                }
            }
        }


        if (!dayExist) {
            const newDay = {
                day: moment(day).toDate(),
                slots: [{ time }]
            }
            await Availability.create({ ...newDay })
        }
        return res.status(200)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
export const delete_removeDate = async (req, res) => {
    console.log('DELETE: Remove Date')
    const { day, time } = req.body
    const formatDay = moment(day).format('YYYY-MM-DD')
    try {
        const allDates = await Availability.find()

        for (const date of allDates) {
            const formatDBDate = moment(date.day).format('YYYY-MM-DD')
            if (formatDBDate === formatDay) {
                if (date.slots.length > 1) {
                    const filtered = date.slots.filter((item) => item.time !== time)
                    date.slots = [...filtered]
                    await Availability.findByIdAndUpdate(date._id, date)
                } else {
                    await Availability.findByIdAndDelete(date._id)
                }
            }
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

