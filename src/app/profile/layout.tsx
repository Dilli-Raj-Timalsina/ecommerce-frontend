"use client";
import React from "react";
import SideBar from "@/components/UserProfile/SideBar";
import { useContext } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Navbar from "@/sections/Navbar/Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const categories = [
        { name: "Dashboard", url: "/profile" },
        { name: "Wishlist", url: "/profile/wishlist" },
        { name: "Setting", url: "/about" },
    ];
    const { user } = useAuthContext();
    if (!user?.id) {
        return (
            <>
                <div className="flex  min-h-screen justify-center items-center">
                    <div className="py-10">
                        <div className="text-2xl font-bold ps-8">
                            Please Login to view your dashboard
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <section>
                <div>
                    <Navbar />
                </div>
                <section className="flex  ">
                    <SideBar />

                    <div className="bg-blue-50 pt-20  flex-grow">
                        {children}
                    </div>
                </section>
            </section>
        );
    }
};

export default Layout;
