"use client";
import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import { HamburgerMenu } from "@/assets/svg";
import CartButton from "@/components/CartButton/CartButton";
import NotifyButton from "@/components/NotifyButton/NotifyButton";
import UserProfile from "@/components/UserProfile/UserProfile";
import SeachBar from "./SeachBar";

export default function Navbar() {
    return (
        <div className="top-0 navbar z-20  w-screen fixed flex flex-row items-center justify-between lg:px-5 pl-2 pr-2 bg-base-100 text-neutral">
            <div className=" px-0 lg:px-8">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost p-0 px-2 lg:hidden"
                    >
                        <HamburgerMenu />
                    </label>
                    <DropBar></DropBar>
                </div>
                <Link
                    href={"/"}
                    className="btn hover:bg-transparent btn-ghost normal-case text-sm p-0 lg:p-3 lg:text-xl "
                >
                    Ushopie
                </Link>
            </div>

            <SeachBar />

            <div className="px-1 ">
                <LanguageDropdown />
                <CartButton />
                <NotifyButton />
                <UserProfile />
            </div>
        </div>
    );
}
function DropBar() {
    return (
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-20 bg-white w-56"
        >
            <div>
                <li className="underline text-base">
                    <Link href="/login">Login</Link>
                </li>
                <li className="underline text-base">
                    <Link href="/signup" className="">
                        Signup
                    </Link>
                </li>
                <li className="underline text-base">
                    <Link href="/logout" className="">
                        Logout
                    </Link>
                </li>
            </div>
        </ul>
    );
}

const categories = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/shop-all" },
    {
        name: "logout",
        url: "/logout",
    },
];
