import Image from "next/image";
import BounceSpinners from "@/components/Spinners/BounceSpinner";

export default function CartBox({ cart, modifyCart }: any) {
    return (
        <main className="md:w-3/4">
            <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                {cart?.length > 0 &&
                    cart?.map((cartItem: any, i: any) => (
                        <div key={i}>
                            <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                                <div className="w-full lg:w-2/5 xl:w-2/4">
                                    <figure className="flex leading-5">
                                        <div>
                                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                                <Image
                                                    height={200}
                                                    width={200}
                                                    src={`${cartItem?.thumbNail}`}
                                                    alt={cartItem.title}
                                                />
                                            </div>
                                        </div>
                                        <figcaption className="ml-3">
                                            <p>
                                                <a
                                                    href="#"
                                                    className="hover:text-blue-600"
                                                >
                                                    {cartItem.title}
                                                </a>
                                            </p>
                                            <p className="mt-1 text-gray-400">
                                                {" "}
                                                Cost: {cartItem.price}
                                            </p>
                                            <p>
                                                {cartItem.amount}
                                                <span className="text-sm text-gray-600">
                                                    {" "}
                                                    items
                                                </span>
                                            </p>
                                        </figcaption>
                                    </figure>
                                </div>

                                <div className="flex-auto">
                                    <div className="float-right">
                                        <a
                                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                modifyCart(cartItem.id, 0)
                                            }
                                        >
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />
                        </div>
                    ))}
            </article>
        </main>
    );
}
