import SingleOrder from "@/components/Admin/OrderComponents/SingleOrder";

export default async function Orders() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND! + "/api/v1/utils/getPendingOrder",
        { next: { revalidate: 5 } }
    );
    const data = (await res.json()).OrderProfile;

    return (
        <div className="h-screen  w-full py-8 border-l border-b border-gray-200  shadow-sm ">
            {data &&
                data.map((data: any, index: any) => {
                    return <SingleOrder data={data} key={index}></SingleOrder>;
                })}
        </div>
    );
}
