import moment from "moment"
// Example [
//     "Wed May 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Wed May 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 14 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
// ]

export default [
    {
        day: moment(Date.now()).toDate(),
        slots: [{ time: '9:00 am' }, { time: '2:30 pm' }]
    },
    {
        day: moment(Date.now()).add(3, 'd').toDate(),
        slots: [{ time: '9:00 am' }, { time: '2:30 pm' }]
    },
    {
        day: moment(Date.now()).add(1, 'w').toDate(),
        slots: [{ time: '9:00 am' }, { time: '2:30 pm' }]
    }
]