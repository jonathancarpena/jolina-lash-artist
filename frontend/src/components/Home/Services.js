import React from 'react'


// Icons
import { MdPhotoCamera } from 'react-icons/md'


function Services() {
    return (
        <div className='bg-rest flex flex-col'>


            {/* Lash Extensions */}
            <div className='flex w-full flex-col py-20 space-y-10 items-center md:px-16 md:space-x-10 md:space-y-0 md:flex-row md:justify-between lg:px-12  xl:px-[15rem] xl:py-32 '>
                {/* Image */}
                <div className='w-[300px] h-[300px] bg-white rounded-xl border-white flex justify-center items-center lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]'>
                    <MdPhotoCamera className='text-rest text-[5rem] lg:text-[7rem] xl:text-[10rem]' />
                </div>

                {/* Details */}
                <div className='flex flex-col space-y-5 px-10 md:px-0 md:w-[50%] xl:space-y-10 '>
                    <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                        Lash Extensions
                    </h2>
                    <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam atque quia eius aperiam consectetur voluptatibus et odio,
                        necessitatibus nobis, repudiandae sequi
                    </p>
                    <button className='block bg-primary-400 text-white font-semibold text-xl py-3 px-5 rounded-xl lg:w-[50%] xl:w-[300px]'>
                        Learn More
                    </button>
                </div>
            </div>

            {/* Lash Lifts */}
            <div className='bg-white flex w-full flex-col py-20 space-y-10 items-center md:px-16 md:space-x-10 md:space-y-0 md:flex-row md:justify-between lg:px-12 xl:px-[15rem] xl:py-32'>

                {/* Iphone View */}
                {/* Image */}
                <div className=' w-[300px] h-[300px] bg-rest rounded-xl border-white flex justify-center items-center sm:hidden'>
                    <MdPhotoCamera className='text-white text-[5rem] xl:text-[10rem]' />
                </div>

                {/* Details */}
                <div className='flex flex-col space-y-5 px-10 md:px-0 md:w-[50%] xl:space-y-10 '>
                    <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                        Lash Lifts
                    </h2>
                    <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam atque quia eius aperiam consectetur voluptatibus et odio,
                        necessitatibus nobis, repudiandae sequi
                    </p>
                    <button className='block bg-primary-400 text-white font-semibold text-xl py-3 px-5 rounded-xl lg:w-[50%] xl:w-[300px]'>
                        Learn More
                    </button>
                </div>

                {/* Ipad Mini, Ipad Pro, Desktop View */}
                {/* Image */}
                <div className='hidden w-[300px] h-[300px] bg-rest rounded-xl border-white justify-center items-center md:flex lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]'>
                    <MdPhotoCamera className='text-white text-[5rem] lg:text-[7rem] xl:text-[10rem]' />
                </div>

            </div>

            {/* Lash Fills */}
            <div className='flex w-full flex-col py-20 space-y-10 items-center md:px-16 md:space-x-10 md:space-y-0 md:flex-row md:justify-between lg:px-12 xl:px-[15rem] xl:py-32'>
                {/* Image */}
                <div className='w-[300px] h-[300px] bg-white rounded-xl border-white flex justify-center items-center lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]'>
                    <MdPhotoCamera className='text-rest text-[5rem] lg:text-[7rem] xl:text-[10rem]' />
                </div>

                {/* Details */}
                <div className='flex flex-col space-y-5 px-10 md:px-0 md:w-[50%] xl:space-y-10 '>
                    <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                        Lash Fills
                    </h2>
                    <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam atque quia eius aperiam consectetur voluptatibus et odio,
                        necessitatibus nobis, repudiandae sequi
                    </p>
                    <button className='block bg-primary-400 text-white font-semibold text-xl py-3 px-5 rounded-xl lg:w-[50%] xl:w-[300px]'>
                        Learn More
                    </button>
                </div>
            </div>

        </div >
    )
}

export default Services