import React, { useEffect, useState } from 'react'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Icons
import { RiChatSmile2Line } from 'react-icons/ri'


// Utils
import moment from 'moment'
import { toTitleCase } from '../../lib/utils'

function Success() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [onMount, setOnMount] = useState(false)

    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [navigate, state])

    useEffect(() => {
        if (!onMount) {
            setTimeout(() => {
                setOnMount(true)
            }, [1000])
        }
    }, [onMount])

    return (
        <div className='h-screen relative bg-white md:flex md:justify-center md:items-center md:bg-transparent md:top-10 xl:top-20'>

            <div className=' md:bg-white md:rounded-xl md:overflow-hidden md:drop-shadow-xl '>
                <div className='absolute w-max top-[35%] -translate-y-[50%] left-[50%] -translate-x-[50%] flex flex-col justify-center items-center md:relative md:top-0 md:left-0 md:translate-x-0 md:translate-y-0 md:w-full md:p-20 xl:p-16'>
                    <RiChatSmile2Line className=' text-[10rem] text-primary-500 inline-block xl:text-[15rem]' />
                    <h1 className='mt-3 font-bold text-secondary text-center text-2xl md:mt-5 md:text-3xl xl:text-5xl'>
                        Your Appointment is Set!
                    </h1>
                </div>

                <div className={`${onMount ? 'translate-y-0' : 'translate-y-full'} transition-all duration-200 ease-in-out absolute bottom-0 left-0 w-screen  py-14 bg-primary-400 rounded-t-[3rem] flex flex-col justify-center items-center space-y-5 md:space-y-3 md:py-10 md:items-start md:relative md:px-16 md:w-full`}>
                    <p className='text-2xl text-white flex flex-col items-center md:flex-row md:space-x-2 '>
                        <span>When:</span>
                        <span className='ml-1 font-design font-semibold'>
                            {moment(state.bookDate).format('dddd, MMM DD, YYYY')}
                        </span>
                    </p>
                    <p className='text-2xl text-white flex flex-col items-center md:flex-row md:space-x-2'>
                        <span>What I'm Getting:</span>
                        <span className='capitalize ml-1 font-design font-semibold'>
                            <span>{state.service.name}</span>
                            {state.service.type && <span className='ml-1.5'>({state.service.type})</span>}
                            <span className='ml-1.5 capitalize'>- {toTitleCase(state.service.category)}</span>
                        </span>
                    </p>

                    <Link to='/after-care'>
                        <p className='text-lg md:text-2xl text-white underline underline-offset-4'>
                            Review After Care Instructions Here
                        </p>
                    </Link>


                </div>
            </div>


        </div>
    )
}

export default Success