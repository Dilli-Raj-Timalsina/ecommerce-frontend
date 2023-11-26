import { useContext, useState } from "react";
import { OpenIdContext } from "./EditProduct";
import { CategoryContext } from "@/app/admin/layout";

type EditProductBoxProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    title: string;
    price: string;
    thumbNail: string;
};

export default function EditProductBox({
    open,
    setOpen,
    id,
    title,
    price,
    thumbNail,
}: EditProductBoxProps) {
    const { currentId, setCurrentId } = useContext(OpenIdContext);
    const [deleted, setDeleted] = useState(false);
    const handleDelete = async () => {
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! +
                    process.env.NEXT_PUBLIC_DELETEPRODUCT +
                    id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setDeleted(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className={`border border-gray-200 p-2 h-fit rounded-sm hover:shadow-md hover:border-gray-300 ${
                open ? "hidden bg-gray-100" : ""
            } ${deleted ? " hidden" : ""}`}
        >
            {/* eslint-disable @next/next/no-img-element */}
            <img src={thumbNail} alt="" className="w-44 h-44" />

            <div className="text-gray-600 md:text-base text-sm  font-medium md:pt-2 pt-1">
                {title.split(" ").slice(0, 3).join(" ")}
            </div>
            <div className="text-gray-800 font-semibold md:text-sm text-xs ">
                ${price}
            </div>
            <div className="flex flex-row gap-2 items-center py-2">
                <button
                    className=" bg-white text-gray-700 font-medium md:text-sm text-xs md:px-3 px-2 py-1 rounded-md border border-gray-200 flex items-center hover:border-gray-300 hover:shadow-sm "
                    onClick={() => {
                        setCurrentId(id);
                        setOpen(!open);
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:w-4 md:h-4 w-3 h-3 inline-block"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                fill="#0F0F0F"
                            ></path>{" "}
                        </g>
                    </svg>
                    <span>Edit</span>
                </button>
                <button
                    className="bg-white text-red-600 font-medium md:text-sm text-xs rounded-md  hover:border-gray-300 hover:shadow-sm  px-2 md:px-3 py-1 border border-gray-200 flex items-center"
                    onClick={() => {
                        handleDelete();
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:w-4 md:h-4 w-3 h-3"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                d="M10 11V17"
                                stroke="#cf0c0c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>{" "}
                            <path
                                d="M14 11V17"
                                stroke="#cf0c0c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>{" "}
                            <path
                                d="M4 7H20"
                                stroke="#cf0c0c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>{" "}
                            <path
                                d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                stroke="#cf0c0c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>{" "}
                            <path
                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                stroke="#cf0c0c"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>{" "}
                        </g>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
}
