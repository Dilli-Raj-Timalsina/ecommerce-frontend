'use client';
import { useModalContext } from "@/context/ModalContext";
import React, { useEffect } from 'react';
import { ErrorIcon, InfoIcon, SuccessIcon } from '@/assets/svg'

const Modal = () => {
	const { modalData, hideModal } = useModalContext()

	useEffect(() => {
		const timer = setTimeout(() => {
			hideModal()
		}, 6000)
		return () => { clearTimeout(timer) }
	})

	return (
		<div>
			{modalData.type.toLowerCase() === "success" ?
				<div className="alert alert-success fixed right-2 top-20 w-80" >
					<SuccessIcon />
					<span>{modalData?.data}</span>
				</div>
				:
				modalData.type.toLowerCase() === "error" ?
					<div className="alert alert-error fixed right-2 top-20 w-80" >
						<ErrorIcon />
						<span>{modalData?.data}</span>
					</ div> :
					<div className="alert alert-info fixed right-2 top-20 w-80">
						<InfoIcon />
						<span>{modalData?.data}</span>
					</div>
			}
		</div >
	)
}

export default Modal
