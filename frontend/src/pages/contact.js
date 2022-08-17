import React, { useState } from 'react'
import { validateEmail } from '../lib/utils'

// Icons
import { CgSpinnerTwoAlt } from 'react-icons/cg'
const FormInput = ({ error, value, setValue, label, type = "text", placeholder = "" }) => {
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
        <div className='flex flex-col space-y-1 w-full'>
            <label className={`text-neutral-700`} >
                <span className='capitalize'>{label}</span>
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
                    className='text-xl border-[3px] border-neutral-400  p-3 rounded-lg focus:outline-8  focus:outline-sky-500 text-neutral-900'
                />
            }

            {type === "email" &&
                <input
                    placeholder={placeholder}
                    type={"email"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='text-xl border-[3px] border-neutral-400  p-3 rounded-lg focus:outline-8  focus:outline-sky-500 text-neutral-900'
                />
            }

            {type === "textarea" &&
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='text-xl border-[3px] border-neutral-400  p-3 rounded-lg focus:outline-8 focus:outline-sky-500 text-neutral-900'
                />
            }

        </div>
    )
}

function Contact() {
    const [loading, setLoading] = useState(false)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({ fName: null, lName: null, email: null, message: null })

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


        if (inputValidation(message, false)) {
            copy['message'] = true
        } else {
            copy['message'] = false
        }

        setErrors({ ...copy })

        const results = Object.values(copy).every((item) => item === false)
        return results
    }

    function handleFormReset() {
        setFName('')
        setLName('')
        setEmail('')
        setMessage('')
        setErrors({ fName: null, lName: null, email: null, message: null })
    }
    function handleContactSubmit(e) {
        e.preventDefault()
        if (formValidate()) {
            // Send Email
            setLoading(true)
            setTimeout(() => {
                handleFormReset()
                setLoading(false)
                alert("Thank you your message was sent! We'll get back to you in 24-48 hours.")
            }, [2000])
        }
    }
    return (
        <div className='h-screen flex flex-col items-center space-y-5 md:pt-[10rem] md:pb-16 md:px-10 lg:pt-[14rem] xl:px-48'>

            <div className='h-screen pt-[10rem] px-10 bg-white rounded-xl drop-shadow-lg md:p-10 md:h-full lg:h-max w-full max-w-[1000px]'>
                <h1 className='text-secondary font-semibold text-4xl md:text-6xl mb-7 border-b-4 border-primary-400'>
                    Contact Us
                </h1>


                <form onSubmit={handleContactSubmit} className='flex flex-col space-y-5 md:space-y-10 lg:space-y-5 '>

                    <div className='flex flex-col space-y-5  md:space-y-10 lg:flex-row lg:space-y-0 lg:space-x-5'>
                        <FormInput
                            placeholder='Jane'
                            error={errors.fName}
                            value={fName}
                            setValue={setFName}
                            label={"First Name"}
                        />
                        <FormInput
                            placeholder='Doe'
                            error={errors.lName}
                            value={lName}
                            setValue={setLName}
                            label={"Last Name"}
                        />
                    </div>

                    <FormInput
                        placeholder='janedoe@email.com'
                        error={errors.email}
                        type='email'
                        value={email}
                        setValue={setEmail}
                        label={'Email'}
                    />


                    <FormInput
                        placeholder='Can I upgrade to the better set?'
                        error={errors.message}
                        value={message}
                        setValue={setMessage}
                        label={'Message'}
                        type={"textarea"}
                    />

                    <div className=''>
                        <button className='hover:bg-primary-400 bg-primary-500 rounded-lg text-white text-xl font-semibold py-3 px-5 mt-5  w-full block md:w-[200px]'>
                            {loading && <CgSpinnerTwoAlt className='inline-block mr-2 animate-spin mb-1' />}Submit
                        </button>
                    </div>

                </form>
            </div>



        </div>
    )
}

export default Contact