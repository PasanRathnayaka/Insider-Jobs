import { APPLICATION_STATUS_UPDATED } from "../events/applicationEvents.js";
import { eventEmitter } from "../events/index.js";

export const registerNotificationEvents = (io) => {
    eventEmitter.on(APPLICATION_STATUS_UPDATED, (payload) => {
        const { applicantId, status, jobTitle } = payload;

        io.to(`user:${applicantId}`).emit("application:statusUpdated", {
            message: `Your application for "${jobTitle}" was ${status}`,
            status,
        });
    });
};