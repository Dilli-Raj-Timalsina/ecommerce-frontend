import React from "react";
import { SearchIcon } from "@/assets/svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProductContext } from "@/context/ProductContext";
import Link from "next/link";
interface SearchResultsAPIType {
    id: number;
    title: string;
}
const SeachBar = () => {
    const { allProducts } = useProductContext();
    const [searchItem, setSearchItem] = useState("");
    const [showModel, setShowModel] = useState<boolean>(false);

    const [searchResultsAPI, setSearchResultsAPI] = useState<
        SearchResultsAPIType[]
    >([]);

    useEffect(() => {
        const performSearch = async () => {
            if (!allProducts) return;

            const dataFiltered: SearchResultsAPIType[] = allProducts
                .filter((obj) =>
                    obj.title.toLowerCase().includes(searchItem.toLowerCase())
                )
                .map((obj) => ({ title: obj.title, id: obj.id }));

            setSearchResultsAPI(dataFiltered);
        };

        performSearch();
    }, [searchItem, allProducts]);

    const handleOnChange = (item: string) => {
        if (item.length === 0) {
            setShowModel(false);
        } else setShowModel(true);
        setSearchItem(item);
    };
    return (
        <div className="dropdown  md:flex md:ml-32 ml-2">
            <div className="relative w-60 md:w-128 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 hidden md:flex text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full md:p-4 md:pl-10 pl-1 py-3 text-xs md:text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-2xl bg-gray-50 focus:drop-shadow-xl "
                    placeholder="search..."
                    autoComplete="off"
                    value={searchItem}
                    onClick={() => setShowModel(!showModel)}
                    onChange={(e) => handleOnChange(e.target.value)}
                />
                <button
                    type="submit"
                    className="hidden md:flex text-white absolute right-2.5 bottom-2.5 bg-secondary hover:bg-purple-500 hover:drop-shadow-md font-medium rounded-lg text-sm px-4 py-2  "
                >
                    Search
                </button>
            </div>

            {searchResultsAPI.length >= 1 && (
                <div
                    className={`absolute top-full  dropdown-content dropdown-start   ${
                        showModel ? "block" : "hidden"
                    } rounded-sm  w-full h-fit shadow-lg  z-50 bg-white  overflow-y-auto`}
                >
                    <ul className="drop-shadow-sm max-h-96 overflow-y-auto">
                        {searchResultsAPI.slice(0, 5).map((result, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setShowModel(false);
                                }}
                                className="hover:bg-gray-200 hover:text-gray-950 cursor-pointer pl-4 py-1 text-sm text-gray-700 "
                            >
                                <Link href={`/shop-all/${result.id}`}>
                                    {result.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SeachBar;
