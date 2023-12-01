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
                const resObj = res.data;
                if (resObj.status === "success") {
                    console.log(resObj);
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
            <h2 className="text-2xl ms-10 p-4 font-bold">Wishlist Items:</h2>
            <div className="lg:w-4/5 lg:ps-10  grid grid-cols-2  lg:grid-cols-3 gap-2">
                {products &&
                    products?.map((prod, i: number) => {
                        return (
                            <div key={i}>
                                <ProductCard
                                    product={prod}
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
