import { useState, useEffect } from "react";
import ErrorMessage from "../Spinners/ErrorMessage";
import SuccessMessage from "../Spinners/SuccessMessage";
import BounceSpinners from "../Spinners/BounceSpinner";
import { categories, Product } from "./CommonTypes";

type PopUpModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

export default function PopUpModal({ open, setOpen, id }: PopUpModalProps) {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product>({
        title: "",
        subTitle: "",
        description: "",
        category: "",
        price: "",
    });
    const handleInput = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! +
                    process.env.NEXT_PUBLIC_EDITPRODUCT +
                    id,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...product,
                    }),
                }
            );
            const result = await res.json();
            if (res.ok) {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setOpen(!open);
                }, 4000);
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 4000);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    async function fetchData() {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND! +
                process.env.NEXT_PUBLIC_GETSINGLEPRODUCT +
                id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const op = await res.json();
        if (res.ok) {
            setProduct(op.product);
        }
    }

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    return (
        <form
            className={`bg-white h-fit w-fit rounded-md mt-4 pt-4 drop-shadow-lg  border border-gray-200 ${
                open ? "" : "hidden"
            }`}
            onSubmit={handleSubmit}
        >
            <div className="pl-4 pr-4">
                <label
                    htmlFor="title"
                    className="block text-gray-700 text-base font-medium "
                >
                    Product title
                </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>
            <div className="pl-4 pr-4 mt-4">
                <label
                    htmlFor="subtitle"
                    className="block text-gray-700 text-base font-medium "
                >
                    Product subtitle
                </label>
                <input
                    id="subTitle"
                    type="text"
                    name="subTitle"
                    value={product.subTitle}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>

            <div className="pl-4 pr-4 mt-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 text-base font-medium"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>
            <div className="flex  justify-between mt-4 pl-4 pr-4">
                <div className="">
                    <label
                        htmlFor="price"
                        className="block text-gray-700 text-base font-medium"
                    >
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInput}
                        className="w-4/5 border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-gray-700 text-base font-medium">
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleInput}
                        className="w-full px-3 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:drop-shadow-md"
                        required
                    >
                        {categories.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-between pl-4 pr-6 mt-4 mb-2">
                <button
                    className="bg-purple-600 px-3 py-1 mb-6  mt-2 rounded-md  text-white font-normal text-base hover:drop-shadow-xl hover:bg-purple-700 w-fit flex items-center "
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <BounceSpinners size={"w-3 h-3"} />
                    ) : (
                        <span>edit</span>
                    )}
                </button>
                <button
                    className="bg-red-500 px-3 py-1 mb-6  mt-2 rounded-md  text-white font-normal text-base hover:drop-shadow-xl hover:bg-red-600 w-fit flex items-center left-"
                    onClick={() => {
                        setOpen(!open);
                    }}
                    type="button"
                >
                    cancel
                </button>
            </div>
            {error && (
                <ErrorMessage
                    message={"Please Signup as Admin, you are not Admin"}
                    position=""
                />
            )}
            {success && (
                <SuccessMessage
                    message={"Product edited successfully"}
                    position="bottom-9 left-32"
                />
            )}
        </form>
    );
}
