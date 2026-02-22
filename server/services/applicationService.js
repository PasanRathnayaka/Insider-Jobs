import { emitApplicationStatusUpdated } from "../events/applicationEvents.js";
import { Application } from "../models/Application.js";


export const updateApplicationStatusService = async (applicationId, recruiterId, newStatus) => {

    const application = await Application.findById(applicationId)
        .populate("appliedJob")
        .populate("appliedBy");

    if (!application) {
        throw new Error("Application not found", 404);
    }

    if (application.appliedJob.referenceID.toString() !== recruiterId) {
        throw new Error("Unauthorized to update the application", 403);
    }

    if (application.status !== "pending") {
        throw new Error("Application status already finalized", 400);
    }

    application.status = newStatus;
    await application.save();


    emitApplicationStatusUpdated({
        applicationId: application._id,
        applicantId: application.appliedBy._id,
        recruiterId,
        jobTitle: application.appliedJob.title,
        status: newStatus,
    });

    return application;
};