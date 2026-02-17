import { Suspense } from "react";
import ViewApplicantsTableError from "../components/error-handlers/recruiter/ViewApplicantsTableError";
import ErrorBoundary from "../components/ErrorBoundary";
import ApplicantsTableSkeleton from "../components/skeletons/recruiter/ApplicantsTableSkeleton";
import ViewApplicantsTable from "../components/recruiter/ViewApplicantsTable";


const ViewApplicants = () => {

    return (
        <>
            <h3 className='text-3xl text-slate-700 mb-8'>Applicants</h3>

            <ErrorBoundary fallback={<ViewApplicantsTableError />}>
                <Suspense fallback={<ApplicantsTableSkeleton />}>
                    <ViewApplicantsTable />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default ViewApplicants;