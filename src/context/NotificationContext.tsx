'use client';

import { createContext, useContext, useState } from 'react';
import { useModalContext } from "./ModalContext";

interface INotificationContext {
	notificationList: any[]
	notifyUser: ({ notification, date }: { notification: string, date: Date }) => void
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
	const { showModal } = useModalContext();
	const [notificationList, setNotificationList] = useState<any[]>([]);

	const notifyUser = ({ notification, date }: { notification: string, date: Date }) => {
		const newNotificationList = [...notificationList, { notification, date }]
		setNotificationList(newNotificationList)
		showModal(notification, "Success")
	}

	return (
		<NotificationContext.Provider
			value={{
				notificationList,
				notifyUser
			}}
		>
			{children}
		</ NotificationContext.Provider>
	);
}

export const useNotificationContext = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error("useNotificationContext must be within NotificationContext")
	}

	return context
}

export default NotificationContext