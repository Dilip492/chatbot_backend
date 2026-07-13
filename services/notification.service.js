import Notification from "../models/notification.js"

export const createNotification = async ({ user, type, title, message, actionUrl = '/' }) => {

    try {
        const notification = await Notification.create({
            user,
            type,
            title,
            message,
            actionUrl,
            isRead: false,
        });

        return notification;
    } catch (error) {
        console.error("Create Notification Error:", error);
        throw error;
    }
}