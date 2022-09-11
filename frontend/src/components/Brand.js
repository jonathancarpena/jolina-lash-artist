

import { RiEye2Line, RiEyeCloseLine } from 'react-icons/ri'


function Brand({ nav = false, mobile = false, darkBg = false, onClick = null, sx, size = 'text-4xl' }) {

    return (
        <>
            {!mobile &&
                <div onClick={() => onClick()}
                    className={`
               w-max
                 flex justify-center items-center cursor-pointer ${sx} 
                 rounded-xl  py-2 relative flex flex-col 
                 `}>
                    <RiEyeCloseLine className={` ${!darkBg ? 'text-primary-500' : 'text-white'} left-[1.95rem] bottom-[2.45rem] rotate-180 absolute  z-[50] text-[2.2rem]`} />
                    <RiEye2Line className={` ${!darkBg ? 'text-primary-500' : 'text-white'} left-[1.8rem] absolute z-[50] text-[2.5rem]`} />
                    <span
                        className={`
                         ${!darkBg ? 'text-primary-500' : 'text-white'} 
                         font-body  text-[3rem] tracking-tight  z-[20]  px-2 rounded-xl  font-bold uppercase
                     `}>
                        Jolina
                    </span>
                </div >
            }

            {mobile &&
                <div onClick={() => onClick()}
                    className={`

                 flex justify-center items-center cursor-pointer ${sx} 
                 rounded-xl  relative flex flex-col scale-125 md:scale-150
                 `}>
                    <RiEyeCloseLine className={` ${!darkBg ? 'text-primary-500' : 'text-white'} left-[1.25rem] bottom-[1rem] rotate-180 absolute  z-[50] text-[1rem]`} />
                    <RiEye2Line className={` ${!darkBg ? 'text-primary-500' : 'text-white'} left-[1.1rem] absolute z-[50] text-[1.3rem]`} />
                    <span
                        className={`
                         ${!darkBg ? 'text-primary-500' : 'text-white'} 
                         font-body  text-[1.5rem] tracking-tight  z-[20]  px-2 rounded-xl  font-bold uppercase
                     `}>
                        Jolina
                    </span>
                </div >
            }

        </>


    )
}

export default Brand