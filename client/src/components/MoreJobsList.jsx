

import { useMoreJobs } from "../hooks/useMoreJobs";
import JobCard from "./JobCard";
import MoreJobsEmpty from "./MoreJobsEmpty";

const MoreJobsList = ({ referenceId, companyName }) => {
    const { data } = useMoreJobs(referenceId);

    const jobs = data?.data ?? [];

    return (
        <>
            {jobs?.length === 0 ? (
                <MoreJobsEmpty companyName={companyName} />
            ) : (
                data?.data.map((job) => (
                    <JobCard key={job._id} {...job} />
                ))
            )}
        </>
    );
};

export default MoreJobsList;
