"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "@/assets/svg";
import ProductCard from "@/components/ProductCard/ProductCard";
import ToggleDetail from "@/components/ToggleDetail.tsx/ToggleDetail";
import { useCartContext } from "@/context/CartContext";

const productInfo = [
    {
        name: "Return & Refund Policy",
        details:
            "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
    },
    {
        name: "Shipping Info",
        details:
            "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
    },
];

const imageProps = { width: 400, height: 250, zoomWidth: 500 };

export default function ProductDetails({
    product,
    relatedProducts,
}: {
    product: any;
    relatedProducts: any[];
}) {
    const imgRef = useRef(null);

    const { addItemToCart } = useCartContext();

    const addToCartHandler = (id: any) => {
        addItemToCart(id);
    };

    return (
        <div className=" w-screen">
            <div className="lg:mx-20">
                <div className="text-sm breadcrumbs my-8">
                    <ul>
                        <li>
                            <Link href={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link href={`/${product?.category}`}>
                                {product?.category}
                            </Link>
                        </li>
                        <li>{product?.title}</li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="">
                        <div className="image-section flex justify-center items-center">
                            <div>
                                {/* eslint-disable @next/next/no-img-element */}
                                <Image
                                    ref={imgRef}
                                    alt="Product Image"
                                    src={product?.thumbNail}
                                    width={imageProps.width}
                                    height={imageProps.height}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="details-section px-4 lg:px-10 py-4 lg:py-8">
                        <p className="text-2xl lg:text-3xl font-semibold lg:max-w-md whitespace-nowrap line-clamp-1">
                            {product?.title}
                        </p>
                        <p className="pt-2  lg:text-xl font-extrabold">
                            Price : ${product?.price}
                        </p>
                        <p className="pt-2 pb-4 lg:pb-6 text-sm lg:text-base">
                            {product?.subTitle}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <button className="px-2 py-1 text-base-100 bg-secondary border border-secondary">
                                    -
                                </button>
                                <span className="px-4 border border-secondary">
                                    2
                                </span>
                                <button className="px-2 py-1 text-base-100 bg-secondary border border-secondary">
                                    +
                                </button>
                            </div>
                            <div className="flex bg-orange-400 hover:bg-orange-500 px-2 py-1 border-green-400 rounded-md items-center">
                                <button className=" w-32  p-2">
                                    Add To Cart
                                </button>
                                <CartIcon />
                            </div>
                            {/* className="flex cursor-pointer items-center btn w-32 border-solid justify-between border-secondary bg-primary text-secondary hover:opacity-80 hover:bg-primary hover:border-secondary" */}
                        </div>
                        <button
                            onClick={() => {
                                addToCartHandler(product?.id);
                            }}
                            className="btn w-full mt-4 text-sm bg-secondary text-base-100 hover:bg-neutral"
                        >
                            Confirm Order
                        </button>
                        <div className="mt-6">
                            {productInfo?.map((e, i) => {
                                return (
                                    <div key={i} className="mb-4">
                                        <ToggleDetail
                                            name={e.name}
                                            details={e.details}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-secondary text-4xl mt-24">
                        <span className="pl-2 pr-3 bg-secondary rounded-lg mr-2"></span>{" "}
                        Related Items
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 py-10 w-full">
                        {relatedProducts &&
                            Object(relatedProducts)?.map(
                                (product: any, i: any) => {
                                    return (
                                        <div key={i} className="m-auto lg:w-80">
                                            <ProductCard
                                                product={product}
                                                category={product?.category}
                                            />
                                        </div>
                                    );
                                }
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
