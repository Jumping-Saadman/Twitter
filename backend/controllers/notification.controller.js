import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        // const user = await User.find(userId);
        // if(!user) return res.status(404).json({ error: "User not found!" });

        const notifications = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "userName profileImg"
        });

        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted sucessfully! "});
    } catch (error) {
        console.log("Error in deleteNotifications controller: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId);

        if(!notification) return res.status(404).json({ error: "Notification not found!" });

        if(notification.to.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this notification! " });
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification deleted sucessfully!" });
    } catch (error) {
        console.log("Error in deleteNotification controller: ", error);
        res.status(500).json({ error: "Internal server error!" });
    }
}