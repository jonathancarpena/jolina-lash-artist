import React, { useEffect, useState } from 'react'
import moment from 'moment'

// API
import { get_SingleBooking, put_UpdateBooking, delete_RemoveBooking } from '../../../lib/api/index'

// Router
import { useParams, useNavigate } from 'react-router-dom'

// Utils
import { toTitleCase } from '../../../lib/utils'
import { generateDurationTime } from '../../services'

// Icons
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdCheckBoxOutlineBlank, MdCheckBox, MdPerson, MdMail, MdPayment, MdDateRange, MdPhone } from 'react-icons/md'

// Components
import Loading from '../../../components/Admin/Loading'
import { useSelector } from 'react-redux'


const BookingStatus = ({ handleDeleteBooking, completed, setCompleted, _id, number }) => {
    const { token } = useSelector(state => state.admin)
    async function handleToggle(condition) {
        setCompleted(condition)
        const body = {
            completed: condition
        }
        await put_UpdateBooking(token, _id, body)
    }

    return (
        <div className='absolute top-[50%] -translate-y-[50%] right-5 flex space-x-2'>

            <MdDelete
                onClick={() => handleDeleteBooking(_id, number)}
                className='text-2xl text-neutral-500 hover:text-neutral-600 cursor-pointer'

            />
            {completed
                ? <button onClick={() => handleToggle(false)} className='flex items-center space-x-2'>
                    <MdCheckBox className='text-2xl text-green-500 cursor-pointer hover:text-green-600' />
                </button>
                : <button onClick={() => handleToggle(true)} className='flex items-center space-x-2'>

                    <MdCheckBoxOutlineBlank className='text-2xl text-neutral-500 cursor-pointer hover:text-neutral-600' />
                </button>
            }
        </div>
    )
}

const Details = ({ customer, placed, date, time }) => {

    return (
        <div>
            <h2 className='text-lg lg:text-2xl mb-4 border-b-2 w-max border-b-secondary'>
                Details
            </h2>

            <div className='flex flex-col space-y-2 text-neutral-700 '>

                <p className='flex items-center space-x-2 text-sm md:text-base lg:text-lg'>
                    <MdPerson className='inline-block text-sm md:text-base lg:text-lg' />
                    <span>{customer.first_name} {customer.last_name}</span>
                </p>
                {customer.phone &&
                    <p className='flex items-center space-x-2 text-sm md:text-base lg:text-lg'>
                        <MdPhone className='inline-block text-sm md:text-base lg:text-lg' />
                        <span>{customer.phone} </span>
                    </p>
                }

                <p className='flex items-center space-x-2 text-sm md:text-base lg:text-lg'>
                    <MdMail className='inline-block text-sm md:text-base lg:text-lg' />
                    <span>{customer.email} </span>
                </p>

                <p className='flex items-center space-x-2 text-sm md:text-base lg:text-lg'>
                    <MdPayment className='inline-block text-sm md:text-base lg:text-lg' />
                    <span className='md:inline-block hidden'>Appointment Placed on: {moment(placed).format('dddd MMM DD, YYYY')}</span>
                    <span className='md:hidden inline-block'>Appt. Placed on: {moment(placed).format('MMM DD, YYYY')}</span>
                </p>

                <p className='md:flex items-center space-x-2 text-sm md:text-base lg:text-lg hidden'>
                    <MdDateRange className='inline-block text-sm md:text-base lg:text-lg' />
                    <span className=''>Booked for: </span>
                    <span className='font-semibold underline-offset-4 underline'>
                        {moment(date).format('dddd MMM DD, YYYY')} - @{time}
                    </span>
                </p>

            </div>
            <p className='md:hidden items-center space-x-2 text-base flex flex-col mt-10 text-center space-y-2.5'>
                <span className=''>
                    <MdDateRange className='inline-block text-lg mb-1 mr-1' />
                    Booked for:
                </span>

                <span className='font-semibold '>
                    {moment(date).format('dddd MMMM DD, YYYY')}
                </span>
                <span className='font-semibold '>@{time}</span>


            </p>
        </div>
    )
}

const Service = ({ service }) => {
    const { name, type, category, price, duration } = service
    return (
        <div>
            <h2 className='text-lg lg:text-2xl mb-4 border-b-2 w-max border-b-secondary'>
                Service
            </h2>

            <div className='flex flex-col space-y-2 text-secondary '>
                <div className='flex space-x-2 text-sm md:text-base lg:text-lg'>
                    <span>Name: </span>
                    <p className='capitalize font-semibold'>
                        <span>
                            {name}
                        </span>
                        {type && <span className='ml-1'>({toTitleCase(type)})</span>}
                    </p>
                </div>

                <div className='flex space-x-2 text-sm md:text-base lg:text-lg'>
                    <span>Category: </span>
                    <p className='capitalize font-semibold'>{category}</p>
                </div>

                <div className='flex space-x-2 text-sm md:text-base lg:text-lg'>
                    <span>Price: </span>
                    <p className='capitalize font-semibold'>$ {price}</p>
                </div>

                <div className='flex space-x-2 text-sm md:text-base lg:text-lg'>
                    <span>Duration: </span>
                    <p className='capitalize font-semibold'>{generateDurationTime(duration)}</p>
                </div>

            </div>
        </div>
    )
}

function SingleBooking() {
    const { _id, number } = useParams()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [booking, setBooking] = useState(null)
    const [completed, setCompleted] = useState(null)

    const { token } = useSelector(state => state.admin)


    async function handleDeleteBooking(_id, number) {
        const userConfirm = window.confirm(`Are you sure you want to remove booking #${number}?`)
        if (userConfirm) {
            await delete_RemoveBooking(token, _id)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                navigate('/admin/bookings')
            }, [2000])
        }
    }

    useEffect(() => {
        if (booking === null) {
            get_SingleBooking(token, _id)
                .then((data) => {
                    setCompleted(data.completed)
                    setBooking(data)
                })
        }
    }, [booking, token, _id])

    useEffect(() => {
        if (booking !== null) {
            setLoading(false)
        }
    }, [booking])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='   font-design text-secondary '>
            <div className='bg-white rounded-xl pt-5 pb-7 px-5 drop-shadow-xl '>

                <div className='relative py-5 mx-5 border-b-2'>

                    {/* Booking Status */}

                    <BookingStatus
                        handleDeleteBooking={handleDeleteBooking}
                        _id={booking._id}
                        number={booking.number}
                        completed={completed}
                        setCompleted={setCompleted}
                    />

                    {/* Booking Number */}
                    <h1 className='text-secondary text-xl lg:text-3xl   flex items-center  '>
                        Booking #{number}
                        <GrStatusGoodSmall
                            className={`${completed ? 'text-green-500' : 'text-red-500'} inline-block text-xl ml-3 `}
                        />
                    </h1>
                </div>

                <div className='flex flex-col space-y-5 p-5'>
                    <Service service={booking.service} />
                    <Details
                        customer={booking.customer}
                        placed={booking.date_placed}
                        date={booking.book_date}
                        time={booking.time}
                    />
                </div>

            </div>
        </div>
    )
}

export default SingleBooking