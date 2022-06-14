import React from 'react'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Router
import { Link } from 'react-router-dom'

// Icons
import { MdEdit } from 'react-icons/md'
import { BsGridFill } from 'react-icons/bs'

function ActiveServices({ services }) {
    const ServiceHeaders = ["name", "category", "price", "actions"]
    const SmallServiceHeaders = ["name", "category", "price"]

    return (
        <div className='h-[40vh] max-h-[40vh] bg-white rounded-xl p-5 drop-shadow-xl font-design text-secondary'>
            <h1 className=' text-secondary text-xl md:text-2xl lg:text-3xl mb-5'>
                <Link to='/admin/services'>
                    <BsGridFill className='inline-block mb-1' /> Services
                </Link>
            </h1>

            {/* Grid */}
            <div className=' flex-col hidden md:flex h-full'>

                <div className='grid grid-cols-4 gap-5 border-b-2 py-2 px-4'>
                    {ServiceHeaders.map((item) => (
                        <span key={item} className='uppercase '>
                            {item}
                        </span>
                    ))}
                </div>


                <div className={`${services.length > 4 ? 'overflow-y-scroll' : ''} flex flex-col  max-h-[70%]`}>
                    {services.map((item, idx) => {
                        let lastChild = false
                        if (idx === services.length - 1) {
                            lastChild = true
                        }
                        return (
                            <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100  grid grid-cols-4 gap-5 p-4 `} key={item._id}>
                                <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                    <span className='capitalize'>{item.name}</span>
                                    {item.type &&
                                        <span className='ml-1 capitalize'>({item.type})</span>
                                    }

                                </Link>
                                <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                    <span className='capitalize'>{item.category}</span>
                                </Link>
                                <span>${item.price}.00</span>

                                <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`} >
                                    <span className='flex items-center space-x-2'>
                                        <span>Edit</span>
                                        <MdEdit className='text-lg' />
                                    </span>
                                </Link>

                            </div>
                        )
                    })}
                </div>

            </div>

            {/* Small Grid */}
            <div className=' flex-col block md:hidden h-full text-sm'>

                <div className='grid grid-cols-3 gap-5 border-b-2 py-2 px-4 '>
                    {SmallServiceHeaders.map((item) => (
                        <span key={item} className='uppercase '>
                            {item}
                        </span>
                    ))}
                </div>


                <div className={`${services.length > 4 ? 'overflow-y-scroll' : ''} flex flex-col  max-h-[70%]`}>
                    {services.map((item, idx) => {
                        let lastChild = false
                        if (idx === services.length - 1) {
                            lastChild = true
                        }
                        return (
                            <div className={`${lastChild ? '' : 'border-b-2'} even:bg-gray-100  grid grid-cols-3 gap-5 p-4 `} key={item._id}>
                                <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                    <span className='capitalize'>{item.name}</span>

                                </Link>
                                <Link to={`/admin/services/${item.category}/${replaceSpaces(item.name)}/${item._id}`}>
                                    <span className='capitalize'>{item.category}</span>
                                </Link>
                                <span>${item.price}.00</span>



                            </div>
                        )
                    })}
                </div>

            </div>


        </div>
    )
}

export default ActiveServices