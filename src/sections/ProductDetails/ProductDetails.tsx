"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/app/(root)/page";
import ProductCard from "@/components/ProductCard/ProductCard";
import ToggleDetail from "@/components/ToggleDetail.tsx/ToggleDetail";
import { useCartContext } from "@/context/CartContext";
import Love from "@/assets/love";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import SvgCheck from "@/assets/check";
import { useRouter } from "next/navigation";

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
    const { addItemToCart } = useCartContext();
    const { user } = useAuthContext();
    // const [wishlist, setWishlist] = useState<number | null>(null);
    const [itemQuantity, setItemQUantity] = useState<number>(1);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isWished, setIsWished] = useState(false);
    const router = useRouter();

    console.log(product);

    const handleSideImgClick = (image: string) => {
        console.log("Side image clicked");

        if (imgRef.current) {
            imgRef.current.src = `https://9somerandom.s3.ap-south-1.amazonaws.com
			/${image}?t=${Date.now()}`;
        }
    };
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/v1/user/getWishList/26`
                );
                if (!res?.status) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const resObj = res.data;
                if (resObj.status === "success") {
                    console.log(resObj);
                    console.log("WIhslist item retirieved Successfully");
                    // return resObj.product;
                    const found = resObj.product.find(
                        (pro: any) => pro.id === product.id
                    );
                    console.log(found);

                    if (found) {
                        setIsWished(true);
                    }
                }
            } catch (error) {
                console.error("An error at getWishList occurred:", error);
            }
        };
        getList();
    }, []);

    useEffect(() => {
        const res = axios.patch(API_URL + `/api/v1/user/updateWishList`, {
            wishList: 121,
            userId: 26,
        });
        res.then((data) => {
            console.log(data);
            setIsWished(!isWished);
        }).catch((err) => {
            console.log(err);
        });
    }, [isWished]);
    // Wishlist

    const checkoutHandler = (id: any) => {
        addItemToCart(id);
        router.push("/checkout");
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
                    <div className=" flex flex-col lg:flex-row items-center justify-between">
                        <ul className="flex order-last  p-2 lg:flex-col gap-2">
                            {product?.sideImages.map(
                                (image: string, i: number) => {
                                    return (
                                        <li
                                            key={i}
                                            className="w-fit hover:shadow-md hover:shadow-orange-400 cursor-pointer hover:border-blue-400"
                                        >
                                            <Image
                                                className="w-32 rounded-md h-32"
                                                width={100}
                                                height={100}
                                                onClick={(e) => {
                                                    handleSideImgClick(image);
                                                }}
                                                src={`https://9somerandom.s3.ap-south-1.amazonaws.com
									/${image}`}
                                                alt={product.title}
                                            ></Image>{" "}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                        <div className="image-section flex p-4 justify-center items-center">
                            <div>
                                {/* eslint-disable @next/next/no-img-element */}
                                <img
                                    ref={imgRef}
                                    className=" h-1/2 lg:h-4/5-screen "
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
                                <button
                                    onClick={() => {
                                        if (itemQuantity > 1) {
                                            setItemQUantity(itemQuantity - 1);
                                        }
                                    }}
                                    className="px-2 py-1 text-base-100 bg-secondary border border-secondary"
                                >
                                    -
                                </button>
                                <span className="px-4 border border-secondary">
                                    {itemQuantity}
                                </span>
                                <button
                                    onClick={() => {
                                        setItemQUantity(itemQuantity + 1);
                                    }}
                                    className="px-2 py-1 text-base-100 bg-secondary border border-secondary"
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex w-fit bg-orange-400 whitespace-nowrap hover:bg-orange-500 px-2 pe-4 py-1 border-green-400 rounded-md justify-center  items-center">
                                <button
                                    onClick={() => {
                                        setIsWished(!isWished);
                                    }}
                                    className=" w-32  p-2"
                                >
                                    Wishlist
                                </button>
                                {isWished ? <SvgCheck /> : <Love />}
                            </div>
                            {/* className="flex cursor-pointer items-center btn w-32 border-solid justify-between border-secondary bg-primary text-secondary hover:opacity-80 hover:bg-primary hover:border-secondary" */}
                        </div>
                        <button
                            onClick={() => {
                                checkoutHandler(product?.id);
                            }}
                            className="btn w-full mt-4 text-sm bg-secondary text-base-100 hover:bg-neutral"
                        >
                            Checkout
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
