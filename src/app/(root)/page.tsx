import Hero from "@/sections/Home/Hero/Hero";
import Link from "next/link";
import { UpArrow } from "@/assets/svg";
import Testimonials from "@/sections/Home/Testimonials/Testimonials";
import Banners from "@/sections/Home/Banners/Banners";
import Categories from "@/sections/Home/Categories/Categories";

export const API_URL = "https://ecom-api-y3aj.onrender.com";

const Home = async () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-base-100 ">
            <Hero />
            <Banners />
            <Categories />
            <Testimonials />
            <div className="w-full z-30 text-white bg-gray-800 p-2 place-content-around ">
                <Link href={"/"} className="justify-center flex gap-2">
                    Back To Top
                    <UpArrow />
                </Link>
            </div>
        </div>
    );
};

export default Home;
