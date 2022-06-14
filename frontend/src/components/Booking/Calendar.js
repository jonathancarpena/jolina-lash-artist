import React, { useState } from 'react'

// Utils
import moment from 'moment';
import { getMonthDateRange } from '../../lib/utils'

// Components
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

// Icons
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai'


function Calendar({ selected, setSelected, availableDays }) {
    const year = moment(Date.now()).year()
    const month = moment(Date.now()).month()
    const minDate = getMonthDateRange(year, month).start
    const maxDate = getMonthDateRange(year, month).end
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    const filterDates = (date) => {
        const formatDate = moment(date).format('YYYY-MM-DD')
        return availableDays.includes(formatDate)
    }
    const weekDaysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return (

        <DatePicker
            renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => {
                const month = months[moment(date).month()]
                const year = moment(date).year()

                return (
                    <>
                        <div className='absolute h-[50px] top-0 bg-rest text-transparent w-full z-0'>
                            .
                        </div>
                        <div className='font-design absolute h-[35px] -bottom-0 bg-white text-secondary flex justify-evenly items-center w-full z-0'>
                            {weekDaysName.map((item) => <span key={item}>{item}</span>)}
                        </div>
                        <div
                            className='relative bottom-1 text-secondary text-lg w-full flex justify-center space-x-5 p-2 font-design '
                        >
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className='flex items-center'>
                                <AiOutlineLeftCircle />
                            </button>

                            <span>{month} {year}</span>

                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className='flex items-center'>
                                <AiOutlineRightCircle />
                            </button>
                        </div>
                    </>
                )
            }}

            inline
            minDate={minDate}
            maxDate={maxDate}
            filterDate={filterDates}
            selected={selected ? selected : moment(availableDays[0])._d}
            onChange={(date) => setSelected(date)}
        />


    );
}

export default Calendar