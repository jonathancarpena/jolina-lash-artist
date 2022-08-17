
function Brand({ isDarkBg = false, onClick = null, sx, size = 'text-4xl' }) {

    return (
        <div onClick={() => onClick()}
            className={`
            w-[200px] h-[100px] 
            flex justify-center items-center cursor-pointer ${sx} 
            ${isDarkBg ? 'bg-primary-400' : 'bg-white'} rounded-xl px-5 py-2 relative
            `}>
            {/* <span className={`
                    ${isDarkBg ? 'text-white' : 'text-primary-400'} 
                     text-[3rem]  z-[20] font-cursive  absolute -top-3 left-0
                `}>
                Jolina
            </span> */}
            <span
                className={`
                    ${isDarkBg ? 'text-white' : 'text-primary-400'} 
                    font-body  text-[3rem] tracking-tight  z-[20]  absolute 
                `}>
                Lashes
            </span>
        </div>

    )
}

export default Brand