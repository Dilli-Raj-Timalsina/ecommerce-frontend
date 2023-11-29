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
const categoryBy = ["Categories", "shop-all", "groceries", "clothes"];

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

    const router = useRouter();

    useEffect(() => {
        setDisplayProducts(products);
    }, [products]);

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
            <h1 className="text-secondary text-4xl text-center mt-10">
                {category === "shop-all" ? "Shop All" : products[0]?.category}
            </h1>
            {/* Sorting Done  */}
            <div className="dropdown dropdown-bottom dropdown-end w-full flex justify-end pr-20">
                <label
                    tabIndex={0}
                    className="btn m-1 w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100"
                >
                    {sortBy[sortType]} <ArrowBottom />
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mr-20"
                >
                    {sortBy?.map((e, i) => {
                        return (
                            <li key={i} onClick={() => sortItems(i)}>
                                <a>{e}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="w-full flex">
                {/* Filter */}
                <div className="lg:w-1/5  px-10">
                    <p className="pb-4 text-2xl font-extralight border-b">
                        Filter by
                    </p>
                    <div className="flex items-center justify-evenly gap-2 lg:block">
                        {/* ANOTHER TECHNIQUE */}

                        <div className="dropdown dropdown-bottom  ">
                            <label
                                tabIndex={0}
                                className="btn m-1 w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100"
                            >
                                {categoryBy[categoryType]} <ArrowBottom />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mr-20"
                            >
                                {categoryBy?.map((e, i) => {
                                    return (
                                        <li key={i}>
                                            <Link
                                                href={`/${
                                                    e !== "Categories"
                                                        ? e
                                                        : "shop-all"
                                                }`}
                                            >
                                                {e}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* <select
                            onChange={(e) => router.push(`/${e.target.value}`)}
                            className="collapse collapse-plus base-200 mt-4"
                        >
                            <div className="flex items-center ">Category</div>

                            <option value={"shop-all"} className="pb-2">
                                Shop All
                            </option>
                            <option value={"clothes"} className="pb-2">
                                Clothes
                            </option>
                            <option className="pb-2" value={"groceries"}>
                                Groceries
                            </option>
                            <option className="pb-2" value={"puja-items"}>
                                Puja Items
                            </option>
                            <option className="pb-2" value={"utensils"}>
                                Utensils
                            </option>
                        </select> */}
                        <details className="collapse lg:collapse-plus base-200 mt-4">
                            <summary className="collapse-title  text-md font-thin pl-0">
                                <div className="flex items-center ">
                                    <span>Price</span>
                                    <span>
                                        <ArrowBottom />
                                    </span>
                                </div>
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
                {/* Products */}
                <div className="w-4/5 px-2 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
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
        </div>
    );
}
