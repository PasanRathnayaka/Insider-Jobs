import { emitApplicationStatusUpdated } from "../events/applicationEvents.js";
import { Application } from "../models/Application.js";
import { createNotification } from "./notificationService.js";


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

    await createNotification({
        recipient: application.appliedBy,
        sender: recruiterId,
        type: "APPLICATION_STATUS_UPDATED",
        title: "Application Status Updated",
        message: `Your application has been ${newStatus}`,
        metadata: {
            jobId: application.appliedJob,
            applicationId: application._id,
        },
    });


    emitApplicationStatusUpdated({
        applicationId: application._id,
        applicantId: application.appliedBy._id,
        recruiterId,
        jobTitle: application.appliedJob.title,
        status: newStatus,
    });

    return application;
};