import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { FaArrowCircleRight } from 'react-icons/fa'


// Image
import Image from '../../images/certificate.jpg'



function Credentials() {
    return (
        <div className='bg-gradient-to-b from-primary-300 to-primary-500 drop-shadow-[0px_0px_10px_rgba(0,0,0,0.50)]   text-white rounded-xl py-20 relative flex flex-col items-center space-y-10 lg:space-y-0 lg:flex-row lg:px-[15rem] lg:justify-around'>

            <div className='w-[300px] h-[500px]  lg:w-[500px] lg:h-[700px] relative flex justify-center items-center z-10 rounded-xl overflow-hidden ring-8 ring-secondary '>
                <img src={Image} alt="certificate" className=' w-full h-full object-cover' />
            </div>

            <div className='flex flex-col px-10 justify-center space-y-5 text-secondary z-10 md:px-20 md:space-y-10 xl:px-0 xl:w-[50%]'>
                <h1 className='text-center ring-8 ring-secondary rounded-bl-[2rem]  rounded-tr-[2rem] p-5 bg-white text-[2rem] font-semibold text-primary-400  md:text-[3rem] lg:text-[5rem]'>
                    Be Your Best Self.
                </h1>

                <p className='text-[1.2rem] md:text-[1.5rem] lg:text-[2rem]  text-white font-bold'>
                    From Cutie to Vicious (and everything in between), as a certified lash artist with years of experience
                    I can guarantee that your eyes will look the best you've ever seen.

                </p>

                <Link to='/about' className='hover:bg-white hover:text-primary-500 hover:scale-105 active:scale-95 transition-all duration-150 px-5 py-2 rounded-xl  text-white border-4 border-white w-max  font-semibold lg:text-[1.5rem] '>
                    <span className='flex space-x-3 items-center'>
                        <span>
                            Learn More
                        </span>
                        <FaArrowCircleRight />
                    </span>

                </Link>
            </div>
        </div>
    )
}

export default Credentials