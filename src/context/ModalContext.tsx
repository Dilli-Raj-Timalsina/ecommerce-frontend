'use client';

import { createContext, useContext, useState } from 'react';

interface IModalContext {
	hideModal: () => void,
	show: boolean,
	modalData: { data: string; type: string; },
	showModal: (data: string, type: string) => void
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [show, setShowModal] = useState<boolean>(false);
	const [modalData, setModalData] = useState<{ data: string; type: string; }>({ data: '', type: 'success' })

	const hideModal = () => {
		setShowModal(false)
	};

	const showModal = (data: string, type: string) => {
		setShowModal(true)
		setModalData({ data, type })
	};

	return (
		<ModalContext.Provider
			value={{
				hideModal,
				show,
				modalData,
				showModal
			}}
		>
			{children}
		</ ModalContext.Provider>
	);
}

export const useModalContext = () => {
	const context = useContext(ModalContext)
	if (context === undefined) {
		throw new Error("useModalContext must be within ModalContext")
	}

	return context
}

export default ModalContext