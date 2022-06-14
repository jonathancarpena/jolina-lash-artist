import React, { useState } from 'react'

// Utils
import moment from 'moment'
import { toTitleCase } from '../../../lib/utils'

// API
import { delete_RemoveBooking, put_UpdateBooking } from '../../../lib/api'

// Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Icons
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdDelete, MdAssignment, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'


const StatusActions = ({ completed, handleDeleteOrder, _id, number, onlyStatus = false }) => {
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
            {!onlyStatus &&
                <div className='text-neutral-700'>
                    <button onClick={() => handleDeleteOrder(_id, number)}>
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
            }

        </>
    )
}

function Bookings({ bookings, setBookings }) {
    const DashHeaders = ['id', 'service', 'book date', 'time', 'customer', 'status', 'actions']
    const SmallDashHeaders = ['id', 'service', 'book date', 'time', 'status']
    const { token } = useSelector(state => state.admin)

    async function handleDeleteOrder(_id) {
        const userConfirm = window.confirm(`Are you sure you want to remove this booking?`)
        if (userConfirm) {
            await delete_RemoveBooking(token, _id)
            const filteredBookings = bookings.filter((item) => item._id !== _id)
            setBookings([...filteredBookings])
        }
    }

    return (

        <div className='h-[40vh] max-h-[40vh] bg-white rounded-xl p-5 drop-shadow-xl font-design '>
            <h1 className='text-secondary text-xl mb-3 md:text-2xl md:mb-4 lg:text-3xl lg:mb-5'>
                <Link to='/admin/bookings'>
                    <MdAssignment className='inline-block mb-1' /> Bookings
                </Link>
            </h1>


            {bookings.length > 0 &&
                <>
                    {/* Grid */}
                    < div className={`${bookings.length > 4 ? '' : 'bg-neutral-100'}  flex-col hidden  h-[84%] max-h-[85%] md:flex md:overflow-x-scroll xl:overscroll-x-none`}>

                        <div className='sticky top-0 gap-5 border-b-2 py-2 px-4 bg-white grid md:grid-cols-[60px_repeat(6,_150px)]  md:w-max xl:w-full  xl:grid-cols-[60px_repeat(6,_1fr)] '>
                            {DashHeaders.map((item) => (
                                <span key={item} className='uppercase '>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className={`${bookings.length > 4 ? 'overflow-y-scroll' : ''} md:w-max xl:w-full bg-white flex flex-col h-[85%] max-h-[85%]`}>
                            {bookings.map((item, idx) => {
                                let lastChild = false
                                if (idx === bookings.length - 1) {
                                    lastChild = true
                                }
                                return (
                                    <div className={`${lastChild ? '' : 'border-b-2'} md:w-max xl:w-full even:bg-gray-100 grid md:grid-cols-[60px_repeat(6,_150px)] xl:grid-cols-[60px_repeat(6,_1fr)] gap-5 p-4 `} key={item._id}>
                                        <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                            <span># {idx + 1}</span>
                                        </Link>
                                        <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                            <span className='capitalize'>
                                                <span>{item.service.name}</span>
                                                {item.service.category !== 'other' &&
                                                    <span className='ml-1 '>{toTitleCase(item.service.category)}</span>
                                                }
                                            </span>
                                        </Link>
                                        <span>{moment(item.book_date).format("MMM DD, YYYY")}</span>
                                        <span>{item.time}</span>
                                        <span className='capitalize'>
                                            <span>{item.customer.first_name}</span>
                                            <span className='ml-1'>{item.customer.last_name.substring(0, 1)}</span>.
                                        </span>
                                        <StatusActions
                                            number={item.number}
                                            completed={item.completed}
                                            _id={item._id}
                                            handleDeleteOrder={handleDeleteOrder}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </>
            }

            {bookings.length === 0 &&
                <h1 className='text-3xl absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]'>
                    No Bookings
                </h1>
            }

            {bookings.length > 0 &&
                <>
                    {/* Mobile Grid */}
                    < div className={`block md:hidden overflow-x-scroll  h-[85%] `}>

                        <div className='sticky top-0  w-max bg-white grid grid-cols-[50px_150px_150px_100px_150px] gap-5 border-b-2 py-2 px-4 '>
                            {SmallDashHeaders.map((item) => (
                                <span key={item} className='uppercase text-sm'>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className={`${bookings.length > 4 ? 'overflow-y-scroll bg-white' : 'overflow-y-hidden'} w-max  flex flex-col h-full text-sm `}>
                            {bookings.map((item, idx) => {
                                let lastChild = false
                                if (idx === bookings.length - 1) {
                                    lastChild = true
                                }
                                return (
                                    <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100 grid  grid-cols-[50px_150px_150px_100px_150px] gap-5 p-4 `} key={item._id}>
                                        <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                            <span># {idx + 1}</span>
                                        </Link>
                                        <Link to={`/admin/bookings/${idx + 1}/${item._id}`}>
                                            <span className='capitalize'>
                                                <span>{item.service.name}</span>
                                                {item.service.category !== 'other' &&
                                                    <span className='ml-1 '>{toTitleCase(item.service.category)}</span>
                                                }
                                            </span>
                                        </Link>
                                        <span>{moment(item.book_date).format("MMM DD, YYYY")}</span>
                                        <span>{item.time}</span>

                                        <StatusActions
                                            onlyStatus={true}
                                            number={item.number}
                                            completed={item.completed}
                                            _id={item._id}
                                            handleDeleteOrder={handleDeleteOrder}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </>
            }

        </div >

    )
}

export default Bookings