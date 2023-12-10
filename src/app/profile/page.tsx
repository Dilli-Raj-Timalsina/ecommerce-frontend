"use client";
import axios from "axios";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import ProductCardForProfile from "@/components/ProductCard/ProductCardForProfile";

const ProfilePage = () => {
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [allOrders, setallOrders] = useState<any[]>([]);
    const [conformedOrders, setConformedOrders] = useState<any[]>([]);
    const [activeButton, setActiveButton] = useState("pending");
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchallOrders = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BACKEND +
                        `/api/v1/utils/getOrderProfile/40`
                );
                if (response.data.status === "success") {
                    setallOrders(response.data.OrderProfile);
                } else
                    throw new Error(
                        "COuldnt get proper response from the server"
                    );
            } catch (error) {
                console.error("Error fetching completed orders:", error);
            }
        };
        if (allOrders) {
            setPendingOrders(
                allOrders?.filter((order) => order.orderType === "pending")
            );
            setConformedOrders(
                allOrders?.filter((order) => order.orderType === "completed")
            );
        }

        fetchallOrders();
    }, [allOrders]);

    if (!user?.id) {
        return (
            <>
                <div className="flex h-screen flex-col flex-grow">
                    <div className="py-10">
                        <div className="text-2xl font-bold ps-8">
                            Please Login to view your dashboard
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="flex flex-col flex-grow">
            <div className="py-10">
                <div className="text-2xl font-bold ps-8">
                    Welcome Back {user?.name}{" "}
                </div>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-xl font-semibold text-center mb-10">
                        YOUR DASHBOARD
                    </h1>
                    <div className="grid w-fit grid-cols-3 gap-4">
                        <div
                            onClick={() => {
                                setActiveButton("pending");
                            }}
                            className={`cursor-pointer ${
                                activeButton === "pending"
                                    ? " border-teal-400 bg-green-100 "
                                    : "bg-white "
                            } rounded-lg shadow-lg p-4`}
                        >
                            <p className="text-sm lg:text-lg font-bold mb-4">
                                Pending Orders
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {pendingOrders.length}
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setActiveButton("completed");
                            }}
                            className={`cursor-pointer ${
                                activeButton === "completed"
                                    ? " border-teal-400 bg-green-100 "
                                    : "bg-white "
                            } rounded-lg shadow-lg p-4`}
                        >
                            <p className="text-sm lg:text-lg font-bold mb-4">
                                Orders Completed
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {conformedOrders.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-8">
                {activeButton === "pending" && (
                    <div>
                        <h2 className="text-2xl ms-10 p-4 font-bold">
                            Pending Orders
                        </h2>
                        <div className="lg:w-4/5 lg:ps-10  grid grid-cols-2  lg:grid-cols-3 gap-2">
                            {pendingOrders.map((order: any) => (
                                <div key={order.id}>
                                    <ProductCardForProfile
                                        product={order}
                                        state={"pending"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeButton === "completed" && (
                    <div>
                        <h2 className="text-2xl ms-10 p-4 font-bold">
                            Completed Orders
                        </h2>
                        <div className="lg:w-4/5 lg:ps-10  grid grid-cols-2  lg:grid-cols-3 gap-2">
                            {conformedOrders.map((order: any) => (
                                <div key={order.id}>
                                    <div key={order.id}>
                                        <ProductCardForProfile
                                            product={order}
                                            state={"completed"}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
