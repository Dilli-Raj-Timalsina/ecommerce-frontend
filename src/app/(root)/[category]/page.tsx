import axios from "axios";
import { API_URL } from '@/app/(root)/page';
import ProductsByCategory from '@/sections/ProductsByCategory/ProductsByCategory'

const getProductDetails = async (category: string) => {
	try {
		const res = (category === "shop-all") ?
			await axios.get(`${API_URL}/api/v1/product/getAllProducts`)
			: await axios.get(`${API_URL}/api/v1/product/getProductByCategory/${category}`)
		if (!res.status) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		const resObj = res.data;

		if (resObj.status === "success") {
			return resObj
		}

		return []
	} catch (error) {
		console.error("An error at getProductDetails occurred:", error);
		return []
	}
}

const ProductsPage = async ({ params }: { params: any }) => {
	const products = await getProductDetails(params.category)

	return (
		<ProductsByCategory products={products.products} category={params.category} />
	)
}

export default ProductsPage