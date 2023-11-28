import {
    OrdersIcon,
    AppearanceIcon,
    DashboardIcon,
    ProductsIcon,
    SettingsIcon,
    HorizontalIcon,
} from "@/assets/admin-svg";
import { useRouter } from "next/navigation";

type DashBoardSideBarProps = {
    productState: boolean;
    setProductState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashBoardSideBar(props: DashBoardSideBarProps) {
    const router = useRouter();
    return (
        <aside className=" flex flex-col md:w-fit w-screen px-3 gap-3 md:gap-5 text-xl text-gray-800 mt-8 md:mt-16 bg-white drop-shadow-md">
            <div
                className="flex items-center gap-3 ml-2 hover:ml-3 cursor-pointer "
                onClick={() => {
                    router.push("/admin/dashboard");
                }}
            >
                <div className="bg-purple-600 p-1 rounded-md w-fit h-fit  ">
                    <DashboardIcon></DashboardIcon>
                </div>
                <h1 className="">Dashboard</h1>
            </div>
            <HorizontalIcon></HorizontalIcon>
            <div
                className="flex items-center gap-3 ml-2 hover:ml-3 cursor-pointer"
                onClick={() => {
                    props.setProductState(!props.productState);
                    router.push("/admin/create-product");
                }}
            >
                <ProductsIcon></ProductsIcon>
                <h1>Products</h1>
            </div>
            <div
                className={`  ${
                    props.productState ? "flex flex-col " : "hidden"
                }`}
            >
                <button
                    className={`text-base text-gray-600 mt-1 pl-4 md:pl-8 hover:bg-slate-50 hover:text-gray-700`}
                    onClick={() => {
                        router.push("/admin/create-product");
                    }}
                >
                    Create Product
                </button>
                <button
                    className={`text-base text-gray-600 mt-1 mb-1 pl-4 hover:bg-slate-50 hover:text-gray-700`}
                    onClick={() => {
                        router.push("/admin/edit-product");
                    }}
                >
                    Edit Product
                </button>
            </div>
            <HorizontalIcon></HorizontalIcon>
            <div className="flex items-center gap-3 ml-2 hover:ml-3 cursor-pointer">
                <OrdersIcon></OrdersIcon>
                <h1>Orders</h1>
            </div>
            <HorizontalIcon></HorizontalIcon>
            <div className="flex items-center gap-3 ml-2 hover:ml-3 cursor-pointer">
                <SettingsIcon></SettingsIcon>
                <h1>Settings</h1>
            </div>
            <HorizontalIcon></HorizontalIcon>
            <div className="flex items-center gap-3 ml-2 hover:ml-3 cursor-pointer">
                <AppearanceIcon></AppearanceIcon>
                <h1>Appearance</h1>
            </div>
            <HorizontalIcon></HorizontalIcon>
        </aside>
    );
}
