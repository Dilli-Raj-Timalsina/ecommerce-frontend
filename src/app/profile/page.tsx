"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
    const { user } = useAuthContext();
    const router = useRouter();
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-lg font-bold mb-4">
                                Pending Orders
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {" "}
                                    {user.haveEnrolled ? "10" : "0"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-lg font-bold mb-4">
                                Orders Completed
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    {user.haveEnrolled ? "1" : "0"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-lg font-bold mb-4 whitespace-nowrap">
                                History
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-4xl font-bold text-blue-500">
                                    0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                {/* {user.haveEnrolled && (
                    <div className="my-8">
                        <h2 className="text-2xl lg:px-8 font-bold">History</h2>
                        <div className="grid gap-4">
                            {enrolledCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="rounded-lg p-4 flex justify-center shadow-lg"
                                >
                                    <div className="p-2 bg-white shadow-lg rounded-lg">
                                        <div className="flex justify-center mb-4">
                                            <img
                                                src={course.image}
                                                alt={course.name}
                                                className="object-contain w-full h-52 overflow-clip md:h-64"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-800">
                                            {course.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Instructor: {course.instructor}
                                        </p>
                                        {course.upcomingSession && (
                                            <p className="text-gray-600 mb-4">
                                                Upcoming Session:{" "}
                                                {course.upcomingSession}
                                            </p>
                                        )}
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                                                onClick={() =>
                                                    handleJoinSession(course.id)
                                                }
                                            >
                                                JOIN SESSION
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ProfilePage;
// lets make a dashboard that has 3 modern and catchy boxes with A+ Score, Enrolled Courses and Course Completed
