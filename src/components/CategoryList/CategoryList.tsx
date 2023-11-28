import Link from "next/link";
import { Key } from "react";
import { useProductContext } from "@/context/ProductContext";

export default function CategoryList() {
    const { allCategory } = useProductContext();

    const createCategoryLink = (category: string) => {
        return category.toLowerCase().split(" ").join("-");
    };

    return (
        <div
            className="hidden lg:flex text-xs px-10 pt-3 pb-1 h-min overflow-hidden bg-purple-400"
            style={{ fontWeight: 600 }}
        >
            <Link
                href={`/shop-all`}
                className="py-4 p-4 text-center hover:text-stone-300 opacity-80 hover:opacity-100"
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
                                className="py-4 p-4 text-center hover:text-stone-300 opacity-80 hover:opacity-100"
                            >
                                {category}
                            </Link>
                        );
                    }
                )}
        </div>
    );
}
