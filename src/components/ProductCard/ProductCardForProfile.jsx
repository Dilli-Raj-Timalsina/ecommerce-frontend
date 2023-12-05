import Image from "next/image";

const ProductCardForProfile = ({ product, state }) => {
    let stateColor = "";
    switch (state) {
        case "completed":
            stateColor = "bg-green-400";
            break;
        case "pending":
            stateColor = "bg-yellow-400";
            break;
        case "canceled":
            stateColor = "bg-red-400";
            break;
        default:
            stateColor = "bg-gray-400";
            break;
    }

    return (
        <div
            className={`max-w-sm rounded w-44 lg:w-56 overflow-hidden shadow-lg`}
        >
            <Image
                src={product.thumbNail}
                alt={product.title}
                height={200}
                width={400}
                className="bg-cover mt-2 h-52 rounded-t-lg p-2"
            />
            <div className="px-6 py-4">
                <div className="font-bold whitespace-nowrap text-xl mb-2">
                    {product.title}
                </div>
                <p className="text-gray-700 line-clamp-2 text-base">
                    {product.description}
                </p>
            </div>
            <div className="px-6 pb-4">
                <div
                    className={` ${stateColor} w-fit py-1 mb-2 rounded-md px-2  text-sm font-semibold text-gray-700`}
                >
                    {state}
                </div>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ${product.price.toFixed(2)}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                    {product.category}
                </span>
            </div>
        </div>
    );
};

export default ProductCardForProfile;
