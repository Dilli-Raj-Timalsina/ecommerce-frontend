import ProductDetails from "@/sections/ProductDetails/ProductDetails";
import axios from "axios";
import { API_URL } from '@/app/(root)/page';

const getProductDetails = async (id: string) => {
	try {
		const res = await axios.get(`${API_URL}/api/v1/product/getSingleProduct/${id}`)
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

const getRelatedProducts = async ({ category, id }: { category: string, id: string }) => {
	try {
		const res = await axios.get(`${API_URL}/api/v1/product/getProductByCategory/${category}`)
		if (!res.status) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		const resObj = res.data;

		if (resObj.status === "success") {
			return resObj.products.filter((e: any) => { return e.id != id }).slice(0, 4)
		}

		return []
	} catch (error) {
		console.error("An error at getRelatedProducts occurred:", error);
		return []
	}
}

const ProductDetailPage = async ({ params }: { params: any; }) => {
	const product = await getProductDetails(params.id)
	const relatedProducts = await getRelatedProducts(params)

	return (
		<ProductDetails product={product?.product} relatedProducts={relatedProducts} />
	)
}

export default ProductDetailPage