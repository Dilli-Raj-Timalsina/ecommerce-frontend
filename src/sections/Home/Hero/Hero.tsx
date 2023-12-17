"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryList from "../../../components/CategoryList/CategoryList";
import { useRouter } from "next/dist/client/components/navigation";
import { setTimeout } from "timers";

const heroBanner = [
    "/images/coffee.jpg",
    "/images/banner2.jpg",
    "/images/add.jpg",
];
type Hero = {
    id: number;
    h1title: string;
    h1subTitle: string;
    h2title: string;
    h2subTitle: string;
    h3title: string;
    h3subTitle: string;
    imageFirst: string;
    imageSecond: string;
    imageThird: string;
    category1: string;
    category2: string;
    category3: string;
};

export default function Hero() {
    const router = useRouter();
    const [curr, setCurr] = useState(1);
    const [heros, setHeros] = useState<Hero>();
    async function fetchData() {
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! +
                    process.env.NEXT_PUBLIC_GETHERO,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setHeros((await res.json()).heros[0]);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (curr == 3) {
                goToNext(1);
            } else {
                goToNext(curr + 1);
            }
        }, 7000);
    }, [curr]);

    const bgImageStyle = {
        backgroundImage: `url(https://9somerandom.s3.ap-south-1.amazonaws.com/${
            curr === 1
                ? heros?.imageFirst
                : curr === 2
                ? heros?.imageSecond
                : heros?.imageThird
        })`,
        backgoundPosition: "center",
        backgroundSize: "cover",
        height: "100%",
    };

    const goToNext = (currState: any) => {
        setCurr(currState);
    };

    return (
        <div className="hero w-full">
            <div className="flex flex-col md:flex-col w-full">
                <CategoryList />
                <div
                    className="h-2/3-screen lg:h-4/5-screen "
                    style={bgImageStyle}
                >
                    <div
                        className="flex flex-col justify-center bg-white h-2/3-screen lg:h-4/5-screen w-screen lg:w-3/5 px-8 lg:pl-36"
                        style={{
                            background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)`,
                        }}
                    >
                        <p className="pb-8 lg:pb-6 text-sm lg:text-base">
                            <span className="bg-orange-600 px-4 py-1 text-base-100">
                                Best Prices
                            </span>
                        </p>
                        <p
                            className="text-4xl lg:text-5xl font-medium max-w-md cursor-pointer"
                            style={{ lineHeight: "1.25" }}
                            onClick={() => {
                                router.push(`/${
                                    curr === 1
                                        ? heros?.category1
                                        : curr === 2
                                        ? heros?.category2
                                        : heros?.category3
                                }
                                `);
                            }}
                        >
                            {curr === 1
                                ? heros?.h1title
                                : curr === 2
                                ? heros?.h2title
                                : heros?.h3title}
                        </p>
                        <p className="pt-8 pb-10 lg:py-6 text-sm lg:text-base">
                            {curr === 1
                                ? heros?.h1subTitle
                                : curr === 2
                                ? heros?.h2subTitle
                                : heros?.h3subTitle}
                        </p>
                        <div>
                            <Link
                                href={`/shop-all
                                `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="btn px-8 lg:px-14 text-sm font-extralight rounded-3xl normal-case bg-secondary text-base-100 border-0 hover:bg-purple-400 cursor-pointer"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                    <div
                        className="absolute flex -mt-16 justify-center w-full p-4 gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {heroBanner.map((imageSlides, currState) => {
                            return (
                                <span
                                    className="bg-gray-100 p-3  rounded-3xl cursor-pointer border-gray-300 border shadow-sm"
                                    key={currState}
                                    onClick={() => {
                                        goToNext(currState + 1);
                                    }}
                                ></span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
