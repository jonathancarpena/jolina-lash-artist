import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className='min-h-screen text-secondary text-center'>
            <div className='absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] flex items-center justify-center flex-col space-y-5'>
                <h1 className='font-bold text-5xl  '>
                    404 Error.
                </h1>
                <h2 className='text-2xl font-semibold flex flex-col items-center'>
                    <span>Page does not exist.</span>
                    <Link to='/'>
                        <span className='flex items-center mx-2 underline underline-offset-2'>
                            Go Home
                        </span>
                    </Link>
                </h2>
            </div>
        </div>
    )
}

export default NotFound