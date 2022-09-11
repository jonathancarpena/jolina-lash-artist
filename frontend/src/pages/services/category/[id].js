import React, { useState, useEffect, useRef, useCallback } from 'react'

// Redux
import { useSelector } from 'react-redux'

// React Router
import { Link, useParams } from 'react-router-dom'

// API
import { get_SingleService } from '../../../lib/api'

// Components
import Loading from '../../../components/Admin/Loading'
import Image from '../../../components/Image'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Icons
import { FaInstagram, FaRegClock } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { MdPhotoCamera } from 'react-icons/md'

// Utils
import { generateDurationTime } from '..';

function SingleCategoryService() {
    const { ready: available } = useSelector(state => state.available)
    const { _id } = useParams()
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef(null)
    const mobileSliderRef = useRef(null)

    useEffect(() => {
        if (service === null) {
            get_SingleService(_id)
                .then(data => {
                    setService(data)
                })
        }
    }, [_id, service])


    useEffect(() => {
        if (service !== null) {
            setLoading(false)
        }
    }, [service])

    const handleSlide = useCallback((idx) => {
        if (!sliderRef.current) return;
        setActiveIndex(sliderRef.current.swiper.activeIndex)
        sliderRef.current.swiper.slideTo(idx);
    }, []);

    const handleMobileSlide = useCallback((idx) => {
        if (!mobileSliderRef.current) return;
        setActiveIndex(mobileSliderRef.current.swiper.activeIndex)
        mobileSliderRef.current.swiper.slideTo(idx);
    }, []);


    if (loading) {
        return <Loading />
    }
    return (
        <div className='relative min-h-screen flex flex-col pt-[8rem] md:pt-[12rem] md:px-20 md:pb-20 justify-center   lg:flex-row lg:space-x-[5rem] lg:pt-[19rem] lg:pb-28 lg:px-32'>
            {/* Breadcrumbs */}
            <div className='hidden text-xl absolute md:flex md:top-[8.5rem] md:left-[24.5rem] lg:top-[12rem] xl:top-[14rem] space-x-1 items-center'>
                <Link to='/services'>
                    Services
                </Link>
                <FiChevronRight className='inline-block text-2xl' />
                <Link to={`/services/${service.category}`} className='capitalize'>
                    {service.category}
                </Link>
                <FiChevronRight className='inline-block text-2xl' />
                <span className='capitalize font-semibold'>{service.name}</span>

            </div>


            {/* Image Slider */}
            {/* Ipad Mini, Ipad Pro, Desktop View */}
            <div className='hidden md:flex md:flex-col md:space-y-5 items-center xl:block md:mb-10 xl:mb-0'>
                <Swiper
                    onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                    ref={sliderRef}
                    className='w-[500px] h-[500px] rounded-2xl '
                    slidesPerView={1}
                    speed={300}
                >
                    {service.img.map((item, idx) => (
                        <SwiperSlide key={`${service.name}-image-${idx}`} className={` bg-neutral-300 flex items-center justify-center w-[500px] h-[500px] `}>
                            {item === ''
                                ? <MdPhotoCamera className='text-[10rem] text-white' />
                                : <Image src={item} alt={`big-${service.name}-${idx}`} />
                            }
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Mini Images */}
                <ul className='flex space-x-4 '>
                    {service.img.map((item, idx) => (
                        <div
                            key={`${service.name}-mini-image-${idx}`}
                            onClick={() => handleSlide(idx)}
                            className={`${activeIndex === idx ? 'ring-primary-400' : 'ring-transparent'} overflow-hidden cursor-pointer ring-4 bg-neutral-300 flex items-center justify-center w-[50px] h-[50px] rounded-lg`}>
                            {item === ''
                                ? <MdPhotoCamera className='text-[2rem] text-white' />
                                : <Image src={item} alt={`big-${service.name}-${idx}`} />
                            }
                        </div>
                    ))}
                </ul>

            </div>

            {/* Iphone View */}
            {/* Everything */}
            <div className='flex flex-col space-y-7 pb-12 md:hidden'>
                {/* Name */}
                <h1 className='font-bold text-3xl capitalize px-8 text-secondary'>
                    {service.name} {service.type && <span className='mr-2'>({service.type})</span>}
                    {service.category !== 'other' && <>
                        - <span className='italic'>
                            {service.category === 'mini-fill' ? 'mini' : service.category}
                        </span>
                    </>
                    }
                </h1>

                {/* Image */}
                <div className='px-8'>
                    <Swiper
                        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                        ref={mobileSliderRef}
                        className='w-full h-[300px] rounded-2xl  '
                        slidesPerView={1}
                        speed={300}
                    >
                        {service.img.map((item, idx) => (
                            <SwiperSlide key={`${service.name}-image-${idx}`} className={` bg-neutral-300 flex items-center justify-center w-[500px] h-[500px] `}>
                                {item === ''
                                    ? <MdPhotoCamera className='text-[10rem] text-white' />
                                    : <Image src={item} alt={`big-${service.name}-${idx}`} />
                                }
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Mini Images */}
                <ul className='flex space-x-4 px-8'>
                    {service.img.map((item, idx) => (
                        <div
                            key={`${service.name}-mini-image-${idx}`}
                            onClick={() => handleMobileSlide(idx)}
                            className={`${activeIndex === idx ? 'ring-primary-400' : 'ring-transparent'} overflow-hidden cursor-pointer ring-4 bg-neutral-300 flex items-center justify-center w-[50px] h-[50px] rounded-lg`}>
                            {item === ''
                                ? <MdPhotoCamera className='text-[2rem] text-white' />
                                : <Image src={item} alt={`big-${service.name}-${idx}`} />
                            }
                        </div>
                    ))}
                </ul>

                {/* Price & Service Time */}
                <div className='px-8'>
                    <h2 className='font-design font-bold text-3xl capitalize flex items-center space-x-3'>
                        <span>${service.price}</span>

                        {/* Service Time */}
                        <span className=' font-normal text-neutral-400 text-[1.2rem] flex space-x-2'>
                            <span>
                                Service<FaRegClock className='inline-block ml-1' /> :
                            </span>
                            <span>
                                {generateDurationTime(service.duration)}
                            </span>
                        </span>
                    </h2>
                </div>

                {/* Book an Appointment */}
                <>
                    {available
                        ? <Link to={`/booking`} state={{ selected: service }} className='px-8'>
                            <button className='py-4 w-full bg-white ring-4 ring-primary-400 font-semibold text-primary-400 text-lg rounded-xl'>
                                Book an Appointment
                            </button>
                        </Link>
                        : <div className='flex flex-col space-y-3 items-center px-8'>
                            <button disabled className='py-2 w-full bg-neutral-400 ring-4 ring-neutral-400 font-semibold text-white text-lg rounded-xl'>
                                Fully Booked
                            </button>
                            <a target="_blank" href={'https://www.instagram.com/j0lina.lashes/'} className='font-semibold flex items-center flex-col' rel="noopener noreferrer">
                                <span>Check Instagram for Updates</span>
                                <span className='flex items-center mx-2 '>
                                    <FaInstagram className='mr-1' />j0lina.lashes
                                </span>
                            </a>
                        </div>
                    }
                </>
            </div>

            {/* Iphone View Description & Method */}
            <div className='bg-rest px-8 flex flex-col space-y-5 py-10 rounded-t-2xl text-secondary md:hidden '>
                <div>
                    <span className='font-semibold text-xl'>
                        Description:
                    </span>
                    <p className='text-lg mt-1'>
                        {service.description}
                    </p>
                </div>

                <div>
                    <span className='font-semibold text-xl'>
                        Method:
                    </span>
                    <p className='text-lg mt-1'>
                        {service.method}
                    </p>
                </div>
            </div>

            {/* Ipad Mini, Ipad Pro, Desktop View */}
            {/* Details */}
            <div className='hidden md:flex flex-col space-y-5 items-start text-secondary'>

                {/* Name */}
                <h1 className='font-bold md:text-4xl lg:text-5xl xl:text-4xl capitalize'>
                    {service.name} {service.type && <span className='mr-2'>({service.type})</span>}
                    {service.category !== 'other' && <>
                        - <span className='italic'>
                            {service.category}
                        </span>
                    </>
                    }
                </h1>

                {/* Price */}
                <h2 className='font-design font-bold md:text-4xl lg:text-5xl xl:text-4xl capitalize flex space-x-3 items-baseline'>
                    <span>${service.price}</span>

                    {/* Service Time */}
                    <span className='flex items-center font-normal text-neutral-400 md:text-2xl lg:text-3xl xl:text-2xl'>
                        Service Time:
                        <span className='font-design ml-2 text-neutral-400 flex items-center '>
                            <FaRegClock className='inline-block mx-2' /> {generateDurationTime(service.duration)}
                        </span>
                    </span>

                </h2>

                {/* Booking */}
                <>
                    {available
                        ? <Link to={`/booking`} state={{ selected: service }}>
                            <button className='py-4 px-5 bg-white ring-4 ring-primary-400 font-semibold text-primary-400 text-lg rounded-xl'>
                                Book an Appointment
                            </button>
                        </Link>
                        : <div className='flex space-x-4 items-center'>
                            <button disabled className='py-4 px-5 bg-neutral-400 ring-4 ring-neutral-400 font-semibold text-white text-xl rounded-xl'>
                                Fully Booked
                            </button>
                            <a target="_blank" href={'https://www.instagram.com/j0lina.lashes/'} className='font-semibold flex items-center flex-col text-lg' rel="noopener noreferrer">
                                <span>Check Instagram for Updates</span>
                                <span className='flex items-center mx-2 '>
                                    <FaInstagram className='mr-1' />j0lina.lashes
                                </span>
                            </a>
                        </div>
                    }
                </>

                {/* Desktop View */}
                {/* Description & Method */}
                <div className='hidden bg-rest xl:flex flex-col space-y-5 rounded-xl p-5 mt-12 w-[700px]'>
                    <div>
                        <span className='font-semibold text-xl'>
                            Description:
                        </span>
                        <p className='text-lg'>
                            {service.description}
                        </p>
                    </div>
                    <div>
                        <span className='font-semibold text-xl'>
                            Method
                        </span>
                        <p className='text-lg'>
                            {service.method}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ipad Mini, Ipad Pro View */}
            {/* Description & Method */}
            <div className='hidden bg-rest md:flex xl:hidden flex-col space-y-5 rounded-xl p-8 mt-12'>
                <div>
                    <span className='font-semibold text-xl'>
                        Description:
                    </span>
                    <p className='text-lg'>
                        {service.description}
                    </p>
                </div>

                <div>
                    <span className='font-semibold text-xl'>
                        Method
                    </span>
                    <p className='text-lg'>
                        {service.method}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SingleCategoryService