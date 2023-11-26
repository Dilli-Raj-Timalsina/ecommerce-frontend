import DataDisplayBox from "@/components/Admin/DataDisplayBox";

export default function Home() {
    return (
        <div className="h-screen  w-full  border-l border-b border-gray-200  shadow-sm ">
            <div className="grid grid-cols-2 gap-3 p-4 w-full h-fit">
                <DataDisplayBox></DataDisplayBox>
                <DataDisplayBox></DataDisplayBox>
                <DataDisplayBox></DataDisplayBox>
                <DataDisplayBox></DataDisplayBox>
            </div>
        </div>
    );
}
