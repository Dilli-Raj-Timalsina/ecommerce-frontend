"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useModalContext } from "./ModalContext";

interface ICartContext {
    cart: any[];
    addItemToCart: ({ id }: { id: string }) => Promise<void>;
    deleteItemFromCart: ({ id }: { id: string }) => Promise<void>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { showModal } = useModalContext();
    const [cart, setCart] = useState<any[]>([]);

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
