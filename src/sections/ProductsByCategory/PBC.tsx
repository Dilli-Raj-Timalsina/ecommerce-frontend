"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBottom } from "@/assets/svg";
import ProductCard from "@/components/ProductCard/ProductCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import sortProduct from "@/components/sortProduct/sortProduct";

const sortBy = [
    "Sort By",
    "Newest",
    "Price (High to Low)",
    "Price (Low to High)",
    "Name (A-Z)",
    "Name (Z-A)",
];
const categoryBy = [
    { name: "Categories", slug: "categories" },
    { name: "Shop All", slug: "shop-all" },
    { name: "Groceries", slug: "groceries" },
    { name: "Clothes", slug: "clothes" },
    { name: "Puja Items", slug: "puja-items" },
    { name: "Utensils", slug: "utensils" },
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
    const [sortType, setSortType] = useState(0);
    const [categoryType, setCategoryType] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setDisplayProducts(products.slice(0, 5));
    }, [products]);

    const handleShowMore = (e: any) => {
        if (showMore) {
            setDisplayProducts(products.slice(0, 5));
        } else {
            setDisplayProducts(products);
        }
        setShowMore(!showMore);
    };
    const sliderHandler = (e: any) => {
        setRateRange(e.target.value);
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

            <div className=" container">
                {/* Filter */}
                <div className=" px-10">
                    <div className="lg:flex items-center justify-center pt-3 lg:pt-10 lg:gap-6">
                        {/* SORTING TECHNIQUE */}

                        <div className="dropdown dropdown-bottom dropdown-end ">
                            <label
                                tabIndex={0}
                                className="btn m-1 w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100"
                            >
                                {sortBy[sortType]} <ArrowBottom />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  "
                            >
                                {sortBy?.map((e, i) => {
                                    return (
                                        <li
                                            key={i}
                                            onClick={() => sortItems(i)}
                                        >
                                            <a>{e}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* Category Type */}
                        <div className="dropdown dropdown-bottom  ">
                            <label
                                tabIndex={0}
                                className="btn m-1 w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100"
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
                        {/* PRICING */}
                        <div className="">
                            {/* <summary className="collapse-title  text-md font-thin pl-0">
                                <div className="flex items-center ">
                                    <span>Price</span>
                                </div>
                            </summary>
                            <div className="collapse-content pl-0"> */}
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
                </div>
                {/* Products */}
                <h1 className="text-secondary text-4xl text-center mt-2 lg:mt-6">
                    {category === "shop-all"
                        ? "Shop All"
                        : products[0]?.category}
                </h1>
                <div className=" container lg:px-10 grid grid-cols-2 lg:grid-cols-5 gap-4 my-4">
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
                <div className="flex py-2 text-blue-600 underline item-center justify-center">
                    <button onClick={handleShowMore}>
                        {showMore ? "Show Less" : " Show More"}
                    </button>
                </div>
            </div>
        </div>
    );
}
