"use client";
import { useState } from "react";
import BounceSpinners from "@/components/Spinners/BounceSpinner";
import ErrorMessage from "@/components/Spinners/ErrorMessage";
import SuccessMessage from "@/components/Spinners/SuccessMessage";
import UploadBox from "@/components/Admin/CreateHeroComponets/UploadBox";
import UploadTile from "@/components/Admin/CreateHeroComponets/UploadTitle";

type Hero = {
    h1title: string;
    h1subTitle: string;
    h2title: string;
    h2subTitle: string;
    h3title: string;
    h3subTitle: string;
    imageFirst: string;
    imageSecond: string;
    imageThird: string;
};

export default function CreateProductBox() {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFirstNail, setImageFirstNail] = useState<File | null>(null);
    const [imageSecondNail, setImageSecondNail] = useState<File | null>(null);
    const [imageThirdNail, setImageThirdNail] = useState<File | null>(null);
    const [product, setProduct] = useState<Hero>({
        h1title: "",
        h1subTitle: "",
        h2title: "",
        h2subTitle: "",
        h3title: "",
        h3subTitle: "",
        imageFirst: "",
        imageSecond: "",
        imageThird: "",
    });

    const handleInput = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUploadImage =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                if (name == "first") {
                    setImageFirstNail(
                        event.target.files ? event.target.files[0] : null
                    );
                    setProduct({
                        ...product,
                        imageFirst: event.target.files
                            ? event.target.files[0].type
                            : "",
                    });
                } else if (name == "second") {
                    setImageSecondNail(
                        event.target.files ? event.target.files[0] : null
                    );
                    setProduct({
                        ...product,
                        imageSecond: event.target.files
                            ? event.target.files[0].type
                            : "",
                    });
                } else {
                    setImageThirdNail(
                        event.target.files ? event.target.files[0] : null
                    );
                    setProduct({
                        ...product,
                        imageThird: event.target.files
                            ? event.target.files[0].type
                            : "",
                    });
                }
            }
        };

    const uploadAllImage = async (
        thumbnailURL: string,
        sideImageURL: string[]
    ) => {
        // for (let i = 0; i < sideImageURL.length; i++) {
        //     if (i == 0) {
        //         await fetch(thumbnailURL, {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "image/*",
        //             },
        //             body: thumbnail,
        //         });
        //     } else {
        //         await fetch(sideImageURL[i - 1], {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "image/*",
        //             },
        //             body: sideImage![i - 1],
        //         });
        //     }
        // }
    };

    //handle the submission of thE form:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(imageFirstNail, imageSecondNail, imageThirdNail);
        console.log(
            product.h1title,
            product.h1subTitle,
            product.h2title,
            product.h2subTitle,
            product.h3title,
            product.h3subTitle,
            product.imageFirst,
            product.imageSecond,
            product.imageThird
        );

        // setLoading(true);
        // try {
        //     const res = await fetch(
        //         process.env.NEXT_PUBLIC_BACKEND! +
        //             process.env.NEXT_PUBLIC_CREATEPRODUCT,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 ...product,
        //             }),
        //         }
        //     );

        //     const result = await res.json();
        //     if (res.ok) {
        //         console.log(result);
        //         await uploadAllImage(result.thumbnail, result.urls);
        //         setLoading(false);
        //         setSuccess(true);

        //         setTimeout(() => {
        //             setSuccess(false);
        //         }, 4000);
        //     } else {
        //         setError(true);
        //         setTimeout(() => {
        //             setError(false);
        //         }, 4000);
        //         setLoading(false);
        //     }
        // } catch (err) {
        //     setLoading(false);
        //     console.error(err);
        // }
    };

    return (
        <form
            className="h-fit w-screen pb-4  flex flex-col items-center bg-gray-100"
            onSubmit={handleSubmit}
        >
            <h1 className=" text-3xl  font-bold text-gray-800 mt-5 hidden md:flex ">
                Create Hero Section
            </h1>
            <div className="bg-white h-fit w-full md:w-1/2 rounded-md mt-4 pt-4 drop-shadow-lg  border border-gray-200">
                <div className="flex items-center justify-between flex-col">
                    <div className="flex flex-col p-0 m-0 w-full">
                        <UploadTile
                            title={product.h1title}
                            subTitle={product.h1subTitle}
                            handleInput={handleInput}
                            heading={"Heading 1"}
                            subHeading={"SubHeading 1"}
                        ></UploadTile>
                        <UploadTile
                            title={product.h2title}
                            subTitle={product.h2subTitle}
                            handleInput={handleInput}
                            heading={"Heading 2"}
                            subHeading={"SubHeading 2"}
                        ></UploadTile>
                        <UploadTile
                            title={product.h3title}
                            subTitle={product.h3subTitle}
                            handleInput={handleInput}
                            heading={"Heading 3"}
                            subHeading={"SubHeading 3"}
                        ></UploadTile>
                    </div>
                    <div className="flex ">
                        <UploadBox
                            name={"first"}
                            title={"First Image"}
                            imageFile={imageFirstNail}
                            handleUploadImage={handleUploadImage}
                            id={"a1"}
                        ></UploadBox>
                        <UploadBox
                            name={"second"}
                            title={"Second Image"}
                            imageFile={imageSecondNail}
                            handleUploadImage={handleUploadImage}
                            id={"b1"}
                        ></UploadBox>
                        <UploadBox
                            name={"third"}
                            title={"Third Image"}
                            imageFile={imageThirdNail}
                            handleUploadImage={handleUploadImage}
                            id={"c1"}
                        ></UploadBox>
                    </div>
                </div>
                <button
                    className="bg-purple-600 px-3 text-center  py-1 m-1 rounded-md ml-2 mb-2 text-white font-normal text-base hover:drop-shadow-xl hover:bg-purple-700 w-fit flex items-center gap-1"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <BounceSpinners size={"w-3 h-3"} />
                    ) : (
                        <span>create</span>
                    )}
                </button>
            </div>
            {error && (
                <ErrorMessage
                    message={"Please Signup as Admin, you are not Admin"}
                    position="bottom-16"
                />
            )}
            {success && (
                <SuccessMessage
                    message={"Product successfully created"}
                    position={"bottom-16"}
                />
            )}
        </form>
    );
}
