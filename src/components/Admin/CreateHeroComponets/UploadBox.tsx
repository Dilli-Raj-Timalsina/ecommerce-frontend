import Image from "next/image";

type UploadBoxType = {
    name: string;
    id: string;
    title: string;
    imageFile: File | null;
    handleUploadImage: (
        name: string
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadBox({
    title,
    id,
    name,
    handleUploadImage,
    imageFile,
}: UploadBoxType) {
    return (
        <div className="pl-4 pr-4 mt-4 flex flex-col">
            <label
                htmlFor="binary"
                className="block text-gray-700 text-base font-bold  mt-4"
            >
                {title}
            </label>
            <div className="w-1/2 flex flex-col">
                <div className="flex items-center mb-4 w-1/2 mt-2">
                    <label
                        htmlFor={id}
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
                            id={id}
                            type="file"
                            accept="image/jpeg, image/png, image/gif"
                            className="sr-only "
                            onChange={(event) => {
                                handleUploadImage(name)(event);
                            }}
                            required
                        />
                    </label>
                </div>

                <div className="p-2 mb-7 border border-gray-100 w-fit h-fit flex gap-1 items-center">
                    {imageFile != null && (
                        <Image
                            src={URL.createObjectURL(imageFile)}
                            alt="Selected File Preview"
                            width={44}
                            height={44}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
