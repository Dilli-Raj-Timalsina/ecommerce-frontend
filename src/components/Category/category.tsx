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
            <div className="flex md:px-16 px-8 w-full items-center justify-between">
                <h1 className="text-gray-800 font-bold text-2xl hover:shadow-sm">
                    Puja Items
                </h1>

                <Link
                    className="text-white  bg-orange-400 rounded-md  p-2 px-4 hover:bg-orange-500 text-sm cursor-pointer"
                    href={`/${category}`}
                >
                    View All
                </Link>
            </div>
            <div
                className={`grid xs:ps-0 lg:p-6 lg:px-14 md:gap-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 justify-between `}
            >
                {products.map((product: any, i: any) => {
                    return (
                        <div key={i} className="mx-auto my-2 w-auto">
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
