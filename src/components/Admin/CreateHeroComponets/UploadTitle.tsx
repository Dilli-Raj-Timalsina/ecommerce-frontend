export default function UploadTile({
    heading,
    subHeading,
    title,
    headingName,
    subHeadingName,
    subTitle,
    handleInput,
}: any) {
    return (
        <div>
            <div className="pl-4 pr-4">
                <label
                    htmlFor={heading}
                    className="block text-gray-700 text-base font-bold "
                >
                    {heading}
                </label>
                <input
                    id={heading}
                    type="text"
                    name={headingName}
                    value={title}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>
            <div className="pl-4 pr-4 mt-4">
                <label
                    htmlFor={subHeading}
                    className="block text-gray-700 text-base font-bold "
                >
                    {subHeading}
                </label>
                <input
                    id={subHeading}
                    type="text"
                    name={subHeadingName}
                    value={subTitle}
                    onChange={handleInput}
                    className="w-full border border-gray-200 outline-none mt-1 pl-2 text-sm text-gray-600 py-1 focus:drop-shadow-md"
                    required
                />
            </div>
        </div>
    );
}
