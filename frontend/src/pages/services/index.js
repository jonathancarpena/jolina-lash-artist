import React, { useEffect, useState } from 'react'

// Router
import { Link } from 'react-router-dom'

// API
import { get_AllServices } from '../../lib/api'

// Icons
import { FaRegClock } from 'react-icons/fa'

// Utils
import { replaceSpaces } from '../../lib/utils'

// Components
import Loading from '../../components/Admin/Loading'

export function generateDurationTime(duration) {
    const { start, end } = duration
    let a, b;

    function minsToHrs(hours) {
        return (hours / 60)
    }
    if (start < 60) {
        a = `${start} mins`
    } else if (start === 60) {
        a = `${minsToHrs(start)} hr`
    } else {
        a = `${minsToHrs(start)} hrs`
    }

    if (end < 60) {
        b = `${end} mins`
    } else if (start === 60) {
        b = `${minsToHrs(end)} hr`
    } else {
        b = `${minsToHrs(end)} hrs`
    }

    return (
        <>
            {a} - {b}
        </>
    )
}


function Services() {
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    useEffect(() => {
        // Fetch Todays Services
        if (content === null) {
            get_AllServices()
                .then(data => {
                    const full = data.filter((item) => item.category === "full")
                    const fill = data.filter((item) => item.category === "fill")
                    const mini = data.filter((item) => item.category === "mini-fill")
                    const other = data.filter((item) => item.category === "other")
                    setContent({
                        full: [...full],
                        fill: [...fill],
                        mini: [...mini],
                        other: [...other]
                    })
                })
        }
    }, [content])

    useEffect(() => {
        if (content !== null) {
            setLoading(false)
        }
    }, [content])




    if (loading) return <Loading />

    return (
        <div className='flex flex-col pt-[5rem] items-center justify-center lg:pb-28 lg:px-[8rem] lg:pt-[14rem]'>

            {/* Full */}
            <div className='lg:min-w-[1100px] px-5 flex flex-col space-y-10 py-10 rounded-t-2xl justify-center items-center md:p-20 lg:flex-row lg:p-10 lg:space-y-0 lg:space-x-20'>
                <Link to={`/services/full`} className='w-max md:w-full lg:w-max'>
                    <div className='bg-white w-[300px] h-[300px]  md:w-full md:h-[150px] lg:w-[300px] lg:h-[300px] flex items-center justify-center'>
                        <h1 className='font-bold text-5xl text-secondary'>
                            Full Set
                        </h1>
                    </div>
                </Link>

                <div>
                    <ul className='flex flex-col space-y-10 lg:space-y-7 xl:space-y-10'>
                        {content.full.map((item) => (
                            <li key={`full-${item.name}`} >
                                <Link to={`/services/full/${item.name}/${item._id}`} className='flex flex-col justify-center'>
                                    <p className='capitalize flex flex-col text-[1.8rem] md:text-[2rem] xl:flex-row xl:items-center xl:text-4xl'>
                                        <span className=''>
                                            {item.name} ({item.type}) -
                                            <span className='font-semibold ml-2'>
                                                ${item.price}
                                            </span>
                                        </span>


                                        <span className='font-design  text-neutral-400 flex items-center text-lg md:text-xl xl:text-2xl xl:ml-2'>
                                            <FaRegClock className='inline-block mb-0.5 mr-2 xl:mx-2' /> {generateDurationTime(item.duration)}
                                        </span>

                                    </p>

                                    <p className='text-lg md:text-xl xl:ml-2'>
                                        <span className='mr-1.5 hidden xl:inline-block'>
                                            -
                                        </span>
                                        {item.description}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Fill */}
            <div className='lg:min-w-[1100px]  px-5 bg-rest  flex flex-col space-y-10 py-10  rounded-t-2xl justify-center items-center md:p-20 lg:flex-row lg:p-10 lg:space-y-0 lg:space-x-20'>
                <Link to={`/services/fill`} className='w-max md:w-full lg:w-max'>
                    <div className='bg-white w-[300px] h-[300px]  md:w-full md:h-[150px] lg:w-[300px] lg:h-[300px] flex items-center justify-center'>
                        <h1 className='font-bold text-5xl text-secondary flex flex-col items-center'>
                            Fill
                            <span className='text-2xl font-design'>(2-3 Weeks)</span>
                        </h1>
                    </div>
                </Link>
                <div>
                    <ul className='flex flex-col space-y-10 lg:space-y-7 xl:space-y-10'>
                        {content.fill.map((item) => (
                            <li key={`full-${item.name}`} className='flex flex-col justify-center'>
                                <Link to={`/services/fill/${item.name}/${item._id}`} className='flex flex-col justify-center'>
                                    <p className='capitalize flex flex-col text-[1.8rem] md:text-[2rem] xl:flex-row xl:items-center xl:text-4xl'>
                                        <span className=''>
                                            {item.name} ({item.type}) -
                                            <span className='font-semibold ml-2'>
                                                ${item.price}
                                            </span>
                                        </span>
                                        <span className='font-design  text-neutral-400 flex items-center text-lg md:text-xl xl:text-2xl xl:ml-2'>
                                            <FaRegClock className='inline-block mb-0.5 mr-2 xl:mx-2' /> {generateDurationTime(item.duration)}
                                        </span>

                                    </p>

                                    <p className='text-lg md:text-xl xl:ml-2'>
                                        <span className='mr-1.5 hidden xl:inline-block'>
                                            -
                                        </span>
                                        {item.description}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mini */}
            <div className='lg:min-w-[1100px] px-5 flex flex-col  space-y-10 py-10 rounded-t-2xl justify-center items-center md:p-20 lg:flex-row lg:p-10 lg:space-y-0 lg:space-x-20'>
                <Link to={`/services/mini-fill`} className='w-max md:w-full lg:w-max'>
                    <div className='bg-white w-[300px] h-[300px]  md:w-full md:h-[150px] lg:w-[300px] lg:h-[300px] flex items-center justify-center'>
                        <h1 className='font-bold text-5xl text-secondary flex flex-col items-center'>
                            Mini Fill
                            <span className='text-2xl font-design'>(Every Week)</span>
                        </h1>
                    </div>
                </Link>

                <div>
                    <ul className='flex flex-col space-y-10 lg:space-y-7 xl:space-y-10'>
                        {content.mini.map((item) => (
                            <li key={`full-${item.name}`} >
                                <Link to={`/services/mini/${item.name}/${item._id}`} className='flex flex-col justify-center'>
                                    <p className='capitalize flex flex-col text-[1.8rem] md:text-[2rem] xl:flex-row xl:items-center xl:text-4xl'>
                                        <span>
                                            {item.name} ({item.type}) -
                                            <span className='font-semibold ml-2'>
                                                ${item.price}
                                            </span>
                                        </span>


                                        <span className='font-design  text-neutral-400 flex items-center text-lg md:text-xl xl:text-2xl xl:ml-2'>
                                            <FaRegClock className='inline-block mb-0.5 mr-2 xl:mx-2' /> {generateDurationTime(item.duration)}
                                        </span>
                                    </p>

                                    <p className='text-lg md:text-xl xl:ml-2'>
                                        <span className='mr-1.5 hidden xl:inline-block'>
                                            -
                                        </span>
                                        {item.description}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Other */}
            <div className='lg:min-w-[1100px] px-5 bg-rest  flex flex-col space-y-10 py-10 rounded-t-2xl justify-center items-center md:p-20 lg:flex-row lg:p-10 lg:space-y-0 lg:space-x-20'>
                <Link to={`/services/other`} className='w-max md:w-full lg:w-max'>
                    <div className='bg-white w-[300px] h-[300px]  md:w-full md:h-[150px] lg:w-[300px] lg:h-[300px] flex items-center justify-center'>
                        <h1 className=' text-center font-bold text-5xl text-secondary'>
                            Other Services
                        </h1>
                    </div>
                </Link>

                <div>
                    <ul className='flex flex-col space-y-10 lg:space-y-7 xl:space-y-10'>
                        {content.other.map((item) => (
                            <li key={`others-${item.name}`}>
                                <Link to={`/services/other/${replaceSpaces(item.name)}/${item._id}`} className='flex flex-col justify-center'>
                                    <p className='capitalize flex flex-col text-[1.8rem] md:text-[2rem] xl:flex-row xl:items-center xl:text-4xl'>
                                        <span>
                                            {item.name} -
                                            <span className='font-semibold ml-2'>
                                                ${item.price}
                                            </span>
                                        </span>


                                        <span className='font-design  text-neutral-400 flex items-center text-lg md:text-xl xl:text-2xl xl:ml-2'>
                                            <FaRegClock className='inline-block mb-0.5 mr-2 xl:mx-2' /> {generateDurationTime(item.duration)}
                                        </span>

                                    </p>

                                    <p className='text-lg md:text-xl xl:ml-2 lg:min-w-[700px]'>
                                        <span className='mr-1.5 hidden xl:inline-block'>
                                            -
                                        </span>
                                        {item.description}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div >
    )
}

export default Services