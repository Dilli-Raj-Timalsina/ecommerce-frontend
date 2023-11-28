"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("../ProductCard/ProductCard"));

export default function Category({
    category,
    items,
}: {
    category: any;
    items: any[];
}) {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        setProducts(items?.slice(0, 5));
    }, [items]);
    console.log(products);
    return (
        <div className="w-screen text-white">
            <div className="flex px-10 w-full items-center justify-between">
                <h1 className="text-black py-4 font-bold text-2xl">
                    Puja Items
                </h1>

                <Link
                    className="text-white  bg-orange-300 rounded-md  p-2 hover:bg-orange-200 text-sm cursor-pointer"
                    href={`/${category}`}
                >
                    View All
                </Link>
            </div>
            <div
                className={`grid xs:ps-0 lg:p-6 md:gap-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-even justify-items-center lg:gap-6`}
            >
                {products.map((product: any, i: any) => {
                    return (
                        <div key={i} className="m-auto my-2 w-auto">
                            <ProductCard
                                product={product}
                                category={category}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
