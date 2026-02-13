import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppliedJobsEmpty = () => {

    const navigate = useNavigate();


    return (
        <div className="border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center gap-4">
            <Briefcase className="w-12 h-12 text-gray-400" />

            <h2 className="text-lg font-semibold text-gray-700">
                No applications yet
            </h2>

            <p className="text-sm text-gray-500 max-w-md">
                You haven’t applied to any jobs so far.
                Start exploring opportunities and apply to jobs that match your skills.
            </p>

            <button
                onClick={() => navigate("/")}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all cursor-pointer"
            >
                Browse Jobs
            </button>
        </div>
    );
};

export default AppliedJobsEmpty;
