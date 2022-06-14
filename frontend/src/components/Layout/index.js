import React, { useEffect, useState } from 'react'

// Router
import { useLocation } from 'react-router-dom'


// Components
import Navbar from './Navbar'
import Footer from './Footer'
import AdminLayout from './Admin'


function Layout({ children }) {
    const [adminView, setAdminView] = useState(false)
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (location.pathname.includes('admin')) {
            setAdminView(true)
        } else {
            setAdminView(false)
        }
    }, [location])


    return (
        <div className='w-full  flex flex-col items-center bg-rest'>
            {adminView
                ? <>
                    <AdminLayout>
                        <div className={
                            `${location.pathname !== '/admin'
                                ? 'h-screen px-7 pt-24 md:pt-28 md:px-12 lg:pt-32 lg:px-20 xl:pt-28  '
                                : ''
                            } 
                           overflow-hidden w-full max-w-[1980px]  font-body
                            `}>
                            {children}
                        </div>
                    </AdminLayout>
                </>
                : <>
                    <Navbar />

                    <div className={`w-full max-w-[1980px] min-h-[91vh] font-body bg-neutral-100`}>
                        {children}
                    </div>
                    <Footer />

                    {/* <OrderSidedrawer /> */}


                </>
            }
        </div>


    )
}

export default Layout