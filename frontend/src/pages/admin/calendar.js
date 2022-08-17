import { useState, useEffect, forwardRef } from 'react'
import moment from 'moment'

// Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// API
import { get_AllBookings, post_AddDate, delete_RemoveDate, get_AllDates } from '../../lib/api'

// Icons
import { MdAttachMoney } from 'react-icons/md'
import { BsCalendar2EventFill } from 'react-icons/bs'


// Components
import Loading from '../../components/Admin/Loading'
import DatePicker from 'react-datepicker'


const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
    <button className="w-max bg-blue-500 text-white rounded-lg p-2" onClick={onClick} ref={ref}>
        Pick Date
    </button>
));

const TIMES = ["5:00 am", "5:30 am", "6:00 am", "6:30 am", "7:00 am", "7:30 am", "8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm", "9:30 pm", "10:00 pm", "10:30 pm"]

function Activity() {
    const { token } = useSelector(state => state.admin)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(moment(Date.now())._d)
    const [timesSelected, setTimesSelected] = useState(null)
    const [dates, setDates] = useState(null)
    const [bookings, setBookings] = useState(null)



    function checkIfTimeIsBooked(time) {
        const booking = dates.find((item) => {
            return moment(item.day).format('YYYY-MM-DD') === moment(selected).format('YYYY-MM-DD')
        })
        let booked;

        booking.slots.forEach((item) => {
            if (item.time === time) {
                booked = item.booked
            }
        })

        return booked
    }
    function handleAddTimeSelected(time) {
        if (checkIfTimeIsSelected(time)) {
            const filtered = timesSelected.filter(item => item.time !== time)

            if (checkIfTimeIsBooked(time)) {
                alert(`There is a booking here. Please delete or update booking before proceeding.`)

            } else {
                if (filtered.length === 0) {
                    const filteredDates = dates.filter((item) => {
                        return moment(item.day).format('YYYY-MM-DD') !== moment(selected).format('YYYY-MM-DD')
                    })
                    setDates([...filteredDates])
                }
                setTimesSelected([...filtered])
                delete_RemoveDate(token, { day: selected, time })
            }

        } else {
            const dayExist = dates.find((item) => {
                return moment(item.day).format('YYYY-MM-DD') === moment(selected).format('YYYY-MM-DD')
            })
            if (dayExist) {
                setTimesSelected([...timesSelected, { time: time, booked: false }])
                post_AddDate(token, { day: selected, time })
            } else {
                setDates([...dates, { day: selected, time }])
                setTimesSelected([...timesSelected, { time: time, booked: false }])
                post_AddDate(token, { day: selected, time })
            }

        }
    }

    function handleDateChange(e) {
        const formatNewDate = moment(e).format('YYYY-MM-DD')
        let timesAlready = []

        dates.forEach((item) => {
            const formatDate = moment(item.day).format('YYYY-MM-DD')
            if (formatNewDate === formatDate) {
                timesAlready = [...item.slots]
            }
        })

        setTimesSelected(timesAlready)
        setSelected(e)
    }

    function checkIfTimeIsSelected(time) {
        let result = false
        for (const slot of timesSelected) {
            if (slot.time === time) {
                result = true
            }
        }
        return result
    }

    function renderBooked(slot) {
        let number;
        let _id;
        const formatSelect = moment(selected).format('YYYY-MM-DD')
        bookings.forEach((item, idx) => {
            const formatBooking = moment(item.book_date).format('YYYY-MM-DD')

            if (formatSelect === formatBooking && item.time === slot.time) {
                number = idx + 1
                _id = item._id
            }
        })

        return (
            <Link to={`/admin/bookings/${number}/${_id}`} className='inline-block ml-2'>
                <span className='italic'>Booked</span>
            </Link>
        )

    }
    useEffect(() => {
        if (dates === null && bookings === null) {
            get_AllBookings(token)
                .then((data) => {
                    setBookings([...data])
                })

            get_AllDates(token)
                .then((data) => {
                    setDates([...data])
                })
        }

    }, [dates, bookings, token])

    useEffect(() => {
        if (timesSelected === null && dates) {
            const formatNewDate = moment(Date.now()).format('YYYY-MM-DD')
            let timesAlready = []

            dates.forEach((item) => {
                const formatDate = moment(item.day).format('YYYY-MM-DD')
                if (formatNewDate === formatDate) {
                    timesAlready = [...item.slots]
                }
            })
            setTimesSelected(timesAlready)
        }
    }, [timesSelected, dates])

    useEffect(() => {
        if (dates !== null && bookings !== null && timesSelected !== null) {
            setLoading(false)
        }
    }, [dates, bookings, timesSelected])


    const renderDayContents = (day, date) => {
        const calendarDate = moment(date).format('YYYY-MM-DD')
        let available = false
        dates.forEach((item) => {
            if (calendarDate === moment(item.day).format('YYYY-MM-DD')) {
                available = true
            }
        })
        if (available) {
            return (
                <span className='bg-green-500  text-white block '>
                    <MdAttachMoney className='text-base inline-block' />
                </span>
            )
        } else {
            return <span>{day}</span>
        }
    }


    if (loading) {
        return <Loading />
    }

    return (
        <div className='  font-design text-secondary '>
            <div className='bg-white rounded-xl pt-5 pb-7 px-5 drop-shadow-xl'>
                {/* Header */}
                <h1 className='text-secondary text-3xl mb-5'>
                    <BsCalendar2EventFill className='inline-block mb-2 mr-2' />
                    Calendar
                </h1>

                <div className='flex flex-0 flex-col md:flex-row '>
                    <div className='flex items-center md:items-start md:mr-5'>
                        <DatePicker
                            todayButton="Today"
                            minDate={moment(Date.now())._d}
                            selected={selected}
                            onChange={handleDateChange}
                            customInput={<CustomDateButton />}
                            renderDayContents={renderDayContents}
                        />
                        <span className='min-w-max md:hidden inline text-base font-semibold'>
                            {moment(selected).format('ddd.  MMM D, YYYY')}
                        </span>

                    </div>

                    <div className='flex flex-col space-y-3'>
                        <h2 className='hidden md:block text-2xl '>
                            {moment(selected).format('dddd MMM D, YYYY')}
                        </h2>


                        <ul className='grid  gap-5 bg-neutral-100 p-5 rounded-xl border-2 overflow-y-scroll h-[40vh] grid-cols-2 md:grid-cols-3 md:h-[70vh] lg:h-max xl:grid-cols-4'>
                            {TIMES.map((item) => (
                                <li key={item} onClick={() => handleAddTimeSelected(item)}>
                                    <button className={`
                                        ${checkIfTimeIsSelected(item) ? 'bg-blue-500 ring-blue-500 text-white' : 'bg-white ring-neutral-400'}
                                        ring-2 px-4 py-2 rounded-lg w-full font-semibold
                                        `}>
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='mt-5 md:ml-5 md:mt-0'>
                        <h2 className='text-xl md:text-2xl text-center '>
                            {timesSelected.length > 0
                                ? <span className='lg:underline lg:underline-offset-2 '>Available Times</span>
                                : 'Closed Today'
                            }
                        </h2>
                        {timesSelected.length > 0 &&
                            <ul className={`${timesSelected.length > 4 ? 'overflow-y-scroll h-[170px] md:h-[67vh] lg:h-max' : ''} bg-neutral-100 lg:bg-transparent p-3 rounded-lg flex flex-col space-y-3 mt-3`}>
                                {timesSelected.map((item) => (
                                    <li key={`available-at-${item.time}`} className='list-disc ml-5 text-lg lg:text-xl'>
                                        <span>{item.time} </span>
                                        {item.booked && renderBooked(item)}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity