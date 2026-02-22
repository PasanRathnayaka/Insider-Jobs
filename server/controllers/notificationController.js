import {
    getUserNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead
} from "../services/notificationService.js";
import { isNotValidObjectId } from "../utils/checkMongoObjectId.js";
import { sendResponse } from "../utils/responseHandler.js";


export const getNotifications = async (req, res) => {
    const page = Number(req.query.page) || 1;

    const recipientId = req.user.id;

    if (isNotValidObjectId(recipientId)) {
        throw new AppError("Invalid recipient Id", 400);
    }

    const data = await getUserNotifications(recipientId, page);

    return sendResponse(res, 200, true, "Notifications", data);
};


export const markAsRead = async (req, res) => {

    const { notificationId } = req.params;
    const recipientId = req.user.id;

    if (isNotValidObjectId(notificationId)) {
        throw new AppError("Invalid notification Id", 400);
    }

    if (isNotValidObjectId(recipientId)) {
        throw new AppError("Invalid recipient Id", 400);
    }

    const notification = await markNotificationAsRead(
        notificationId,
        recipientId
    );

    return sendResponse(res, 200, true, "Notifcation marked successfully", notification);
};


export const markAllAsRead = async (req, res) => {

    const recipientId = req.user.id;

    if (isNotValidObjectId(recipientId)) {
        throw new AppError("Invalid recipient Id", 400);
    }

    await markAllNotificationsAsRead(recipientId);

    return sendResponse(res, 200, "All notifications marked as read");
};