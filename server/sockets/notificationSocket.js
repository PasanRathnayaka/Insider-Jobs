import { APPLICATION_STATUS_UPDATED } from "../events/applicationEvents.js";
import { NOTIFICATION_CREATED } from "../events/notificationEvents.js";
import { eventEmitter } from "../events/index.js";

export const registerNotificationEvents = (io) => {

    // Existing listener for specific application status fast-UI updates (if the frontend needs it beyond just a generic notification)
    eventEmitter.on(APPLICATION_STATUS_UPDATED, (payload) => {
        const { applicantId, status, jobTitle } = payload;

        io.to(`user:${applicantId}`).emit("application:statusUpdated", {
            message: `Your application for "${jobTitle}" was ${status}`,
            status,
        });
    });

    // DRY generic listener for *all* new notifications, emitting directly to the recipient's socket room
    eventEmitter.on(NOTIFICATION_CREATED, (notification) => {
        io.to(`user:${notification.recipient}`).emit("notification:new", notification);
    });
};