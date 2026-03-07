import { eventEmitter } from "./index.js";

export const NOTIFICATION_CREATED = "notification.created";

export const emitNotificationCreated = (notification) => {
    eventEmitter.emit(NOTIFICATION_CREATED, notification);
};
