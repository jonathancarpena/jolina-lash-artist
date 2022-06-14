import React from 'react'


// Redux
import { useSelector } from 'react-redux';

// Router
import { Link } from 'react-router-dom'

// Import Swiper React components
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Image
// import Accent from '../../images/home/Hero/accent.png'
import Eyes1 from '../../images/home/Hero/eyes1.png'
import Eyes2 from '../../images/home/Hero/eyes2.png'
import Eyes3 from '../../images/home/Hero/eyes3.png'
import Eyes4 from '../../images/home/Hero/eyes4.png'
import Eyes6 from '../../images/home/Hero/eyes6.png'
import Eyes5 from '../../images/home/Hero/eyes5.png'


// Icons
import { FaHeart, FaArrowCircleRight, FaInstagram } from 'react-icons/fa'
import { RiEyeCloseLine } from 'react-icons/ri'



function Hero() {
    const { ready: available } = useSelector(state => state.available)

    return (
        <div className='pt-[5rem] px-8 bg-rest  flex flex-col  h-[100vh] overflow-hidden relative  lg:flex-row xl:px-36 xl:pt-[5rem]  lg:justify-between lg:items-center'>

            {/* Header */}
            <div className=' absolute top-[50%] -translate-y-[40%] left-[50%] -translate-x-[50%] w-full px-8 text-secondary flex flex-col justify-center items-center lg:items-start  lg:w-[50%] lg:relative lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0'>

                <h1 className='text-center font-design  font-black mb-10 text-5xl md:text-6xl lg:text-[5rem] lg:text-left'>
                    Stunning <span className='underline underline-offset-2 text-primary-400'>lashes</span> in the blink of an eye
                    <span className='inline-block'><RiEyeCloseLine className='inline-block ml-3' /> <FaHeart className='inline-block xl:text-[3rem]' /></span>
                </h1>
                {available
                    ? <Link to='/booking'>
                        <button className=' text-lg md:text-xl lg:text-2xl xl:text-3xl text-white flex justify-center items-center font-semibold space-x-2 bg-primary-400 px-10 py-3 xl:px-20 xl:py-5 rounded-full'>
                            <span>
                                Book an Appointment
                            </span>
                            <FaArrowCircleRight />
                        </button>
                    </Link>
                    :
                    <div className='flex flex-col space-y-4 xl:space-y-0 xl:flex-row items-center xl:space-x-5'>
                        <button className='  text-white flex   justify-center items-center  font-semibold bg-primary-400 w-full py-3 xl:px-20 xl:py-5 rounded-full'>
                            <span className='text-lg xl:text-[2rem]'>
                                Fully Booked
                            </span>
                        </button>
                        <a target="_blank" href={'https://www.instagram.com/j0lina.lashes/'} className=' mx-auto text-lg xl:text-xl font-semibold   ' rel="noopener noreferrer">
                            <span>Check Instagram for Updates</span>
                            <span className='inline-block  '>
                                <FaInstagram className='mr-1 inline-block' />j0lina.lashes
                            </span>
                        </a>
                    </div>

                }


            </div>



            {/*  */}
            {/* Image */}
            {/*  */}

            {/* Desktop View */}
            <div className='hidden xl:block'>
                <Swiper
                    className='w-[500px] absolute -top-[2rem] rounded-2xl h-[1300px] rotate-[15deg] right-[8rem]'
                    spaceBetween={0}
                    slidesPerView={4.7}
                    loop={true}
                    speed={1500}
                    freeMode={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                    direction={"vertical"}
                >
                    <SwiperSlide><img src={Eyes3} alt='eyes-3' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes2} alt='eyes-2' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes1} alt='eyes-1' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes4} alt='eyes-4' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes6} alt='eyes-6' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes5} alt='eyes-5' className=' object-contain' /></SwiperSlide>
                </Swiper>
            </div>

            {/* Ipad Pro View */}
            <div className='hidden lg:block xl:hidden'>
                <Swiper
                    className='h-[1500px] rotate-[15deg] -right-[8rem] w-[500px] absolute top-0 rounded-2xl '
                    spaceBetween={0}
                    slidesPerView={6}
                    loop={true}
                    speed={1500}
                    freeMode={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                    direction={"vertical"}
                >
                    <SwiperSlide><img src={Eyes3} alt='eyes-3' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes2} alt='eyes-2' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes1} alt='eyes-1' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes4} alt='eyes-4' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes6} alt='eyes-6' className=' object-contain' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes5} alt='eyes-5' className=' object-contain' /></SwiperSlide>
                </Swiper>
            </div>

            {/* Iphone Ipad Mini View */}
            <div className='absolute left-0 top-[7rem] md:top-[10rem] w-screen lg:hidden block'>
                <Swiper
                    direction='horizontal'
                    className='h-[120px] md:h-[150px] drop-shadow-sm opacity-80'
                    slidesPerView={2.5}
                    spaceBetween={0}
                    loop={true}
                    speed={2000}
                    freeMode={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                >
                    <SwiperSlide><img src={Eyes3} alt='eyes-3' className=' object-cover object-center' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes2} alt='eyes-2' className=' object-cover object-center' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes1} alt='eyes-1' className=' object-cover object-center' /></SwiperSlide>

                </Swiper>
            </div>

            <div className='absolute left-0 bottom-[2rem] md:bottom-[4rem] w-screen lg:hidden block'>
                <Swiper
                    direction='horizontal'
                    slidesPerView={2.5}
                    spaceBetween={0}
                    loop={true}
                    speed={2000}
                    freeMode={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                >
                    <SwiperSlide><img src={Eyes4} alt='eyes-4' className=' object-cover object-center' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes6} alt='eyes-6' className=' object-cover object-center' /></SwiperSlide>
                    <SwiperSlide><img src={Eyes5} alt='eyes-5' className=' object-cover object-center' /></SwiperSlide>
                </Swiper>
            </div>



        </div>
    )
}

export default Hero