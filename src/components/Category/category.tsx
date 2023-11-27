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
            <div className="flex px-10 w-full justify-between">
                <h1 className="text-black text-4xl">{category}</h1>

                <Link
                    className="text-white bg-neutral rounded-md pt-2 pb-0 px-3 hover:bg-purple-400 text-sm cursor-pointer"
                    href={`/${category}`}
                >
                    View All
                </Link>
            </div>
            <div
                className={`grid md:gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 justify-even justify-items-center lg:gap-3`}
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
