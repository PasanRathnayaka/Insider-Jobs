import { eventEmitter } from "./index.js";


export const APPLICATION_STATUS_UPDATED = "application.status.updated";

export const emitApplicationStatusUpdated = (payload) => {
    eventEmitter.emit(APPLICATION_STATUS_UPDATED, payload);
};