"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/(root)/page";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import { useNotificationContext } from "@/context/NotificationContext";

const Cart = () => {
    const { deleteItemFromCart, cart } = useCartContext();
    const { notifyUser } = useNotificationContext();
    const { user } = useAuthContext();

    const router = useRouter();
    const [itemsList, setItemsList] = useState<any[]>([]);
    const initialLocation = {
        house: "",
        town: "",
        postcode: "",
    };
    const [phone, setPhone] = useState("");
    const [locationData, setLocationData] = useState(initialLocation);

    const locationHandler = (e: any) =>
        setLocationData({ ...locationData, [e.target.name]: e.target.value });

    const confirmOrder = async (locationText: string) => {
        try {
            const res = await axios.post(
                `${API_URL}/api/v1/utils/notifyPurchase`,
                {
                    email: user?.email,
                    location: locationText,
                    phone: phone,
                }
            );

            if (!res.status) {
                throw new Error(`HTTP error! Status: ${res}`);
            }
            const resObj = res.data;

            if (resObj.status === "success") {
                notifyUser({
                    notification:
                        "Your order has been confirmed. Please check your mail.",
                    date: new Date(),
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!user) {
            router.push("/login");
            return;
        }
        let locationText = `HOUSE NUMBER AND STREET: ${locationData.house}
		TOWN/LOCALITY: ${locationData.town}
		POST CODE: ${locationData.postcode}`;

        confirmOrder(locationText);
    };

    const calcTotal = () => {
        let totalAmount = 0;
        itemsList.forEach((a) => {
            totalAmount += Number(a.price);
        }, {});
        return totalAmount;
    };

    useEffect(() => {
        const getCartList = async () => {
            try {
                const res =
                    cart &&
                    (await axios.post(`${API_URL}/api/v1/user/getCartItem`, {
                        cart: cart,
                    }));
                if (!res?.status) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const resObj = res.data;

                if (resObj.status === "success") {
                    setItemsList(resObj.product);
                }
            } catch (error) {
                console.error("An error at getCartList occurred:", error);
            }
        };
        getCartList();
    }, [cart]);
    console.log(itemsList);
    return (
        <>
            <section className="mt-6 py-4 sm:mt-0 sm:py-7 bg-primary">
                <div className="container max-w-screen-xl mx-auto px-4 md:px-10">
                    <h2 className="text-3xl font-semibold">
                        {cart?.length || 0} Item(s) in Cart
                    </h2>
                </div>
            </section>

            {cart && cart.length > 0 && (
                <section className="py-10 md:px-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <main className="md:w-3/4">
                                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                    {itemsList?.length > 0 &&
                                        itemsList?.map((cartItem, i) => (
                                            <div key={i}>
                                                <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                                                    <div className="w-full lg:w-2/5 xl:w-2/4">
                                                        <figure className="flex leading-5">
                                                            <div>
                                                                <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                                                    {/* eslint-disable @next/next/no-img-element */}
                                                                    <Image
                                                                        height={
                                                                            200
                                                                        }
                                                                        width={
                                                                            200
                                                                        }
                                                                        src={`/${
                                                                            cartItem?.thumbNail ||
                                                                            null
                                                                        }`}
                                                                        alt={
                                                                            cartItem.title
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <figcaption className="ml-3">
                                                                <p>
                                                                    <a
                                                                        href="#"
                                                                        className="hover:text-blue-600"
                                                                    >
                                                                        {
                                                                            cartItem.title
                                                                        }
                                                                    </a>
                                                                </p>
                                                                <p className="mt-1 text-gray-400">
                                                                    {" "}
                                                                    Cost:{" "}
                                                                    {
                                                                        cartItem.price
                                                                    }
                                                                </p>
                                                            </figcaption>
                                                        </figure>
                                                    </div>

                                                    <div className="flex-auto">
                                                        <div className="float-right">
                                                            <a
                                                                className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                                                onClick={() =>
                                                                    deleteItemFromCart(
                                                                        cartItem.id
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />
                                            </div>
                                        ))}
                                </article>
                            </main>
                            <aside className="md:w-1/4">
                                <form onSubmit={submitHandler}>
                                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                        <span>Checkout Details:</span>
                                        <ul className="form-control">
                                            <li className="flex flex-col justify-between text-gray-600 mb-1">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Phone Number
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                                    required
                                                />
                                            </li>
                                            <li className="flex flex-col justify-between text-gray-600  mb-1">
                                                <label className="label">
                                                    <span className="label-text">
                                                        Location
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="house"
                                                    placeholder="HOUSE NUMBER AND STREET"
                                                    onChange={locationHandler}
                                                    className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="town"
                                                    placeholder="TOWN"
                                                    onChange={locationHandler}
                                                    className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="postcode"
                                                    placeholder="POST CODE"
                                                    onChange={locationHandler}
                                                    className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                                    required
                                                />
                                            </li>
                                        </ul>
                                    </article>
                                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                        <ul className="mb-5">
                                            <li className="flex justify-between text-gray-600  mb-1">
                                                <span>Total Units:</span>
                                                <span className="text-secondary">
                                                    {cart?.length} (Units)
                                                </span>
                                            </li>
                                            <li className="flex justify-between text-gray-600  mb-1">
                                                <span>Total Amount:</span>
                                                <span>${calcTotal()}</span>
                                            </li>
                                        </ul>

                                        <button
                                            type="submit"
                                            className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-secondary border border-transparent rounded-md hover:bg-secondary cursor-pointer"
                                        >
                                            Continue
                                        </button>

                                        <Link
                                            href="/"
                                            className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-secondary bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                                        >
                                            Back to shop
                                        </Link>
                                    </article>
                                </form>
                            </aside>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
