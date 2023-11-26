"use client";
import DashBoardSideBar from "@/components/Admin/DashBoardSideBar";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

type CategoryContextType = {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const CategoryContext = createContext<CategoryContextType>({
    category: "",
    setCategory: () => {},
});

export default function Home({ children }: { children: React.ReactNode }) {
    const [productState, setProductState] = useState(false);
    const [category, setCategory] = useState("");

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        console.log(event.target.value);
        setCategory(event.target.value);
    };
    return (
        <div className="">
            <div className="flex justify-between items-end pr-2  ">
                <h1 className="text-gray-600 font-bold px-3 mt-6 ml-2 mb-3 text-2xl cursor-pointer">
                    USHOPIE
                </h1>

                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-72 h-fit px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:drop-shadow-md"
                    required
                >
                    {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

            <section className="flex md:flex-row flex-col">
                <DashBoardSideBar
                    setProductState={setProductState}
                    productState={productState}
                ></DashBoardSideBar>
                <CategoryContext.Provider value={{ category, setCategory }}>
                    {children}
                </CategoryContext.Provider>
            </section>
        </div>
    );
}

const categoryOptions: CategoryOption[] = [
    { value: "clothes", label: "Clothes" },
    { value: "groceries", label: "Groceries" },
    { value: "puja-items", label: "Puja Items" },
    { value: "utensils", label: "Utensils" },
];
type CategoryOption = {
    value: string;
    label: string;
};
