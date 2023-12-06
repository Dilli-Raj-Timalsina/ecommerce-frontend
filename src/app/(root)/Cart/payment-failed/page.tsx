"use client";
import React from "react";
import { useRouter } from "next/navigation";

function PaymentFailed() {
    const router = useRouter();
    return (
        <div className="bg-gradient-to-b from-slate-50 to-slate-100  min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg drop-shadow-lg shadow-lg text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-red-500 mx-auto mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Payment Failed
                </h2>
                <p className="text-gray-600 mb-6">
                    Oops! It appears there was a problem with your payment.
                    Please try again later or contact our support team for
                    assistance.
                </p>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 hover:scale-105 transform transition-transform duration-300"
                    onClick={() => {
                        router.push("/Cart");
                    }}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default PaymentFailed;
