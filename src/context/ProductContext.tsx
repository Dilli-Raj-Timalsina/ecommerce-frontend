'use client';

import axios from "axios";
import { API_URL } from '@/app/(root)/page';
import { createContext, useContext, useEffect, useState } from 'react';

interface IProductContext {
	allProducts: any[] | undefined
	allCategory: any[] | undefined
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
	const [allProducts, setProducts] = useState<any[] | undefined>(undefined);

	const allCategory = allProducts?.reduce((groups, item) => {
		const category = item.category;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(item);
		return groups;
	}, {});

	useEffect(() => {
		const getAllProducts = async () => {
			try {
				const res = await axios.get(`${API_URL}/api/v1/product/getAllProducts`);
				const resObj = res?.data;

				if (!resObj) {
					throw new Error(`HTTP error! Status: ${resObj.status}`);
				}

				if (resObj.status === "success") {
					setProducts(resObj.products)
				}
			} catch (error) {
				console.error("An error at getAllProducts occurred:", error);
			}
		}
		getAllProducts()
	}, [])

	return (
		<ProductContext.Provider
			value={{
				allProducts,
				allCategory,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export const useProductContext = () => {
	const context = useContext(ProductContext)
	if (context === undefined) {
		throw new Error("useProductContext must be within ProductContext")
	}

	return context
}

export default ProductContext