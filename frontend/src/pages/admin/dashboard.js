import React, { useEffect, useState } from 'react'

// API
import { get_AllBookings, get_AllServices, get_AllDates } from '../../lib/api'

// Redux
import { useSelector } from 'react-redux'


// Components
import Bookings from '../../components/Admin/Dashboard/Bookings'
import Services from '../../components/Admin/Dashboard/Services'
import Loading from '../../components/Admin/Loading'

function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState(null)
    const [services, setServices] = useState(null)
    const [dates, setDates] = useState(null)

    const { token } = useSelector(state => state.admin)

    useEffect(() => {
        if (bookings === null && services === null && dates === null) {
            get_AllBookings(token)
                .then((data) => {
                    setBookings([...data])
                })

            get_AllDates(token)
                .then((data) => {
                    setDates([...data])
                })

            get_AllServices(token)
                .then((data) => {
                    setServices([...data])
                })
        }
    }, [token, bookings, services, dates])

    useEffect(() => {
        if (bookings !== null && services !== null && dates !== null) {
            setLoading(false)
        }
    }, [bookings, services, dates])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='  font-design text-secondary '>


            <div className='flex flex-col space-y-10'>
                <Bookings bookings={bookings} setBookings={setBookings} />
                <Services services={services} />
            </div>



        </div>
    )
}

export default Dashboard