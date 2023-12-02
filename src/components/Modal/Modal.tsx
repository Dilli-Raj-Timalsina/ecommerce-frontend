"use client";
import { useModalContext } from "@/context/ModalContext";
import React, { useEffect } from "react";
import { ErrorIcon, InfoIcon, SuccessIcon } from "@/assets/svg";

const Modal = () => {
    const { modalData, hideModal } = useModalContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            hideModal();
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    });

    return (
        <div>
            {modalData.type.toLowerCase() === "success" ? (
                <div className="alert alert-success bg-white text-sm md:text-base overflow-hidden fixed right-4 top-20 w-fit md:px-10 px-5 mr-5 py-1 h-fit flex justify-center ">
                    <span>{modalData?.data}</span>
                    <SuccessIcon />
                </div>
            ) : modalData.type.toLowerCase() === "error" ? (
                <div className="alert alert-error bg-white text-sm md:text-base overflow-hidden fixed right-4 top-20 w-fit md:px-10 px-5 mr-5 py-1 h-fit flex justify-center">
                    <span>{modalData?.data}</span>
                    <ErrorIcon />
                </div>
            ) : (
                <div className="alert alert-info bg-white text-sm md:text-base overflow-hidden fixed right-4 md:right-32 md:top-20 top-16  w-fit md:px-10 px-5 mr-5 py-1 h-fit flex justify-center">
                    <span>{modalData?.data}</span>
                    <SuccessIcon />
                </div>
            )}
        </div>
    );
};

export default Modal;
