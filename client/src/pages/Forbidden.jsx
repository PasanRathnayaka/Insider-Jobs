import { Link } from "react-router-dom";

const  Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
                <h1 className="text-6xl font-bold text-red-500">403</h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Access Forbidden
                </h2>

                <p className="mt-2 text-gray-600">
                    You don’t have permission to access this page.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Link
                        to="/"
                        className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/auth"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        Login with another account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden
