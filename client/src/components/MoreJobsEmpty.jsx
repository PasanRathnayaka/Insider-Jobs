import { assets } from "../assets/assets";

const MoreJobsEmpty = ({ companyName }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-6 p-6 rounded-xl border border-gray-200 bg-gray-50 text-center">
            <img
                src={assets.briefcase_icon ?? assets.company_icon}
                alt="no jobs"
                className="w-12 h-12 opacity-60"
            />

            <p className="mt-4 text-gray-700 font-medium">
                No other jobs available
            </p>

            <p className="mt-1 text-sm text-gray-500">
                {companyName
                    ? `Currently, ${companyName} hasn’t posted more jobs.`
                    : "There are no related jobs to show right now."}
            </p>
        </div>
    );
};

export default MoreJobsEmpty;
