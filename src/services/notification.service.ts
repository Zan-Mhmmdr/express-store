type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationPayload {
  userId?: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
}

// sementara simpan di memory (nanti ganti DB / Firebase / OneSignal)
let notifications: NotificationPayload[] = [];

export const sendNotification = async (payload: {
  userId?: number;
  title: string;
  message: string;
  type?: NotificationType;
}): Promise<NotificationPayload> => {
  const newNotification: NotificationPayload = {
    userId: payload.userId,
    title: payload.title,
    message: payload.message,
    type: payload.type || "info",
    createdAt: new Date(),
  };

  notifications.push(newNotification);

  // di sini nanti bisa:
  // - kirim email
  // - push notification
  // - websocket emit

  console.log("Notification sent:", newNotification);

  return newNotification;
};

export const getNotifications = async (
  userId?: number
): Promise<NotificationPayload[]> => {
  if (!userId) return notifications;
  return notifications.filter((n) => n.userId === userId);
};

export const clearNotifications = async (): Promise<void> => {
  notifications = [];
};
