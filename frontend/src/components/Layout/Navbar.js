// Router
import { useNavigate, useLocation, Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showMobileMenu, closeMobileMenu } from '../../redux/features/modal/modalSlice'

// Components
import Brand from '../Brand'

// Icons
import { MdMenu, MdOutlineClose } from 'react-icons/md'

// Constants
import { Socials } from './Footer'


const navLinks = [
    { text: 'about', link: '/about' },
    { text: 'contact', link: '/contact' },
    { text: 'services', link: '/services' },
    { text: 'book now', link: '/booking' },
]

const MobileMenu = () => {
    const { mobileMenu } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    function handleNavigate(link) {
        navigate(link)
        dispatch(closeMobileMenu())
    }
    return (
        <div className={`${mobileMenu ? 'translate-x-0' : 'translate-x-full'} transition-all ease-in-out duration-300 fixed inset-0 z-[150] h-screen bg-primary-500 flex flex-col text-white lg:hidden`}>
            <div className='flex items-center  justify-end absolute right-5 -top-2 h-[90px]'>
                <MdOutlineClose
                    onClick={() => dispatch(closeMobileMenu())}
                    className='cursor-pointer text-[2rem]'
                />
            </div>

            <div className='flex flex-col  items-center justify-center mt-[5rem]'>
                {navLinks.map((item, idx) => (
                    <div
                        key={`mobile-menu-${item.text}`}
                        onClick={() => handleNavigate(item.link)}
                        className={`cursor-pointer w-full text-center py-10 active:bg-accent-600`}>
                        <span className={`${pathname === item.link ? 'underline underline-offset-8' : ''} capitalize font-semibold text-5xl `}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
            <ul className='flex justify-center space-x-10 py-10'>
                {Socials.map((item, idx) => (
                    <a key={`social-${idx}`} target="_blank" href={item.link} rel="noopener noreferrer">
                        {item.icon}
                    </a>
                ))}
            </ul>

        </div>
    )
}


function Navbar() {
    const activeLinkStyles = 'text-white bg-primary-500'
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const dispatch = useDispatch()


    return (

        <>
            <nav className={` 
                  justify-center py-10 absolute top-5 
                font-body flex items-center w-[90%]  transition-all duration-300  max-w-[1980px] z-[90] 
            `}>

                {/* Nav Links */}
                <div className={`hidden lg:inline-block  w-full drop-shadow-lg`}>
                    <ul className={`   flex w-full justify-evenly bg-white rounded-r-full rounded-l-full `}>


                        {navLinks.slice(0, 2).map((item, idx) => (
                            <li onClick={() => navigate(item.link)} key={item.link}
                                className={`
                                ${idx === 0 ? 'rounded-l-full' : ''}
                                     w-[20%] flex items-center justify-center text-2xl cursor-pointer uppercase font-bold
                                     hover:bg-secondary hover:text-white hover:scale-105  transition-all ease-in-out duration-200
                                    ${pathname === item.link ? activeLinkStyles : 'text-primary-500'}
                             `}>
                                <Link to={item.link} >
                                    {item.text}
                                </Link>
                            </li>
                        )
                        )}


                        {/* Branding */}

                        <div className='w-[20%] flex justify-center'>
                            <Brand
                                darkBg={false}
                                onClick={() => navigate('/')}
                            />
                        </div>



                        {navLinks.slice(2, navLinks.length).map((item, idx) => (
                            <li onClick={() => navigate(item.link)} key={item.link}
                                className={`
                                ${idx === 1 ? 'rounded-r-full' : ''}
                                    w-[20%] flex items-center justify-center text-2xl cursor-pointer uppercase font-bold
                                    hover:bg-secondary hover:text-white hover:scale-105 transition-all ease-in-out duration-200
                                    ${pathname.includes(item.link) ? activeLinkStyles : 'text-primary-500'}
                            `}>
                                <Link to={item.link} >
                                    {item.text}
                                </Link>
                            </li>
                        )
                        )}

                    </ul>
                </div>



                {/* Mobile Nav */}

                <div className='lg:hidden fixed top-0 flex p-5  md:p-7 text-white items-center justify-between w-screen bg-primary-500 drop-shadow-lg '>
                    <Brand
                        mobile={true}
                        darkBg={true}
                        onClick={() => navigate('/')}
                    />
                    <MdMenu onClick={() => dispatch(showMobileMenu())} className='text-[2rem] cursor-pointer' />

                </div>
                <MobileMenu />
            </nav>
        </>
    )
}

export default Navbar