"use client";

import Category from "@/components/Category/category";
import { useProductContext } from "@/context/ProductContext";

export default function Categories() {
    const { allCategory } = useProductContext();

    return (
        <div className="mt-5 mb-2 md:mt-8 md:mb-4 ">
            {allCategory &&
                Object.keys(allCategory)?.map((e: any, i: any) => {
                    return (
                        <div key={i}>
                            <Category category={e} items={allCategory[e]} />
                        </div>
                    );
                })}
        </div>
    );
}
