import React, { useEffect, useState } from 'react'

// API
import { get_AllServices, IMAGE_API } from '../../../lib/api'

// Utils
import { replaceSpaces } from '../../../lib/utils'
import { generateDurationTime } from '../../services'

// Router
import { Link } from 'react-router-dom'

// Icons
import { FaCamera } from 'react-icons/fa'


import { MdEdit } from 'react-icons/md'
import { BsGridFill } from 'react-icons/bs'


// Components
import Loading from '../../../components/Admin/Loading'


function AdminServices() {
    const ServiceHeaders = ["image", "name", "category", "service time", "price", "actions"]
    const [loading, setLoading] = useState(true)
    const [services, setServices] = useState(null)

    function countImages(images) {
        let count = 0;
        images.forEach((item) => {
            if (item !== '') {
                count += 1
            }
        })
        return count
    }
    useEffect(() => {
        if (services === null) {
            get_AllServices()
                .then(data => setServices([...data]))
        }
    }, [services])
    useEffect(() => {
        if (services !== null) {
            setLoading(false)
        }
    }, [services])

    if (loading) {
        return <Loading />
    }
    return (
        <div className='h-[79vh] max-h-[79vh]  font-design text-secondary '>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl'>

                <div className='flex justify-between items-center'>
                    <h1 className='text-secondary text-xl md:text-2xl lg:text-3xl mb-5'>
                        <BsGridFill className='inline-block mb-1' /> Services
                    </h1>
                </div>


                {/* Grid */}
                <div className=' hidden flex-col '>

                    <div className='grid grid-cols-6 gap-5 border-b-2 py-2 px-4 justify-items-start'>
                        {ServiceHeaders.map((item) => (
                            <span key={item} className='uppercase '>
                                {item}
                            </span>
                        ))}
                    </div>


                    <div className={`${services.length > 5 ? 'overflow-y-scroll' : ''} max-h-[70vh] flex flex-col `}>
                        {services.map((item, idx) => {
                            let lastChild = false
                            if (idx === services.length - 1) {
                                lastChild = true
                            }
                            return (
                                <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100  grid grid-cols-6 gap-5 p-4 justify-items-start`} key={item._id}>

                                    {/* Image */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>

                                        <span className='bg-neutral-400 w-[50px] h-[50px] flex justify-center items-center rounded-lg' >
                                            {countImages(item.img) > 0
                                                ? <span className='text-lg text-white'>{countImages(item.img)}</span>
                                                : <FaCamera className='text-white text-3xl' />
                                            }
                                        </span>

                                    </Link>

                                    {/* Name */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>{item.name}</span>
                                        {item.type &&
                                            <span className='ml-1 capitalize'>({item.type})</span>
                                        }
                                    </Link>

                                    {/* Category */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>{item.category}</span>
                                    </Link>

                                    {/* Service Time */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>{generateDurationTime(item.duration)}</span>
                                    </Link>


                                    {/* Price */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>${item.price}</span>
                                    </Link>


                                    {/* Actions */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <button className='flex items-center space-x-2'>
                                            <span>Edit</span> <MdEdit className='text-lg' />
                                        </button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/* Grid */}
                <div className='flex flex-col text-sm md:text-base lg:text-lg'>

                    <div className={`${services.length > 7 ? 'overflow-y-scroll' : ''} overflow-x-visible flex flex-col h-[75vh]`}>
                        <div className='sticky top-0 w-max  bg-white grid grid-cols-[70px_repeat(5,_150px)] gap-5 border-b-2 py-2 px-4 xl:grid-cols-[70px_repeat(5,_1fr)] xl:w-full'>
                            {ServiceHeaders.map((item) => (
                                <span key={item} className='uppercase '>
                                    {item}
                                </span>
                            ))}
                        </div>
                        {services.map((item, idx) => {
                            let lastChild = false
                            if (idx === services.length - 1) {
                                lastChild = true
                            }
                            return (
                                <div className={`${lastChild ? '' : 'border-b-2'} w-max odd:bg-white even:bg-gray-100 grid grid-cols-[70px_repeat(5,_150px)] gap-5 p-4 xl:grid-cols-[70px_repeat(5,_1fr)] xl:w-full`} key={item._id}>

                                    {/* Image */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='bg-neutral-400 w-[50px] h-[50px] max-w-[50px] flex justify-center items-center rounded-lg' >
                                            {countImages(item.img) > 0
                                                ? <span className='text-lg text-white'>{countImages(item.img)}</span>
                                                : <FaCamera className='text-white text-2xl' />
                                            }
                                        </span>
                                    </Link>

                                    {/* Name */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='flex  space-x-2 '>
                                            <span className='capitalize'>{item.name}</span>
                                            {item.type &&
                                                <span className='capitalize'>({item.type})</span>
                                            }
                                        </span>
                                    </Link>

                                    {/* Category */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>{item.category}</span>
                                    </Link>

                                    {/* Service Time */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>{generateDurationTime(item.duration)}</span>
                                    </Link>


                                    {/* Price */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <span className='capitalize'>${item.price}</span>
                                    </Link>


                                    {/* Actions */}
                                    <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                        <button className='flex items-center space-x-2'>
                                            <span>Edit</span> <MdEdit className='text-lg' />
                                        </button>
                                    </Link>


                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminServices