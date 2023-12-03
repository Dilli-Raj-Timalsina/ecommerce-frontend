import { categories } from "../CommonTypes";

export default function CategoryBox({
    category,
    handleCategoryChange,
    name,
}: any) {
    return (
        <div className="">
            <label className="block text-gray-700 text-base font-bold">
                {name}
            </label>

            <select
                id={name}
                name={name}
                value={category}
                onChange={(event) => handleCategoryChange(name)(event)}
                className="w-full px-3 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:drop-shadow-md"
                required
            >
                {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
