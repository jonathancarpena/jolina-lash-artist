import React, { useState, useEffect } from 'react'

// API
import { get_AllDates, get_AllServices, post_AddBooking } from '../../lib/api'

// Router
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Calendar from '../../components/Booking/Calendar';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Loading from '../../components/Admin/Loading'

// Utils
import { validateEmail } from '../../lib/utils';

// Redux
import { useSelector } from 'react-redux';

// Icons 
import { BsCalendarEvent, BsGridFill, BsFillPersonFill, BsInfoSquareFill } from 'react-icons/bs'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { FaCheck, FaInstagram, FaCcApplePay, FaPaypal, FaDollarSign } from 'react-icons/fa'
import { IoLogoVenmo } from 'react-icons/io5'
import { RiErrorWarningFill } from 'react-icons/ri'
import { MdOutlineSummarize } from 'react-icons/md'



const FormInput = ({ error, value, setValue, label, type = "text", placeholder }) => {
    function generateErrorMessage() {
        if (label.toLowerCase() === "first name" || label.toLowerCase() === "last name") {
            return "Min. 3 Characters."
        } else if (label.toLowerCase() === "email") {
            return "Invalid Email."
        } else {
            return "Please Provide an Input."
        }
    }
    return (
        <div className='flex flex-col justify-center space-y-1 w-full'>
            <label className={`text-neutral-700 text-base`} >
                <span className='capitalize flex items-center'>
                    {label}
                    {label.toLowerCase() === 'phone'
                        ? <span className='ml-1'>(Optional)</span>
                        : <span className=' text-red-500 ml-1 font-semibold'>*</span>}
                </span>
                {error &&
                    <span className='font-semibold text-sm text-red-500 ml-3'>
                        {generateErrorMessage()}
                    </span>
                }
            </label>
            {type === "text" &&
                <input
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='font-design ring-2 ring-neutral-400  p-3 text-lg rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-secondary'
                />
            }

            {type === "email" &&
                <input
                    placeholder={placeholder}
                    type={"email"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='font-design ring-2 ring-neutral-400  p-3 text-lg rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-sky-500 text-secondary'
                />
            }



        </div>
    )
}
const ContactInfo = ({ fName, setFName, lName, setLName, email, setEmail, phone, setPhone, errors }) => {

    return (
        <div className='flex flex-col space-y-5'>
            <form className='mx-5 grid gap-4 lg:grid-cols-2 lg:gap-8'>
                {/* First Name */}
                <FormInput
                    placeholder={'Jane'}
                    error={errors.fName}
                    value={fName}
                    setValue={setFName}
                    label={"First Name"}
                />
                {/* Last Name */}
                <FormInput
                    placeholder={'Doe'}
                    error={errors.lName}
                    value={lName}
                    setValue={setLName}
                    label={"Last Name"}
                />
                {/* Email */}
                <FormInput
                    type='email'
                    placeholder={'janedoe@gmail.com'}
                    error={errors.email}
                    value={email}
                    setValue={setEmail}
                    label={"Email"}
                />
                {/* Phone */}
                <FormInput
                    type='text'
                    placeholder={'3101234567'}
                    error={errors.phone}
                    value={phone}
                    setValue={setPhone}
                    label={"Phone"}
                />
            </form>
        </div>

    )
}

const DropdownHeader = ({ children }) => {
    return (
        <h2 className='font-semibold text-xl text-secondary flex items-center space-x-4 md:text-2xl lg:text-3xl xl:text-4xl'>
            {children}
        </h2>
    )
}
const DropdownContent = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}
const Dropdown = ({ children, defaultOpen = false, z = "z-0" }) => {
    const [open, setOpen] = useState(defaultOpen)

    function generateHeader() {
        const header = children.find((item) => item.type.name === "DropdownHeader")
        return (
            React.cloneElement(header)
        )
    }
    function generateContent() {
        const content = children.find((item) => item.type.name === "DropdownContent")
        return (
            React.cloneElement(content)
        )
    }

    return (
        <div className={`${open ? '' : 'overflow-hidden'} ${z} relative  text-secondary bg-white   lg:drop-shadow-md lg:rounded-xl xl:drop-shadow-lg `}>
            <div onClick={() => setOpen(!open)} className={`${open ? 'lg:border-b-2' : 'border-b-2 lg:border-b-0'} flex py-6 px-5 md:p-7 justify-between items-center cursor-pointer  lg:p-8`}>
                {generateHeader()}
                {open
                    ? <BiChevronUp className='inline-block text-[2rem]' />
                    : <BiChevronDown className='inline-block text-[2rem]' />
                }
            </div>

            <div className={`${open ? 'block' : 'hidden '}  lg:px-5 transition-all ease-in-out duration-200`}>
                {generateContent()}
            </div>
        </div>
    )
}


