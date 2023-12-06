import Link from "next/link";
import BounceSpinners from "@/components/Spinners/BounceSpinner";

export default function CheckoutDetails({
    submitHandler,
    setPhone,
    locationHandler,
    cart,
    calcTotal,
    loadingNow,
    loadingCash,
}: any) {
    return (
        <aside className="md:w-1/4">
            <form onSubmit={submitHandler}>
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <span>Checkout Details:</span>
                    <ul className="form-control">
                        <li className="flex flex-col justify-between text-gray-600 mb-1">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                onChange={(e) => setPhone(e.target.value)}
                                className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                required
                            />
                        </li>
                        <li className="flex flex-col justify-between text-gray-600  mb-1">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                name="house"
                                placeholder="HOUSE NUMBER AND STREET"
                                onChange={locationHandler}
                                className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="town"
                                placeholder="TOWN"
                                onChange={locationHandler}
                                className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="postcode"
                                placeholder="POST CODE"
                                onChange={locationHandler}
                                className="input input-bordered text-sm my-1 h-10 focus:outline-none"
                                required
                            />
                        </li>
                    </ul>
                </article>
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <ul className="mb-5">
                        <li className="flex justify-between text-gray-600  mb-1">
                            <span>Total Units:</span>
                            <span className="text-secondary">
                                {cart?.length} (Units)
                            </span>
                        </li>
                        <li className="flex justify-between text-gray-600  mb-1">
                            <span>Total Amount:</span>
                            <span>${calcTotal()}</span>
                        </li>
                    </ul>

                    <button
                        type="submit"
                        className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-secondary hover:bg-purple-600 border border-transparent rounded-md  cursor-pointer"
                        disabled={loadingNow}
                    >
                        {loadingNow ? (
                            <BounceSpinners size={"w-3 h-3"} />
                        ) : (
                            <span>Pay Now</span>
                        )}
                    </button>

                    <Link
                        href="/"
                        className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-secondary bg-gray-300 shadow-sm border border-gray-200 rounded-md hover:bg-gray-400"
                    >
                        {loadingCash ? (
                            <BounceSpinners size={"w-3 h-3"} />
                        ) : (
                            <span>Cash on Delivery</span>
                        )}
                    </Link>
                </article>
            </form>
        </aside>
    );
}
