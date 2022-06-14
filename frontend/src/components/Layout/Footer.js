import React, { useState, useEffect } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Components
import Brand from '../Brand'

// Icons
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'


const quickLinks = [
    { text: 'home', link: '/' },
    { text: 'about', link: '/about' },
    { text: 'book now', link: '/booking' },
    { text: 'after care', link: '/after-care' },
]

const supportLinks = [
    { text: 'terms & conditions', link: '/terms-and-conditions' },
    { text: 'contact us', link: '/contact' },
]

export const Socials = [
    {
        icon: <FaInstagram className='text-4xl text-white' />,
        link: 'https://www.instagram.com/j0lina.lashes/'
    },
    {
        icon: <FaTiktok className='text-4xl text-white' />,
        link: ''
    },
]
function Footer() {
    const [email, setEmail] = useState('')
    const [ready, setReady] = useState(false)

    function emailValidation(email) {
        const domainExt = ["com", "edu", "net", "org"]

        let valid = true;
        if (!(email.includes('@'))) {
            // Error: No '@'
            valid = false
        } else if (email.split('@')[1].split('.') === '') {
            // Error: @.com
            valid = false
        } else if (!(domainExt.includes(email.split('@')[1].split('.')[1]))) {
            // Error: .something
            valid = false
        }

        return valid
    }

    useEffect(() => {
        const okay = emailValidation(email)
        if (okay) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [email])

    function handleNewsletterSubmit(e) {
        e.preventDefault()
        if (email !== "" && ready) {
            alert(`See you soon!`)
        }

    }
    return (
        <div className='max-w-[1980px] w-full bg-primary-600 py-16 px-12  z-10 xl:px-80'>

            {/* Links */}
            <div className=' flex flex-col space-y-12 md:flex-row md:space-y-0 md:items-start md:space-x-10 md:justify-between mb-10'>
                <Brand isDarkBg />

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
                        Our Socials
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

    )
}

export default Footer