import { Suspense } from 'react'
import { usePostedJobs } from '../hooks/usePostedJobs';
import ManageJobsTableSkeleton from '../components/skeletons/recruiter/ManageJobsTableSekeleton';
import ManageJobsTable from '../components/recruiter/ManageJobsTable';

const ManageJobs = () => {

    const { data: postedJobs } = usePostedJobs();


    return (

        <Suspense fallback={<ManageJobsTableSkeleton />}>
            <ManageJobsTable
                postedJobs={postedJobs}
            />
        </Suspense>
    );
};

export default ManageJobs