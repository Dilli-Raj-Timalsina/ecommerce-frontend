"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowBottom } from "@/assets/svg";
import ProductCard from "@/components/ProductCard/ProductCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import sortProduct from "@/components/sortProduct/sortProduct";

const categoryBy = [
    { name: "Categories", slug: "categories" },
    { name: "Shop All", slug: "shop-all" },
    { name: "Groceries", slug: "groceries" },
    { name: "Clothes", slug: "clothes" },
    { name: "Puja Items", slug: "puja-items" },
    { name: "Utensils", slug: "utensils" },
];
const sortBy = [
    "Sort By",
    "Newest",
    "Price (High to Low)",
    "Price (Low to High)",
    "Name (A-Z)",
    "Name (Z-A)",
];

export default function ProductsByCategory({
    products,
    category,
}: {
    products: any[];
    category: string;
}) {
    const [displayProducts, setDisplayProducts] = useState<any[] | []>([]);
    const [rateRange, setRateRange] = useState(0);
    const [categoryType, setCategoryType] = useState(0);
    const [sortType, setSortType] = useState(0);
    const [counter, setCounter] = useState(0);
    const [maxCounter, setMaxCounter] = useState(
        Math.floor(displayProducts.length / 8)
    );
    console.log("Max Counter is ", maxCounter);
    console.log("Counter is ", counter);
    useEffect(() => {
        setDisplayProducts(products.slice(counter * 8, (counter + 1) * 8));
    }, [products]);
    useEffect(() => {
        setMaxCounter(Math.floor(displayProducts.length / 8));
    }, [products, displayProducts]);
    useEffect(() => {
        setDisplayProducts(products.slice(counter * 8, (counter + 1) * 8));
        // c = 1
        // s = 1*5 e = 2*5 5,10
        // c= 3 , s = 3*5 e = 4*5 15,20
        //		  3*10 , 4*10
        //
    }, [counter]);
    const sliderHandler = (e: any) => {
        setRateRange(e.target.value);
    };
    const handlePrev = (e: any) => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };
    const handleNext = (e: any) => {
        if (counter < maxCounter) {
            setCounter(counter + 1);
        }
    };
    const displayRange = () => {
        let itemsToShow = products.filter((product) => {
            return product?.price <= rateRange;
        });
        setDisplayProducts(itemsToShow);
    };

    const sortItems = (type: number) => {
        setSortType(type);
        sortProduct({ products: displayProducts, type });
    };

    return (
        <div className="">
            <CategoryList />
            <h1 className="text-secondary text-4xl text-center my-5 lg:mt-10 ">
                {category === "shop-all" ? "Shop All" : products[0]?.category}
            </h1>
            <div className="flex items-center justify-around ">
                <div className="flex dropdown dropdown-bottom dropdown-end lg:w-full  lg:justify-end lg:pr-20">
                    <label
                        tabIndex={0}
                        className="btn m-1 w-40 font-medium justify-between border border-neutral hover:bg-base-100 lg:pl-4 bg-base-100"
                    >
                        {sortBy[sortType]} <ArrowBottom />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow white bg-base-100 rounded-box lg:w-52 lg:mr-20"
                    >
                        {sortBy?.map((e, i) => {
                            return (
                                <li
                                    className=" whitespace-nowrap"
                                    key={i}
                                    onClick={() => sortItems(i)}
                                >
                                    <a>{e}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className=" lg:hidden dropdown dropdown-bottom  ">
                    <label
                        tabIndex={0}
                        className="btn m-1 w-42 lg:w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100"
                    >
                        {categoryBy[categoryType].name}
                        <ArrowBottom />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  "
                    >
                        {categoryBy?.map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link
                                        href={`/${
                                            item.name !== "Categories"
                                                ? item.slug
                                                : "shop-all"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {/* PRICING */}
            <div className="flex items-center justify-center">
                <div className="lg:hidden w-fit text-center">
                    <div className=" text-lg text-center">Price</div>
                    <input
                        type="range"
                        onChange={sliderHandler}
                        onMouseUp={displayRange}
                        onTouchEnd={displayRange}
                        min={0}
                        max={Math.max(
                            ...products.map((product) => {
                                return product?.price || 0;
                            })
                        )}
                        value={rateRange}
                        className="range range-success"
                    />
                    <div className="flex justify-between">
                        <span>0</span>
                        {rateRange}
                        <span>
                            {Math.max(
                                ...products.map((product) => {
                                    return product?.price || 0;
                                })
                            )}
                        </span>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <div className="lg:container lg:w-full flex">
                {/* Filter */}
                <div className="w-1/5 h-screen hidden lg:block px-10">
                    <p className="pb-4 text-2xl font-extralight border-b">
                        Filter by
                    </p>
                    <div className="">
                        <details className="collapse collapse-plus base-200 mt-4">
                            <summary className="collapse-title text-md font-thin pl-0">
                                Category
                            </summary>
                            <div className="collapse-content pl-0">
                                <ul className="text-sm font-thin">
                                    <li className="pb-2">
                                        <Link href={`/shop-all`}>Shop All</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={`/clothes`}>Clothes</Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={`/groceries`}>
                                            Groceries
                                        </Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={`/puja-items`}>
                                            Puja Items
                                        </Link>
                                    </li>
                                    <li className="pb-2">
                                        <Link href={`/utensils`}>Utensils</Link>
                                    </li>
                                </ul>
                            </div>
                        </details>
                        <details className="collapse collapse-plus base-200 mt-4">
                            <summary className="collapse-title text-md font-thin pl-0">
                                Price
                            </summary>
                            <div className="collapse-content pl-0">
                                <input
                                    type="range"
                                    onChange={sliderHandler}
                                    onMouseUp={displayRange}
                                    onTouchEnd={displayRange}
                                    min={0}
                                    max={Math.max(
                                        ...products.map((product) => {
                                            return product?.price || 0;
                                        })
                                    )}
                                    value={rateRange}
                                    className="range range-neutral"
                                />
                                <div className="flex justify-between">
                                    <span>0</span>
                                    {rateRange}
                                    <span>
                                        {Math.max(
                                            ...products.map((product) => {
                                                return product?.price || 0;
                                            })
                                        )}
                                    </span>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>

                <div className="lg:w-4/5  grid grid-cols-2  lg:grid-cols-4 gap-4 px-6 my-4 mb-0 ">
                    {displayProducts &&
                        displayProducts?.map((product, i: number) => {
                            return (
                                <div key={i}>
                                    <ProductCard
                                        product={product}
                                        category={category}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="flex mt-16 mb-10 text-lg text-white   item-center justify-around">
                <button
                    className="bg-orange-600 hover:bg-orange-500 px-4 py-1 rounded-lg"
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className="bg-orange-600 hover:bg-orange-500 px-4 py-1 rounded-lg"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