function Booking() {
    const navigate = useNavigate()
    const location = useLocation()
    const { ready: available } = useSelector(state => state.available)
    const [allServices, setAllServices] = useState(null)
    const [loading, setLoading] = useState(true)

    // Body 
    const [service, setService] = useState(location.state ? location.state.selected : null)
    const [bookDate, setBookDate] = useState(null)
    const [time, setTime] = useState(null)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [terms, setTerms] = useState(null)
    const [errors, setErrors] = useState({ fName: null, lName: null, email: null })
    const [availableDates, setAvailableDates] = useState(null)


    useEffect(() => {
        if (availableDates === null && allServices === null) {
            get_AllDates()
                .then((data) => {
                    if (data.length > 0) {
                        setBookDate(moment(data[0].day)._d)
                    }
                    setAvailableDates(data)
                })

            get_AllServices()
                .then(data => {
                    const full = data.filter((item) => item.category === "full")
                    const fill = data.filter((item) => item.category === "fill")
                    const mini = data.filter((item) => item.category === "mini-fill")
                    const other = data.filter((item) => item.category === "other")
                    setAllServices({
                        full: [...full],
                        fill: [...fill],
                        mini: [...mini],
                        other: [...other]
                    })
                })
        }
    }, [availableDates, allServices])
    useEffect(() => {
        if (availableDates !== null && allServices !== null) {
            setLoading(false)
        }
    }, [availableDates, allServices])


    function generateTime() {
        const formatBookDate = moment(bookDate).format('YYYY-MM-DD')
        let times;
        availableDates.forEach((item) => {
            const formatDate = moment(item.day).format('YYYY-MM-DD')
            if (formatBookDate === formatDate) {
                times = item.slots.filter((element) => element.booked === false)
            }
        })
        return times
    }
    function inputValidation(input, email) {
        let error = false
        if (input.length < 3) {
            error = true
        } else {
            if (email) {
                error = validateEmail(input)
            }
        }
        return error
    }
    function formValidate() {
        const copy = { ...errors }
        if (inputValidation(fName, false)) {
            copy['fName'] = true
        } else {
            copy['fName'] = false
        }

        if (inputValidation(lName, false)) {
            copy['lName'] = true
        } else {
            copy['lName'] = false
        }

        if (inputValidation(email, true)) {
            copy['email'] = true
        } else {
            copy['email'] = false
        }


        setErrors({ ...copy })

        const results = Object.values(copy).every((item) => item === false)
        return results
    }
    function quickValidate() {
        let result = true
        if (fName.length < 3) {
            result = false
        }

        if (lName.length < 2) {
            result = false
        }

        if (validateEmail(email)) {
            result = false
        }
        return result
    }
    async function handleSubmitBooking() {

        if (formValidate()) {
            const body = {
                service: {
                    _id: service._id,
                    name: service.name,
                    type: service.type,
                    category: service.category,
                    price: service.price,
                    duration: {
                        start: service.duration.start,
                        end: service.duration.end
                    }
                },
                book_date: moment(bookDate).toDate(),
                time: time,
                customer: {
                    first_name: fName,
                    last_name: lName,
                    email: email,
                    phone: phone
                },
            }

            const userConfirm = window.confirm('Does everything look correct?')
            if (userConfirm) {
                const res = await post_AddBooking(body)
                console.log(res)
                if (res) {
                    setLoading(true)
                    window.scrollTo(0, 0)
                    setTimeout(() => {
                        setLoading(false)
                        navigate(`/booking/success/${res._id}`, {
                            state: {
                                bookDate: res.book_date,
                                time: res.time,
                                customer: res.customer,
                                service: res.service
                            }
                        })
                    }, [5000])
                }
            }


        }
    }
    function handleSetSelected(e) {
        setBookDate(e)
        setTime(null)
    }
    function handleServiceCheck(e) {
        const value = JSON.parse(e.target.value)

        if (service === null) {
            setService(value)
        } else {
            if (value._id === service._id) {
                setService(null)
            }
        }
    }


    if (!available) {
        return (
            <div className='min-h-screen text-secondary text-center'>
                <div className='absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] flex items-center justify-center flex-col space-y-5'>
                    <h1 className='font-bold text-5xl  '>
                        Fully Booked
                    </h1>
                    <h2 className='text-2xl font-semibold flex flex-col items-center'>
                        <span>Check Instagram for Updates</span>
                        <a target="_blank" href={'https://www.instagram.com/j0lina.lashes/'} rel="noopener noreferrer">
                            <span className='flex items-center mx-2 underline underline-offset-2'>
                                <FaInstagram className='mr-1' />j0lina.lashes
                            </span>
                        </a>
                    </h2>
                </div>
            </div>
        )
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='min-h-screen bg-white flex flex-col pt-[5rem] md:pt-[6rem] lg:bg-transparent lg:pt-[14rem] lg:space-y-5 lg:px-20 xl:px-32 xl:pb-20'>


            {/* Service */}
            <Dropdown z={'z-[30]'}>
                {/* Header */}
                <DropdownHeader>
                    <BsGridFill />
                    <span>Service:</span>
                    {service
                        ? <p className='capitalize select-none font-design font-bold mt-1 text-base text-primary-800 lg:mt-0  md:text-2xl lg:text-3xl  xl:text-4xl'>
                            {service.name} {service.type &&
                                <span>
                                    ({service.type}) - {service.category === 'mini-fill' ? 'mini' : service.category}
                                </span>}
                        </p>
                        : <p className='text-neutral-400 select-none text-base md:text-lg lg:text-xl '>(Choose Below)</p>
                    }
                </DropdownHeader>
                {/* Content */}
                <DropdownContent>
                    <div className='px-2 pb-5 select-none border-b-2 md:px-10 md:grid md:grid-cols-2 lg:px-0 lg:gap-2 lg:py-5  lg:border-b-0 '>

                        <div className='flex flex-col lg:space-y-10 '>
                            {Object.keys(allServices).slice(0, 2).map((item) => (
                                <div key={`service-${item}`} className='p-4 lg:p-5'>
                                    <p className='text-2xl lg:text-3xl font-semibold mb-3 capitalize'>
                                        {item === 'mini'
                                            ? 'mini fill'
                                            : (item === 'other'
                                                ? 'other services'
                                                : item
                                            )
                                        }
                                    </p>
                                    <ul className='flex flex-col space-y-3 '>
                                        {allServices[item].map((item, idx) => (
                                            <div key={`${item}-service-${idx}`} className='flex space-x-3 items-center'>
                                                <input
                                                    id={`service-${item._id}`}
                                                    value={JSON.stringify(item)}
                                                    type='checkbox'
                                                    onChange={(e) => handleServiceCheck(e)}
                                                    checked={service !== null && item._id === service._id}
                                                    disabled={service !== null && item._id !== service._id}
                                                />
                                                <label
                                                    htmlFor={`service-${item._id}`}
                                                    className={
                                                        `${service !== null ? (item._id !== service._id ? 'text-neutral-400' : 'font-semibold') : ''} 
                                                        capitalize text-lg lg:text-xl
                                                    `}>
                                                    {item.name} {item.type && <span>({item.type})</span>} -
                                                    <span className='ml-2 font-design'>${item.price}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col lg:space-y-10 '>
                            {Object.keys(allServices).slice(2, allServices.length).map((item) => (
                                <div key={`service-${item}`} className='p-5'>
                                    <p className='text-2xl lg:text-3xl font-semibold mb-3 capitalize'>
                                        {item === 'mini'
                                            ? 'mini fill'
                                            : (item === 'other'
                                                ? 'other services'
                                                : item
                                            )
                                        }
                                    </p>
                                    <ul className='flex flex-col space-y-3 '>
                                        {allServices[item].map((item, idx) => (
                                            <div key={`${item}-service-${idx}`} className='flex space-x-3 items-center'>
                                                <input
                                                    id={`service-${item._id}`}
                                                    value={JSON.stringify(item)}
                                                    type='checkbox'
                                                    onChange={(e) => handleServiceCheck(e)}
                                                    checked={service !== null && item._id === service._id}
                                                    disabled={service !== null && item._id !== service._id}
                                                />
                                                <label
                                                    htmlFor={`service-${item._id}`}
                                                    className={
                                                        `${service !== null ? (item._id !== service._id ? 'text-neutral-400' : 'font-semibold') : ''} 
                                                        capitalize text-lg lg:text-xl
                                                    `}>
                                                    {item.name} {item.type && <span>({item.type})</span>} -
                                                    <span className='ml-2 font-design'>${item.price}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                    </div>
                </DropdownContent>
            </Dropdown>

            {/* Date and Time */}
            <Dropdown defaultOpen={location.state ? true : false} z={'z-[20]'}>
                {/* Header */}
                <DropdownHeader>
                    <BsCalendarEvent />
                    <span>Date & Time:</span>
                    {bookDate && time
                        ? <p className='capitalize select-none font-design font-bold mt-1 text-base text-primary-800 lg:mt-0 md:text-2xl lg:text-3xl  xl:text-4xl'>
                            <span className='hidden xl:inline-block'>
                                {moment(bookDate).format('dddd MMMM DD, YYYY')} @ <span className='uppercase'>{time}</span>
                            </span>
                            <span className='hidden md:inline-block xl:hidden'>
                                {moment(bookDate).format('ddd. MMM DD, YYYY')} @ <span className='uppercase'>{time}</span>
                            </span>
                            <span className='inline-block md:hidden'>
                                {moment(bookDate).format('MMM DD')} <span className='uppercase text-sm'> @ {time}</span>
                            </span>
                        </p>
                        : <p className='text-neutral-400 select-none text-base md:text-lg lg:text-xl'>(Choose Below)</p>
                    }
                </DropdownHeader>
                {/* Content */}
                <DropdownContent>
                    <div className='flex flex-col space-y-5 items-center px-5 pt-5 pb-10 border-b-2  md:flex-row md:px-10 md:space-x-10 md:space-y-0 lg:space-x-20 lg:py-10 lg:border-b-0'>
                        <Calendar
                            availableDays={availableDates.map((item) => moment(item.day).format('YYYY-MM-DD'))}
                            selected={bookDate}
                            setSelected={handleSetSelected}
                        />
                        <div className='flex flex-col space-y-5 lg:space-y-10'>
                            <h3 className='flex text-xl lg:text-3xl xl:text-4xl '>
                                <span>Date:</span>

                                <span className={`${bookDate ? ' font-design ' : 'text-neutral-400  '}  ml-3`}>
                                    {bookDate
                                        ? moment(bookDate).format('dddd MMM DD, YYYY')
                                        : 'Pick a Date'
                                    }
                                </span>
                            </h3>

                            {bookDate &&
                                <div className='flex flex-col space-y-5  lg:space-y-10'>
                                    <h3 className='flex self-start text-xl lg:text-3xl xl:text-4xl  '>
                                        <span>Time:</span>
                                        <span className='ml-3 font-design uppercase'>
                                            {time}
                                        </span>
                                    </h3>
                                    <ul className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:mt-5 xl:grid-cols-4'>
                                        {generateTime().map((item, idx) => (
                                            <button
                                                key={`${item}-${idx}`}
                                                onClick={() => setTime(item.time)}
                                                className={`${item.time === time ? 'ring-primary-400 bg-primary-400 font-semibold text-white' : 'ring-neutral-300 text-secondary'} cursor-pointer px-4 py-2 font-design uppercase ring-4  rounded-md`}
                                            >
                                                {item.time}
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                            }


                        </div>

                    </div>

                </DropdownContent>
            </Dropdown>

            {/* Contact Info */}
            <Dropdown z={'z-[10]'}>
                {/* Header */}
                <DropdownHeader>
                    <BsFillPersonFill />
                    <p className='flex items-center'>Contact Info:
                        {quickValidate()
                            ? <FaCheck className='ml-4 text-primary-800 text-lg md:text-2xl lg:text-3xl xl:text-4xl' />
                            : <span className='ml-4 text-neutral-400 select-none text-base md:text-lg lg:text-xl'>(Fill Below)</span>
                        }
                    </p>
                </DropdownHeader>
                {/* Content */}
                <DropdownContent>
                    <div className='px-5 pt-5 pb-10 border-b-2 lg:border-b-0 lg:pt-10 lg:pb-12'>
                        <ContactInfo
                            fName={fName}
                            setFName={setFName}
                            lName={lName}
                            setLName={setLName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            errors={errors}
                        />
                    </div>

                </DropdownContent>
            </Dropdown>

            {/* Terms */}
            <Dropdown z={'z-[5]'}>
                {/* Header */}
                <DropdownHeader>
                    <BsInfoSquareFill />
                    <p className='flex items-center'>
                        <span className='text-lg md:text-2xl lg:text-3xl xl:text-4xl'>Terms & Services:</span>
                        {(terms === null || terms === false)
                            ? <span className='ml-4 text-neutral-400 select-none text-base md:text-lg lg:text-xl'>(Check Below)</span>
                            : <FaCheck className='ml-4 text-primary-800 text-lg md:text-2xl lg:text-3xl xl:text-4xl' />
                        }
                    </p>

                </DropdownHeader>
                {/* Content */}
                <DropdownContent>
                    <div className='flex flex-col space-y-10 px-5 pt-5 pb-10 md:px-10 border-b-2 lg:border-b-0  lg:py-10  '>

                        <div>
                            {/* Payment Rule */}
                            <p className='mb-5 font-design border-2  border-secondary relative bg-rest rounded-xl p-2 lg:flex lg:space-x-2 lg:items-center xl:w-max'>
                                <RiErrorWarningFill className='absolute top-2 left-2 text-xl lg:relative lg:top-0 lg:left-0 lg:text-3xl' />
                                <span className='block ml-7 text-sm lg:ml-0 lg:inline-block lg:text-base'>
                                    $10 Non-Refundable Deposit through
                                    <span className='mx-1 font-semibold underline underline-offset-2'>Venmo or Apple Pay</span>
                                    is Required for Booking. (Goes towards your end payment)
                                </span>
                            </p>


                            {/* List of Payments */}
                            <div className='flex flex-col space-y-3 '>
                                <span className='font-semibold text-xl underline underline-offset-2'>
                                    Payments
                                </span>

                                <ul className='flex flex-col space-y-3  md:text-lg'>
                                    <li className='flex items-center space-x-2'>
                                        <FaDollarSign className='text-3xl' />
                                        <span>Cash</span>
                                    </li>
                                    <li className='flex items-center space-x-2'>
                                        <IoLogoVenmo className='text-3xl' />
                                        <span>
                                            <span>Venmo:</span>
                                            <span className='font-semibold ml-1'>@jolinaxc</span>
                                        </span>
                                    </li>
                                    <li className='flex items-center space-x-2'>
                                        <FaPaypal className='text-3xl' />
                                        <span>
                                            <span>Paypal:</span>
                                            <span className='font-semibold ml-2'>j.carpena17@yahoo.com</span>
                                        </span>
                                    </li>
                                    <li className='flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0'>
                                        <span className='flex space-x-2 items-center'>
                                            <FaCcApplePay className='text-3xl' />
                                            <span>Apple Pay:</span>
                                            <span className='text-sm mt-1 md:hidden'>(Read Below)</span>
                                        </span>
                                        <span className='text-sm font-semibold flex items-center  md:text-base md:ml-2'>
                                            <span>Message</span>
                                            <a target="_blank" href={'https://www.instagram.com/j0lina.lashes/'} rel="noopener noreferrer">
                                                <span className='flex items-center mx-1.5 underline underline-offset-2'>
                                                    <FaInstagram className='mr-1' />j0lina.lashes
                                                </span>
                                            </a>
                                            <span>on Instagram for Number</span>
                                        </span>

                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div className='flex flex-col items-start space-y-1 md:flex-row md:space-x-3 md:space-y-0'>

                            <div className='flex space-x-3 '>
                                <button
                                    onClick={() => setTerms(!terms)}
                                    className={`
                                    ${terms ? 'border-blue-500 bg-blue-500 hover:bg-blue-600 hover:border-blue-600' : 'border-neutral-400 hover:bg-neutral-100 hover:border-neutral-500'} 
                                    rounded-sm border-4 w-[25px] h-[25px] flex items-center justify-center transition-all ease-in-out duration-200
                                `}>
                                    {terms && <FaCheck className='text-white text-sm' />}
                                </button>
                                <span className='mb-1 md:hidden'>(Read Below)</span>
                            </div>

                            <p>By checking the box, you acknowledge that you have read and understood,
                                and agree to the
                                <a target="_blank" href={'/terms-and-conditions'} rel="noopener noreferrer">
                                    <span className='underline underline-offset-1 mx-1'>Terms & Conditions</span>
                                </a>
                                and
                                <a target="_blank" href={'/terms-and-conditions'} rel="noopener noreferrer">
                                    <span className='underline underline-offset-1 mx-1'>Payment Policy</span>
                                </a>
                                .
                            </p>
                        </div>


                    </div>
                </DropdownContent>
            </Dropdown>


            {/* Summary */}
            {(quickValidate() && terms && bookDate && time && service) &&
                <div className={`text-secondary bg-white py-6 px-5 z-0 md:p-6  lg:rounded-xl lg:p-8 lg:drop-shadow-lg`}>
                    <h2 className='font-semibold text-xl text-secondary flex items-center space-x-4 md:text-2xl lg:text-4xl'>
                        <MdOutlineSummarize className='text-2xl md:text-3xl lg:text-4xl' />
                        <span>Summary</span>
                    </h2>

                    <div className='pt-10 pb-5 px-2 lg:px-5 '>

                        <ul className='flex flex-col space-y-5'>
                            <li className='text-xl lg:text-2xl'>
                                <span className='font-bold'>Service: </span>
                                <span className='capitalize ml-2'>
                                    <span>{service.name}</span>
                                    {service.type && <span className='ml-1.5'>({service.type})</span>}
                                    <span className='ml-1.5'>- {service.category}</span>
                                </span>
                            </li>
                            <li className='text-xl flex flex-col space-y-1 md:flex-row md:space-x-3 md:space-y-0 lg:flex-none lg:text-2xl'>
                                <span className='font-bold'>Appointment Time: </span>
                                <span className='capitalize font-design flex flex-col md:flex-row lg:flex-none'>
                                    {moment(bookDate).format('dddd MMM DD, YYYY')}
                                    <span className='uppercase md:ml-2'>@ {time}</span>
                                </span>
                            </li>

                            <li className='text-xl lg:text-2xl'>
                                <span className='font-bold'>Total: </span>
                                <span className='capitalize font-design ml-2'>
                                    ${service.price}.00
                                </span>
                            </li>
                        </ul>


                        <button onClick={handleSubmitBooking} className='w-full lg:w-max mt-10 bg-primary-400 hover:bg-primary-500 transition-all ease-in-out duration-200 text-white font-bold text-2xl px-6 py-4 rounded-lg uppercase'>
                            Submit Order
                        </button>

                    </div>
                </div>
            }









        </div >
    )
}

export default Booking