"use client";
import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import { HamburgerMenu, SearchIcon, ProfileIcon } from "@/assets/svg";
import CartButton from "@/components/CartButton/CartButton";
import NotifyButton from "@/components/NotifyButton/NotifyButton";
import UserProfile from "@/components/UserProfile/UserProfile";
import SeachBar from "./SeachBar";

export default function Navbar({ categories }: { categories: any[] }) {
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
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {categories.map((category, index) => (
                            <li key={index}>
                                <Link href={category.url}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link
                    href={"/"}
                    className="btn hover:bg-transparent btn-ghost normal-case text-sm p-0 lg:p-3 lg:text-xl "
                >
                    Ushopie
                </Link>
            </div>

            <SeachBar />

            <div className="px-1 hidden lg:flex">
                <LanguageDropdown />
                <CartButton />
                <NotifyButton />
                <UserProfile />
            </div>
        </div>
    );
}
