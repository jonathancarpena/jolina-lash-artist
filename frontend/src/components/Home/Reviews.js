// Images
import Review1 from '../../images/home/Reviews/review1.png'
import Review2 from '../../images/home/Reviews/review2.png'
import Review3 from '../../images/home/Reviews/review3.png'
import Review4 from '../../images/home/Reviews/review4.png'

// Import Swiper React components
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/effect-fade";

// Icons
import { FaHeart } from 'react-icons/fa'


const Content = [Review1, Review2, Review3, Review4]


function Reviews() {

    return (
        <div className=' bg-white  py-28 px-10 md:py-16 lg:p-32 xl:py-24'>

            {/* Header */}
            <h1 className='text-2xl text-secondary space-x-4 flex justify-center items-center font-bold uppercase text-center md:text-4xl  lg:text-5xl xl:mx-10 xl:space-x-10'>
                <FaHeart className='text-primary-400' />
                <span>Client Love </span>
                <FaHeart className='text-primary-400' />
            </h1>

            {/* Reviews */}
            {/* Desktop View */}
            <div className='hidden max-w-[80%] relative mx-auto mt-16 xl:block'>
                <Swiper
                    slidesPerView={3}
                    loop={true}
                    className={`rounded-2xl  overflow-hidden cursor-grab active:cursor-grabbing`}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {Content.map((item, idx) => (
                        <SwiperSlide key={`Reviews-${idx}`} className='overflow-hidden   relative'>
                            <img src={item} alt={item} className='h-[700px] object-cover  z-0' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Reviews */}
            {/* Iphone, Ipad Mini, Ipad Pro View */}
            <div className='block mt-5 md:mt-16 lg:mt-24 xl:hidden'>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    effect={"fade"}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Autoplay]}
                    className={`rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing`}
                >
                    {Content.map((item, idx) => (
                        <SwiperSlide key={`Mobile-Reviews-${idx}`} className='overflow-hidden   relative'>
                            <img src={item} alt={item} className='w-full h-[500px] object-cover z-0 md:h-[700px] lg:h-[976px]' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

    )
}

export default Reviews