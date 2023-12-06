"use client";
import Hero from "@/sections/Home/Hero/Hero";
import { UpArrow } from "@/assets/svg";
import Testimonials from "@/sections/Home/Testimonials/Testimonials";
import Banners from "@/sections/Home/Banners/Banners";
import Categories from "@/sections/Home/Categories/Categories";
import { Link } from "react-scroll";

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-base-100 ">
            <Hero />
            <Banners />
            <Categories />
            <Testimonials />
            <div className="w-full z-30 text-white bg-gray-800 p-2 place-content-around ">
                <Link
                    activeClass="active"
                    to="hero"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="justify-center flex gap-2 cursor-pointer"
                >
                    Back To Top
                    <UpArrow />
                </Link>
            </div>
        </div>
    );
};

export default Home;
