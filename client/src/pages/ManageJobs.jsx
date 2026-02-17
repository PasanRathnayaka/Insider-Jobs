import { Suspense } from 'react'
import ManageJobsTableSkeleton from '../components/skeletons/recruiter/ManageJobsTableSekeleton';
import ManageJobsTable from '../components/recruiter/ManageJobsTable';
import ErrorBoundary from '../components/ErrorBoundary';
import PostedJobsError from '../components/error-handlers/recruiter/PostedJobsError';

const ManageJobs = () => {

    return (

        <>
            <h3 className='text-3xl text-slate-700 mb-8'>Manage Jobs</h3>

            <ErrorBoundary fallback={<PostedJobsError />}>
                <Suspense fallback={<ManageJobsTableSkeleton />}>
                    <ManageJobsTable />
                </Suspense>
            </ErrorBoundary>

        </>

    );
};

export default ManageJobs;