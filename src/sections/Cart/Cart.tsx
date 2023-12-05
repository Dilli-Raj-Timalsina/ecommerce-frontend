"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutDetails from "./CheckoutDetails";
import CartBox from "./CartBox";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import { useNotificationContext } from "@/context/NotificationContext";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const { modifyCart, cart, setCart } = useCartContext();
    const [loadingNow, setLoadingNow] = useState(false);
    const [loadingCash, setLoadingCash] = useState(false);
    const { notifyUser } = useNotificationContext();
    const { user } = useAuthContext();
    const router = useRouter();

    const initialLocation = {
        house: "",
        town: "",
        postcode: "",
    };
    const [phone, setPhone] = useState("");
    const [locationData, setLocationData] = useState(initialLocation);

    const locationHandler = (e: any) =>
        setLocationData({ ...locationData, [e.target.name]: e.target.value });

    const calcTotal = () => {
        let totalAmount = 0;
        cart.forEach((a) => {
            totalAmount += Number(a.price);
        }, {});
        return totalAmount;
    };

    const confirmOrder = async (locationText: string) => {
        setLoadingNow(true);
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE!);
            const body = {
                phone: phone,
                email: user.email,
                userId: user.id,
                products: cart,
            };
            const headers = {
                "Content-Type": "application/json",
            };
            const response = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! +
                    process.env.NEXT_PUBLIC_CHECKOUT,
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body),
                }
            );
            const session = await response.json();
            stripe!.redirectToCheckout({
                sessionId: session.id,
            });

            //after successful payment trigger notifypurchase
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/utils/notifyPurchase`,
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
                setLoadingNow(false);
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

    useEffect(() => {
        const getCartList = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/user/getCartItem/${user.id}`
                );
                if (!res?.status) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const resObj = res.data;
                console.log(resObj);

                if (resObj.status === "success") {
                    setCart(resObj.product);
                }
            } catch (error) {
                console.error("An error at getCartList occurred:", error);
            }
        };
        getCartList();
    }, []);

    return (
        <>
            <section className="mt-6 py-4 sm:mt-0 sm:py-7 bg-primary">
                <div className="container max-w-screen-xl mx-auto px-4 md:px-10">
                    <h2 className="text-3xl font-semibold">
                        {cart?.length} Item(s) in Cart
                    </h2>
                </div>
            </section>

            {cart && cart.length > 0 && (
                <section className="py-10 md:px-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <CartBox
                                cart={cart}
                                modifyCart={modifyCart}
                            ></CartBox>
                            <CheckoutDetails
                                submitHandler={submitHandler}
                                setPhone={setPhone}
                                locationHandler={locationHandler}
                                cart={cart}
                                calcTotal={calcTotal}
                                loadingNow={loadingNow}
                                loadingCash={loadingCash}
                            ></CheckoutDetails>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
