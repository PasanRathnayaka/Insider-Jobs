import { Notification } from "../models/Notification.js";
import { AppError } from "../utils/AppError.js";
import { isNotValidObjectId } from "../utils/checkMongoObjectId.js";


export const createNotification = async ({ recipient, sender, type, title, message, metadata = {} }) => {

    if (isNotValidObjectId(recipient)) {
        throw new AppError("Invalid recipient Id", 400);
    }

    if (isNotValidObjectId(sender)) {
        throw new AppError("Invalid sender Id", 400);
    }

    const allowedTypes = [
        "APPLICATION_STATUS_UPDATED",
        "NEW_APPLICATION",
        "JOB_ACTIVATED",
        "JOB_DEACTIVATED",
        "SYSTEM",
    ];

    if (!allowedTypes.includes(type)) {
        throw new AppError("Invalid notification type", 400);
    }


    const notification = await Notification.create({
        recipient,
        sender,
        type,
        title,
        message,
        metadata,
    });

    return notification;
};


export const getUserNotifications = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
        Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Notification.countDocuments({ recipient: userId }),
    ]);

    if (!notifications) {
        throw new AppError("Notifications not found", 404);
    }

    return {
        notifications,
        totalPages: Math.ceil(total / limit),
    };
};


export const markNotificationAsRead = async (notificationId, userId) => {
    const notification = await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            recipient: userId,
        },
        {
            isRead: true,
            readAt: new Date(),
        },
        { new: true }
    );

    return notification;
};


export const markAllNotificationsAsRead = async (userId) => {
    await Notification.updateMany(
        { recipient: userId, isRead: false },
        { isRead: true, readAt: new Date() }
    );

    return true;
};