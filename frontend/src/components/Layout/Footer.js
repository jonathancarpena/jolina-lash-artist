// React Router
import { Link } from 'react-router-dom'

// Components
import Brand from '../Brand'

// Icons
import { FaInstagram } from 'react-icons/fa'

const quickLinks = [
    { text: 'home', link: '/' },
    { text: 'about', link: '/about' },
    { text: 'book now', link: '/booking' },
    { text: 'after care', link: '/after-care' },
]

const supportLinks = [
    { text: 'terms & conditions', link: '/contact' },
    { text: 'contact us', link: '/contact' },
]

export const Socials = [
    {
        icon: <FaInstagram className='text-4xl text-white' />,
        link: 'https://www.instagram.com/j0lina.lashes/'
    },
]
function Footer() {

    return (
        <footer className='w-full bg-primary-500 flex justify-center items-center '>

            <div className='max-w-[1500px] w-full  py-16 px-12  z-10 '>
                {/* Links */}
                <div className=' flex flex-col space-y-12 lg:flex-row lg:space-y-0 lg:items-start lg:space-x-10 lg:justify-between mb-10'>
                    <Brand darkBg={true} />

                    {/* Quick Links */}
                    <div >
                        <h4 className='text-white font-bold text-3xl mb-6'>
                            Quick Links
                        </h4>
                        <ul className='flex flex-col space-y-5'>
                            {quickLinks.map((item) => (
                                <li key={item.text} className='text-white capitalize text-lg'>
                                    <Link to={item.link}>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div >
                        <h4 className='text-white font-bold text-3xl mb-6'>
                            Support
                        </h4>
                        <ul className='flex flex-col space-y-5'>
                            {supportLinks.map((item) => (
                                <li key={item.text} className='text-white capitalize text-lg'>
                                    <Link to={item.link}>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className='text-white font-bold text-3xl mb-6'>
                            Follow on Instagram
                        </h4>

                        <ul className='flex space-x-3'>
                            {Socials.map((item, idx) => (
                                <a key={`social-${idx}`} target="_blank" href={item.link} rel="noopener noreferrer">
                                    {item.icon}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>






        </footer>

    )
}

export default Footer