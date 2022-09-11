import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { FaArrowCircleRight } from 'react-icons/fa'

// Images
import lashExt from '../../images/services/extensions.jpg'
import lashLifts from '../../images/services/lift.jpg'
import lashFill from '../../images/services/fill.jpg'


function Services() {
    return (
        <div className=' flex flex-col'>


            {/* Lash Extensions */}
            <div className='bg-white flex justify-center items-center'>
                <div className='bg-white w-[90%] flex flex-col py-20 space-y-10 items-center md:px-5 md:space-y-0 md:flex-row md:space-x-20  justify-center  '>
                    {/* Image */}
                    <div className=' w-[340px] h-[340px] bg-white rounded-xl overflow-hidden  border-white flex justify-center items-center md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]'>
                        <img src={lashExt} alt="lash-extensions" className='object-cover w-full h-full' />
                    </div>

                    {/* Details */}
                    <div className='px-2 md:px-0 w-full flex flex-col space-y-5   md:w-[50%]  '>
                        <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                            Lash Extensions
                        </h2>
                        <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                            Eyelash extensions are cosmetic applications that enhance the length, curl, fullness, and thickness of natural eyelashes.
                        </p>
                        <Link to='/services/full' className='hover:bg-white hover:border-primary-500 hover:text-primary-500 hover:scale-105 active:scale-95 transition-all duration-150 border-4 border-primary-500 px-5 py-2 rounded-xl text-white  bg-primary-500  w-max  font-semibold lg:text-[1.5rem] '>
                            <span className='flex space-x-3 items-center'>
                                <span>
                                    See Details
                                </span>
                                <FaArrowCircleRight />
                            </span>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Lash Lifts */}
            <div className='hidden bg-rest md:flex justify-center items-center rounded-xl'>
                <div className=' w-[90%] flex flex-col py-20 space-y-10 items-center md:px-5 md:space-y-0 md:flex-row  justify-center space-x-20   '>

                    {/* Details */}
                    <div className='flex flex-col space-y-5 px-10 md:px-0 md:w-[50%] xl:space-y-10 '>
                        <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                            Lash Lifts
                        </h2>
                        <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                            A lash lift curls your lash from base to tip so that you can see the full length.
                            All lashes have a natural shape to them, so this process alters that shape via a
                            tiny curling rod and a lifting solution.
                        </p>
                        <Link to='/services/other' className='hover:bg-white hover:border-primary-500 hover:text-primary-500 hover:scale-105 active:scale-95 transition-all duration-150 border-4 border-primary-500 px-5 py-2 rounded-xl text-white  bg-primary-500  w-max  font-semibold lg:text-[1.5rem] '>
                            <span className='flex space-x-3 items-center'>
                                <span>
                                    See Details
                                </span>
                                <FaArrowCircleRight />
                            </span>
                        </Link>
                    </div>

                    {/* Ipad Mini, Ipad Pro, Desktop View */}
                    {/* Image */}
                    <div className='w-[340px] h-[340px] bg-white rounded-xl overflow-hidden  border-white flex justify-center items-center md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]'>
                        <img src={lashLifts} alt="lash-lifts" className='object-cover w-full h-full' />
                    </div>

                </div>
            </div>

            {/* Mobile: Lash Lifts */}
            <div className='md:hidden bg-rest flex justify-center items-center rounded-xl'>
                <div className='w-[90%] flex flex-col py-20 space-y-10 items-center  justify-center    '>

                    {/* Iphone View */}
                    {/* Image */}
                    <div className='w-[340px] h-[340px] bg-white rounded-xl overflow-hidden  border-white flex justify-center items-center '>
                        <img src={lashLifts} alt="lash-lifts" className='object-cover w-full h-full' />
                    </div>

                    {/* Details */}
                    <div className='flex flex-col space-y-5 px-4 w-full '>
                        <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                            Lash Lifts
                        </h2>
                        <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                            A lash lift curls your lash from base to tip so that you can see the full length.
                            All lashes have a natural shape to them, so this process alters that shape via a
                            tiny curling rod and a lifting solution.
                        </p>
                        <Link to='/services/other' className='hover:bg-white hover:border-primary-500 hover:text-primary-500 hover:scale-105 active:scale-95 transition-all duration-150 border-4 border-primary-500 px-5 py-2 rounded-xl text-white  bg-primary-500  w-max  font-semibold lg:text-[1.5rem] '>
                            <span className='flex space-x-3 items-center'>
                                <span>
                                    See Details
                                </span>
                                <FaArrowCircleRight />
                            </span>
                        </Link>
                    </div>


                </div>
            </div>


            {/* Lash Fills */}
            <div className='bg-white flex justify-center items-center'>
                <div className='bg-white w-[90%] flex flex-col py-20 space-y-10 items-center md:px-5 md:space-y-0 md:flex-row md:space-x-20  justify-center  '>
                    {/* Image */}
                    <div className='w-[340px] h-[340px] bg-white rounded-xl overflow-hidden  border-white flex justify-center items-center md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]'>
                        <img src={lashFill} alt="lash-fill" className='object-cover w-full h-full' />
                    </div>

                    {/* Details */}
                    <div className='w-full px-4 flex flex-col space-y-5  md:px-0 md:w-[50%] xl:space-y-10 '>
                        <h2 className='text-3xl font-semibold text-secondary lg:text-[2.5rem] xl:text-[4rem]'>
                            Lash Fills
                        </h2>
                        <p className='lg:text-[1.3rem] xl:text-[2rem]'>
                            A lash fill involves applying eyelash extensions on new hair growth (new lashes)
                            to give your lash line a full and refreshed lease on life.
                        </p>
                        <Link to='/services/fill' className='hover:bg-white hover:border-primary-500 hover:text-primary-500 hover:scale-105 active:scale-95 transition-all duration-150 border-4 border-primary-500 px-5 py-2 rounded-xl text-white  bg-primary-500  w-max  font-semibold lg:text-[1.5rem] '>
                            <span className='flex space-x-3 items-center'>
                                <span>
                                    See Details
                                </span>
                                <FaArrowCircleRight />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Services