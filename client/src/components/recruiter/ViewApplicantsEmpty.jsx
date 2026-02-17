import { FileSearch } from "lucide-react";

const ViewApplicantsEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <FileSearch size={40} className="text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
                No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-sm">
                When candidates apply for your job postings, their applications will
                appear here.
            </p>
        </div>
    );
};

export default ViewApplicantsEmpty;
