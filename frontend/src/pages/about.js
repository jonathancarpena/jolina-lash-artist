
// Images
import Portrait from '../images/portrait.png'


function About() {

    return (
        <div className=' min-h-[100vh] relative pb-20 xl:pb-[17rem]'>



            <div className='z-[50] px-10 flex flex-col space-y-10 justify-center pt-[8rem]  items-center md:pt-[10rem] lg:pt-[14rem] lg:px-20 xl:flex-row xl:space-y-0 xl:px-32 xl:pt-[14rem] xl:space-x-24 '>
                {/* Image */}
                <div className='h-[400px] md:w-[400px] md:h-[600px] border-8 border-white drop-shadow-lg'>
                    <img src={Portrait} alt={'portrait'} className='w-full h-full object-cover' />
                </div>

                {/* Message */}
                <div className='flex flex-col items-center space-y-10 xl:w-[50%]  xl:items-start'>

                    <h1 className='block text-secondary font-bold text-5xl lg:text-6xl xl:hidden'>
                        - About Me -
                    </h1>
                    <h1 className='hidden xl:block text-secondary font-bold text-6xl'>
                        About Me
                    </h1>

                    <div className='flex flex-col space-y-2.5'>
                        <span className='text-xl lg:text-3xl font-semibold'>
                            - Who am is behing Jolina Lashes?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            I st
                        </p>
                    </div>

                    <div className='flex flex-col space-y-2.5'>
                        <span className='text-xl lg:text-3xl font-semibold'>
                            - How long have you been a lash artist?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Praesentium ipsa quisquam asperiores porro blanditiis aspernatur.
                            Nisi porro ratione,
                        </p>
                    </div>

                    <div className='flex flex-col space-y-2.5'>
                        <span className='text-xl lg:text-3xl font-semibold'>
                            - What made you want to start doing lashes?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Praesentium ipsa quisquam asperiores porro blanditiis aspernatur.
                            Nisi porro ratione,
                        </p>
                    </div>


                </div>
            </div>





        </div>
    )
}

export default About