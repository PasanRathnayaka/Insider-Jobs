

import { useMoreJobs } from "../hooks/jobs/useMoreJobs";
import JobCard from "./JobCard";
import MoreJobsEmpty from "./MoreJobsEmpty";

const MoreJobsList = ({ referenceId, companyName, currentJobId }) => {

    const { data } = useMoreJobs(referenceId, currentJobId);

    return (
        <>
            {data?.data?.length === 0 ? (
                <MoreJobsEmpty companyName={companyName} />
            ) : (
                data?.data?.map((job) => (
                    <JobCard key={job._id} {...job} />
                ))
            )}
        </>
    );
};

export default MoreJobsList;
