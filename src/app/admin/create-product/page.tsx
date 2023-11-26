"use client";
import CreateProductBox from "@/components/Admin/CreateProduct";
import { useState } from "react";

export default function Home() {
    const [page, setPage] = useState(0);
    return (
        <aside className="w-full h-full">
            <CreateProductBox></CreateProductBox>
        </aside>
    );
}
