
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

    addItemToCart: ({ id }: { id: string }) => Promise<void>;
    deleteItemFromCart: ({ id }: { id: string }) => Promise<void>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { showModal } = useModalContext();
    const { user } = useAuthContext();
    const [cart, setCart] = useState<any[]>([]);

    // const setCartToState = () => {
    //     const cartDataString = localStorage.getItem("cart");
    //     const cartData =
    //         cartDataString !== null
    //             ? JSON.parse(cartDataString)
    //             : { cartItems: [] };
    //     setCart(cartData.cartItems);
    // };

    const modifyCart = async (id: string, amt: number) => {
        let newCartItems;

        if (!cart.includes(id)) {
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
                    newCartItems = [...(cart || []), id];
                    setCart(newCartItems);
                    if (amt > 0) {
                        showModal("Item successfully added to cart", "Info");
                    } else {
                        showModal(
                            "Item Successfully Removed from Cart",
                            "Info"
                        );
                    }
                    localStorage.setItem(
                        "cart",
                        JSON.stringify({ cartItems: newCartItems })
                    );
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            newCartItems = [...cart];
        }
    };

    //   const deleteItemFromCart = async (id: string) => {
    //     let newCartItems = cart?.filter((i) => i !== id);

    //     showModal("Item successfully deleted from cart", "Info");
    //     localStorage.setItem(
    //       "cart",
    //       JSON.stringify({ cartItems: newCartItems })
    //     );
    //     setCartToState();
    //   };


    const setCartToState = () => {
        const cartDataString = localStorage.getItem("cart");
        const cartData =
            cartDataString !== null
                ? JSON.parse(cartDataString)
                : { cartItems: [] };
        setCart(cartData.cartItems);
    };

    const addItemToCart = async (id: { id: string }) => {
        let newCartItems;
        if (!cart.includes(id)) {
            newCartItems = [...(cart || []), id];
        } else {
            newCartItems = [...cart];
        }

        showModal("Item successfully added to cart", "Info");

        localStorage.setItem(
            "cart",
            JSON.stringify({ cartItems: newCartItems })
        );
        setCartToState();
    };

    const deleteItemFromCart = async (id: { id: string }) => {
        let newCartItems = cart?.filter((i) => i !== id);

        showModal("Item successfully deleted from cart", "Info");
        localStorage.setItem(
            "cart",
            JSON.stringify({ cartItems: newCartItems })
        );
        setCartToState();
    };

    useEffect(() => {
        setCartToState();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,

                setCart,
                modifyCart,
                // deleteItemFromCart,
                addItemToCart,
                deleteItemFromCart,
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
