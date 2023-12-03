export default function UploadTile({
    heading,
    subHeading,
    title,
    subTitle,
    handleInput,
}: any) {
    return (
        <div>
            <div className="pl-4 pr-4">
                <label
                    htmlFor="title"
                    className="block text-gray-700 text-base font-bold "
                >
                    {heading}
                </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
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
                    {subHeading}
                </label>
                <input
                    id="subTitle"
                    type="text"
                    name="subTitle"
                    value={subTitle}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>
        </div>
    );
}
