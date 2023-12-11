"use client";
import Image from "next/image";
import { useState } from "react";
import BounceSpinners from "@/components/Spinners/BounceSpinner";

export default function SingleOrder({ data }: any) {
    const [successButton, setSuccessButton] = useState("not-submit");
    const [cancelButton, setCancelButton] = useState("not-submit");

    async function confirmOrder(type: string) {
        if (type == "cancelled") {
            setCancelButton("loading");
        } else {
            setSuccessButton("loading");
        }
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! + "/api/v1/utils/confirmOrder",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: type,
                        orderId: data.orderId,
                    }),
                }
            );

            const op = await res.json();
            console.log(op);
            setCancelButton("success");
            setSuccessButton("success");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mx-6 my-2 px-3 py-1 w-3/4 h-fit  border border-gray-200  shadow-sm ">
            <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                <div className="w-full lg:w-2/5 xl:w-2/4">
                    <figure className="flex leading-5">
                        <div>
                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <Image
                                    height={200}
                                    width={200}
                                    src={data.thumbNail}
                                    alt={"ok"}
                                />
                            </div>
                        </div>
                        <figcaption className="ml-3">
                            <p>
                                <a href="#" className="hover:text-blue-600">
                                    {data.title}
                                </a>
                            </p>
                            <p className="mt-1 text-gray-400">
                                {" "}
                                Cost:{data.price}
                            </p>
                            <p>
                                4
                                <span className="text-sm text-gray-600">
                                    {" "}
                                    items
                                </span>
                            </p>
                        </figcaption>
                    </figure>
                </div>

                <div className="flex-auto ">
                    <div className="float-right">
                        <button
                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                confirmOrder("cancelled");
                            }}
                        >
                            {cancelButton == "loading" ? (
                                <BounceSpinners size={"w-3 h-3"} />
                            ) : (
                                <span>Cancelled</span>
                            )}
                        </button>
                    </div>
                    <div className="float-right mr-2">
                        <button
                            className="px-4 py-2 inline-block text-purple-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                confirmOrder("completed");
                            }}
                        >
                            {successButton == "loading" ? (
                                <BounceSpinners size={"w-3 h-3"} />
                            ) : (
                                <span>Success</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
