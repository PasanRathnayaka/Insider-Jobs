import { Suspense } from 'react'
import ManageJobsTableSkeleton from '../components/skeletons/recruiter/ManageJobsTableSekeleton';
import ManageJobsTable from '../components/recruiter/ManageJobsTable';
import ErrorBoundary from '../components/ErrorBoundary';
import PostedJobsError from '../components/error-handlers/PostedJobsError';

const ManageJobs = () => {

    return (

        <ErrorBoundary fallback={<PostedJobsError />}>
            <Suspense fallback={<ManageJobsTableSkeleton />}>
                <ManageJobsTable />
            </Suspense>
        </ErrorBoundary>

    );
};

export default ManageJobs;