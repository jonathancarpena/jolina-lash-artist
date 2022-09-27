
// Images
import Portrait from '../images/portrait.jpg'


function About() {

    return (
        <div className=' min-h-[100vh] relative pb-20 xl:pb-[17rem]'>



            <div className='z-[50] px-10 flex flex-col space-y-10 justify-center pt-[8rem]  items-center md:pt-[10rem] lg:pt-[14rem] lg:px-20 xl:flex-row xl:space-y-0 xl:px-32 xl:pt-[14rem] xl:space-x-24 '>
                {/* Image */}
                <div className='h-[400px] md:w-[500px] md:h-[700px] border-8 border-white drop-shadow-lg'>
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
                            - Who is behind Jolina Lashes?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            Nice to meet you! My name is Jolina and I enjoy all things fashion from sneakers to dresses. I am currently enrolled as a student where I am studing to become a registered nurse.
                        </p>
                    </div>

                    <div className='flex flex-col space-y-2.5'>
                        <span className='text-xl lg:text-3xl font-semibold'>
                            - How long have you been a lash artist?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            {`I've been a lash artist since Sepetember 2019.`}
                        </p>
                    </div>

                    <div className='flex flex-col space-y-2.5'>
                        <span className='text-xl lg:text-3xl font-semibold'>
                            - What made you want to start doing lashes?
                        </span>
                        <p className='ml-3 lg:text-xl'>
                            {`Personally, it is incredibly fulfilling and satisfying 
                            seeing my clients eye lashes transform into something more 
                            beautiful. Although I am a busy student, I will always spare 
                            time for my clients to ensure they feel their best with their
                            amazing lashes.
                            `}
                        </p>
                    </div>


                </div>
            </div>





        </div>
    )
}

export default About