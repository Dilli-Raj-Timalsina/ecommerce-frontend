"use client";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { API_URL } from "@/app/(root)/page";
const Wishlist = () => {
    const [products, setProducts] = useState<any[]>([]);
    const { user } = useAuthContext();
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/v1/user/getWishList/26`
                );
                if (!res?.status) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                console.log("All wishlisted items in profile");
                const resObj = res.data;
                console.log(resObj);
                if (resObj.status === "success") {
                    console.log("WIhslist item retirieved Successfully");
                    // return resObj.product;
                    setProducts(resObj.product);
                }
            } catch (error) {
                console.error("An error at getWishList occurred:", error);
            }
        };
        getList();
    }, []);
    return (
        <div>
            <div className="lg:w-4/5  grid grid-cols-2  lg:grid-cols-4 gap-4 px-6 my-4 mb-0 ">
                {products &&
                    products?.map((prod, i: number) => {
                        return (
                            <div key={i}>
                                <ProductCard
                                    product={prod.product}
                                    category={prod.category}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Wishlist;
