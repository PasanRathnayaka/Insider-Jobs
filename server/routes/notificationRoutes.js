import express from 'express';
import { getNotifications, markAllAsRead, markAsRead } from '../controllers/notificationController.js';
import { authenticateUser } from '../middleware/authMIddleware.js';


const notificationRouter = express.Router();

notificationRouter.get("/", authenticateUser, getNotifications);

notificationRouter.patch("/:id/read", authenticateUser, markAsRead);

notificationRouter.patch("/read-all", authenticateUser, markAllAsRead);

export default notificationRouter;