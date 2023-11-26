"use client";
import { useState } from "react";
import Image from "next/image";
import BounceSpinners from "../Spinners/BounceSpinner";
import ErrorMessage from "../Spinners/ErrorMessage";
import SuccessMessage from "../Spinners/SuccessMessage";
import { title } from "process";

type CategoryOption = {
    value: string;
    label: string;
};

type product = {
    title: string;
    subTitle: string;
    requirements: string;
    description: string;
    price: string;
    thumbnail: File | null;
};

export default function CreateProductBox() {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("clothes");
    const [product, setProduct] = useState<product>({
        title: "",
        subTitle: "",
        requirements: "",
        description: "",
        price: "",
        thumbnail: null,
    });

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategory(event.target.value);
    };

    const handleInput = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUploadThumbNail = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            setProduct({
                ...product,
                thumbnail: event.target.files ? event.target.files[0] : null,
            });
        }
    };

    // const handleUploadSideImage = (
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     let imageList = [];
    //     if (event.target.files) {
    //         for (let i = 0; i < event.target.files.length; i++) {
    //             imageList.push(event.target.files[i]);
    //         }
    //         setproduct({
    //             ...product,
    //             sideImage: imageList,
    //         });
    //     }
    // };

    //handle the submission of thE form:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();
        form.append("title", product.title);
        form.append("subTitle", product.subTitle);
        form.append("description", product.description);
        form.append("price", product.price.toString());
        form.append("category", category);
        form.append("binary", product.thumbnail!);

        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND! +
                    process.env.NEXT_PUBLIC_CREATEPRODUCT,
                {
                    method: "POST",
                    headers: {},
                    body: form,
                }
            );

            const result = await res.json();
            console.log(result);
            if (res.ok) {
                setLoading(false);
                setSuccess(true);
                setProduct({
                    title: "",
                    subTitle: "",
                    requirements: "",
                    description: "",
                    price: "",
                    thumbnail: null,
                });
                setTimeout(() => {
                    setSuccess(false);
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

    return (
        <form
            className="h-screen  flex flex-col items-center bg-gray-100"
            onSubmit={handleSubmit}
        >
            <h1 className=" text-3xl font-bold text-gray-800 mt-2 hidden md:flex ">
                Create Product
            </h1>
            <div className="bg-white h-fit w-full md:w-1/2 rounded-md mt-4 pt-4 drop-shadow-lg  border border-gray-200">
                <div className="pl-4 pr-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 text-base font-bold "
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
                        className="block text-gray-700 text-base font-bold "
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
                        className="block text-gray-700 text-base font-bold"
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
                            className="block text-gray-700 text-base font-bold"
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
                        <label className="block text-gray-700 text-base font-bold">
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:drop-shadow-md"
                            required
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pl-4 pr-4 mt-4 flex flex-col">
                    <label
                        htmlFor="binary"
                        className="block text-gray-700 text-base font-bold  mt-4"
                    >
                        Thumbnail
                    </label>
                    <div className="w-1/2 flex">
                        <div className="flex items-center mb-4 w-1/2 mt-2">
                            <label
                                htmlFor="binary-upload"
                                className="flex-1 cursor-pointer bg-white rounded-md border-gray-300 hover:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                            >
                                <svg
                                    className="w-8 h-8 text-gray-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="ml-2 text-xs text-gray-600">
                                    drag here
                                </span>
                                <input
                                    id="binary-upload"
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif"
                                    className="sr-only "
                                    onChange={handleUploadThumbNail}
                                    required
                                />
                            </label>
                        </div>

                        <div className="p-2 mb-7 border border-gray-100 flex gap-1 items-center">
                            {product.thumbnail != null && (
                                <Image
                                    src={URL.createObjectURL(product.thumbnail)}
                                    alt="Selected File Preview"
                                    width={44}
                                    height={44}
                                />
                            )}
                        </div>
                    </div>
                    {/* <div className="w-1/2 mt-2">
                        <label
                            htmlFor="binary"
                            className="block text-gray-700 text-base font-bold  mt-4"
                        >
                            Side Image
                        </label>
                        <div className="flex items-center mb-4 w-1/2 mt-2">
                            <label
                                htmlFor="binary-upload2"
                                className="flex-1 cursor-pointer bg-white rounded-md border-gray-300 hover:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                            >
                                <svg
                                    className="w-8 h-8 text-gray-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="ml-2 text-xs text-gray-600">
                                    drag here
                                </span>
                                <input
                                    id="binary-upload2"
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif"
                                    className="sr-only "
                                    onChange={handleUploadSideImage}
                                    multiple
                                />
                            </label>
                        </div>

                        <div className="p-2 mb-7 border border-gray-100 flex gap-1 items-center">
                            {product.sideImage != null &&
                                product.sideImage.map((item, key) => (
                                    <Image
                                        src={URL.createObjectURL(item)}
                                        alt="Selected File Preview"
                                        width={44}
                                        height={44}
                                        key={key}
                                    />
                                ))}
                        </div>
                    </div> */}
                </div>
                <button
                    className="bg-purple-600 px-3 py-1 m-1 rounded-md ml-2 mb-2 text-white font-normal text-base hover:drop-shadow-xl hover:bg-purple-700 w-28 flex items-center gap-1"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <BounceSpinners /> : <span>Continue</span>}
                </button>
            </div>
            {error && (
                <ErrorMessage
                    message={"Please Signup as Admin, you are not Admin"}
                />
            )}
            {success && (
                <SuccessMessage message={"Product successfully created"} />
            )}
        </form>
    );
}

const categoryOptions: CategoryOption[] = [
    { value: "clothes", label: "Clothes" },
    { value: "groceries", label: "Groceries" },
    { value: "puja-items", label: "Puja Items" },
    { value: "utensils", label: "Utensils" },
];
