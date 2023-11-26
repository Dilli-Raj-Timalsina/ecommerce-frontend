"use client";
import DashBoardSideBar from "@/components/Admin/DashBoardSideBar";
import CreateProductBox from "@/components/Admin/CreateProduct";
import EditProduct from "@/components/Admin/EditProduct";
import PaginationButton from "@/components/Admin/PaginationButton";
import { useState } from "react";

export default function Home() {
    const [page, setPage] = useState(0);

    return (
        <aside className="w-full h-full">
            <EditProduct></EditProduct>
            <PaginationButton
                page={0}
                totalCourse={0}
                setPage={setPage}
            ></PaginationButton>
        </aside>
    );
}
