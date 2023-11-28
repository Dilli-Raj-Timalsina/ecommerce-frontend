"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/context/CartContext";

interface ProductInterface {
    image: string;
    id: string;
    title: string;
    description: string;
    price: Number;
    thumbNail: any;
}

export default function ProductCard({
    product,
    category,
}: {
    product: ProductInterface;
    category: string;
}) {
    const { addItemToCart } = useCartContext();

    const addToCartHandler = (id: any) => {
        addItemToCart(id);
    };

    let image = product?.thumbNail,
        id = product?.id,
        name = product?.title,
        price = product?.price;

    return (
        <div
            // className="card px-1 shadow-md py-1 bg-base-100 text-gray-600 border-gray-200"
            className="rounded-xs bg-base-100 hover:drop-shadow-md hover:z-50 text-black w-44 lg:w-56 border-grey-400"
            style={{ borderWidth: "1px" }}
        >
            <Link
                href={`/${category}/${id}`}
                className="rounded-t-xl h-fit overflow-hidden relative"
            >
                {/* eslint-disable @next/next/no-img-element */}
                <Image
                    src={image || "/images/coffee.jpg"}
                    // src={"/images/goldstar.jpg"}
                    alt="product"
                    height={200}
                    width={400}
                    className=" bg-cover mt-2 h-52 rounded-t-lg p-2 "
                />
            </Link>
            <div className="card-body py-4 px-2 ">
                <p className="line-clamp-1">{name}</p>
                <div className="flex items-center justify-between">
                    <p className="line-clamp-1 md:font-semibold">
                        ${price.toString()}
                    </p>
                    <button
                        onClick={() => {
                            addToCartHandler(product?.id);
                        }}
                        className="btn px-2 hover:bg-neutral  text-base-100 bg-secondary"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
