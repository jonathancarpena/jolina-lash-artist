import { useEffect, useState } from 'react'

// Utils
import moment from 'moment'
import { toTitleCase } from '../../../lib/utils'

// API
import { put_UpdateBooking, get_AllBookings, delete_RemoveBooking } from '../../../lib/api'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link } from 'react-router-dom'

// Icons
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdAssignment, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

// Components
import Loading from '../../../components/Admin/Loading'



const StatusActions = ({ completed, handleDeleteBooking, _id, number }) => {
    const [toggle, setToggle] = useState(completed)
    const { token } = useSelector(state => state.admin)
    async function handleToggle(condition) {
        setToggle(condition)
        const body = {
            completed: condition
        }
        await put_UpdateBooking(token, _id, body)
    }

    return (
        <>
            <p className=''>
                <GrStatusGoodSmall className={`${toggle ? 'text-green-500' : 'text-red-500'} inline-block mr-2 mb-0.5`} />
                {toggle ? 'Completed' : 'Incomplete'}
            </p>
            <div className='text-neutral-700'>
                <button onClick={() => handleDeleteBooking(_id, number)}>
                    <MdDelete className='text-2xl mr-5 text-neutral-500 cursor-pointer hover:text-neutral-600' />
                </button>

                {toggle
                    ? <button onClick={() => handleToggle(false)}>
                        <MdCheckBox className='text-2xl text-green-500 cursor-pointer hover:text-green-600' />
                    </button>
                    : <button onClick={() => handleToggle(true)}>
                        <MdCheckBoxOutlineBlank className='text-2xl text-neutral-500 cursor-pointer hover:text-neutral-600' />
                    </button>
                }
            </div>
        </>
    )
}

