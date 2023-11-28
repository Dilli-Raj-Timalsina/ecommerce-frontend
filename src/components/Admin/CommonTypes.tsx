export type CategoryOption = {
    value: string;
    label: string;
};
export type Product = {
    title: string;
    subTitle: string;
    description: string;
    price: string;
    category: string;
};

export const categories: CategoryOption[] = [
    { value: "clothes", label: "Clothes" },
    { value: "groceries", label: "Groceries" },
    { value: "puja-items", label: "Puja Items" },
    { value: "utensils", label: "Utensils" },
];
