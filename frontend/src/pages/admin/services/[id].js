import React, { useEffect, useState, useCallback, useRef } from 'react'


// Redux
import { useSelector } from 'react-redux'

// Router
import { useParams } from 'react-router-dom'

// API
import { get_SingleService, put_UpdateService, IMAGE_API } from '../../../lib/api/index'

// Utils
import { replaceSpaces } from '../../../lib/utils'

// Icons
import { MdOutlineFileUpload, MdEdit, MdCheck, MdClose, MdPhotoCamera } from 'react-icons/md'

// Styles
import fileInputStyles from '../../../components/Admin/styles/fileInputStyles.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Components
import Loading from '../../../components/Admin/Loading'

const Name = ({ name, type, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(name)
    const [display, setDisplay] = useState(name)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ name: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <h1 className='text-secondary text-lg md:text-xl lg:text-3xl mb-3 md:mb-5 flex items-center capitalize'>
                    <span>{display}</span>
                    {type &&
                        <span className='ml-2'>({type})</span>}
                    <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                </h1>
                : <form className='mb-3 md:mb-5 flex items-center text-secondary text-lg md:text-xl lg:text-3xl'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='px-2 ring-2 w-[80%] sm:w-fit focus:outline-none'
                    />
                    <div className='flex '>
                        <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='text-lg lg:text-3xl cursor-pointer inline-block ml-2' />
                        <MdClose onClick={(e) => handleFormSubmit(e, false)} className='text-lg lg:text-3xl cursor-pointer inline-block ml-2' />
                    </div>
                </form>
            }

        </>
    )
}
const Category = ({ category, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(category)
    const [display, setDisplay] = useState(category)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ category: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <div className='text-base md:text-lg text-secondary'>
                    <h2 className='font-semibold flex items-center'>
                        Category <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <span className='capitalize'>{display}</span>
                </div>
                : <form className='lg:mb-5 text-secondary text-base md:text-lg'>
                    <h2 className='font-semibold r'>
                        Category
                    </h2>


                    <div className='flex'>
                        <select
                            className='py-1 focus:outline-none ring-2'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        >
                            <option value='full'>Full</option>
                            <option value='fill'>Fill</option>
                            <option value='mini'>Mini-Fill</option>
                            <option value='other'>Other Services</option>
                        </select>

                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                </form>
            }

        </>
    )
}
const Price = ({ price, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(price)
    const [display, setDisplay] = useState(price)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ price: input })
        } else {
            setEdit(false)
        }
    }

    function generateCents(price) {
        if (price.toString().length === 1) {
            return `${price}.00`
        } else if (price.toString().length === 3) {
            return `${price}0`
        } else {
            return `${price}`
        }
    }
    return (
        <>
            {!edit
                ? <div className='text-base md:text-lg text-secondary'>
                    <h2 className='font-semibold flex items-center'>
                        Price <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <span className='capitalize'>$ {generateCents(display)}</span>
                </div>
                : <form className=' lg:mb-5 text-secondary text-base md:text-lg'>
                    <h2 className='font-semibold r'>
                        Price
                    </h2>


                    <div className='flex'>
                        <span className='capitalize mr-2'>$ </span>
                        <input
                            min={1.00}
                            step={0.01}
                            type="number"
                            className='px-2 w-[80px] ring-2 focus:outline-none'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                </form>
            }

        </>
    )
}
const Description = ({ description, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(description)
    const [display, setDisplay] = useState(description)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ description: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <div className='text-base md:text-lg text-secondary'>
                    <h2 className='font-semibold flex items-center'>
                        Description <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <p className=''>{display}</p>
                </div>
                : <form className='lg:mb-5 text-secondary text-base md:text-lg'>

                    <div className='flex'>
                        <h2 className='font-semibold r'>
                            Description
                        </h2>
                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                    <textarea
                        className='p-2 text-base md:text-lg w-full focus:outline-none h-max rounded-sm ring-2'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />

                </form>
            }

        </>
    )
}
const Method = ({ method, handleUpdate }) => {
    const [edit, setEdit] = useState()
    const [input, setInput] = useState(method)
    const [display, setDisplay] = useState(method)

    function handleFormSubmit(e, ok) {
        e.preventDefault()
        if (ok) {
            setEdit(false)
            setDisplay(input)
            handleUpdate({ method: input })
        } else {
            setEdit(false)
        }

    }
    return (
        <>
            {!edit
                ? <div className='text-base md:text-lg text-secondary'>
                    <h2 className='font-semibold flex items-center'>
                        Method <MdEdit onClick={() => setEdit(true)} className='cursor-pointer inline-block ml-2' />
                    </h2>
                    <p className=''>{display}</p>
                </div>
                : <form className='mb-5 text-secondary text-base md:text-lg'>

                    <div className='flex'>
                        <h2 className='font-semibold r'>
                            Method
                        </h2>
                        <div className='text-neutral-800 ml-2 text-xl'>
                            <MdCheck onClick={(e) => handleFormSubmit(e, true)} className='cursor-pointer inline-block ml-2' />
                            <MdClose onClick={(e) => handleFormSubmit(e, false)} className='cursor-pointer inline-block ml-2' />
                        </div>
                    </div>

                    <textarea
                        className='p-2 text-base md:text-lg w-full focus:outline-none h-max rounded-sm ring-2'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />

                </form>
            }

        </>
    )
}
const Img = ({ images, name, category, handleUpdate }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef(null)

    const handleSlide = useCallback((idx) => {
        if (!sliderRef.current) return;
        setActiveIndex(sliderRef.current.swiper.activeIndex)
        sliderRef.current.swiper.slideTo(idx);
    }, []);


    async function handleFileOnChange(e, idx) {
        if (e.target.files && e.target.files[0]) {
            const res = await handleUpdate({ img: e.target.files[0], name: `${replaceSpaces(name)}-${category}-${idx}` })
            if (res.ok) {
                window.location.reload(false)
            }
        }
    }
    return (
        <div className='relative bg-transparent flex justify-center items-center'>
            <div className='flex flex-col space-y-5 items-center lg:items-start'>
                <Swiper
                    onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                    ref={sliderRef}
                    className='w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] rounded-2xl '
                    slidesPerView={1}
                    speed={300}
                >
                    {images.map((item, idx) => (
                        <SwiperSlide key={`${name}-image-${idx}`} className={` bg-neutral-300 flex items-center justify-center w-[500px] h-[500px] `}>
                            {item === ''
                                ? <MdPhotoCamera className='text-[10rem] text-white' />
                                : <img src={`${IMAGE_API}/${item}`} alt={`big-${name}-${idx}`} />
                            }

                            <div style={fileInputStyles} className='inline-block absolute top-5 left-[50%] -translate-x-[50%] w-max lg:hidden '>
                                <label className="custom-file-upload text-secondary text-base flex ">
                                    <input
                                        type="file"
                                        name='image'
                                        onChange={(e) => handleFileOnChange(e, idx)}
                                        accept="image/jpeg, image/png"
                                    />
                                    <MdOutlineFileUpload className='inline-block mb-0.5 text-xl' />
                                    <span>Upload</span>
                                </label>
                            </div>

                            <div style={fileInputStyles} className='absolute top-10 right-10 hidden lg:inline-block '>
                                <label className="custom-file-upload text-secondary text-base flex ">
                                    <input
                                        type="file"
                                        name='image'
                                        onChange={(e) => handleFileOnChange(e, idx)}
                                        accept="image/jpeg, image/png"
                                    />
                                    <MdOutlineFileUpload className='inline-block mb-0.5 text-xl' />
                                    <span>Upload</span>
                                </label>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <ul className='flex space-x-3'>
                    {images.map((item, idx) => (
                        <div
                            key={`${name}-mini-image-${idx}`}
                            onClick={() => handleSlide(idx)}
                            className={`${activeIndex === idx ? 'ring-primary-400' : 'ring-transparent'} cursor-pointer ring-4 bg-neutral-300 flex items-center justify-center w-[50px] h-[50px] rounded-lg overflow-hidden`}>
                            {item === ''
                                ? <MdPhotoCamera className='text-[1.5rem] text-white' />
                                : <img src={`${IMAGE_API}/${item}`} alt={`small-${name}-${idx}`} />
                            }
                        </div>
                    ))}
                </ul>

            </div>
        </div>
    )
}

function SingleService() {
    const { _id } = useParams()
    const { token } = useSelector(state => state.admin)
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState(null)

    useEffect(() => {
        if (service === null) {
            get_SingleService(_id)
                .then((res) => {
                    setService(res)
                })
        }
    }, [_id, service])

    useEffect(() => {
        if (service !== null) {
            setLoading(false)
        }
    }, [service])

    async function handleUpdate(body) {
        const res = await put_UpdateService(token, _id, body)
        return res
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='font-design text-secondary '>
            <div className='bg-white rounded-xl p-5 drop-shadow-xl relative'>

                <Name
                    handleUpdate={handleUpdate}
                    name={service.name}
                    type={service.type}
                />

                <div className='flex flex-col space-y-5 md:space-y-7 lg:space-y-0 lg:flex-row lg:space-x-5'>


                    <Img
                        category={service.category}
                        name={service.name}
                        images={service.img}
                        handleUpdate={handleUpdate}
                    />




                    <div className='flex flex-col space-y-4 md:space-y-5 w-full'>
                        <Price
                            price={service.price}
                            handleUpdate={handleUpdate}
                        />
                        <Category
                            category={service.category}
                            handleUpdate={handleUpdate}
                        />
                        <Description
                            description={service.description}
                            handleUpdate={handleUpdate}
                        />

                        <Method
                            method={service.method}
                            handleUpdate={handleUpdate}
                        />



                    </div>
                </div>


            </div>
        </div>
    )
}

export default SingleService