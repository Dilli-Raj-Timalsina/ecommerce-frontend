"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductCardForProfile from "@/components/ProductCard/ProductCardForProfile";
import ProductContext, { useProductContext } from "@/context/ProductContext";
const ProfilePage = () => {
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [completedOrders, setCompletedOrders] = useState<any[]>([]);
    const [orderHistory, setOrderHistory] = useState<any[]>([]);
    const [activeButton, setActiveButton] = useState("pending"); //
    const { allProducts } = useProductContext();
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchPendingOrders = async () => {
            if (allProducts) {
                setPendingOrders(allProducts?.slice(0, 5));
                setCompletedOrders(allProducts?.slice(3, 6));
                setOrderHistory(allProducts?.slice(3, 6));
            }
        };

        // const fetchCompletedOrders = async () => {
        //     try {
        //         const response = await axios.get("/api/completed-orders");
        //         setCompletedOrders(response.data);
        //     } catch (error) {
        //         console.error("Error fetching completed orders:", error);
        //     }
        // };

        // const fetchOrderHistory = async () => {
        //     try {
        //         const response = await axios.get("/api/order-history");
        //         setOrderHistory(response.data);
        //     } catch (error) {
        //         console.error("Error fetching order history:", error);
        //     }
        // };

        fetchPendingOrders();
        // fetchCompletedOrders();
        // fetchOrderHistory();
    }, [allProducts]);

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
                            className={`bg-white ${
                                activeButton === "pending"
                                    ? " border-teal-400 bg-green-100"
                                    : ""
                            } cursor-pointer  rounded-lg shadow-lg p-4`}
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
                            className={`"bg-white cursor-pointer ${
                                activeButton === "completed"
                                    ? " border-teal-400 bg-green-100"
                                    : ""
                            } rounded-lg shadow-lg p-4`}
                        >
                            <p className="text-sm lg:text-lg font-bold mb-4">
                                Orders Completed
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {completedOrders.length}
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setActiveButton("history");
                            }}
                            className={`bg-white cursor-pointer ${
                                activeButton === "history"
                                    ? " border-teal-400 bg-green-100"
                                    : ""
                            } rounded-lg shadow-lg p-4`}
                        >
                            <p className="text-sm lg:text-lg font-bold mb-4 whitespace-nowrap">
                                History
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {orderHistory.length}
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
                            {completedOrders.map((order: any) => (
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
                {activeButton === "history" && (
                    <div>
                        <h2 className="text-2xl ms-10 p-4 font-bold">
                            Order History
                        </h2>
                        <div className="lg:w-4/5 lg:ps-10  grid grid-cols-2  lg:grid-cols-3 gap-2">
                            {orderHistory.map((order: any) => (
                                <div key={order.id}>
                                    <div key={order.id}>
                                        <ProductCardForProfile
                                            product={order}
                                            state="completed"
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
// lets make a dashboard that has 3 modern and catchy boxes with A+ Score, Enrolled Courses and Course Completed
