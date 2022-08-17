import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { BsAward } from 'react-icons/bs'





function Credentials() {
    return (
        <div className=' py-20 relative flex flex-col bg-white  lg:h-screen xl:h-[92vh]  xl:flex-row xl:px-[15rem] xl:justify-around'>

            <div className='relative p-10 flex justify-center items-center z-10 md:p-20 lg:p-32 xl:p-0 xl:w-[40%] '>
                <BsAward className='text-[15rem] xl:text-[30rem] fill-secondary' />
            </div>

            <div className='flex flex-col px-10 justify-center space-y-5 text-secondary z-10 md:px-20 md:space-y-10 xl:px-0 xl:w-[50%]'>
                <h1 className=' text-[2rem] font-semibold text-primary-400  md:text-[3rem] lg:text-[5rem]'>
                    Be your own
                    kind of beautiful.
                </h1>

                <p className='text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem] xl:text-[2rem]'>
                    Every woman is perfect as she is, and we exist to enhance your confidence.
                    Our eyelash extensions can simplify your morning so you can focus on your
                    day ahead and feel absolutely amazing.
                </p>

                <Link to='/about' className='text-[1.2rem] text-primary-400 border-b-4 border-b-primary-400 w-max  font-semibold md:text-[1.5rem] lg:text-[2.5rem]  xl:text-[2rem]'>
                    Learn More
                </Link>
            </div>
        </div>
    )
}

export default Credentials