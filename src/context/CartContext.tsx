"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useModalContext } from "./ModalContext";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

interface ICartContext {
    cart: any[];

    modifyCart: (id: string, amt: number) => Promise<void>;
    setCart: React.Dispatch<React.SetStateAction<any[]>>;

    //   deleteItemFromCart: (id: string) => Promise<void>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { showModal } = useModalContext();
    const { user } = useAuthContext();
    const [cart, setCart] = useState<any[]>([]);

    const modifyCart = async (id: string, amt: number) => {
        let newCartItems;

        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/user/updateCart`,
                {
                    amount: "" + amt,
                    userId: user?.id,
                    productId: "" + id,
                }
            );
            const resObj = res.data;
            console.log("Patch the Cart: ");
            console.log(resObj);
            if (resObj.status === "success") {
                if (amt > 0) {
                    showModal("Added to Cart", "Info");
                } else {
                    showModal("Removed from Cart", "Info");
                }
                try {
                    const res =
                        // cart &&
                        await axios.get(
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
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,

                setCart,
                modifyCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext must be within CartContext");
    }

    return context;
};

export default CartContext;
