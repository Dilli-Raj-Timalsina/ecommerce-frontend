"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { useContext } from "react";

const SideBar = () => {
    const router = useRouter();
    const currRoute = usePathname();
    const handleClick = async () => {
        router.push("/");
    };

    const selected =
        "text-blue-500 bg-slate-50 px-2 rounded-s-full text-sm font-bold";
    const others = "hover:rounded-s-full text-black px-2 text-sm font-bold";

    return (
        <aside className="bg-white border-e hidden md:flex  text-black h-screen w-1/5  flex-col">
            {
                <div className="flex flex-col gap-3 ps-4 pt-8">
                    {
                        <>
                            <Link
                                href="/profile"
                                className={`${
                                    currRoute === "/profile" ? selected : others
                                } mt-1 flex pe-2 sm:mt-0 sm:ml-3 px-3 py-2 font-bold hover:bg-gray-200 focus:outline-none focus:bg-slate-100 focus:text-blue-600`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                    width="20"
                                    height="20"
                                    className="w-6 me-2 h-6"
                                    viewBox="0 0 1920 1920"
                                >
                                    {/* Path data */}
                                </svg>
                                Dashboard
                            </Link>

                            <Link
                                href="/profile/wishlist"
                                className={`${
                                    currRoute === "/account-profile/wishlist"
                                        ? selected
                                        : others
                                } mt-1 flex pe-2 sm:mt-0 sm:ml-3 px-3 py-2 font-bold hover:bg-gray-200 focus:outline-none focus:bg-slate-100 focus:text-blue-600`}
                            >
                                Wishlist
                            </Link>

                            <button disabled={true}>
                                <a
                                    href="/profile/settings"
                                    className={`${
                                        currRoute === "/profile/settings"
                                            ? selected
                                            : others
                                    } mt-1 flex pe-2 sm:mt-0 sm:ml-3 px-3 py-2 cursor-not-allowed font-bold hover:bg-gray-200 focus:outline-none focus:bg-slate-100 focus:text-blue-600`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 me-2"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        {/* Path data */}
                                    </svg>
                                    Settings
                                </a>
                            </button>

                            <button
                                onClick={() => handleClick()}
                                className={`${
                                    currRoute === "/profile/logout"
                                        ? selected
                                        : others
                                } mt-1 flex pe-2 sm:mt-0 sm:ml-3 px-3 py-2 font-bold hover:bg-gray-200 focus:outline-none focus:bg-slate-100 focus:text-blue-600`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 me-2"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    {/* Path data */}
                                </svg>
                                Logout
                            </button>
                        </>
                    }
                </div>
            }
        </aside>
    );
};

export default SideBar;