function AdminBookings() {
    const DashHeaders = ['id', 'service', 'book date', 'time', 'customer', 'status', 'action']
    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState(null)
    const { token } = useSelector(state => state.admin)

    useEffect(() => {
        if (bookings === null) {
            get_AllBookings(token)
                .then((data) => {
                    setBookings([...data])
                })
        }
    }, [bookings, token])

    useEffect(() => {
        if (bookings !== null) {
            setLoading(false)
        }
    }, [bookings])

    async function handleDeleteBooking(_id) {
        const userConfirm = window.confirm(`Are you sure you want to remove this booking?`)
        if (userConfirm) {
            await delete_RemoveBooking(token, _id)
            const filteredBookings = bookings.filter((item) => item._id !== _id)
            setBookings([...filteredBookings])
        }
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div className='h-[85vh] max-h-[85vh]  font-design text-secondary '>

            <div className=' bg-white rounded-xl p-5 drop-shadow-xl min-h-full'>
                {/* Header */}
                <h1 className='text-secondary text-xl md:text-2xl lg:text-3xl mb-5'>
                    <MdAssignment className='inline-block mb-1' /> Bookings
                </h1>

                {bookings.length > 0 &&
                    <>
                        {/* List of Bookings */}
                        <div className='hidden bg-gray-100 rounded-b-xl md:flex flex-col overflow-x-scroll h-[76vh] xl:overscroll-x-none'>

                            <div className='bg-white w-max grid gap-5 border-b-2 py-2 px-4 grid-cols-[60px_repeat(6,_150px)]  xl:grid-cols-[60px_repeat(6,_1fr)] xl:w-full '>
                                {DashHeaders.map((item) => (
                                    <span key={item} className='uppercase '>
                                        {item}
                                    </span>
                                ))}
                            </div>


                            <div className={`${bookings.length > 10 ? 'overflow-y-scroll' : ''} w-max flex flex-col xl:w-full`}>
                                {bookings.map((item, idx) => {
                                    let lastChild = false
                                    if (idx === bookings.length - 1) {
                                        lastChild = true
                                    }
                                    return (

                                        <div className={`${lastChild ? '' : 'border-b-2'} gap-5 p-4 odd:bg-white even:bg-gray-100 grid grid-cols-[60px_repeat(6,_150px)]  xl:grid-cols-[60px_repeat(6,_1fr)]  `} key={item._id}>
                                            {/* ID */}
                                            <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                                <span># {idx + 1}</span>
                                            </Link>

                                            {/* Service */}
                                            <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                                <span className='capitalize'>
                                                    <span>{item.service.name}</span>
                                                    {item.service.category !== 'other' &&
                                                        <span className='ml-1 '>{toTitleCase(item.service.category)}</span>
                                                    }
                                                </span>
                                            </Link>

                                            {/* Book Date */}
                                            <span>{moment(item.book_date).format("MMM DD, YYYY")}</span>

                                            {/* Time */}
                                            <span>{item.time}</span>

                                            {/* Customer Name */}
                                            <span className='capitalize'>
                                                <span>{item.customer.first_name}</span>
                                                <span className='ml-1'>{item.customer.last_name.substring(0, 1)}</span>.
                                            </span>

                                            {/* Status and Action */}
                                            <StatusActions
                                                number={item.number}
                                                completed={item.completed}
                                                _id={item._id}
                                                handleDeleteBooking={handleDeleteBooking}
                                            />
                                        </div>

                                    )
                                })}
                            </div>

                        </div>
                    </>
                }

                {bookings.length > 0 &&
                    <>
                        {/* Mobile: List of Bookings */}
                        <div className={`${bookings.length > 9 ? 'overflow-y-scroll' : ''} text-sm rounded-b-xl bg-gray-100 flex flex-col  h-[76vh] overflow-x-scroll md:hidden`}>

                            {/* Headers */}
                            <div className='sticky top-0 w-max overflow-visible gap-5 border-b-2 py-2 px-4 bg-white grid grid-cols-[60px_repeat(6,_150px)]    '>
                                {DashHeaders.map((item) => (
                                    <span key={item} className='uppercase '>
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {bookings.map((element, idx) => {
                                let lastChild = false
                                if (idx === bookings.length - 1) {
                                    lastChild = true
                                }
                                return (
                                    <div className={`${lastChild ? '' : 'border-b-2'}  gap-5 p-4  odd:bg-white even:bg-gray-100 w-max grid grid-cols-[60px_repeat(6,_150px)]  xl:grid-cols-[60px_repeat(6,_1fr)]  xl:w-full`} key={element._id}>

                                        {/* ID */}
                                        <Link to={`/admin/bookings/${idx + 1}/${element._id}`}>
                                            <span>#{idx + 1}</span>
                                        </Link>

                                        {/* Service Name */}
                                        <Link to={`/admin/bookings/${idx + 1}/${element._id}`}>
                                            <span className='capitalize'>
                                                <span>{element.service.name}</span>
                                                {element.service.category !== 'other' &&
                                                    <span className='ml-1 '>{toTitleCase(element.service.category)}</span>
                                                }
                                            </span>
                                        </Link>

                                        {/* Book Date */}
                                        <span>{moment(element.book_date).format("MMM DD, YYYY")}</span>


                                        {/* Time */}
                                        <span>{element.time}</span>

                                        {/* Customer Name */}
                                        <span className='capitalize'>
                                            <span>{element.customer.first_name}</span>
                                            <span className='ml-1'>{element.customer.last_name.substring(0, 1)}</span>.
                                        </span>

                                        {/* Status and Actions */}
                                        <StatusActions
                                            completed={element.completed}
                                            _id={element._id}
                                            number={element.number}
                                            handleDeleteBooking={handleDeleteBooking}
                                        />
                                    </div>

                                )
                            })}
                        </div>
                    </>
                }


                {bookings.length === 0 &&
                    <h1 className='text-3xl absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]'>
                        No Bookings
                    </h1>
                }
            </div>



        </div>
    )
}

export default AdminBookings