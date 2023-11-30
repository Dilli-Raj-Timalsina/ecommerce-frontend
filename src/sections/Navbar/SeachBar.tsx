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

    const router = useRouter();
    useEffect(() => {
        const performSearch = async () => {
            if (!allProducts) return;

            const dataFiltered: SearchResultsAPIType[] = allProducts
                .filter((obj) => obj.title.includes(searchItem))
                .map((obj) => ({ title: obj.title, id: obj.id }));

            setSearchResultsAPI(dataFiltered);
        };

        performSearch();
    }, [searchItem, allProducts]);

    const handleOnChange = (item: string) => {
        setSearchItem(item);
    };
    return (
        <div className="form-control relative w-96 hidden lg:flex ml-24 ">
            <form>
                <input
                    type="search"
                    value={searchItem}
                    // onBlur={() => setShowModel(false)}
                    onClick={() => setShowModel(!showModel)}
                    onChange={(e) => handleOnChange(e.target.value)}
                    placeholder="Search..."
                    className="input focus:outline-none text-sm hover:bg-primary focus:border-neutral hover:border-neutral border-secondary focus:bg-primary bg-white rounded-3xl input-bordered pl-6 pr-20 md:w-auto"
                />
                <button
                    type="submit"
                    className="btn bg-secondary hover:bg-purple-400 text-base-100 btn-ghost absolute right-0 rounded-l-none px-6  rounded-r-3xl"
                >
                    <SearchIcon />
                </button>
            </form>
            {searchResultsAPI.length >= 1 && (
                <div
                    className={`absolute top-full left-0   ${
                        showModel ? "block" : "hidden"
                    } rounded-lg  w-full h-fit shadow-lg  z-50 bg-white  overflow-y-auto`}
                >
                    <ul className="drop-shadow-sm max-h-96 overflow-y-auto">
                        {searchResultsAPI.slice(0, 5).map((result, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setShowModel(false);
                                }}
                                className="hover:bg-gray-200 hover:text-gray-950  pl-4 text-gray-600 "
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
