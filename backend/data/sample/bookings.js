import moment from "moment"

// Example {
//     date_placed: moment(Date.now()),
//     book_date: moment(Date.now()).add(1, 'week'),
//     customer: {
//         first_name: 'Maddy',
//         last_name: 'Bea',
//         email: 'meggymegs@email.com'
//         phone: 1234567890
//     },
//     time: '8:00Pm'
//     completed: false,
// },

export default [
    {
        date_placed: moment(Date.now()).toDate(),
        book_date: moment(Date.now()).add(1, 'w').toDate(),
        customer: {
            first_name: 'Maddy',
            last_name: 'Bea',
            email: 'meggymegs@email.com',
            phone: '1234567890'
        },
        time: '8:00 pm',
        completed: false,
    },
    {
        date_placed: moment(Date.now()).toDate(),
        book_date: moment(Date.now()).add(2, 'w').toDate(),
        customer: {
            first_name: 'John',
            last_name: 'Clark',
            email: 'meggymegs@email.com',
            phone: '1234567890'
        },
        time: '7:00 pm',
        completed: false,
    },
    {
        date_placed: moment(Date.now()).toDate(),
        book_date: moment(Date.now()).add(3, 'w').toDate(),
        customer: {
            first_name: 'Eduardo',
            last_name: 'Johnson',
            email: 'meggymegs@email.com',
            phone: '1234567890'
        },
        time: '6:00 pm',
        completed: false,
    },

]






