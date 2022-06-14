import React, { useState, useEffect, useRef, useCallback } from 'react'

// Redux
import { useSelector } from 'react-redux'

// React Router
import { Link, useParams } from 'react-router-dom'

// API
import { get_SingleServiceByCategory, IMAGE_API } from '../../../lib/api'

// Components
import Loading from '../../../components/Admin/Loading'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Icons
import { FaRegClock, FaInstagram } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'

// Utils
import { generateDurationTime } from '..';
import { replaceSpaces } from '../../../lib/utils';

function SingleService() {
    const { ready: available } = useSelector(state => state.available)
    const { category } = useParams()
    const [loading, setLoading] = useState(true)
    const [services, setServices] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef(null)
    const mobileSliderRef = useRef(null)

    useEffect(() => {
        if (services === null) {
            get_SingleServiceByCategory(category)
                .then(data => {
                    setServices(data)
                })
        }
    }, [category, services])

    useEffect(() => {
        if (services !== null) {
            setLoading(false)
        }
    }, [services])

    const handleSlide = useCallback((idx) => {
        if (!sliderRef.current) return;
        setActiveIndex(idx)
        sliderRef.current.swiper.slideTo(idx);
    }, []);

    const handleMobileSlide = useCallback((idx) => {
        if (!mobileSliderRef.current) return;
        setActiveIndex(idx)
        mobileSliderRef.current.swiper.slideTo(idx);
    }, []);

    function generateServiceAbbrev(name) {
        let str = '';
        if (name.split(' ').length > 1) {
            const splitName = name.split(' ')
            splitName.forEach((item) => {
                str += item.substring(0, 1)
            })
        } else {
            str = name.substring(0, 1)
        }

        return str
    }


    if (loading) {
        return <Loading />
    }
    return (
        <div className='relative min-h-screen flex flex-col pt-[8rem] md:pt-[12rem] md:px-20 md:pb-20 lg:pt-[15rem] xl:flex-row xl:space-x-20 xl:pt-[18rem] xl:pb-28 xl:px-32'>
            {/* Breadcrumbs */}
            <div className='hidden text-xl absolute md:flex md:top-[8.5rem] md:left-20 lg:top-[12rem] xl:top-[14rem] space-x-1 items-center'>
                <Link to='/services'>
                    Services
                </Link>
                <FiChevronRight className='inline-block text-2xl' />
                <span className='capitalize font-semibold'>{category}</span>
            </div>

            {/* Image Slider */}
            {/* Ipad Mini, Ipad Pro, Desktop View */}
            <div className='hidden md:block md:mb-10 xl:mb-0'>
                <Swiper
                    onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                    ref={sliderRef}
                    className='w-[500px] h-[500px] rounded-2xl '
                    slidesPerView={1}
                    speed={300}
                >
                    {services.map((item, idx) => (
                        <SwiperSlide key={`${category}-image-${idx}`} className={` bg-neutral-300 flex items-center justify-center w-[500px] h-[500px] `}>
                            {services[idx].img[0] !== ""
                                ? <img src={`${IMAGE_API}/${services[idx].img[0]}`} alt={`${item.name}-image`} className='w-full h-full object-cover' />
                                : <span className='text-[10rem] text-white uppercase'>{generateServiceAbbrev(item.name)}</span>
                            }

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Iphone View */}
            {/* Everything */}
            <div className='flex flex-col space-y-7 pb-12 md:hidden'>

                {/* Name */}
                <div className='px-8'>
                    <h1 className='font-bold text-4xl capitalize'>
                        {category} Services
                    </h1>
                    <Link to={`/services/${category}/${replaceSpaces(services[activeIndex].name)}/${services[activeIndex]._id}`}>
                        <h2 className='font-bold text-2xl capitalize text-neutral-400'>
                            {services[activeIndex].name} {services[activeIndex].type && <span>({services[activeIndex].type})</span>}
                        </h2>
                    </Link>
                </div>

                {/* Image */}
                <div className='px-8'>
                    <Swiper
                        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                        ref={mobileSliderRef}
                        className='w-full h-[300px] rounded-2xl  '
                        slidesPerView={1}
                        speed={300}
                    >
                        {services.map((item, idx) => (
                            <SwiperSlide key={`${category}-image-${idx}`} className={` bg-neutral-300 flex items-center justify-center w-[500px] h-[500px] `}>
                                {services[idx].img[0] !== ""
                                    ? <img src={`${IMAGE_API}/${services[idx].img[0]}`} alt={`${item.name}-image`} className='w-full h-full object-cover' />
                                    : <span className='text-[10rem] text-white uppercase'>{generateServiceAbbrev(item.name)}</span>
                                }
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Variant */}
                <ul className='flex space-x-4 px-8'>
                    {services.map((item, idx) => (
                        <div
                            key={`${category}-mini-image-${idx}`}
                            onClick={() => handleMobileSlide(idx)}
                            className={`${activeIndex === idx ? 'ring-primary-400 bg-primary-400 text-white' : 'ring-transparent bg-neutral-300'} cursor-pointer ring-4  flex items-center justify-center w-[50px] h-[50px] rounded-lg`}>
                            <span className='uppercase'>{generateServiceAbbrev(item.name)}</span>
                        </div>
                    ))}
                </ul>

                {/* Price & Service Time */}
                <div className='px-8'>
                    <h2 className='font-design font-bold text-3xl capitalize flex items-center space-x-3'>
                        <span>${services[activeIndex].price}</span>

                        {/* Service Time */}
                        <span className=' font-normal text-neutral-400 text-[1.2rem] flex space-x-2'>
                            <span>
                                Service<FaRegClock className='inline-block ml-1' /> :
                            </span>
                            <span>
                                {generateDurationTime(services[activeIndex].duration)}
                            </span>
                        </span>
                    </h2>
                </div>

                {/* Book an Appointment */}
                <>
                    {available
                        ? <Link to={`/booking`} state={{ selected: services[activeIndex] }} className='px-8'>
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
                        {services[activeIndex].description}
                    </p>
                </div>

                <div>
                    <span className='font-semibold text-xl'>
                        Method:
                    </span>
                    <p className='text-lg mt-1'>
                        {services[activeIndex].method}
                    </p>
                </div>
            </div>

            {/* Desktop View */}
            {/* Details */}
            <div className='hidden md:flex flex-col space-y-5 items-start text-secondary'>

                {/* Name */}
                <div>
                    <h1 className='font-bold md:text-4xl lg:text-5xl xl:text-4xl capitalize'>
                        {category} Services
                    </h1>
                    <Link to={`/services/${category}/${replaceSpaces(services[activeIndex].name)}/${services[activeIndex]._id}`}>
                        <h2 className='font-bold md:text-2xl lg:text-3xl xl:text-2xl capitalize text-neutral-400'>
                            {services[activeIndex].name} {services[activeIndex].type && <span>({services[activeIndex].type})</span>}
                        </h2>
                    </Link>
                </div>

                {/* Price */}
                <h2 className='font-design font-bold md:text-4xl lg:text-5xl xl:text-4xl capitalize flex space-x-3 items-baseline'>
                    <span>${services[activeIndex].price}</span>

                    {/* Service Time */}
                    <span className='flex items-center font-normal text-neutral-400 md:text-2xl lg:text-3xl xl:text-2xl'>
                        Service Time:
                        <span className='font-design ml-2 text-neutral-400 flex items-center '>
                            <FaRegClock className='inline-block mx-2' /> {generateDurationTime(services[activeIndex].duration)}
                        </span>
                    </span>

                </h2>

                {/* Variants */}
                <ul className='flex md:space-x-4 lg:space-x-6 xl:space-x-4'>
                    {services.map((item, idx) => (
                        <div
                            key={`${category}-mini-image-${idx}`}
                            onClick={() => handleSlide(idx)}
                            className={
                                `${activeIndex === idx ? 'ring-primary-400 bg-primary-400 text-white font-bold' : 'ring-transparent bg-neutral-300'} 
                                cursor-pointer ring-4  flex items-center justify-center  rounded-lg md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[50px] xl:h-[50px]
                                `}>
                            <span className='uppercase lg:text-xl '>{generateServiceAbbrev(item.name)}</span>
                        </div>
                    ))}
                </ul>

                {available
                    ? <Link to={`/booking`} state={{ selected: services[activeIndex] }}>
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

                {/* Description & Method */}
                <div className='hidden bg-rest xl:flex flex-col space-y-5 rounded-xl p-5 mt-12'>
                    <div>
                        <span className='font-semibold text-xl'>
                            Description:
                        </span>
                        <p className='text-lg'>
                            {services[activeIndex].description}
                        </p>
                    </div>

                    <div>
                        <span className='font-semibold text-xl'>
                            Method
                        </span>
                        <p className='text-lg'>
                            {services[activeIndex].method}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ipad: Description & Method */}
            <div className='hidden bg-rest md:flex xl:hidden flex-col space-y-5 rounded-xl p-8 mt-12'>
                <div>
                    <span className='font-semibold text-xl'>
                        Description:
                    </span>
                    <p className='text-lg'>
                        {services[activeIndex].description}
                    </p>
                </div>

                <div>
                    <span className='font-semibold text-xl'>
                        Method
                    </span>
                    <p className='text-lg'>
                        {services[activeIndex].method}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SingleService