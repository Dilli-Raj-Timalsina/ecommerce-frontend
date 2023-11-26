import EditProductBox from "./EditProductBox";
import { useState, useEffect } from "react";
import PopUpModal from "./PopUpModal";
import { useContext } from "react";
import { createContext } from "react";
import { CategoryContext } from "@/app/admin/layout";

type Product = {
    id: string;
    title: string;
    subTitle: string;
    requirements: string;
    description: string;
    price: string;
    thumbNail: string;
};

type OpenIdType = {
    currentId: string;
    setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

export const OpenIdContext = createContext<OpenIdType>({
    currentId: "",
    setCurrentId: () => {},
});

export default function EditProduct() {
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const { category, setCategory } = useContext(CategoryContext);
    const [products, setProducts] = useState<Product[]>([]);

    async function fetchData() {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND! +
                process.env.NEXT_PUBLIC_GET_PRODUCT_BY_CATEGORY +
                category,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const products = (await res.json()).products;
        console.log(products);
        setProducts(products);
    }

    useEffect(() => {
        fetchData();
    }, [category]);

    let content;
    if (products) {
        content = products.map((item, index) => {
            return (
                <EditProductBox
                    open={open}
                    setOpen={setOpen}
                    id={item.id}
                    key={index}
                    title={item.title}
                    price={item.price}
                    thumbNail={item.thumbNail}
                ></EditProductBox>
            );
        });
    }

    return (
        products && (
            <div
                className={`md:h-screen h-full w-full  border-l border-b border-gray-200 shadow-sm p-5 ${
                    open
                        ? "flex justify-center bg-slate-50"
                        : "grid md:grid-cols-5 md:gap-6 grid-cols-2 gap-3"
                }`}
            >
                <OpenIdContext.Provider value={{ currentId, setCurrentId }}>
                    <PopUpModal
                        open={open}
                        setOpen={setOpen}
                        id={currentId}
                    ></PopUpModal>
                    {content}
                </OpenIdContext.Provider>
            </div>
        )
    );
}
