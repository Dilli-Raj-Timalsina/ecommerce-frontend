"use client";
import Link from "next/link";
import Image from "next/image";
import LanguageDropdown from "@/components/LanguageDropdown/LanguageDropdown";
import { HamburgerMenu } from "@/assets/svg";
import CartButton from "@/components/CartButton/CartButton";
import NotifyButton from "@/components/NotifyButton/NotifyButton";
import UserProfile from "@/components/UserProfile/UserProfile";
import SeachBar from "./SeachBar";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="top-0 navbar z-20  w-screen fixed flex flex-row items-center justify-between lg:px-5 pl-2 pr-2 bg-base-100 text-neutral">
            <div className=" px-0 lg:px-8">
                {/* <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost p-0 px-2 lg:hidden"
                    >
                        <HamburgerMenu />
                    </label>
                    <DropBar></DropBar>
                </div> */}

                <Image
                    src="/images/mainlogo.png"
                    height={400}
                    width={400}
                    alt="okay"
                    className="relative md:w-40 md:h-11 md:top-1 md:left-8  w-14 h-5 top-1 left-2 right-1 cursor-pointer"
                    onClick={() => {
                        router.push("/");
                    }}
                />
            </div>

            <SeachBar />

            <div className="mr-3 ">
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
