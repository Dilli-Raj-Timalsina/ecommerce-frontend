import Link from "next/link";
import { Key } from "react";
import { useProductContext } from "@/context/ProductContext";

export default function CategoryList() {
    const { allCategory } = useProductContext();

    const createCategoryLink = (category: string) => {
        return category.toLowerCase().split(" ").join("-");
    };

    return (
        <div className="px-6 md:px-10  pt-5 md:pt-1 overflow-hidden  flex items-center  h-min  bg-purple-400 font-semibold md:text-base text-sm">
            <Link
                href={`/shop-all`}
                className="py-4 p-4 text-gray-700 text-center  hover:text-gray-800 opacity-80 hover:opacity-100"
            >
                Shop All
            </Link>
            {allCategory &&
                Object.keys(allCategory)?.map(
                    (category: any, i: Key | null | undefined) => {
                        return (
                            <Link
                                href={`/${createCategoryLink(category)}`}
                                key={i}
                                className="py-4 p-4 text-center text-gray-700 hover:text-gray-800 opacity-80 hover:opacity-100"
                            >
                                {category}
                            </Link>
                        );
                    }
                )}
        </div>
    );
}
