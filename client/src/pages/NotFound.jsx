import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <div className='flex items-center justify-center container mx-auto h-screen'>
            <div>
                <p className='text-md lg:text-2xl 2xl:text-3xl'>404 - Page Not Found</p>
                <Link to="/">
                    <p className='text-md lg:text-xl text-center mt-3'>Go Back To <span className='text-blue-500 hover:text-blue-600 underline cursor-pointer'>Home</span></p>
                </Link>

            </div>
        </div>
    )
}

export default NotFound

